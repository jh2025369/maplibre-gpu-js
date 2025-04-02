import { RGBAImage } from '../util/image';
import type { StyleImage } from '../style/style_image';
import type { ImageManager } from './image_manager';
import type { Texture } from 'core/Materials/Textures/texture';
import type { Rect } from './glyph_atlas';
import type { GetImagesResponse } from '../util/actor_messages';
import { WebGPUEngine } from 'core/Engines/webgpuEngine';
declare const IMAGE_PADDING: number;
export { IMAGE_PADDING };
export declare class ImagePosition {
    paddedRect: Rect;
    pixelRatio: number;
    version: number;
    stretchY: Array<[number, number]>;
    stretchX: Array<[number, number]>;
    content: [number, number, number, number];
    constructor(paddedRect: Rect, { pixelRatio, version, stretchX, stretchY, content }: StyleImage);
    get tl(): [number, number];
    get br(): [number, number];
    get tlbr(): Array<number>;
    get displaySize(): [number, number];
}
/**
 * A class holding all the images
 */
export declare class ImageAtlas {
    image: RGBAImage;
    iconPositions: {
        [_: string]: ImagePosition;
    };
    patternPositions: {
        [_: string]: ImagePosition;
    };
    haveRenderCallbacks: Array<string>;
    uploaded: boolean;
    constructor(icons: GetImagesResponse, patterns: GetImagesResponse);
    addImages(images: {
        [_: string]: StyleImage;
    }, positions: {
        [_: string]: ImagePosition;
    }, bins: Array<Rect>): void;
    patchUpdatedImages(imageManager: ImageManager, texture: Texture, engine: WebGPUEngine): void;
    patchUpdatedImage(position: ImagePosition, image: StyleImage, texture: Texture, engine: WebGPUEngine): void;
}
