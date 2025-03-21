import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { AbstractEngine } from "core/Engines/abstractEngine";
import { Constants } from "../Engines/constants";

/**
 * Extracts highlights from the image
 * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/usePostProcesses
 */
export class HighlightsPostProcess extends PostProcess {
    /**
     * Gets a string identifying the name of the class
     * @returns "HighlightsPostProcess" string
     */
    public override getClassName(): string {
        return "HighlightsPostProcess";
    }

    /**
     * Extracts highlights from the image
     * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/usePostProcesses
     * @param name The name of the effect.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of texture for the post process (default: Engine.TEXTURETYPE_UNSIGNED_BYTE)
     */
    constructor(
        name: string,
        options: number | PostProcessOptions,
        camera: Nullable<Camera>,
        samplingMode?: number,
        engine?: AbstractEngine,
        reusable?: boolean,
        textureType: number = Constants.TEXTURETYPE_UNSIGNED_BYTE
    ) {
        super(name, "highlights", null, null, options, camera, samplingMode, engine, reusable, null, textureType);
    }

    protected override _gatherImports(useWebGPU: boolean, list: Promise<any>[]) {
        if (useWebGPU) {
            this._webGPUReady = true;
            list.push(Promise.all([import("../ShadersWGSL/highlights.fragment")]));
        } else {
            list.push(Promise.all([import("../Shaders/highlights.fragment")]));
        }

        super._gatherImports(useWebGPU, list);
    }
}
