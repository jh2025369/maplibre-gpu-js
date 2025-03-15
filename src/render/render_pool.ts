import {Texture} from 'core/Materials/Textures/texture';
import {Constants, RenderTargetWrapper, WebGPUEngine} from 'core/Engines';
import {RGBAImage} from 'util/image';

export type PoolObject = {
    id: number;
    fbo: RenderTargetWrapper;
    texture: Texture;
    stamp: number;
    inUse: boolean;
};
/**
 * @internal
 * `RenderPool` is a resource pool for textures and framebuffers
 */
export class RenderPool {
    private _objects: Array<PoolObject>;
    /**
     * An index array of recently used pool objects.
     * Items that are used recently are last in the array
     */
    private _recentlyUsed: Array<number>;
    private _stamp: number;

    constructor(
        private readonly _engine: WebGPUEngine,
        private readonly _size: number,
        private readonly _tileSize: number) {
        this._objects = [];
        this._recentlyUsed = [];
        this._stamp = 0;
    }

    public destruct() {
        for (const obj of this._objects) {
            obj.texture.releaseInternalTexture();
            obj.fbo.dispose();
        }
    }

    private _createObject(id: number): PoolObject {
        const renderTargetOptions = {
            generateMipMaps: false,
            type: Constants.TEXTURETYPE_UNSIGNED_BYTE,
            format: Constants.TEXTUREFORMAT_RGBA,
            samplingMode: Texture.TRILINEAR_SAMPLINGMODE,
            generateDepthBuffer: true,
            generateStencilBuffer: true,
            samples: undefined,
            creationFlags: undefined,
            noColorAttachment: false,
            useSRGBBuffer: false,
            colorAttachment: undefined,
            label: 'renderTarget',
        };
        const size = {width: this._tileSize, height: this._tileSize};
        const fbo = this._engine.createRenderTargetTexture(size, renderTargetOptions);
        const texture = this._engine.createTextureNoUrl(
            size,
            true,
            false,
            false,
            Texture.BILINEAR_SAMPLINGMODE,
            new RGBAImage(size).data.buffer,
            Constants.TEXTUREFORMAT_RGBA
        );
        texture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        texture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
        fbo.setTextures(texture._texture);
        return {id, fbo, texture, stamp: -1, inUse: false};
    }

    public getObjectForId(id: number): PoolObject {
        return this._objects[id];
    }

    public useObject(obj: PoolObject) {
        obj.inUse = true;
        this._recentlyUsed = this._recentlyUsed.filter(id => obj.id !== id);
        this._recentlyUsed.push(obj.id);
    }

    public stampObject(obj: PoolObject) {
        obj.stamp = ++this._stamp;
    }

    public getOrCreateFreeObject(): PoolObject {
        // check for free existing object
        for (const id of this._recentlyUsed) {
            if (!this._objects[id].inUse)
                return this._objects[id];
        }
        if (this._objects.length >= this._size)
            throw new Error('No free RenderPool available, call freeAllObjects() required!');
        // create new object
        const obj = this._createObject(this._objects.length);
        this._objects.push(obj);
        return obj;
    }

    public freeObject(obj: PoolObject) {
        obj.inUse = false;
    }

    public freeAllObjects() {
        for (const obj of this._objects)
            this.freeObject(obj);
    }

    public isFull(): boolean {
        if (this._objects.length < this._size) {
            return false;
        }
        return this._objects.some(o => !o.inUse) === false;
    }
}
