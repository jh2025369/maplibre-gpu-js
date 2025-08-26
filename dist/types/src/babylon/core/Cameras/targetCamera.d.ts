import type { Nullable } from "../types";
import { Camera } from "./camera";
import type { Scene } from "../scene";
import { Quaternion, Matrix, Vector3, Vector2 } from "../Maths/math.vector";
/**
 * A target camera takes a mesh or position as a target and continues to look at it while it moves.
 * This is the base of the follow, arc rotate cameras and Free camera
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras
 */
export declare class TargetCamera extends Camera {
    private static _RigCamTransformMatrix;
    private static _TargetTransformMatrix;
    private static _TargetFocalPoint;
    /**
     * Define the current direction the camera is moving to
     */
    cameraDirection: Vector3;
    /**
     * Define the current rotation the camera is rotating to
     */
    cameraRotation: Vector2;
    /**
     * When set, the up vector of the camera will be updated by the rotation of the camera
     */
    updateUpVectorFromRotation: boolean;
    /**
     * Define the current rotation of the camera
     */
    rotation: Vector3;
    /**
     * Define the current rotation of the camera as a quaternion to prevent Gimbal lock
     */
    rotationQuaternion: Quaternion;
    /**
     * Define the current speed of the camera
     */
    speed: number;
    /**
     * Add constraint to the camera to prevent it to move freely in all directions and
     * around all axis.
     */
    noRotationConstraint: boolean;
    /**
     * Reverses mouselook direction to 'natural' panning as opposed to traditional direct
     * panning
     */
    invertRotation: boolean;
    /**
     * Speed multiplier for inverse camera panning
     */
    inverseRotationSpeed: number;
    /**
     * Define the current target of the camera as an object or a position.
     * Please note that locking a target will disable panning.
     */
    lockedTarget: any;
    protected readonly _currentTarget: Vector3;
    protected _initialFocalDistance: number;
    protected readonly _viewMatrix: Matrix;
    /** @internal */
    readonly _cameraTransformMatrix: Matrix;
    /** @internal */
    readonly _cameraRotationMatrix: Matrix;
    protected readonly _referencePoint: Vector3;
    protected readonly _transformedReferencePoint: Vector3;
    protected readonly _deferredPositionUpdate: Vector3;
    protected readonly _deferredRotationQuaternionUpdate: Quaternion;
    protected readonly _deferredRotationUpdate: Vector3;
    protected _deferredUpdated: boolean;
    protected _deferOnly: boolean;
    /** @internal */
    _reset: () => void;
    /**
     * Instantiates a target camera that takes a mesh or position as a target and continues to look at it while it moves.
     * This is the base of the follow, arc rotate cameras and Free camera
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras
     * @param name Defines the name of the camera in the scene
     * @param position Defines the start position of the camera in the scene
     * @param scene Defines the scene the camera belongs to
     * @param setActiveOnSceneIfNoneActive Defines whether the camera should be marked as active if not other active cameras have been defined
     */
    constructor(name: string, position: Vector3, scene?: Scene, setActiveOnSceneIfNoneActive?: boolean);
    /**
     * Gets the position in front of the camera at a given distance.
     * @param distance The distance from the camera we want the position to be
     * @returns the position
     */
    getFrontPosition(distance: number): Vector3;
    /** @internal */
    _getLockedTargetPosition(): Nullable<Vector3>;
    private _storedPosition;
    private _storedRotation;
    private _storedRotationQuaternion;
    /**
     * Store current camera state of the camera (fov, position, rotation, etc..)
     * @returns the camera
     */
    storeState(): Camera;
    /**
     * Restored camera state. You must call storeState() first
     * @returns whether it was successful or not
     * @internal
     */
    _restoreStateValues(): boolean;
    /** @internal */
    _initCache(): void;
    /**
     * @internal
     */
    _updateCache(ignoreParentClass?: boolean): void;
    /** @internal */
    _isSynchronizedViewMatrix(): boolean;
    /** @internal */
    _computeLocalCameraSpeed(): number;
    /**
     * Defines the target the camera should look at.
     * @param target Defines the new target as a Vector
     */
    setTarget(target: Vector3): void;
    /**
     * Defines the target point of the camera.
     * The camera looks towards it form the radius distance.
     */
    get target(): Vector3;
    set target(value: Vector3);
    /**
     * Return the current target position of the camera. This value is expressed in local space.
     * @returns the target position
     */
    getTarget(): Vector3;
    /** @internal */
    _decideIfNeedsToMove(): boolean;
    /** @internal */
    _updatePosition(): void;
    /** @internal */
    _checkInputs(): void;
    protected _updateCameraRotationMatrix(): void;
    /**
     * Update the up vector to apply the rotation of the camera (So if you changed the camera rotation.z this will let you update the up vector as well)
     * @returns the current camera
     */
    private _rotateUpVectorWithCameraRotationMatrix;
    private _cachedRotationZ;
    private _cachedQuaternionRotationZ;
    /** @internal */
    _getViewMatrix(): Matrix;
    protected _computeViewMatrix(position: Vector3, target: Vector3, up: Vector3): void;
    /**
     * @internal
     */
    createRigCamera(name: string, cameraIndex: number): Nullable<Camera>;
    /**
     * @internal
     */
    _updateRigCameras(): void;
    private _getRigCamPositionAndTarget;
    /**
     * Gets the current object class name.
     * @returns the class name
     */
    getClassName(): string;
}
