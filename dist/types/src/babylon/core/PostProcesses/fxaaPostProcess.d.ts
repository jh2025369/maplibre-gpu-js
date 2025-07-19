import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { AbstractEngine } from "../Engines/abstractEngine";
import type { Scene } from "../scene";
/**
 * Fxaa post process
 * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/usePostProcesses#fxaa
 */
export declare class FxaaPostProcess extends PostProcess {
    /**
     * Gets a string identifying the name of the class
     * @returns "FxaaPostProcess" string
     */
    getClassName(): string;
    constructor(name: string, options: number | PostProcessOptions, camera?: Nullable<Camera>, samplingMode?: number, engine?: AbstractEngine, reusable?: boolean, textureType?: number);
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    private _getDefines;
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): FxaaPostProcess;
}
