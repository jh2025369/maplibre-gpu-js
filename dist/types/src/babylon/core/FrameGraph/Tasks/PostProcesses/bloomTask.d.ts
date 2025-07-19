import type { FrameGraph, FrameGraphTextureHandle, AbstractEngine } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
import { ThinBloomEffect } from "core/PostProcesses/thinBloomEffect";
/**
 * Task which applies a bloom render effect.
 */
export declare class FrameGraphBloomTask extends FrameGraphTask {
    /**
     * The source texture to apply the bloom effect on.
     */
    sourceTexture: FrameGraphTextureHandle;
    /**
     * The sampling mode to use for the source texture.
     */
    sourceSamplingMode: number;
    /**
     * The destination texture to render the bloom effect to.
     * If not supplied, a texture with the same configuration as the source texture will be created.
     */
    destinationTexture?: FrameGraphTextureHandle;
    /**
     * The output texture of the bloom effect.
     */
    readonly outputTexture: FrameGraphTextureHandle;
    /**
     * The bloom effect to apply.
     */
    readonly bloom: ThinBloomEffect;
    /**
     * Whether the bloom effect is HDR.
     * When true, the bloom effect will use a higher precision texture format (half float or float). Else, it will use unsigned byte.
     */
    readonly hdr: boolean;
    /**
     * The name of the task.
     */
    get name(): string;
    set name(name: string);
    private readonly _downscale;
    private readonly _blurX;
    private readonly _blurY;
    private readonly _merge;
    private readonly _defaultPipelineTextureType;
    /**
     * Constructs a new bloom task.
     * @param name Name of the task.
     * @param frameGraph The frame graph this task is associated with.
     * @param engine The engine to use for the bloom effect.
     * @param weight Weight of the bloom effect.
     * @param kernel Kernel size of the bloom effect.
     * @param threshold Threshold of the bloom effect.
     * @param hdr Whether the bloom effect is HDR.
     * @param bloomScale The scale of the bloom effect. This value is multiplied by the source texture size to determine the bloom texture size.
     */
    constructor(name: string, frameGraph: FrameGraph, engine: AbstractEngine, weight: number, kernel: number, threshold: number, hdr?: boolean, bloomScale?: number);
    isReady(): boolean;
    record(): void;
    dispose(): void;
}
