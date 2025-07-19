import type { Scene } from "../../scene";
import { ProceduralTexture } from "../../Materials/Textures/Procedurals/proceduralTexture";
import { PostProcess } from "../../PostProcesses/postProcess";
import type { BaseTexture } from "../../Materials/Textures/baseTexture";
import { Observable } from "../../Misc/observable";
/**
 * Build cdf maps for IBL importance sampling during IBL shadow computation.
 * This should not be instanciated directly, as it is part of a scene component
 * @internal
 */
export declare class _IblShadowsImportanceSamplingRenderer {
    private _scene;
    private _engine;
    private _cdfyPT;
    private _icdfyPT;
    private _cdfxPT;
    private _icdfxPT;
    private _iblSource;
    /**
     * Gets the IBL source texture being used by the importance sampling renderer
     */
    get iblSource(): BaseTexture;
    /**
     * Sets the IBL source texture to be used by the importance sampling renderer.
     * This will trigger recreation of the importance sampling assets.
     */
    set iblSource(source: BaseTexture);
    private _recreateAssetsFromNewIbl;
    /**
     * Return the cumulative distribution function (CDF) Y texture
     * @returns Return the cumulative distribution function (CDF) Y texture
     */
    getIcdfyTexture(): ProceduralTexture;
    /**
     * Return the cumulative distribution function (CDF) X texture
     * @returns Return the cumulative distribution function (CDF) X texture
     */
    getIcdfxTexture(): ProceduralTexture;
    /** Enable the debug view for this pass */
    debugEnabled: boolean;
    private _debugPass;
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
     * The name of the debug pass post process
     */
    get debugPassName(): string;
    private _debugPassName;
    /**
     * Gets the debug pass post process
     * @returns The post process
     */
    getDebugPassPP(): PostProcess;
    /**
     * Instanciates the importance sampling renderer
     * @param scene Scene to attach to
     * @returns The importance sampling renderer
     */
    constructor(scene: Scene);
    /**
     * Observable that triggers when the importance sampling renderer is ready
     */
    onReadyObservable: Observable<void>;
    private _createTextures;
    private _disposeTextures;
    private _createDebugPass;
    /**
     * Checks if the importance sampling renderer is ready
     * @returns true if the importance sampling renderer is ready
     */
    isReady(): boolean;
    /**
     * Disposes the importance sampling renderer and associated resources
     */
    dispose(): void;
}
