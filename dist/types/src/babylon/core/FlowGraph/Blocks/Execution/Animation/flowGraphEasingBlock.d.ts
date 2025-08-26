import type { EasingFunction } from "core/Animations/easing";
import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { FlowGraphBlock } from "core/FlowGraph/flowGraphBlock";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
/**
 * The type of the easing function.
 */
export declare const enum EasingFunctionType {
    CircleEase = 0,
    BackEase = 1,
    BounceEase = 2,
    CubicEase = 3,
    ElasticEase = 4,
    ExponentialEase = 5,
    PowerEase = 6,
    QuadraticEase = 7,
    QuarticEase = 8,
    QuinticEase = 9,
    SineEase = 10,
    BezierCurveEase = 11
}
/**
 * An easing block that generates an easingFunction object based on the data provided.
 */
export declare class FlowGraphEasingBlock extends FlowGraphBlock {
    /**
     * the configuration of the block
     */
    config?: IFlowGraphBlockConfiguration;
    /**
     * Input connection: The type of the easing function.
     */
    readonly type: FlowGraphDataConnection<EasingFunctionType>;
    /**
     * Input connection: The mode of the easing function.
     * EasingFunction.EASINGMODE_EASEIN, EasingFunction.EASINGMODE_EASEOUT, EasingFunction.EASINGMODE_EASEINOUT
     */
    readonly mode: FlowGraphDataConnection<number>;
    /**
     * Input connection:parameters for easing. for example control points for BezierCurveEase.
     */
    readonly parameters: FlowGraphDataConnection<number[]>;
    /**
     * Output connection: The easing function object.
     */
    readonly easingFunction: FlowGraphDataConnection<EasingFunction>;
    /**
     * Internal cache of reusable easing functions.
     * key is type-mode-properties
     */
    private _easingFunctions;
    constructor(
    /**
     * the configuration of the block
     */
    config?: IFlowGraphBlockConfiguration);
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
