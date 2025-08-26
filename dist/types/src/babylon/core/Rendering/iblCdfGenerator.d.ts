import type { AbstractEngine } from "../Engines/abstractEngine";
import type { Scene } from "../scene";
import { Texture } from "../Materials/Textures/texture";
import { PostProcess } from "../PostProcesses/postProcess";
import { Vector3 } from "../Maths/math.vector";
import type { BaseTexture } from "../Materials/Textures/baseTexture";
import { Observable } from "../Misc/observable";
import type { Nullable } from "../types";
/**
 * Build cdf maps to be used for IBL importance sampling.
 */
export declare class IblCdfGenerator {
    private _scene;
    private _engine;
    private _cdfyPT;
    private _cdfxPT;
    private _icdfPT;
    private _scaledLuminancePT;
    private _dominantDirectionPT;
    private _iblSource;
    private _dummyTexture;
    private _cachedDominantDirection;
    /**
     * Returns whether the CDF renderer is supported by the current engine
     */
    get isSupported(): boolean;
    /**
     * Gets the IBL source texture being used by the CDF renderer
     */
    get iblSource(): Nullable<BaseTexture>;
    /**
     * Sets the IBL source texture to be used by the CDF renderer.
     * This will trigger recreation of the CDF assets.
     */
    set iblSource(source: Nullable<BaseTexture>);
    private _recreateAssetsFromNewIbl;
    /**
     * Return the cumulative distribution function (CDF) texture
     * @returns Return the cumulative distribution function (CDF) texture
     */
    getIcdfTexture(): Texture;
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
     * @internal
     */
    static _SceneComponentInitialization: (scene: Scene) => void;
    /**
     * Instanciates the CDF renderer
     * @param sceneOrEngine Scene to attach to
     * @returns The CDF renderer
     */
    constructor(sceneOrEngine: Nullable<Scene | AbstractEngine>);
    /**
     * Observable that triggers when the CDF renderer is ready
     */
    onGeneratedObservable: Observable<void>;
    private _createTextures;
    private _disposeTextures;
    private _createDebugPass;
    /**
     * Checks if the CDF renderer is ready
     * @returns true if the CDF renderer is ready
     */
    isReady(): boolean;
    /**
     * Explicitly trigger generation of CDF maps when they are ready to render.
     * @returns Promise that resolves when the CDF maps are rendered.
     */
    renderWhenReady(): Promise<void>;
    /**
     * Finds the average direction of the highest intensity areas of the IBL source
     * @returns Async promise that resolves to the dominant direction of the IBL source
     */
    findDominantDirection(): Promise<Vector3>;
    /**
     * Disposes the CDF renderer and associated resources
     */
    dispose(): void;
    private static _IsScene;
}
