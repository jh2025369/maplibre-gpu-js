import { Matrix, Vector3 } from "core/Maths/math.vector";
import { IntersectionInfo } from "../Collisions/intersectionInfo";
import type { BoundingBox } from "./boundingBox";
import type { BoundingSphere } from "./boundingSphere";
import type { DeepImmutable, float, Nullable } from "core/types";
import type { Plane } from "core/Maths/math.plane";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import { PickingInfo } from "core/Collisions/pickingInfo";
import type { Scene } from "core/scene";
import type { Camera } from "core/Cameras/camera";
/**
 * Type used to define predicate for selecting meshes and instances (if exist)
 */
export type MeshPredicate = (mesh: AbstractMesh, thinInstanceIndex: number) => boolean;
/**
 * Type used to define predicate used to select faces when a mesh intersection is detected
 */
export type TrianglePickingPredicate = (p0: Vector3, p1: Vector3, p2: Vector3, ray: Ray, i0: number, i1: number, i2: number) => boolean;
/**
 * This class allows user to customize internal picking mechanism
 */
export interface IPickingCustomization {
    /**
     * Predicate to select faces when a mesh intersection is detected
     */
    internalPickerForMesh?: (pickingInfo: Nullable<PickingInfo>, rayFunction: (world: Matrix, enableDistantPicking: boolean) => Ray, mesh: AbstractMesh, world: Matrix, fastCheck?: boolean, onlyBoundingInfo?: boolean, trianglePredicate?: TrianglePickingPredicate, skipBoundingInfo?: boolean) => PickingInfo;
}
/**
 * Use this object to customize mesh picking behavior
 */
export declare const PickingCustomization: IPickingCustomization;
/**
 * Class representing a ray with position and direction
 */
