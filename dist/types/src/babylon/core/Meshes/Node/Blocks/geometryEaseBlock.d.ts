import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../nodeGeometryBuildState";
/**
 * Types of easing function supported by the Ease block
 */
export declare enum GeometryEaseBlockTypes {
    /** EaseInSine */
    EaseInSine = 0,
    /** EaseOutSine */
    EaseOutSine = 1,
    /** EaseInOutSine */
    EaseInOutSine = 2,
    /** EaseInQuad */
    EaseInQuad = 3,
    /** EaseOutQuad */
    EaseOutQuad = 4,
    /** EaseInOutQuad */
    EaseInOutQuad = 5,
    /** EaseInCubic */
    EaseInCubic = 6,
    /** EaseOutCubic */
    EaseOutCubic = 7,
    /** EaseInOutCubic */
    EaseInOutCubic = 8,
    /** EaseInQuart */
    EaseInQuart = 9,
    /** EaseOutQuart */
    EaseOutQuart = 10,
    /** EaseInOutQuart */
    EaseInOutQuart = 11,
    /** EaseInQuint */
    EaseInQuint = 12,
    /** EaseOutQuint */
    EaseOutQuint = 13,
    /** EaseInOutQuint */
    EaseInOutQuint = 14,
    /** EaseInExpo */
    EaseInExpo = 15,
    /** EaseOutExpo */
    EaseOutExpo = 16,
    /** EaseInOutExpo */
    EaseInOutExpo = 17,
    /** EaseInCirc */
    EaseInCirc = 18,
    /** EaseOutCirc */
    EaseOutCirc = 19,
    /** EaseInOutCirc */
    EaseInOutCirc = 20,
    /** EaseInBack */
    EaseInBack = 21,
    /** EaseOutBack */
    EaseOutBack = 22,
    /** EaseInOutBack */
    EaseInOutBack = 23,
    /** EaseInElastic */
    EaseInElastic = 24,
    /** EaseOutElastic */
    EaseOutElastic = 25,
    /** EaseInOutElastic */
    EaseInOutElastic = 26
}
/**
 * Block used to apply an easing function to floats
 */
export declare class GeometryEaseBlock extends NodeGeometryBlock {
    private _easingFunction;
    private _type;
    /**
     * Gets or sets the type of the easing functions applied by the block
     */
    get type(): GeometryEaseBlockTypes;
    set type(value: GeometryEaseBlockTypes);
    /**
     * Creates a new GeometryEaseBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the input component
     */
    get input(): NodeGeometryConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeGeometryConnectionPoint;
    protected _buildBlock(state: NodeGeometryBuildState): this;
    serialize(): any;
    _deserialize(serializationObject: any): void;
    protected _dumpPropertiesCode(): string;
}
