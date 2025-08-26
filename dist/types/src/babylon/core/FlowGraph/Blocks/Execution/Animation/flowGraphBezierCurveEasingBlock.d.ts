import type { EasingFunction } from "core/Animations/easing";
import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { FlowGraphBlock } from "core/FlowGraph/flowGraphBlock";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import type { Vector2 } from "core/Maths/math.vector";
/**
 * An easing block that generates a BezierCurveEase easingFunction object based on the data provided.
 */
export declare class FlowGraphBezierCurveEasingBlock extends FlowGraphBlock {
    /**
     * the configuration of the block
     */
    config?: IFlowGraphBlockConfiguration;
    /**
     * Input connection: The mode of the easing function.
     * EasingFunction.EASINGMODE_EASEIN, EasingFunction.EASINGMODE_EASEOUT, EasingFunction.EASINGMODE_EASEINOUT
     */
    readonly mode: FlowGraphDataConnection<number>;
    /**
     * Input connection: Control point 1 for bezier curve.
     */
    readonly controlPoint1: FlowGraphDataConnection<Vector2>;
    /**
     * Input connection: Control point 2 for bezier curve.
     */
    readonly controlPoint2: FlowGraphDataConnection<Vector2>;
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
