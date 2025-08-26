import type { Scene, FrameGraph } from "core/index";
import { FrameGraphExtractHighlightsTask } from "core/FrameGraph/Tasks/PostProcesses/extractHighlightsTask";
import { NodeRenderGraphBasePostProcessBlock } from "./basePostProcessBlock";
/**
 * Block that implements the extract highlights post process
 */
export declare class NodeRenderGraphExtractHighlightsPostProcessBlock extends NodeRenderGraphBasePostProcessBlock {
    protected _frameGraphTask: FrameGraphExtractHighlightsTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphExtractHighlightsTask;
    /**
     * Create a new ExtractHighlightsPostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** The luminance threshold, pixels below this value will be set to black. */
    get threshold(): number;
    set threshold(value: number);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
