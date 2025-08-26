import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { AbstractEngine } from "../Engines/abstractEngine";
import type { Scene } from "../scene";
import "../Shaders/imageProcessing.fragment";
import "../Shaders/subSurfaceScattering.fragment";
import "../Shaders/postprocess.vertex";
import "../ShadersWGSL/imageProcessing.fragment";
import "../ShadersWGSL/subSurfaceScattering.fragment";
import "../ShadersWGSL/postprocess.vertex";
/**
 * Sub surface scattering post process
 */
export declare class SubSurfaceScatteringPostProcess extends PostProcess {
    /**
     * Gets a string identifying the name of the class
     * @returns "SubSurfaceScatteringPostProcess" string
     */
    getClassName(): string;
    constructor(name: string, scene: Scene, options: number | PostProcessOptions, camera?: Nullable<Camera>, samplingMode?: number, engine?: AbstractEngine, reusable?: boolean, textureType?: number);
}
