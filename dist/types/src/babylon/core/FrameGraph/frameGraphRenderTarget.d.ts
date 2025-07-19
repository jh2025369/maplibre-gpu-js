import type { FrameGraphTextureHandle, FrameGraphTextureManager, RenderTargetWrapper } from "core/index";
/**
 * @internal
 * @experimental
 */
export declare class FrameGraphRenderTarget {
    protected readonly _textureManager: FrameGraphTextureManager;
    protected readonly _renderTargets: FrameGraphTextureHandle[] | undefined;
    protected readonly _renderTargetDepth: FrameGraphTextureHandle | undefined;
    protected _renderTargetWrapper: RenderTargetWrapper | undefined;
    protected _isBackBuffer: boolean;
    readonly name: string;
    constructor(name: string, textureManager: FrameGraphTextureManager, renderTargets?: FrameGraphTextureHandle | FrameGraphTextureHandle[], renderTargetDepth?: FrameGraphTextureHandle);
    get renderTargetWrapper(): RenderTargetWrapper;
    equals(other: FrameGraphRenderTarget): boolean;
}
