import type { IAnimatable } from "../Animations/animatable.interface";
import { Observable } from "../Misc/observable";
import type { Nullable, FloatArray } from "../types";
import type { Scene } from "../scene";
import { EngineStore } from "../Engines/engineStore";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import { VertexBuffer } from "../Buffers/buffer";
import type { AnimationPropertiesOverride } from "../Animations/animationPropertiesOverride";
import { serialize } from "../Misc/decorators";
import { SerializationHelper } from "../Misc/decorators.serialization";
import { GetClass } from "../Misc/typeStore";

import type { Animation } from "../Animations/animation";

/**
 * Defines a target to use with MorphTargetManager
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/morphTargets
 */
export class MorphTarget implements IAnimatable {
    /**
     * Gets or sets the list of animations
     */
    public animations: Animation[] = [];

    private _scene: Nullable<Scene>;
    private _positions: Nullable<FloatArray> = null;
    private _normals: Nullable<FloatArray> = null;
    private _tangents: Nullable<FloatArray> = null;
    private _uvs: Nullable<FloatArray> = null;
    private _influence: number;
    private _uniqueId = 0;

    /**
     * Observable raised when the influence changes
     */
    public onInfluenceChanged = new Observable<boolean>();

    /** @internal */
    public _onDataLayoutChanged = new Observable<void>();

    /**
     * Gets or sets the influence of this target (ie. its weight in the overall morphing)
     */
    public get influence(): number {
        return this._influence;
    }

    public set influence(influence: number) {
        if (this._influence === influence) {
            return;
        }

        const previous = this._influence;
        this._influence = influence;

        if (this.onInfluenceChanged.hasObservers()) {
            this.onInfluenceChanged.notifyObservers(previous === 0 || influence === 0);
        }
    }

    /**
     * Gets or sets the id of the morph Target
     */
    @serialize()
    public id: string;

    private _animationPropertiesOverride: Nullable<AnimationPropertiesOverride> = null;

    /**
     * Gets or sets the animation properties override
     */
    public get animationPropertiesOverride(): Nullable<AnimationPropertiesOverride> {
        if (!this._animationPropertiesOverride && this._scene) {
            return this._scene.animationPropertiesOverride;
        }
        return this._animationPropertiesOverride;
    }

    public set animationPropertiesOverride(value: Nullable<AnimationPropertiesOverride>) {
        this._animationPropertiesOverride = value;
    }

    /**
     * Creates a new MorphTarget
     * @param name defines the name of the target
     * @param influence defines the influence to use
     * @param scene defines the scene the morphtarget belongs to
     */
    public constructor(
        /** defines the name of the target */
        public name: string,
        influence = 0,
        scene: Nullable<Scene> = null
    ) {
        this.id = name;
        this._scene = scene || EngineStore.LastCreatedScene;
        this.influence = influence;

        if (this._scene) {
            this._uniqueId = this._scene.getUniqueId();
        }
    }

    /**
     * Gets the unique ID of this manager
     */
    public get uniqueId(): number {
        return this._uniqueId;
    }

    /**
     * Gets a boolean defining if the target contains position data
     */
    public get hasPositions(): boolean {
        return !!this._positions;
    }

    /**
     * Gets a boolean defining if the target contains normal data
     */
    public get hasNormals(): boolean {
        return !!this._normals;
    }

    /**
     * Gets a boolean defining if the target contains tangent data
     */
    public get hasTangents(): boolean {
        return !!this._tangents;
    }

    /**
     * Gets a boolean defining if the target contains texture coordinates data
     */
    public get hasUVs(): boolean {
        return !!this._uvs;
    }

    /**
     * Affects position data to this target
     * @param data defines the position data to use
     */
    public setPositions(data: Nullable<FloatArray>) {
        const hadPositions = this.hasPositions;

        this._positions = data;

        if (hadPositions !== this.hasPositions) {
            this._onDataLayoutChanged.notifyObservers(undefined);
        }
    }

    /**
     * Gets the position data stored in this target
     * @returns a FloatArray containing the position data (or null if not present)
     */
    public getPositions(): Nullable<FloatArray> {
        return this._positions;
    }

    /**
     * Affects normal data to this target
     * @param data defines the normal data to use
     */
    public setNormals(data: Nullable<FloatArray>) {
        const hadNormals = this.hasNormals;

        this._normals = data;

        if (hadNormals !== this.hasNormals) {
            this._onDataLayoutChanged.notifyObservers(undefined);
        }
    }

    /**
     * Gets the normal data stored in this target
     * @returns a FloatArray containing the normal data (or null if not present)
     */
    public getNormals(): Nullable<FloatArray> {
        return this._normals;
    }

    /**
     * Affects tangent data to this target
     * @param data defines the tangent data to use
     */
    public setTangents(data: Nullable<FloatArray>) {
        const hadTangents = this.hasTangents;

        this._tangents = data;

        if (hadTangents !== this.hasTangents) {
            this._onDataLayoutChanged.notifyObservers(undefined);
        }
    }

