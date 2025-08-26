import type { FlowGraphContext } from "../../../flowGraphContext";
import type { FlowGraphDataConnection } from "../../../flowGraphDataConnection";
import { FlowGraphExecutionBlockWithOutSignal } from "../../../flowGraphExecutionBlockWithOutSignal";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
import type { AnimationGroup } from "core/Animations/animationGroup";
/**
 * @experimental
 * Block that pauses a running animation
 */
export declare class FlowGraphPauseAnimationBlock extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * Input connection: The animation to pause.
     */
    readonly animationToPause: FlowGraphDataConnection<AnimationGroup>;
    constructor(config?: IFlowGraphBlockConfiguration);
    _execute(context: FlowGraphContext): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
}