export declare class Ray {
    /** origin point */
    origin: Vector3;
    /** direction */
    direction: Vector3;
    /** [Number.MAX_VALUE] length of the ray */
    length: number;
    /** [Epsilon] The epsilon value to use when calculating the ray/triangle intersection (default: Epsilon from math constants) */
    epsilon: number;
    private static readonly _TmpVector3;
    private static _RayDistant;
    private _tmpRay;
    /**
     * Creates a new ray
     * @param origin origin point
     * @param direction direction
     * @param length length of the ray
     * @param epsilon The epsilon value to use when calculating the ray/triangle intersection (default: 0)
     */
    constructor(
    /** origin point */
    origin: Vector3, 
    /** direction */
    direction: Vector3, 
    /** [Number.MAX_VALUE] length of the ray */
    length?: number, 
    /** [Epsilon] The epsilon value to use when calculating the ray/triangle intersection (default: Epsilon from math constants) */
    epsilon?: number);
    /**
     * Clone the current ray
     * @returns a new ray
     */
    clone(): Ray;
    /**
     * Checks if the ray intersects a box
     * This does not account for the ray length by design to improve perfs.
     * @param minimum bound of the box
     * @param maximum bound of the box
     * @param intersectionTreshold extra extend to be added to the box in all direction
     * @returns if the box was hit
     */
    intersectsBoxMinMax(minimum: DeepImmutable<Vector3>, maximum: DeepImmutable<Vector3>, intersectionTreshold?: number): boolean;
    /**
     * Checks if the ray intersects a box
     * This does not account for the ray lenght by design to improve perfs.
     * @param box the bounding box to check
     * @param intersectionTreshold extra extend to be added to the BoundingBox in all direction
     * @returns if the box was hit
     */
    intersectsBox(box: DeepImmutable<BoundingBox>, intersectionTreshold?: number): boolean;
    /**
     * If the ray hits a sphere
     * @param sphere the bounding sphere to check
     * @param intersectionTreshold extra extend to be added to the BoundingSphere in all direction
     * @returns true if it hits the sphere
     */
    intersectsSphere(sphere: DeepImmutable<BoundingSphere>, intersectionTreshold?: number): boolean;
    /**
     * If the ray hits a triange
     * @param vertex0 triangle vertex
     * @param vertex1 triangle vertex
     * @param vertex2 triangle vertex
     * @returns intersection information if hit
     */
    intersectsTriangle(vertex0: DeepImmutable<Vector3>, vertex1: DeepImmutable<Vector3>, vertex2: DeepImmutable<Vector3>): Nullable<IntersectionInfo>;
    /**
     * Checks if ray intersects a plane
     * @param plane the plane to check
     * @returns the distance away it was hit
     */
    intersectsPlane(plane: DeepImmutable<Plane>): Nullable<number>;
    /**
     * Calculate the intercept of a ray on a given axis
     * @param axis to check 'x' | 'y' | 'z'
     * @param offset from axis interception (i.e. an offset of 1y is intercepted above ground)
     * @returns a vector containing the coordinates where 'axis' is equal to zero (else offset), or null if there is no intercept.
     */
    intersectsAxis(axis: string, offset?: number): Nullable<Vector3>;
    /**
     * Checks if ray intersects a mesh. The ray is defined in WORLD space. A mesh triangle can be picked both from its front and back sides,
     * irrespective of orientation.
     * @param mesh the mesh to check
     * @param fastCheck defines if the first intersection will be used (and not the closest)
     * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
     * @param onlyBoundingInfo defines a boolean indicating if picking should only happen using bounding info (false by default)
     * @param worldToUse defines the world matrix to use to get the world coordinate of the intersection point
     * @param skipBoundingInfo a boolean indicating if we should skip the bounding info check
     * @returns picking info of the intersection
     */
    intersectsMesh(mesh: DeepImmutable<AbstractMesh>, fastCheck?: boolean, trianglePredicate?: TrianglePickingPredicate, onlyBoundingInfo?: boolean, worldToUse?: Matrix, skipBoundingInfo?: boolean): PickingInfo;
    /**
     * Checks if ray intersects a mesh
     * @param meshes the meshes to check
     * @param fastCheck defines if the first intersection will be used (and not the closest)
     * @param results array to store result in
     * @returns Array of picking infos
     */
    intersectsMeshes(meshes: Array<DeepImmutable<AbstractMesh>>, fastCheck?: boolean, results?: Array<PickingInfo>): Array<PickingInfo>;
    private _comparePickingInfo;
    private static _Smallnum;
    private static _Rayl;
    /**
     * Intersection test between the ray and a given segment within a given tolerance (threshold)
     * @param sega the first point of the segment to test the intersection against
     * @param segb the second point of the segment to test the intersection against
     * @param threshold the tolerance margin, if the ray doesn't intersect the segment but is close to the given threshold, the intersection is successful
     * @returns the distance from the ray origin to the intersection point if there's intersection, or -1 if there's no intersection
     */
    intersectionSegment(sega: DeepImmutable<Vector3>, segb: DeepImmutable<Vector3>, threshold: number): number;
    /**
     * Update the ray from viewport position
     * @param x position
     * @param y y position
     * @param viewportWidth viewport width
     * @param viewportHeight viewport height
     * @param world world matrix
     * @param view view matrix
     * @param projection projection matrix
     * @param enableDistantPicking defines if picking should handle large values for mesh position/scaling (false by default)
     * @returns this ray updated
     */
    update(x: number, y: number, viewportWidth: number, viewportHeight: number, world: DeepImmutable<Matrix>, view: DeepImmutable<Matrix>, projection: DeepImmutable<Matrix>, enableDistantPicking?: boolean): Ray;
    /**
     * Creates a ray with origin and direction of 0,0,0
     * @returns the new ray
     */
    static Zero(): Ray;
    /**
     * Creates a new ray from screen space and viewport
     * @param x position
     * @param y y position
     * @param viewportWidth viewport width
     * @param viewportHeight viewport height
     * @param world world matrix
     * @param view view matrix
     * @param projection projection matrix
     * @returns new ray
     */
    static CreateNew(x: number, y: number, viewportWidth: number, viewportHeight: number, world: DeepImmutable<Matrix>, view: DeepImmutable<Matrix>, projection: DeepImmutable<Matrix>): Ray;
    /**
     * Function will create a new transformed ray starting from origin and ending at the end point. Ray's length will be set, and ray will be
     * transformed to the given world matrix.
     * @param origin The origin point
     * @param end The end point
     * @param world a matrix to transform the ray to. Default is the identity matrix.
     * @returns the new ray
     */
    static CreateNewFromTo(origin: Vector3, end: Vector3, world?: DeepImmutable<Matrix>): Ray;
    /**
     * Function will update a transformed ray starting from origin and ending at the end point. Ray's length will be set, and ray will be
     * transformed to the given world matrix.
     * @param origin The origin point
     * @param end The end point
     * @param result the object to store the result
     * @param world a matrix to transform the ray to. Default is the identity matrix.
     * @returns the ref ray
     */
    static CreateFromToToRef(origin: Vector3, end: Vector3, result: Ray, world?: DeepImmutable<Matrix>): Ray;
    /**
     * Transforms a ray by a matrix
     * @param ray ray to transform
     * @param matrix matrix to apply
     * @returns the resulting new ray
     */
    static Transform(ray: DeepImmutable<Ray>, matrix: DeepImmutable<Matrix>): Ray;
    /**
     * Transforms a ray by a matrix
     * @param ray ray to transform
     * @param matrix matrix to apply
     * @param result ray to store result in
     * @returns the updated result ray
     */
    static TransformToRef(ray: DeepImmutable<Ray>, matrix: DeepImmutable<Matrix>, result: Ray): Ray;
    /**
     * Unproject a ray from screen space to object space
     * @param sourceX defines the screen space x coordinate to use
     * @param sourceY defines the screen space y coordinate to use
     * @param viewportWidth defines the current width of the viewport
     * @param viewportHeight defines the current height of the viewport
     * @param world defines the world matrix to use (can be set to Identity to go to world space)
     * @param view defines the view matrix to use
     * @param projection defines the projection matrix to use
     */
    unprojectRayToRef(sourceX: float, sourceY: float, viewportWidth: number, viewportHeight: number, world: DeepImmutable<Matrix>, view: DeepImmutable<Matrix>, projection: DeepImmutable<Matrix>): void;
}
/**
 * Creates a ray that can be used to pick in the scene
 * @param scene defines the scene to use for the picking
 * @param x defines the x coordinate of the origin (on-screen)
 * @param y defines the y coordinate of the origin (on-screen)
 * @param world defines the world matrix to use if you want to pick in object space (instead of world space)
 * @param camera defines the camera to use for the picking
 * @param cameraViewSpace defines if picking will be done in view space (false by default)
 * @returns a Ray
 */
