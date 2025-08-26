import type { AbstractEngine } from "core/Engines/abstractEngine";
import type { RenderTargetWrapper } from "core/Engines/renderTargetWrapper";
import type { InternalTexture } from "core/Materials/Textures/internalTexture";
/** @internal */
export declare class FluidRenderingDepthTextureCopy {
    private _engine;
    private _depthRTWrapper;
    private _copyTextureToTexture;
    get depthRTWrapper(): RenderTargetWrapper;
    constructor(engine: AbstractEngine, width: number, height: number, samples?: number);
    copy(source: InternalTexture): boolean;
    dispose(): void;
}
