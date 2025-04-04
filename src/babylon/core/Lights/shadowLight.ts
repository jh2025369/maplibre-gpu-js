import { serialize, serializeAsVector3 } from "../Misc/decorators";
import type { Camera } from "../Cameras/camera";
import type { Scene } from "../scene";
import { Matrix, TmpVectors, Vector3 } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import { Light } from "./light";
import { Axis } from "../Maths/math.axis";
import type { Nullable } from "core/types";
/**
 * Interface describing all the common properties and methods a shadow light needs to implement.
 * This helps both the shadow generator and materials to generate the corresponding shadow maps
 * as well as binding the different shadow properties to the effects.
 */
export interface IShadowLight extends Light {
    /**
     * The light id in the scene (used in scene.getLightById for instance)
     */
    id: string;
    /**
     * The position the shadow will be casted from.
     */
    position: Vector3;
    /**
     * In 2d mode (needCube being false), the direction used to cast the shadow.
     */
    direction: Vector3;
    /**
     * The transformed position. Position of the light in world space taking parenting in account.
     */
    transformedPosition: Vector3;
    /**
     * The transformed direction. Direction of the light in world space taking parenting in account.
     */
    transformedDirection: Vector3;
    /**
     * The friendly name of the light in the scene.
     */
    name: string;
    /**
     * Defines the shadow projection clipping minimum z value.
     */
    shadowMinZ: number;
    /**
     * Defines the shadow projection clipping maximum z value.
     */
    shadowMaxZ: number;

    /**
     * Computes the transformed information (transformedPosition and transformedDirection in World space) of the current light
     * @returns true if the information has been computed, false if it does not need to (no parenting)
     */
    computeTransformedInformation(): boolean;

    /**
     * Gets the scene the light belongs to.
     * @returns The scene
     */
    getScene(): Scene;

    /**
     * Callback defining a custom Projection Matrix Builder.
     * This can be used to override the default projection matrix computation.
     */
    customProjectionMatrixBuilder: (viewMatrix: Matrix, renderList: Array<AbstractMesh>, result: Matrix) => void;

    /**
     * Sets the shadow projection matrix in parameter to the generated projection matrix.
     * @param matrix The matrix to update with the projection information
     * @param viewMatrix The transform matrix of the light
     * @param renderList The list of mesh to render in the map
     * @returns The current light
     */
    setShadowProjectionMatrix(matrix: Matrix, viewMatrix: Matrix, renderList: Array<AbstractMesh>): IShadowLight;

    /**
     * Gets the current depth scale used in ESM.
     * @returns The scale
     */
    getDepthScale(): number;

    /**
     * Returns whether or not the shadow generation require a cube texture or a 2d texture.
     * @returns true if a cube texture needs to be use
     */
    needCube(): boolean;

    /**
     * Detects if the projection matrix requires to be recomputed this frame.
     * @returns true if it requires to be recomputed otherwise, false.
     */
    needProjectionMatrixCompute(): boolean;

    /**
     * Forces the shadow generator to recompute the projection matrix even if position and direction did not changed.
     */
    forceProjectionMatrixCompute(): void;

    /**
     * Get the direction to use to render the shadow map. In case of cube texture, the face index can be passed.
     * @param faceIndex The index of the face we are computed the direction to generate shadow
     * @returns The set direction in 2d mode otherwise the direction to the cubemap face if needCube() is true
     */
    getShadowDirection(faceIndex?: number): Vector3;

    /**
     * Gets the minZ used for shadow according to both the scene and the light.
     * @param activeCamera The camera we are returning the min for
     * @returns the depth min z
     */
    getDepthMinZ(activeCamera: Camera): number;

    /**
     * Gets the maxZ used for shadow according to both the scene and the light.
     * @param activeCamera The camera we are returning the max for
     * @returns the depth max z
     */
    getDepthMaxZ(activeCamera: Camera): number;
}

/**
 * Base implementation IShadowLight
 * It groups all the common behaviour in order to reduce duplication and better follow the DRY pattern.
 */
export abstract class ShadowLight extends Light implements IShadowLight {
    protected abstract _setDefaultShadowProjectionMatrix(matrix: Matrix, viewMatrix: Matrix, renderList: Array<AbstractMesh>): void;

    protected _position: Vector3;
    protected _setPosition(value: Vector3) {
        this._position = value;
    }
    /**
     * Sets the position the shadow will be casted from. Also use as the light position for both
     * point and spot lights.
     */
    @serializeAsVector3()
    public get position(): Vector3 {
        return this._position;
    }
    /**
     * Sets the position the shadow will be casted from. Also use as the light position for both
     * point and spot lights.
     */
    public set position(value: Vector3) {
        this._setPosition(value);
    }

