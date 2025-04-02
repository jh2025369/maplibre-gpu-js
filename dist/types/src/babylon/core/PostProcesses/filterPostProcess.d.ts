import type { Nullable } from "../types";
import type { Matrix } from "../Maths/math.vector";
import type { Camera } from "../Cameras/camera";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { AbstractEngine } from "../Engines/abstractEngine";
import type { Scene } from "../scene";
/**
 * Applies a kernel filter to the image
 */
export declare class FilterPostProcess extends PostProcess {
    /** The matrix to be applied to the image */
    kernelMatrix: Matrix;
    /**
     * Gets a string identifying the name of the class
     * @returns "FilterPostProcess" string
     */
    getClassName(): string;
    /**
     *
     * @param name The name of the effect.
     * @param kernelMatrix The matrix to be applied to the image
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     */
    constructor(name: string, kernelMatrix: Matrix, options: number | PostProcessOptions, camera: Nullable<Camera>, samplingMode?: number, engine?: AbstractEngine, reusable?: boolean);
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): Nullable<FilterPostProcess>;
}
