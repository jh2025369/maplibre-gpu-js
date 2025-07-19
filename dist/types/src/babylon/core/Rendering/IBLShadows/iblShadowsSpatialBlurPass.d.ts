import type { Scene } from "../../scene";
import { PostProcess } from "../../PostProcesses/postProcess";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import type { IblShadowsRenderPipeline } from "./iblShadowsRenderPipeline";
/**
 * This should not be instanciated directly, as it is part of a scene component
 * @internal
 */
export declare class _IblShadowsSpatialBlurPass {
    private _scene;
    private _engine;
    private _renderPipeline;
    private _outputTexture;
    private _worldScale;
    private _blurParameters;
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
     * Gets the debug pass post process
     * @returns The post process
     */
    getDebugPassPP(): PostProcess;
    private _debugPassName;
    /**
     * Sets the name of the debug pass
     */
    get debugPassName(): string;
    /**
     * The scale of the voxel grid in world space. This is used to scale the blur radius in world space.
     * @param scale The scale of the voxel grid in world space.
     */
    setWorldScale(scale: number): void;
    /** Enable the debug view for this pass */
    debugEnabled: boolean;
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
     * Instanciates the importance sampling renderer
     * @param scene Scene to attach to
     * @param iblShadowsRenderPipeline The IBL shadows render pipeline
     * @returns The importance sampling renderer
     */
    constructor(scene: Scene, iblShadowsRenderPipeline: IblShadowsRenderPipeline);
    private _createTextures;
    private _setBindings;
    /**
     * Called by render pipeline when canvas resized.
     * @param scaleFactor The factor by which to scale the canvas size.
     */
    resize(scaleFactor?: number): void;
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