    protected _direction: Vector3;
    protected _setDirection(value: Vector3) {
        this._direction = value;
    }
    /**
     * In 2d mode (needCube being false), gets the direction used to cast the shadow.
     * Also use as the light direction on spot and directional lights.
     */
    @serializeAsVector3()
    public get direction(): Vector3 {
        return this._direction;
    }
    /**
     * In 2d mode (needCube being false), sets the direction used to cast the shadow.
     * Also use as the light direction on spot and directional lights.
     */
    public set direction(value: Vector3) {
        this._setDirection(value);
    }

    protected _shadowMinZ: number;
    /**
     * Gets the shadow projection clipping minimum z value.
     */
    @serialize()
    public get shadowMinZ(): number {
        return this._shadowMinZ;
    }
    /**
     * Sets the shadow projection clipping minimum z value.
     */
    public set shadowMinZ(value: number) {
        this._shadowMinZ = value;
        this.forceProjectionMatrixCompute();
    }

    protected _shadowMaxZ: number;
    /**
     * Sets the shadow projection clipping maximum z value.
     */
    @serialize()
    public get shadowMaxZ(): number {
        return this._shadowMaxZ;
    }
    /**
     * Gets the shadow projection clipping maximum z value.
     */
    public set shadowMaxZ(value: number) {
        this._shadowMaxZ = value;
        this.forceProjectionMatrixCompute();
    }

    /**
     * Callback defining a custom Projection Matrix Builder.
     * This can be used to override the default projection matrix computation.
     */
    public customProjectionMatrixBuilder: (viewMatrix: Matrix, renderList: Array<AbstractMesh>, result: Matrix) => void;

    /**
     * The transformed position. Position of the light in world space taking parenting in account. Needs to be computed by calling computeTransformedInformation.
     */
    public transformedPosition: Vector3;

    /**
     * The transformed direction. Direction of the light in world space taking parenting in account.
     */
    public transformedDirection: Vector3;

    private _needProjectionMatrixCompute: boolean = true;

    /**
     * Computes the transformed information (transformedPosition and transformedDirection in World space) of the current light
     * @returns true if the information has been computed, false if it does not need to (no parenting)
     */
    public computeTransformedInformation(): boolean {
        if (this.parent && this.parent.getWorldMatrix) {
            if (!this.transformedPosition) {
                this.transformedPosition = Vector3.Zero();
            }
            Vector3.TransformCoordinatesToRef(this.position, this.parent.getWorldMatrix(), this.transformedPosition);

            // In case the direction is present.
            if (this.direction) {
                if (!this.transformedDirection) {
                    this.transformedDirection = Vector3.Zero();
                }
                Vector3.TransformNormalToRef(this.direction, this.parent.getWorldMatrix(), this.transformedDirection);
            }
            return true;
        }
        return false;
    }

    /**
     * Return the depth scale used for the shadow map.
     * @returns the depth scale.
     */
    public getDepthScale(): number {
        return 50.0;
    }

    /**
     * Get the direction to use to render the shadow map. In case of cube texture, the face index can be passed.
     * @param faceIndex The index of the face we are computed the direction to generate shadow
     * @returns The set direction in 2d mode otherwise the direction to the cubemap face if needCube() is true
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getShadowDirection(faceIndex?: number): Vector3 {
        return this.transformedDirection ? this.transformedDirection : this.direction;
    }

    /**
     * If computeTransformedInformation has been called, returns the ShadowLight absolute position in the world. Otherwise, returns the local position.
     * @returns the position vector in world space
     */
    public override getAbsolutePosition(): Vector3 {
        return this.transformedPosition ? this.transformedPosition : this.position;
    }

    /**
     * Sets the ShadowLight direction toward the passed target.
     * @param target The point to target in local space
     * @returns the updated ShadowLight direction
     */
    public setDirectionToTarget(target: Vector3): Vector3 {
        this.direction = Vector3.Normalize(target.subtract(this.position));
        return this.direction;
    }

    /**
     * Returns the light rotation in euler definition.
     * @returns the x y z rotation in local space.
     */
    public getRotation(): Vector3 {
        this.direction.normalize();
        const xaxis = Vector3.Cross(this.direction, Axis.Y);
        const yaxis = Vector3.Cross(xaxis, this.direction);
        return Vector3.RotationFromAxis(xaxis, yaxis, this.direction);
    }

    /**
     * Returns whether or not the shadow generation require a cube texture or a 2d texture.
     * @returns true if a cube texture needs to be use
     */
    public needCube(): boolean {
        return false;
    }

    /**
     * Detects if the projection matrix requires to be recomputed this frame.
     * @returns true if it requires to be recomputed otherwise, false.
     */
    public needProjectionMatrixCompute(): boolean {
        return this._needProjectionMatrixCompute;
    }

    /**
     * Forces the shadow generator to recompute the projection matrix even if position and direction did not changed.
     */
    public forceProjectionMatrixCompute(): void {
        this._needProjectionMatrixCompute = true;
    }

