import { Vector3, Matrix } from "../../Maths/math.vector";
import type { Scene } from "../../scene";
import type { DeepImmutableObject } from "../../types";
import type { PhysicsBody } from "./physicsBody";
import { type PhysicsShape } from "./physicsShape";
/**
 * Shape properties for the character controller
 */
export interface CharacterShapeOptions {
    /**
     * optional shape used for collision detection
     */
    shape?: PhysicsShape;
    /**
     * capsule height for the capsule shape if no shape is provided
     */
    capsuleHeight?: number;
    /**
     * capsule radius for the capsule shape if no shape is provided
     */
    capsuleRadius?: number;
}
/**
 * State of the character on the surface
 */
export declare const enum CharacterSupportedState {
    UNSUPPORTED = 0,
    SLIDING = 1,
    SUPPORTED = 2
}
/**
 * Surface information computed by checkSupport method
 */
export interface CharacterSurfaceInfo {
    /**
     * Indicates whether the surface is dynamic.
     * A dynamic surface is one that can change its properties over time,
     * such as moving platforms or surfaces that can be affected by external forces.
     * surfaceInfo.supportedState is always CharacterSupportedState.SUPPORTED when isSurfaceDynamic is true.
     */
    isSurfaceDynamic: boolean;
    /**
     * The supported state of the character on the surface.
     */
    supportedState: CharacterSupportedState;
    /**
     * The average normal vector of the surface.
     * This vector is perpendicular to the surface and points outwards.
     */
    averageSurfaceNormal: Vector3;
    /**
     * The average velocity of the surface.
     * This vector represents the speed and direction in which the surface is moving.
     */
    averageSurfaceVelocity: Vector3;
    /**
     * The average angular velocity of the surface.
     */
    averageAngularSurfaceVelocity: Vector3;
}
interface IContact {
    /** @internal */
    position: Vector3;
    /** @internal */
    normal: Vector3;
    /** @internal */
    distance: number;
    /** @internal */
    fraction: number;
    /** @internal */
    bodyB: {
        body: PhysicsBody;
        index: number;
    };
    /** @internal */
    allowedPenetration: number;
}
interface ISurfaceConstraintInfo {
    /** @internal */
    planeNormal: Vector3;
    /** @internal */
    planeDistance: number;
    /** @internal */
    velocity: Vector3;
    /** @internal */
    angularVelocity: Vector3;
    /** @internal */
    staticFriction: number;
    /** @internal */
    extraUpStaticFriction: number;
    /** @internal */
    extraDownStaticFriction: number;
    /** @internal */
    dynamicFriction: number;
    /** @internal */
    priority: number;
}
declare const enum SurfaceConstraintInteractionStatus {
    OK = 0,
    FAILURE_3D = 1,
    FAILURE_2D = 2
}
interface ISurfaceConstraintInteraction {
    /** @internal */
    touched: boolean;
    /** @internal */
    stopped: boolean;
    /** @internal */
    surfaceTime: number;
    /** @internal */
    penaltyDistance: number;
    /** @internal */
    status: SurfaceConstraintInteractionStatus;
}
/** @internal */
declare class SimplexSolverOutput {
    /** @internal */
    position: Vector3;
    /** @internal */
    velocity: Vector3;
    /** @internal */
    deltaTime: number;
    /** @internal */
    planeInteractions: ISurfaceConstraintInteraction[];
}
/** @internal */
declare class SimplexSolverActivePlanes {
    /** @internal */
    index: number;
    /** @internal */
    constraint: ISurfaceConstraintInfo;
    /** @internal */
    interaction: ISurfaceConstraintInteraction;
    /** @internal */
    copyFrom(other: SimplexSolverActivePlanes): void;
}
/** @internal */
declare class SimplexSolverInfo {
    /** @internal */
    supportPlanes: Array<SimplexSolverActivePlanes>;
    /** @internal */
    numSupportPlanes: number;
    /** @internal */
    currentTime: number;
    /** @internal */
    inputConstraints: ISurfaceConstraintInfo[];
    /** @internal */
    outputInteractions: ISurfaceConstraintInteraction[];
    /** @internal */
    getOutput(constraint: ISurfaceConstraintInfo): ISurfaceConstraintInteraction;
}
/**
 * Character controller using physics
 */
