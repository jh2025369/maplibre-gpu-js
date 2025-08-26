import type { FrameGraph, Scene, IThinHighlightLayerOptions } from "core/index";
import { ThinHighlightLayer } from "core/Layers/thinHighlightLayer";
import { FrameGraphBaseLayerTask } from "./baseLayerTask";
/**
 * Task which applies a highlight effect to a texture.
 */
export declare class FrameGraphHighlightLayerTask extends FrameGraphBaseLayerTask {
    /**
     * The highlight layer object. Use this object to update the highlight layer properties.
     */
    readonly layer: ThinHighlightLayer;
    /**
     * Constructs a new highlight layer task.
     * @param name Name of the task.
     * @param frameGraph The frame graph this task is associated with.
     * @param scene The scene to render the highlight layer in.
     * @param options Options for the highlight layer.
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene, options?: IThinHighlightLayerOptions);
    record(): void;
}
