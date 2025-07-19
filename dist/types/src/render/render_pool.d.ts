import { RenderTargetWrapper, WebGPUEngine } from 'core/Engines';
import { InternalTexture } from 'core/Materials/Textures/internalTexture';
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
export declare class RenderPool {
    private readonly _engine;
    private readonly _size;
    private readonly _tileSize;
    private _objects;
    /**
     * An index array of recently used pool objects.
     * Items that are used recently are last in the array
     */
    private _recentlyUsed;
    private _stamp;
    constructor(_engine: WebGPUEngine, _size: number, _tileSize: number);
    destruct(): void;
    private _createObject;
    getObjectForId(id: number): PoolObject;
    useObject(obj: PoolObject): void;
    stampObject(obj: PoolObject): void;
    getOrCreateFreeObject(): PoolObject;
    freeObject(obj: PoolObject): void;
    freeAllObjects(): void;
    isFull(): boolean;
}
