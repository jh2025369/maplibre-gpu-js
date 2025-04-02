import type { Scene } from "../scene";
import { Vector3 } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import { LensFlare } from "./lensFlare";
import type { Viewport } from "../Maths/math.viewport";
import { ShaderLanguage } from "core/Materials/shaderLanguage";
import { Observable } from "core/Misc/observable";
/**
 * This represents a Lens Flare System or the shiny effect created by the light reflection on the  camera lenses.
 * It is usually composed of several `lensFlare`.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/environment/lenseFlare
 */
export declare class LensFlareSystem {
    /**
     * Define the name of the lens flare system
     */
    name: string;
    /**
     * Force all the lens flare systems to compile to glsl even on WebGPU engines.
     * False by default. This is mostly meant for backward compatibility.
     */
    static ForceGLSL: boolean;
    /**
     * List of lens flares used in this system.
     */
    lensFlares: LensFlare[];
    /**
     * Define a limit from the border the lens flare can be visible.
     */
    borderLimit: number;
    /**
     * Define a viewport border we do not want to see the lens flare in.
     */
    viewportBorder: number;
    /**
     * Define a predicate which could limit the list of meshes able to occlude the effect.
     */
    meshesSelectionPredicate: (mesh: AbstractMesh) => boolean;
    /**
     * Restricts the rendering of the effect to only the camera rendering this layer mask.
     */
    layerMask: number;
    /** Gets the scene */
    get scene(): Scene;
    /** Shader language used by the system */
    protected _shaderLanguage: ShaderLanguage;
    /**
     * Gets the shader language used in this system.
     */
    get shaderLanguage(): ShaderLanguage;
    /**
     * Define the id of the lens flare system in the scene.
     * (equal to name by default)
     */
    id: string;
    private _scene;
    private _emitter;
    private _vertexBuffers;
    private _indexBuffer;
    private _positionX;
    private _positionY;
    private _isEnabled;
    /**
     * @internal
     */
    static _SceneComponentInitialization: (scene: Scene) => void;
    /**
     * Instantiates a lens flare system.
     * This represents a Lens Flare System or the shiny effect created by the light reflection on the  camera lenses.
     * It is usually composed of several `lensFlare`.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/environment/lenseFlare
     * @param name Define the name of the lens flare system in the scene
     * @param emitter Define the source (the emitter) of the lens flares (it can be a camera, a light or a mesh).
     * @param scene Define the scene the lens flare system belongs to
     */
    constructor(
    /**
     * Define the name of the lens flare system
     */
    name: string, emitter: any, scene: Scene);
    /** @internal */
    _onShadersLoaded: Observable<void>;
    private _shadersLoaded;
    protected _initShaderSourceAsync(): Promise<void>;
    private _createIndexBuffer;
    /**
     * Define if the lens flare system is enabled.
     */
    get isEnabled(): boolean;
    set isEnabled(value: boolean);
    /**
     * Get the scene the effects belongs to.
     * @returns the scene holding the lens flare system
     */
    getScene(): Scene;
    /**
     * Get the emitter of the lens flare system.
     * It defines the source of the lens flares (it can be a camera, a light or a mesh).
     * @returns the emitter of the lens flare system
     */
    getEmitter(): any;
    /**
     * Set the emitter of the lens flare system.
     * It defines the source of the lens flares (it can be a camera, a light or a mesh).
     * @param newEmitter Define the new emitter of the system
     */
    setEmitter(newEmitter: any): void;
    /**
     * Get the lens flare system emitter position.
     * The emitter defines the source of the lens flares (it can be a camera, a light or a mesh).
     * @returns the position
     */
    getEmitterPosition(): Vector3;
    /**
     * @internal
     */
    computeEffectivePosition(globalViewport: Viewport): boolean;
    /** @internal */
    _isVisible(): boolean;
    /**
     * @internal
     */
    render(): boolean;
    /**
     * Rebuilds the lens flare system
     */
    rebuild(): void;
    /**
     * Dispose and release the lens flare with its associated resources.
     */
    dispose(): void;
    /**
     * Parse a lens flare system from a JSON representation
     * @param parsedLensFlareSystem Define the JSON to parse
     * @param scene Define the scene the parsed system should be instantiated in
     * @param rootUrl Define the rootUrl of the load sequence to easily find a load relative dependencies such as textures
     * @returns the parsed system
     */
    static Parse(parsedLensFlareSystem: any, scene: Scene, rootUrl: string): LensFlareSystem;
    /**
     * Serialize the current Lens Flare System into a JSON representation.
     * @returns the serialized JSON
     */
    serialize(): any;
}
