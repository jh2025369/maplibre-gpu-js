import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
/**
 * Block used to subdivide for a geometry using Catmull-Clark algorithm
 */
export declare class SubdivideBlock extends NodeGeometryBlock {
    /**
     * Gets or sets a boolean indicating that this block can evaluate context
     */
    flatOnly: boolean;
    /**
     * Gets or sets a float defining the loop weight. i.e how much to weigh favoring heavy corners vs favoring Loop's formula
     */
    loopWeight: number;
    /**
     * Creates a new ComputeNormalsBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the geometry component
     */
    get geometry(): NodeGeometryConnectionPoint;
    /**
     * Gets the level component
     */
    get level(): NodeGeometryConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeGeometryConnectionPoint;
    protected _buildBlock(): void;
    protected _dumpPropertiesCode(): string;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
