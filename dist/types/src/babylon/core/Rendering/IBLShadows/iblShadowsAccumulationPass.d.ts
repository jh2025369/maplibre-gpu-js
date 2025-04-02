import type { Scene } from "../../scene";
import { PostProcess } from "../../PostProcesses/postProcess";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import type { IblShadowsRenderPipeline } from "./iblShadowsRenderPipeline";
import { Observable } from "../../Misc/observable";
/**
 * This should not be instanciated directly, as it is part of a scene component
 * @internal
 */
export declare class _IblShadowsAccumulationPass {
    private _scene;
    private _engine;
    private _renderPipeline;
    private _outputTexture;
    private _oldAccumulationCopy;
    private _oldPositionCopy;
    private _accumulationParams;
    /** Enable the debug view for this pass */
    debugEnabled: boolean;
    /**
     * Is the effect enabled
     */
    enabled: boolean;
    /**
     * Returns the output texture of the pass.
     * @returns The output texture.
     */
    getOutputTexture(): ProceduralTexture;
    /**
     * Observable that triggers when the accumulation texture is ready
     */
    onReadyObservable: Observable<void>;
    /**
     * Gets the debug pass post process
     * @returns The post process
     */
    getDebugPassPP(): PostProcess;
    private _debugPassName;
    /**
     * Gets the name of the debug pass
     * @returns The name of the debug pass
     */
    get debugPassName(): string;
    /**
     * A value that controls how much of the previous frame's accumulation to keep.
     * The higher the value, the faster the shadows accumulate but the more potential ghosting you'll see.
     */
    get remanence(): number;
    /**
     * A value that controls how much of the previous frame's accumulation to keep.
     * The higher the value, the faster the shadows accumulate but the more potential ghosting you'll see.
     */
    set remanence(value: number);
    private _remanence;
    /**
     * Reset the accumulation.
     */
    get reset(): boolean;
    /**
     * Reset the accumulation.
     */
    set reset(value: boolean);
    private _reset;
    /**
     * Tell the pass that the camera is moving. This will cause the accumulation
     * rate to change.
     */
    set isMoving(value: boolean);
    private _isMoving;
    private _debugPassPP;
    private _debugSizeParams;
    /**
     * Sets params that control the position and scaling of the debug display on the screen.
     * @param x Screen X offset of the debug display (0-1)
     * @param y Screen Y offset of the debug display (0-1)
     * @param widthScale X scale of the debug display (0-1)
     * @param heightScale Y scale of the debug display (0-1)
     */
    setDebugDisplayParams(x: number, y: number, widthScale: number, heightScale: number): void;
    /**
     * Creates the debug post process effect for this pass
     */
    private _createDebugPass;
    /**
     * Instantiates the accumulation pass
     * @param scene Scene to attach to
     * @param iblShadowsRenderPipeline The IBL shadows render pipeline
     * @returns The accumulation pass
     */
    constructor(scene: Scene, iblShadowsRenderPipeline: IblShadowsRenderPipeline);
    private _createTextures;
    private _setOutputTextureBindings;
    private _updatePositionCopy;
    private _setAccumulationCopyBindings;
    /**
     * Called by render pipeline when canvas resized.
     * @param scaleFactor The factor by which to scale the canvas size.
     */
    resize(scaleFactor?: number): void;
    private _disposeTextures;
    /**
     * Checks if the pass is ready
     * @returns true if the pass is ready
     */
    isReady(): boolean;
    /**
     * Disposes the associated resources
     */
    dispose(): void;
}