    /**
     * Gets the tangent data stored in this target
     * @returns a FloatArray containing the tangent data (or null if not present)
     */
    public getTangents(): Nullable<FloatArray> {
        return this._tangents;
    }

    /**
     * Affects texture coordinates data to this target
     * @param data defines the texture coordinates data to use
     */
    public setUVs(data: Nullable<FloatArray>) {
        const hadUVs = this.hasUVs;

        this._uvs = data;

        if (hadUVs !== this.hasUVs) {
            this._onDataLayoutChanged.notifyObservers(undefined);
        }
    }

    /**
     * Gets the texture coordinates data stored in this target
     * @returns a FloatArray containing the texture coordinates data (or null if not present)
     */
    public getUVs(): Nullable<FloatArray> {
        return this._uvs;
    }

    /**
     * Clone the current target
     * @returns a new MorphTarget
     */
    public clone(): MorphTarget {
        const newOne = SerializationHelper.Clone(() => new MorphTarget(this.name, this.influence, this._scene), this);

        newOne._positions = this._positions;
        newOne._normals = this._normals;
        newOne._tangents = this._tangents;
        newOne._uvs = this._uvs;

        return newOne;
    }

    /**
     * Serializes the current target into a Serialization object
     * @returns the serialized object
     */
    public serialize(): any {
        const serializationObject: any = {};

        serializationObject.name = this.name;
        serializationObject.influence = this.influence;

        serializationObject.positions = Array.prototype.slice.call(this.getPositions());
        if (this.id != null) {
            serializationObject.id = this.id;
        }
        if (this.hasNormals) {
            serializationObject.normals = Array.prototype.slice.call(this.getNormals());
        }
        if (this.hasTangents) {
            serializationObject.tangents = Array.prototype.slice.call(this.getTangents());
        }
        if (this.hasUVs) {
            serializationObject.uvs = Array.prototype.slice.call(this.getUVs());
        }

        // Animations
        SerializationHelper.AppendSerializedAnimations(this, serializationObject);

        return serializationObject;
    }

    /**
     * Returns the string "MorphTarget"
     * @returns "MorphTarget"
     */
    public getClassName(): string {
        return "MorphTarget";
    }

    // Statics

    /**
     * Creates a new target from serialized data
     * @param serializationObject defines the serialized data to use
     * @param scene defines the hosting scene
     * @returns a new MorphTarget
     */
    public static Parse(serializationObject: any, scene?: Scene): MorphTarget {
        const result = new MorphTarget(serializationObject.name, serializationObject.influence);

        result.setPositions(serializationObject.positions);

        if (serializationObject.id != null) {
            result.id = serializationObject.id;
        }
        if (serializationObject.normals) {
            result.setNormals(serializationObject.normals);
        }
        if (serializationObject.tangents) {
            result.setTangents(serializationObject.tangents);
        }
        if (serializationObject.uvs) {
            result.setUVs(serializationObject.uvs);
        }

        // Animations
        if (serializationObject.animations) {
            for (let animationIndex = 0; animationIndex < serializationObject.animations.length; animationIndex++) {
                const parsedAnimation = serializationObject.animations[animationIndex];
                const internalClass = GetClass("BABYLON.Animation");
                if (internalClass) {
                    result.animations.push(internalClass.Parse(parsedAnimation));
                }
            }

            if (serializationObject.autoAnimate && scene) {
                scene.beginAnimation(
                    result,
                    serializationObject.autoAnimateFrom,
                    serializationObject.autoAnimateTo,
                    serializationObject.autoAnimateLoop,
                    serializationObject.autoAnimateSpeed || 1.0
                );
            }
        }

        return result;
    }

    /**
     * Creates a MorphTarget from mesh data
     * @param mesh defines the source mesh
     * @param name defines the name to use for the new target
     * @param influence defines the influence to attach to the target
     * @returns a new MorphTarget
     */
    public static FromMesh(mesh: AbstractMesh, name?: string, influence?: number): MorphTarget {
        if (!name) {
            name = mesh.name;
        }

        const result = new MorphTarget(name, influence, mesh.getScene());

        result.setPositions(<FloatArray>mesh.getVerticesData(VertexBuffer.PositionKind));

        if (mesh.isVerticesDataPresent(VertexBuffer.NormalKind)) {
            result.setNormals(<FloatArray>mesh.getVerticesData(VertexBuffer.NormalKind));
        }
        if (mesh.isVerticesDataPresent(VertexBuffer.TangentKind)) {
            result.setTangents(<FloatArray>mesh.getVerticesData(VertexBuffer.TangentKind));
        }
        if (mesh.isVerticesDataPresent(VertexBuffer.UVKind)) {
            result.setUVs(<FloatArray>mesh.getVerticesData(VertexBuffer.UVKind));
        }

        return result;
    }
}
