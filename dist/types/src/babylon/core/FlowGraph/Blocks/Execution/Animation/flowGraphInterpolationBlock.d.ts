import type { EasingFunction } from "core/Animations/easing";
import { FlowGraphBlock, type IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import type { FlowGraphTypes } from "core/FlowGraph/flowGraphRichTypes";
import { Animation } from "core/Animations/animation";
/**
 * Configuration for the interpolation block.
 */
export interface IFlowGraphInterpolationBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The number of keyframes to interpolate between.
     * Will default to 1 if not provided (i.e. from currentValue to a provided value in the time provided)
     */
    keyFramesCount?: number;
    /**
     * The duration of the interpolation.
     */
    duration?: number;
    /**
     * The name of the property that will be interpolated.
     */
    propertyName?: string | string[];
    /**
     * The type of the animation to create.
     * Default is ANIMATIONTYPE_FLOAT
     * This cannot be changed after construction, so make sure to pass the right value.
     */
    animationType?: number | FlowGraphTypes;
}
/**
 * This block is responsible for interpolating between two values.
 * The babylon concept used is Animation, and it is the output of this block.
 *
 * Note that values will be parsed when the in connection is triggered. until then changing the value will not trigger a new interpolation.
 *
 * Internally this block uses the Animation class.
 *
 * Note that if the interpolation is already running a signal will be sent to stop the animation group running it.
 */
export declare class FlowGraphInterpolationBlock<T> extends FlowGraphBlock {
    /**
     * Input connection: The value to interpolate from.
     * Optional. If not provided, the current value will be used.
     * Note that if provided, every time the animation is created this value will be used!
     */
    readonly initialValue: FlowGraphDataConnection<T>;
    /**
     * Input connection: The value to interpolate to.
     * Optional. This can also be set using the KeyFrames input!
     * If provided it will be set to the last keyframe value.
     */
    readonly endValue: FlowGraphDataConnection<T>;
    /**
     * output connection: The animation that will be created when in is triggered.
     */
    readonly animation: FlowGraphDataConnection<Animation | Animation[]>;
    /**
     * Input connection: An optional easing function to use for the interpolation.
     */
    readonly easingFunction: FlowGraphDataConnection<EasingFunction>;
    /**
     * Input connection: The name of the property that will be set
     */
    readonly propertyName: FlowGraphDataConnection<string | string[]>;
    /**
     * If provided, this function will be used to create the animation object(s).
     */
    readonly customBuildAnimation: FlowGraphDataConnection<(target: any, propertname: any, context: FlowGraphContext) => (keys: any[], fps: number, animationType: number, easingFunction?: EasingFunction) => Animation | Animation[]>;
    /**
     * The keyframes to interpolate between.
     * Each keyframe has a duration input and a value input.
     */
    readonly keyFrames: {
        duration: FlowGraphDataConnection<number>;
        value: FlowGraphDataConnection<T>;
    }[];
    constructor(config?: IFlowGraphInterpolationBlockConfiguration);
    _updateOutputs(context: FlowGraphContext): void;
    private _createAnimation;
    getClassName(): string;
}
