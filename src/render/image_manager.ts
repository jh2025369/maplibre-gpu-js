/* eslint-disable key-spacing */
import potpack from 'potpack';

import {Event, ErrorEvent, Evented} from '../util/evented';
import {RGBAImage} from '../util/image';
import {ImagePosition} from './image_atlas';
import {Texture} from 'core/Materials/Textures/texture';
import {renderStyleImage} from '../style/style_image';
import {warnOnce} from '../util/util';

import type {StyleImage} from '../style/style_image';
import type {WebGPUEngine} from 'core/Engines/webgpuEngine';
import type {PotpackBox} from 'potpack';
import type {GetImagesResponse} from '../util/actor_messages';
import {Constants} from 'core/Engines/constants';
import * as WebGPUConstants from 'core/Engines/WebGPU/webgpuConstants';

type Pattern = {
    bin: PotpackBox;
    position: ImagePosition;
};

/**
 * When copied into the atlas texture, image data is padded by one pixel on each side. Icon
 * images are padded with fully transparent pixels, while pattern images are padded with a
 * copy of the image data wrapped from the opposite side. In both cases, this ensures the
 * correct behavior of GL_LINEAR texture sampling mode.
 */
const padding = 1;

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
export class ImageManager extends Evented {
    images: {[_: string]: StyleImage};
    updatedImages: {[_: string]: boolean};
    callbackDispatchedThisFrame: {[_: string]: boolean};
    loaded: boolean;
    /**
     * This is used to track requests for images that are not yet available. When the image is loaded,
     * the requestors will be notified.
     */
    requestors: Array<{
        ids: Array<string>;
        promiseResolve: (value: GetImagesResponse) => void;
    }>;

    patterns: {[_: string]: Pattern};
    atlasImage: RGBAImage;
    atlasTexture: Texture;
    dirty: boolean;

    constructor() {
        super();
        this.images = {};
        this.updatedImages = {};
        this.callbackDispatchedThisFrame = {};
        this.loaded = false;
        this.requestors = [];

        this.patterns = {};
        this.atlasImage = new RGBAImage({width: 1, height: 1});
        this.dirty = true;
    }

    isLoaded() {
        return this.loaded;
    }

    setLoaded(loaded: boolean) {
        if (this.loaded === loaded) {
            return;
        }

        this.loaded = loaded;

        if (loaded) {
            for (const {ids, promiseResolve} of this.requestors) {
                promiseResolve(this._getImagesForIds(ids));
            }
            this.requestors = [];
        }
    }

    getImage(id: string): StyleImage {
        const image = this.images[id];

        // Extract sprite image data on demand
        if (image && !image.data && image.spriteData) {
            const spriteData = image.spriteData;
            image.data = new RGBAImage({
                width: spriteData.width,
                height: spriteData.height
            }, spriteData.context.getImageData(
                spriteData.x,
                spriteData.y,
                spriteData.width,
                spriteData.height).data);
            image.spriteData = null;
        }

        return image;
    }

    addImage(id: string, image: StyleImage) {
        if (this.images[id]) throw new Error(`Image id ${id} already exist, use updateImage instead`);
        if (this._validate(id, image)) {
            this.images[id] = image;
        }
    }

    _validate(id: string, image: StyleImage) {
        let valid = true;
        const data = image.data || image.spriteData;
        if (!this._validateStretch(image.stretchX, data && data.width)) {
            this.fire(new ErrorEvent(new Error(`Image "${id}" has invalid "stretchX" value`)));
            valid = false;
        }
        if (!this._validateStretch(image.stretchY, data && data.height)) {
            this.fire(new ErrorEvent(new Error(`Image "${id}" has invalid "stretchY" value`)));
            valid = false;
        }
        if (!this._validateContent(image.content, image)) {
            this.fire(new ErrorEvent(new Error(`Image "${id}" has invalid "content" value`)));
            valid = false;
        }
        return valid;
    }

    _validateStretch(stretch: Array<[number, number]>, size: number) {
        if (!stretch) return true;
        let last = 0;
        for (const part of stretch) {
            if (part[0] < last || part[1] < part[0] || size < part[1]) return false;
            last = part[1];
        }
        return true;
    }

    _validateContent(content: [number, number, number, number], image: StyleImage) {
        if (!content) return true;
        if (content.length !== 4) return false;
        const spriteData = image.spriteData;
        const width = (spriteData && spriteData.width) || image.data.width;
        const height = (spriteData && spriteData.height) || image.data.height;
        if (content[0] < 0 || width < content[0]) return false;
        if (content[1] < 0 || height < content[1]) return false;
        if (content[2] < 0 || width < content[2]) return false;
        if (content[3] < 0 || height < content[3]) return false;
        if (content[2] < content[0]) return false;
        if (content[3] < content[1]) return false;
        return true;
    }

    updateImage(id: string, image: StyleImage, validate = true) {
        const oldImage = this.getImage(id);
        if (validate && (oldImage.data.width !== image.data.width || oldImage.data.height !== image.data.height)) {
            throw new Error(`size mismatch between old image (${oldImage.data.width}x${oldImage.data.height}) and new image (${image.data.width}x${image.data.height}).`);
        }
        image.version = oldImage.version + 1;
        this.images[id] = image;
        this.updatedImages[id] = true;
    }

    removeImage(id: string) {
        const image = this.images[id];
        delete this.images[id];
        delete this.patterns[id];

        if (image.userImage && image.userImage.onRemove) {
            image.userImage.onRemove();
        }
    }