export declare function CreatePickingRay(scene: Scene, x: number, y: number, world: Nullable<Matrix>, camera: Nullable<Camera>, cameraViewSpace?: boolean): Ray;
/**
 * Creates a ray that can be used to pick in the scene
 * @param scene defines the scene to use for the picking
 * @param x defines the x coordinate of the origin (on-screen)
 * @param y defines the y coordinate of the origin (on-screen)
 * @param world defines the world matrix to use if you want to pick in object space (instead of world space)
 * @param result defines the ray where to store the picking ray
 * @param camera defines the camera to use for the picking
 * @param cameraViewSpace defines if picking will be done in view space (false by default)
 * @param enableDistantPicking defines if picking should handle large values for mesh position/scaling (false by default)
 * @returns the current scene
 */
export declare function CreatePickingRayToRef(scene: Scene, x: number, y: number, world: Nullable<Matrix>, result: Ray, camera: Nullable<Camera>, cameraViewSpace?: boolean, enableDistantPicking?: boolean): Scene;
/**
 * Creates a ray that can be used to pick in the scene
 * @param scene defines the scene to use for the picking
 * @param x defines the x coordinate of the origin (on-screen)
 * @param y defines the y coordinate of the origin (on-screen)
 * @param camera defines the camera to use for the picking
 * @returns a Ray
 */
export declare function CreatePickingRayInCameraSpace(scene: Scene, x: number, y: number, camera?: Camera): Ray;
/**
 * Creates a ray that can be used to pick in the scene
 * @param scene defines the scene to use for the picking
 * @param x defines the x coordinate of the origin (on-screen)
 * @param y defines the y coordinate of the origin (on-screen)
 * @param result defines the ray where to store the picking ray
 * @param camera defines the camera to use for the picking
 * @returns the current scene
 */
export declare function CreatePickingRayInCameraSpaceToRef(scene: Scene, x: number, y: number, result: Ray, camera?: Camera): Scene;
/** Launch a ray to try to pick a mesh in the scene using only bounding information of the main mesh (not using submeshes)
 * @param scene defines the scene to use for the picking
 * @param x position on screen
 * @param y position on screen
 * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true. thinInstanceIndex is -1 when the mesh is non-instanced
 * @param fastCheck defines if the first intersection will be used (and not the closest)
 * @param camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
 * @returns a PickingInfo (Please note that some info will not be set like distance, bv, bu and everything that cannot be capture by only using bounding infos)
 */
