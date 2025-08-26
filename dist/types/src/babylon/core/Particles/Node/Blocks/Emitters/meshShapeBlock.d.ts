import type { Mesh } from "../../../../Meshes/mesh";
import type { Nullable } from "../../../../types";
import { NodeParticleBlock } from "../../nodeParticleBlock";
import type { NodeParticleBuildState } from "../../nodeParticleBuildState";
import type { NodeParticleConnectionPoint } from "../../nodeParticleBlockConnectionPoint";
import type { IShapeBlock } from "./IShapeBlock";
/**
 * Defines a block used to generate particle shape from mesh geometry data
 */
export declare class MeshShapeBlock extends NodeParticleBlock implements IShapeBlock {
    private _mesh;
    private _cachedVertexData;
    private _indices;
    private _positions;
    private _normals;
    private _colors;
    private _storedNormal;
    /**
     * Gets or sets a boolean indicating that this block should serialize its cached data
     */
    serializedCachedData: boolean;
    /**
     * Gets or sets a boolean indicating if the mesh normals should be used for particle direction
     */
    useMeshNormalsForDirection: boolean;
    /**
     * Gets or sets a boolean indicating if the mesh colors should be used for particle color
     */
    useMeshColorForColor: boolean;
    /**
     * Gets or sets the mesh to use to get vertex data
     */
    get mesh(): Nullable<Mesh>;
    set mesh(value: Nullable<Mesh>);
    /**
     * Create a new MeshShapeBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets a boolean indicating if the block is using cached data
     */
    get isUsingCachedData(): boolean;
    /**
     * Gets the particle component
     */
    get particle(): NodeParticleConnectionPoint;
    /**
     * Gets the direction1 input component
     */
    get direction1(): NodeParticleConnectionPoint;
    /**
     * Gets the direction2 input component
     */
    get direction2(): NodeParticleConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeParticleConnectionPoint;
    /**
     * Remove stored data
     */
    cleanData(): void;
    /**
     * Builds the block
     * @param state defines the build state
     */
    _build(state: NodeParticleBuildState): void;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
