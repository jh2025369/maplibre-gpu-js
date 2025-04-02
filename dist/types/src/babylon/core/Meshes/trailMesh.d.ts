import { Mesh } from "../Meshes/mesh";
import type { Scene } from "../scene";
import type { TransformNode } from "../Meshes/transformNode";
/**
 * Options to be used when creating a trail mesh
 */
export interface ITrailMeshOptions {
    /**
     * diameter of trailing mesh (default: 1)
     */
    diameter?: number;
    /**
     * length of trailing mesh (default: 60)
     */
    length?: number;
    /**
     * segments of trailing mesh (default: length)
     */
    segments?: number;
    /**
     * sections of trailing mesh (default: 4)
     */
    sections?: number;
    /**
     * tapers the trailing mesh (default: false)
     */
    doNotTaper?: boolean;
    /**
     * automatically start trailing mesh. (default: true)
     */
    autoStart?: boolean;
}
/**
 * Class used to create a trail following a mesh
 */
export declare class TrailMesh extends Mesh {
    /**
     * The diameter of the trail, i.e. the width of the ribbon.
     */
    diameter: number;
    private _generator;
    private _autoStart;
    private _running;
    private _doNotTaper;
    private _length;
    private _segments;
    private _sectionPolygonPointsCount;
    private _sectionVectors;
    private _sectionNormalVectors;
    private _beforeRenderObserver;
    /**
     * Constructor
     * @param name The value used by scene.getMeshByName() to do a lookup.
     * @param generator The mesh or transform node to generate a trail.
     * @param scene The scene to add this mesh to.
     * @param diameter Diameter of trailing mesh. Default is 1.
     * @param length Length of trailing mesh. Default is 60.
     * @param autoStart Automatically start trailing mesh. Default true.
     */
    constructor(name: string, generator: TransformNode, scene?: Scene, diameter?: number, length?: number, autoStart?: boolean);
    /**
     * Constructor
     * @param name The value used by scene.getMeshByName() to do a lookup.
     * @param generator The mesh or transform node to generate a trail.
     * @param scene The scene to add this mesh to.
     * @param options defines the options used to create the mesh.
     */
    constructor(name: string, generator: TransformNode, scene?: Scene, options?: ITrailMeshOptions);
    /**
     * "TrailMesh"
     * @returns "TrailMesh"
     */
    getClassName(): string;
    private _createMesh;
    private _updateSectionVectors;
    /**
     * Start trailing mesh.
     */
    start(): void;
    /**
     * Stop trailing mesh.
     */
    stop(): void;
    /**
     * Update trailing mesh geometry.
     */
    update(): void;
    /**
     * Reset trailing mesh geometry.
     */
    reset(): void;
    /**
     * Returns a new TrailMesh object.
     * @param name is a string, the name given to the new mesh
     * @param newGenerator use new generator object for cloned trail mesh
     * @returns a new mesh
     */
    clone(name: string, newGenerator: TransformNode): TrailMesh;
    /**
     * Serializes this trail mesh
     * @param serializationObject object to write serialization to
     */
    serialize(serializationObject: any): void;
    /**
     * Parses a serialized trail mesh
     * @param parsedMesh the serialized mesh
     * @param scene the scene to create the trail mesh in
     * @returns the created trail mesh
     */
    static Parse(parsedMesh: any, scene: Scene): TrailMesh;
}
