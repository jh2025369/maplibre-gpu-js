import { InternalTexture } from "../../Materials/Textures/internalTexture";
import type { RenderTargetCreationOptions, DepthTextureCreationOptions, TextureSize } from "../../Materials/Textures/textureCreationOptions";
import type { Nullable } from "../../types";
import type { RenderTargetWrapper } from "../renderTargetWrapper";
import "../AbstractEngine/abstractEngine.texture";
/**
 * Type used to define a texture size (either with a number or with a rect width and height)
 * @deprecated please use TextureSize instead
 */
export type RenderTargetTextureSize = TextureSize;
declare module "../../Engines/abstractEngine" {
    interface AbstractEngine {
        /**
         * Creates a new render target texture
         * @param size defines the size of the texture
         * @param options defines the options used to create the texture
         * @returns a new render target wrapper ready to render texture
         */
        createRenderTargetTexture(size: TextureSize, options: boolean | RenderTargetCreationOptions): RenderTargetWrapper;
        /**
         * Updates the sample count of a render target texture
         * @see https://doc.babylonjs.com/setup/support/webGL2#multisample-render-targets
         * @param rtWrapper defines the render target wrapper to update
         * @param samples defines the sample count to set
         * @returns the effective sample count (could be 0 if multisample render targets are not supported)
         */
        updateRenderTargetTextureSampleCount(rtWrapper: Nullable<RenderTargetWrapper>, samples: number): number;
        /** @internal */
        _createDepthStencilTexture(size: TextureSize, options: DepthTextureCreationOptions, rtWrapper: RenderTargetWrapper): InternalTexture;
        /** @internal */
        _createHardwareRenderTargetWrapper(isMulti: boolean, isCube: boolean, size: TextureSize): RenderTargetWrapper;
        /** @internal */
        _setupDepthStencilTexture(internalTexture: InternalTexture, size: TextureSize, bilinearFiltering: boolean, comparisonFunction: number, samples?: number): void;
    }
}