export declare function PickWithBoundingInfo(scene: Scene, x: number, y: number, predicate?: MeshPredicate, fastCheck?: boolean, camera?: Nullable<Camera>): Nullable<PickingInfo>;
/** Launch a ray to try to pick a mesh in the scene
 * @param scene defines the scene to use for the picking
 * @param x position on screen
 * @param y position on screen
 * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true. thinInstanceIndex is -1 when the mesh is non-instanced
 * @param fastCheck defines if the first intersection will be used (and not the closest)
 * @param camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
 * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
 * @param _enableDistantPicking defines if picking should handle large values for mesh position/scaling (false by default)
 * @returns a PickingInfo
 */
export declare function Pick(scene: Scene, x: number, y: number, predicate?: MeshPredicate, fastCheck?: boolean, camera?: Nullable<Camera>, trianglePredicate?: TrianglePickingPredicate, _enableDistantPicking?: boolean): PickingInfo;
/**
 * Use the given ray to pick a mesh in the scene. A mesh triangle can be picked both from its front and back sides,
 * irrespective of orientation.
 * @param scene defines the scene to use for the picking
 * @param ray The ray to use to pick meshes
 * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must have isPickable set to true. thinInstanceIndex is -1 when the mesh is non-instanced
 * @param fastCheck defines if the first intersection will be used (and not the closest)
 * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
 * @returns a PickingInfo
 */
export declare function PickWithRay(scene: Scene, ray: Ray, predicate?: MeshPredicate, fastCheck?: boolean, trianglePredicate?: TrianglePickingPredicate): Nullable<PickingInfo>;
/**
 * Launch a ray to try to pick a mesh in the scene. A mesh triangle can be picked both from its front and back sides,
 * irrespective of orientation.
 * @param scene defines the scene to use for the picking
 * @param x X position on screen
 * @param y Y position on screen
 * @param predicate Predicate function used to determine eligible meshes and instances. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true. thinInstanceIndex is -1 when the mesh is non-instanced
 * @param camera camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
 * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
 * @returns an array of PickingInfo
 */
export declare function MultiPick(scene: Scene, x: number, y: number, predicate?: MeshPredicate, camera?: Camera, trianglePredicate?: TrianglePickingPredicate): Nullable<PickingInfo[]>;
/**
 * Launch a ray to try to pick a mesh in the scene
 * @param scene defines the scene to use for the picking
 * @param ray Ray to use
 * @param predicate Predicate function used to determine eligible meshes and instances. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true. thinInstanceIndex is -1 when the mesh is non-instanced
 * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
 * @returns an array of PickingInfo
 */
export declare function MultiPickWithRay(scene: Scene, ray: Ray, predicate?: MeshPredicate, trianglePredicate?: TrianglePickingPredicate): Nullable<PickingInfo[]>;
/**
 * Gets a ray in the forward direction from the camera.
 * @param camera Defines the camera to use to get the ray from
 * @param length Defines the length of the ray to create
 * @param transform Defines the transform to apply to the ray, by default the world matrix is used to create a workd space ray
 * @param origin Defines the start point of the ray which defaults to the camera position
 * @returns the forward ray
 */
export declare function GetForwardRay(camera: Camera, length?: number, transform?: Matrix, origin?: Vector3): Ray;
/**
 * Gets a ray in the forward direction from the camera.
 * @param camera Defines the camera to use to get the ray from
 * @param refRay the ray to (re)use when setting the values
 * @param length Defines the length of the ray to create
 * @param transform Defines the transform to apply to the ray, by default the world matrx is used to create a workd space ray
 * @param origin Defines the start point of the ray which defaults to the camera position
 * @returns the forward ray
 */
export declare function GetForwardRayToRef(camera: Camera, refRay: Ray, length?: number, transform?: Matrix, origin?: Vector3): Ray;
/**
 * Initialize the minimal interdependecies between the Ray and Scene and Camera
 * @param sceneClass defines the scene prototype to use
 * @param cameraClass defines the camera prototype to use
 */
export declare function AddRayExtensions(sceneClass: typeof Scene, cameraClass: typeof Camera): void;
