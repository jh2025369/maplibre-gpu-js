import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { Effect } from "../Materials/effect";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import { Constants } from "../Engines/constants";

import "../Shaders/sharpen.fragment";
import { RegisterClass } from "../Misc/typeStore";
import { serialize } from "../Misc/decorators";
import { SerializationHelper } from "../Misc/decorators.serialization";

import type { AbstractEngine } from "../Engines/abstractEngine";
import type { Scene } from "../scene";

/**
 * The SharpenPostProcess applies a sharpen kernel to every pixel
 * See http://en.wikipedia.org/wiki/Kernel_(image_processing)
 */
export class SharpenPostProcess extends PostProcess {
    /**
     * How much of the original color should be applied. Setting this to 0 will display edge detection. (default: 1)
     */
    @serialize()
    public colorAmount: number = 1.0;
    /**
     * How much sharpness should be applied (default: 0.3)
     */
    @serialize()
    public edgeAmount: number = 0.3;

    /**
     * Gets a string identifying the name of the class
     * @returns "SharpenPostProcess" string
     */
    public override getClassName(): string {
        return "SharpenPostProcess";
    }

    /**
     * Creates a new instance ConvolutionPostProcess
     * @param name The name of the effect.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of textures used when performing the post process. (default: 0)
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     */
    constructor(
        name: string,
        options: number | PostProcessOptions,
        camera: Nullable<Camera>,
        samplingMode?: number,
        engine?: AbstractEngine,
        reusable?: boolean,
        textureType: number = Constants.TEXTURETYPE_UNSIGNED_BYTE,
        blockCompilation = false
    ) {
        super(name, "sharpen", ["sharpnessAmounts", "screenSize"], null, options, camera, samplingMode, engine, reusable, null, textureType, undefined, null, blockCompilation);

        this.onApply = (effect: Effect) => {
            effect.setFloat2("screenSize", this.width, this.height);
            effect.setFloat2("sharpnessAmounts", this.edgeAmount, this.colorAmount);
        };
    }

    protected override _gatherImports(useWebGPU: boolean, list: Promise<any>[]) {
        if (useWebGPU) {
            this._webGPUReady = true;
            list.push(Promise.all([import("../ShadersWGSL/sharpen.fragment")]));
        } else {
            list.push(Promise.all([import("../Shaders/sharpen.fragment")]));
        }

        super._gatherImports(useWebGPU, list);
    }

    /**
     * @internal
     */
    public static override _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string) {
        return SerializationHelper.Parse(
            () => {
                return new SharpenPostProcess(
                    parsedPostProcess.name,
                    parsedPostProcess.options,
                    targetCamera,
                    parsedPostProcess.renderTargetSamplingMode,
                    scene.getEngine(),
                    parsedPostProcess.textureType,
                    parsedPostProcess.reusable
                );
            },
            parsedPostProcess,
            scene,
            rootUrl
        );
    }
}

RegisterClass("BABYLON.SharpenPostProcess", SharpenPostProcess);
