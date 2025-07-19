import { Evented } from '../util/evented';
import { RGBAImage } from '../util/image';
import { ImagePosition } from './image_atlas';
import { Texture } from 'core/Materials/Textures/texture';
import type { StyleImage } from '../style/style_image';
import type { WebGPUEngine } from 'core/Engines/webgpuEngine';
import type { PotpackBox } from 'potpack';
import type { GetImagesResponse } from '../util/actor_messages';
type Pattern = {
    bin: PotpackBox;
    position: ImagePosition;
};
/**
 * ImageManager does three things:
 *
 * 1. Tracks requests for icon images from tile workers and sends responses when the requests are fulfilled.
 * 2. Builds a texture atlas for pattern images.
 * 3. Rerenders renderable images once per frame
 *
 * These are disparate responsibilities and should eventually be handled by different classes. When we implement
 * data-driven support for `*-pattern`, we'll likely use per-bucket pattern atlases, and that would be a good time
 * to refactor this.
*/
export declare class ImageManager extends Evented {
    images: {
        [_: string]: StyleImage;
    };
    updatedImages: {
        [_: string]: boolean;
    };
    callbackDispatchedThisFrame: {
        [_: string]: boolean;
    };
    loaded: boolean;
    /**
     * This is used to track requests for images that are not yet available. When the image is loaded,
     * the requestors will be notified.
     */
    requestors: Array<{
        ids: Array<string>;
        promiseResolve: (value: GetImagesResponse) => void;
    }>;
    patterns: {
        [_: string]: Pattern;
    };
    atlasImage: RGBAImage;
    atlasTexture: Texture;
    dirty: boolean;
    constructor();
    isLoaded(): boolean;
    setLoaded(loaded: boolean): void;
    getImage(id: string): StyleImage;
    addImage(id: string, image: StyleImage): void;
    _validate(id: string, image: StyleImage): boolean;
    _validateStretch(stretch: Array<[number, number]>, size: number): boolean;
    _validateContent(content: [number, number, number, number], image: StyleImage): boolean;
    updateImage(id: string, image: StyleImage, validate?: boolean): void;
    removeImage(id: string): void;
    listImages(): Array<string>;
    getImages(ids: Array<string>): Promise<GetImagesResponse>;
    _getImagesForIds(ids: Array<string>): GetImagesResponse;
    getPixelSize(): {
        width: number;
        height: number;
    };
    getPattern(id: string): ImagePosition;
    bind(engine: WebGPUEngine, uniformName: string): void;
    _updatePatternAtlas(): void;
    beginFrame(): void;
    dispatchRenderCallbacks(ids: Array<string>): void;
}
export {};
