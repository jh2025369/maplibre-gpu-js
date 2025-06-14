import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
/**
 * Block used to clamp a float
 */
export declare class GeometryClampBlock extends NodeGeometryBlock {
    /** Gets or sets the minimum range */
    get minimum(): number;
    set minimum(value: number);
    /** Gets or sets the maximum range */
    get maximum(): number;
    set maximum(value: number);
    /**
     * Creates a new GeometryClampBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the value input component
     */
    get value(): NodeGeometryConnectionPoint;
    /**
     * Gets the min input component
     */
    get min(): NodeGeometryConnectionPoint;
    /**
     * Gets the max input component
     */
    get max(): NodeGeometryConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeGeometryConnectionPoint;
    protected _buildBlock(): this;
    _deserialize(serializationObject: any): void;
}