    /** @internal */
    public override _initCache() {
        super._initCache();

        this._cache.position = Vector3.Zero();
    }

    /** @internal */
    public override _isSynchronized(): boolean {
        if (!this._cache.position.equals(this.position)) {
            return false;
        }

        return true;
    }

    /**
     * Computes the world matrix of the node
     * @param force defines if the cache version should be invalidated forcing the world matrix to be created from scratch
     * @returns the world matrix
     */
    public override computeWorldMatrix(force?: boolean): Matrix {
        if (!force && this.isSynchronized()) {
            this._currentRenderId = this.getScene().getRenderId();
            return this._worldMatrix;
        }

        this._updateCache();
        this._cache.position.copyFrom(this.position);

        if (!this._worldMatrix) {
            this._worldMatrix = Matrix.Identity();
        }

        Matrix.TranslationToRef(this.position.x, this.position.y, this.position.z, this._worldMatrix);

        if (this.parent && this.parent.getWorldMatrix) {
            this._worldMatrix.multiplyToRef(this.parent.getWorldMatrix(), this._worldMatrix);

            this._markSyncedWithParent();
        }

        // Cache the determinant
        this._worldMatrixDeterminantIsDirty = true;

        return this._worldMatrix;
    }

    /**
     * Gets the minZ used for shadow according to both the scene and the light.
     * @param activeCamera The camera we are returning the min for
     * @returns the depth min z
     */
    public getDepthMinZ(activeCamera: Camera): number {
        return this.shadowMinZ !== undefined ? this.shadowMinZ : activeCamera.minZ;
    }

    /**
     * Gets the maxZ used for shadow according to both the scene and the light.
     * @param activeCamera The camera we are returning the max for
     * @returns the depth max z
     */
    public getDepthMaxZ(activeCamera: Camera): number {
        return this.shadowMaxZ !== undefined ? this.shadowMaxZ : activeCamera.maxZ;
    }

    /**
     * Sets the shadow projection matrix in parameter to the generated projection matrix.
     * @param matrix The matrix to updated with the projection information
     * @param viewMatrix The transform matrix of the light
     * @param renderList The list of mesh to render in the map
     * @returns The current light
     */
    public setShadowProjectionMatrix(matrix: Matrix, viewMatrix: Matrix, renderList: Array<AbstractMesh>): IShadowLight {
        if (this.customProjectionMatrixBuilder) {
            this.customProjectionMatrixBuilder(viewMatrix, renderList, matrix);
        } else {
            this._setDefaultShadowProjectionMatrix(matrix, viewMatrix, renderList);
        }
        return this;
    }

    /** @internal */
    protected override _syncParentEnabledState() {
        super._syncParentEnabledState();
        if (!this.parent || !this.parent.getWorldMatrix) {
            (this.transformedPosition as any) = null;
            (this.transformedDirection as any) = null;
        }
    }

    protected _viewMatrix: Matrix = Matrix.Identity();
    protected _projectionMatrix: Matrix = Matrix.Identity();

    /**
     * Returns the view matrix.
     * @param faceIndex The index of the face for which we want to extract the view matrix. Only used for point light types.
     * @returns The view matrix. Can be null, if a view matrix cannot be defined for the type of light considered (as for a hemispherical light, for example).
     */
    public override getViewMatrix(faceIndex?: number): Nullable<Matrix> {
        const lightDirection = TmpVectors.Vector3[0];

        let lightPosition = this.position;
        if (this.computeTransformedInformation()) {
            lightPosition = this.transformedPosition;
        }

        Vector3.NormalizeToRef(this.getShadowDirection(faceIndex), lightDirection);
        if (Math.abs(Vector3.Dot(lightDirection, Vector3.Up())) === 1.0) {
            lightDirection.z = 0.0000000000001; // Required to avoid perfectly perpendicular light
        }

        const lightTarget = TmpVectors.Vector3[1];
        lightPosition.addToRef(lightDirection, lightTarget);

        Matrix.LookAtLHToRef(lightPosition, lightTarget, Vector3.Up(), this._viewMatrix);

        return this._viewMatrix;
    }

    /**
     * Returns the projection matrix.
     * Note that viewMatrix and renderList are optional and are only used by lights that calculate the projection matrix from a list of meshes (e.g. directional lights with automatic extents calculation).
     * @param viewMatrix The view transform matrix of the light (optional).
     * @param renderList The list of meshes to take into account when calculating the projection matrix (optional).
     * @returns The projection matrix. Can be null, if a projection matrix cannot be defined for the type of light considered (as for a hemispherical light, for example).
     */
    public override getProjectionMatrix(viewMatrix?: Matrix, renderList?: Array<AbstractMesh>): Nullable<Matrix> {
        this.setShadowProjectionMatrix(this._projectionMatrix, viewMatrix ?? this._viewMatrix, renderList ?? []);

        return this._projectionMatrix;
    }
}