    listImages(): Array<string> {
        return Object.keys(this.images);
    }

    getImages(ids: Array<string>): Promise<GetImagesResponse> {
        return new Promise<GetImagesResponse>((resolve, _reject) => {
            // If the sprite has been loaded, or if all the icon dependencies are already present
            // (i.e. if they've been added via runtime styling), then notify the requestor immediately.
            // Otherwise, delay notification until the sprite is loaded. At that point, if any of the
            // dependencies are still unavailable, we'll just assume they are permanently missing.
            let hasAllDependencies = true;
            if (!this.isLoaded()) {
                for (const id of ids) {
                    if (!this.images[id]) {
                        hasAllDependencies = false;
                    }
                }
            }
            if (this.isLoaded() || hasAllDependencies) {
                resolve(this._getImagesForIds(ids));
            } else {
                this.requestors.push({ids, promiseResolve: resolve});
            }
        });
    }

    _getImagesForIds(ids: Array<string>): GetImagesResponse {
        const response: GetImagesResponse = {};

        for (const id of ids) {
            let image = this.getImage(id);

            if (!image) {
                this.fire(new Event('styleimagemissing', {id}));
                //Try to acquire image again in case styleimagemissing has populated it
                image = this.getImage(id);
            }

            if (image) {
                // Clone the image so that our own copy of its ArrayBuffer doesn't get transferred.
                response[id] = {
                    data: image.data.clone(),
                    pixelRatio: image.pixelRatio,
                    sdf: image.sdf,
                    version: image.version,
                    stretchX: image.stretchX,
                    stretchY: image.stretchY,
                    content: image.content,
                    hasRenderCallback: Boolean(image.userImage && image.userImage.render)
                };
            } else {
                warnOnce(`Image "${id}" could not be loaded. Please make sure you have added the image with map.addImage() or a "sprite" property in your style. You can provide missing images by listening for the "styleimagemissing" map event.`);
            }
        }
        return response;
    }

    // Pattern stuff

    getPixelSize() {
        const {width, height} = this.atlasImage;
        return {width, height};
    }

    getPattern(id: string): ImagePosition {
        const pattern = this.patterns[id];

        const image = this.getImage(id);
        if (!image) {
            return null;
        }

        if (pattern && pattern.position.version === image.version) {
            return pattern.position;
        }

        if (!pattern) {
            const w = image.data.width + padding * 2;
            const h = image.data.height + padding * 2;
            const bin = {w, h, x: 0, y: 0};
            const position = new ImagePosition(bin, image);
            this.patterns[id] = {bin, position};
        } else {
            pattern.position.version = image.version;
        }

        this._updatePatternAtlas();

        return this.patterns[id].position;
    }

    bind(engine: WebGPUEngine, uniformName: string) {
        if (!this.atlasTexture) {
            this.atlasTexture = engine.createTextureNoUrl(
                this.atlasImage,
                true,
                false,
                true,
                Texture.BILINEAR_SAMPLINGMODE,
                this.atlasImage.data.buffer,
                Constants.TEXTUREFORMAT_RGBA
            );
            this.atlasTexture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
            this.atlasTexture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        } else if (this.dirty) {
            engine._textureHelper.updateTexture(this.atlasImage.data, this.atlasTexture._texture, this.atlasImage.width,
                this.atlasImage.height, 0, WebGPUConstants.TextureFormat.RGBA8Unorm, 0, 0, false, true, 0, 0);
            this.dirty = false;
        }

        engine.setTexture2(this.atlasTexture, uniformName);
    }

    _updatePatternAtlas() {
        const bins = [];
        for (const id in this.patterns) {
            bins.push(this.patterns[id].bin);
        }

        const {w, h} = potpack(bins);

        const dst = this.atlasImage;
        dst.resize({width: w || 1, height: h || 1});

        for (const id in this.patterns) {
            const {bin} = this.patterns[id];
            const x = bin.x + padding;
            const y = bin.y + padding;
            const src = this.getImage(id).data;
            const w = src.width;
            const h = src.height;

            RGBAImage.copy(src, dst, {x: 0, y: 0}, {x, y}, {width: w, height: h});

            // Add 1 pixel wrapped padding on each side of the image.
            RGBAImage.copy(src, dst, {x: 0, y: h - 1}, {x, y: y - 1}, {width: w, height: 1}); // T
            RGBAImage.copy(src, dst, {x: 0, y:     0}, {x, y: y + h}, {width: w, height: 1}); // B
            RGBAImage.copy(src, dst, {x: w - 1, y: 0}, {x: x - 1, y}, {width: 1, height: h}); // L
            RGBAImage.copy(src, dst, {x: 0,     y: 0}, {x: x + w, y}, {width: 1, height: h}); // R
        }

        this.dirty = true;
    }

    beginFrame() {
        this.callbackDispatchedThisFrame = {};
    }

    dispatchRenderCallbacks(ids: Array<string>) {
        for (const id of ids) {

            // the callback for the image was already dispatched for a different frame
            if (this.callbackDispatchedThisFrame[id]) continue;
            this.callbackDispatchedThisFrame[id] = true;

            const image = this.getImage(id);
            if (!image) warnOnce(`Image with ID: "${id}" was not found`);

            const updated = renderStyleImage(image);
            if (updated) {
                this.updateImage(id, image);
            }
        }
    }
}
