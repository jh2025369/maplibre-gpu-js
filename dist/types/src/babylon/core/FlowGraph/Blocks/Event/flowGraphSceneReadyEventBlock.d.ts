import { FlowGraphEventBlock } from "../../flowGraphEventBlock";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import { FlowGraphBlockNames } from "../flowGraphBlockNames";
import { FlowGraphEventType } from "core/FlowGraph/flowGraphEventType";
/**
 * Block that triggers when a scene is ready.
 */
export declare class FlowGraphSceneReadyEventBlock extends FlowGraphEventBlock {
    initPriority: number;
    readonly type: FlowGraphEventType;
    _executeEvent(context: FlowGraphContext, _payload: any): boolean;
    _preparePendingTasks(context: FlowGraphContext): void;
    _cancelPendingTasks(context: FlowGraphContext): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): FlowGraphBlockNames;
}
