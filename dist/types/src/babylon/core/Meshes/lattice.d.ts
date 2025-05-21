import { Vector3 } from "core/Maths/math.vector";
import type { Mesh } from "./mesh";
import type { FloatArray } from "core/types";
/**
 * Interface used to define options for creating a lattice
 */
export interface ILatticeOptions {
    /** resolution on x axis */
    resolutionX: number;
    /** resolution on y axis */
    resolutionY: number;
    /** resolution on z axis */
    resolutionZ: number;
    /** the lattice position in object space */
    position: Vector3;
    /** size of the lattice along each axis in object space */
    size: Vector3;
    /** Optional mesh to adapt the size to */
    autoAdaptToMesh?: Mesh;
}
/**
 * Class used to represent a lattice
 * #MDVD75#18 - Moving lattice bounds
 * #MDVD75#23 - Twist
 */
export declare class Lattice {
    private _resolutionX;
    private _resolutionY;
    private _resolutionZ;
    private _position;
    private _size;
    private _cellSize;
    private _data;
    private _min;
    private _max;
    private _localPos;
    private _tmpVector;
    private _lerpVector0;
    private _lerpVector1;
    private _lerpVector2;
    private _lerpVector3;
    private _lerpVector4;
    private _lerpVector5;
    /**
     * @returns the string "Lattice"
     */
    getClassName(): string;
    /**
     * Gets the resolution on x axis
     */
    get resolutionX(): number;
    /**
     * Gets the resolution on y axis
     */
    get resolutionY(): number;
    /**
     * Gets the resolution on z axis
     */
    get resolutionZ(): number;
    /**
     * Gets the size of the lattice along each axis in object space
     * Updating the size requires you to call update afterwards
     */
    get size(): Vector3;
    /**
     * Gets the lattice position in object space
     */
    get position(): Vector3;
    /**
     * Gets the data of the lattice
     */
    get data(): Vector3[][][];
    /**
     * Gets the size of each cell in the lattice
     */
    get cellSize(): Vector3;
    /**
     * Gets the min bounds of the lattice
     */
    get min(): Vector3;
    /**
     * Gets the max bounds of the lattice
     */
    get max(): Vector3;
    /**
     * Creates a new Lattice
     * @param options options for creating
     */
    constructor(options?: Partial<ILatticeOptions>);
    private _allocateData;
    /**
     * Update of the lattice data
     */
    update(): void;
    /**
     * Apply the lattice to a mesh
     * @param mesh mesh to deform
     */
    deformMesh(mesh: Mesh): void;
    /**
     * Update the lattice internals (like min, max and cell size)
     */
    updateInternals(): void;
    /**
     * Apply the lattice to a set of points
     * @param positions vertex data to deform
     * @param target optional target array to store the result (operation will be done in place in not defined)
     */
    deform(positions: FloatArray, target?: FloatArray): void;
}
