import {Texture} from 'core/Materials/Textures/texture';
import {Constants, RenderTargetWrapper, WebGPUEngine} from 'core/Engines';
import {InternalTexture, InternalTextureSource} from 'core/Materials/Textures/internalTexture';

export type PoolObject = {
    id: number;
    fbo: RenderTargetWrapper;
    texture: InternalTexture;
    stamp: number;
    inUse: boolean;
    renderPassDescriptor?: GPURenderPassDescriptor;
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
            obj.texture.dispose();
            obj.fbo.dispose();
            obj.renderPassDescriptor = null;
        }
    }

    private _createObject(id: number): PoolObject {
        const size = {width: this._tileSize, height: this._tileSize};
        const texture = this._engine._createInternalTexture(
            size,
            {
                generateMipMaps: false,
                samplingMode: Texture.TRILINEAR_SAMPLINGMODE,
                creationFlags: 0,
                samples: undefined,
                label: 'renderTarget',
                format: Constants.TEXTUREFORMAT_RGBA,
                type: Constants.TEXTURETYPE_UNSIGNED_BYTE
            },
            true,
            InternalTextureSource.RenderTarget
        );
        this._engine._textureHelper.createGPUTextureForInternalTexture(texture, undefined, undefined, undefined, 0);
        const renderTargetOptions = {
            generateMipMaps: false,
            type: Constants.TEXTURETYPE_UNSIGNED_BYTE,
            format: Constants.TEXTUREFORMAT_RGBA,
            samplingMode: Texture.TRILINEAR_SAMPLINGMODE,
            generateDepthBuffer: true,
            generateStencilBuffer: true,
            samples: undefined,
            creationFlags: 0,
            noColorAttachment: false,
            useSRGBBuffer: false,
            colorAttachment: texture,
            label: 'renderTarget',
        };
        const fbo = this._engine.createRenderTargetTexture(size, renderTargetOptions);
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
            if (!this._objects[id].inUse) {
                return this._objects[id];
            }
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
        for (const obj of this._objects) {
            this.freeObject(obj);
        }
    }

    public isFull(): boolean {
        if (this._objects.length < this._size) {
            return false;
        }
        return this._objects.some(o => !o.inUse) === false;
    }
}
