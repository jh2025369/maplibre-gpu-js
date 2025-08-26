import type { FrameGraph, FrameGraphContext, FrameGraphPass } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
/**
 * Task used to execute a custom function.
 */
export declare class FrameGraphExecuteTask extends FrameGraphTask {
    /**
     * The function to execute.
     */
    func: (context: FrameGraphContext) => void;
    /**
     * The function to execute when the task is disabled (optional).
     */
    funcDisabled?: (context: FrameGraphContext) => void;
    /**
     * Creates a new execute task.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     */
    constructor(name: string, frameGraph: FrameGraph);
    record(): FrameGraphPass<FrameGraphContext>;
}