export declare class PhysicsCharacterController {
    private _position;
    private _orientation;
    private _velocity;
    private _lastVelocity;
    private _shape;
    private _ownShape;
    private _manifold;
    private _lastDisplacement;
    private _contactAngleSensitivity;
    private _lastInvDeltaTime;
    private _scene;
    private _tmpMatrix;
    private _tmpVecs;
    /**
     * minimum distance to make contact
     * default 0.05
     */
    keepDistance: number;
    /**
     * maximum distance to keep contact
     * default 0.1
     */
    keepContactTolerance: number;
    /**
     * maximum number of raycast per integration starp
     * default 10
     */
    maxCastIterations: number;
    /**
     * speed when recovery from penetration
     * default 1.0
     */
    penetrationRecoverySpeed: number;
    /**
     * friction with static surfaces
     * default 0
     */
    staticFriction: number;
    /**
     * friction with dynamic surfaces
     * default 1
     */
    dynamicFriction: number;
    /**
     * cosine value of slope angle that can be climbed
     * computed as `Math.cos(Math.PI * (angleInDegree / 180.0));`
     * default 0.5 (value for a 60deg angle)
     */
    maxSlopeCosine: number;
    /**
     * character maximum speed
     * default 10
     */
    maxCharacterSpeedForSolver: number;
    /**
     * up vector
     */
    up: Vector3;
    /**
     * Strength when pushing other bodies
     * default 1e38
     */
    characterStrength: number;
    /**
     * Acceleration factor. A value of 1 means reaching max velocity immediately
     */
    acceleration: number;
    /**
     * maximum acceleration in world space coordinate
     */
    maxAcceleration: number;
    /**
     * character mass
     * default 0
     */
    characterMass: number;
    private _startCollector;
    private _castCollector;
    /**
     * instanciate a new characterController
     * @param position Initial position
     * @param characterShapeOptions character physics shape options
     * @param scene Scene
     */
    constructor(position: Vector3, characterShapeOptions: CharacterShapeOptions, scene: Scene);
    /**
     * Get shape used for collision
     */
    get shape(): PhysicsShape;
    /**
     * Set shape used for collision
     */
    set shape(value: PhysicsShape);
    /**
     * Character position
     * @returns Character position
     */
    getPosition(): Vector3;
    /**
     * Teleport character to a new position
     * @param position new position
     */
    setPosition(position: Vector3): void;
    /**
     * Character velocity
     * @returns Character velocity vector
     */
    getVelocity(): Vector3;
    /**
     * Set velocity vector
     * @param velocity vector
     */
    setVelocity(velocity: Vector3): void;
    protected _validateManifold(): void;
    private _getPointVelocityToRef;
    protected _compareContacts(contactA: IContact, contactB: IContact): number;
    protected _findContact(referenceContact: IContact, contactList: IContact[], threshold: number): number;
    protected _updateManifold(startCollector: any, castCollector: any, castPath: Vector3): number;
    protected _createSurfaceConstraint(contact: IContact, timeTravelled: number): ISurfaceConstraintInfo;
    protected _addMaxSlopePlane(maxSlopeCos: number, up: Vector3, index: number, constraints: ISurfaceConstraintInfo[], allowedPenetration: number): boolean;
    protected _resolveConstraintPenetration(constraint: ISurfaceConstraintInfo, penetrationRecoverySpeed: number): void;
    protected _createConstraintsFromManifold(dt: number, timeTravelled: number): ISurfaceConstraintInfo[];
    protected _simplexSolverSortInfo(info: SimplexSolverInfo): void;
    protected _simplexSolverSolve1d(info: SimplexSolverInfo, sci: ISurfaceConstraintInfo, velocityIn: Vector3, velocityOut: Vector3): void;
    protected _simplexSolverSolveTest1d(sci: ISurfaceConstraintInfo, velocityIn: Vector3): boolean;
    protected _simplexSolverSolve2d(info: SimplexSolverInfo, maxSurfaceVelocity: Vector3, sci0: ISurfaceConstraintInfo, sci1: ISurfaceConstraintInfo, velocityIn: Vector3, velocityOut: Vector3): void;
    protected _simplexSolverSolve3d(info: SimplexSolverInfo, maxSurfaceVelocity: Vector3, sci0: ISurfaceConstraintInfo, sci1: ISurfaceConstraintInfo, sci2: ISurfaceConstraintInfo, allowResort: boolean, velocityIn: Vector3, velocityOut: Vector3): void;
    protected _simplexSolverExamineActivePlanes(info: SimplexSolverInfo, maxSurfaceVelocity: Vector3, velocityIn: Vector3, velocityOut: Vector3): void;
    protected _simplexSolverSolve(constraints: ISurfaceConstraintInfo[], velocity: Vector3, deltaTime: number, minDeltaTime: number, up: Vector3, maxSurfaceVelocity: Vector3): SimplexSolverOutput;
    /**
     * Compute a CharacterSurfaceInfo from current state and a direction
     * @param deltaTime frame delta time in seconds. When using scene.deltaTime divide by 1000.0
     * @param direction direction to check, usually gravity direction
     * @returns a CharacterSurfaceInfo object
     */
    checkSupport(deltaTime: number, direction: Vector3): CharacterSurfaceInfo;
    /**
     * Compute a CharacterSurfaceInfo from current state and a direction
     * @param deltaTime frame delta time in seconds. When using scene.deltaTime divide by 1000.0
     * @param direction direction to check, usually gravity direction
     * @param surfaceInfo output for surface info
     */
    checkSupportToRef(deltaTime: number, direction: Vector3, surfaceInfo: CharacterSurfaceInfo): void;
    protected _castWithCollectors(startPos: Vector3, endPos: Vector3, castCollector: any, startCollector?: any): void;
    protected _resolveContacts(deltaTime: number, gravity: Vector3): void;
    protected _getInverseInertiaWorld(body: {
        body: PhysicsBody;
        index: number;
    }): DeepImmutableObject<Matrix>;
    protected _getComWorldToRef(body: {
        body: PhysicsBody;
        index: number;
    }, result: Vector3): void;
    protected _getInvMass(body: {
        body: PhysicsBody;
        index: number;
    }): number;
    /**
     * Update internal state. Must be called once per frame
     * @param deltaTime frame delta time in seconds. When using scene.deltaTime divide by 1000.0
     * @param surfaceInfo surface information returned by checkSupport
     * @param gravity gravity applied to the character. Can be different that world gravity
     */
    integrate(deltaTime: number, surfaceInfo: CharacterSurfaceInfo, gravity: Vector3): void;
    /**
     * Helper function to calculate velocity based on surface informations and current velocity state and target
     * @param deltaTime frame delta time in seconds. When using scene.deltaTime divide by 1000.0
     * @param forwardWorld character forward in world coordinates
     * @param surfaceNormal surface normal direction
     * @param currentVelocity current velocity
     * @param surfaceVelocity velocity induced by the surface
     * @param desiredVelocity desired character velocity
     * @param upWorld up vector in world space
     * @param result resulting velocity vector
     * @returns boolean true if result has been computed
     */
    calculateMovementToRef(deltaTime: number, forwardWorld: Vector3, surfaceNormal: Vector3, currentVelocity: Vector3, surfaceVelocity: Vector3, desiredVelocity: Vector3, upWorld: Vector3, result: Vector3): boolean;
    /**
     * Helper function to calculate velocity based on surface informations and current velocity state and target
     * @param deltaTime frame delta time in seconds. When using scene.deltaTime divide by 1000.0
     * @param forwardWorld character forward in world coordinates
     * @param surfaceNormal surface normal direction
     * @param currentVelocity current velocity
     * @param surfaceVelocity velocity induced by the surface
     * @param desiredVelocity desired character velocity
     * @param upWorld up vector in world space
     * @returns a new velocity vector
     */
    calculateMovement(deltaTime: number, forwardWorld: Vector3, surfaceNormal: Vector3, currentVelocity: Vector3, surfaceVelocity: Vector3, desiredVelocity: Vector3, upWorld: Vector3): Vector3;
}
export {};
