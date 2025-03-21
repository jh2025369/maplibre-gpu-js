import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { Camera } from "../Cameras/camera";
import type { AbstractEngine } from "../Engines/abstractEngine";

import { RegisterClass } from "../Misc/typeStore";
import { serialize } from "../Misc/decorators";
import { SerializationHelper } from "../Misc/decorators.serialization";
import type { Nullable } from "../types";

import type { Scene } from "../scene";
import { ThinBlackAndWhitePostProcess } from "./thinBlackAndWhitePostProcess";

/**
 * Post process used to render in black and white
 */
export class BlackAndWhitePostProcess extends PostProcess {
    /**
     * Linear about to convert he result to black and white (default: 1)
     */
    @serialize()
    public get degree() {
        return this._effectWrapper.degree;
    }

    public set degree(value: number) {
        this._effectWrapper.degree = value;
    }

    /**
     * Gets a string identifying the name of the class
     * @returns "BlackAndWhitePostProcess" string
     */
    public override getClassName(): string {
        return "BlackAndWhitePostProcess";
    }

    protected override _effectWrapper: ThinBlackAndWhitePostProcess;

    /**
     * Creates a black and white post process
     * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/usePostProcesses#black-and-white
     * @param name The name of the effect.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     */
    constructor(name: string, options: number | PostProcessOptions, camera: Nullable<Camera> = null, samplingMode?: number, engine?: AbstractEngine, reusable?: boolean) {
        const localOptions = {
            uniforms: ThinBlackAndWhitePostProcess.Uniforms,
            size: typeof options === "number" ? options : undefined,
            camera,
            samplingMode,
            engine,
            reusable,
            ...(options as PostProcessOptions),
        };

        super(name, ThinBlackAndWhitePostProcess.FragmentUrl, {
            effectWrapper: typeof options === "number" || !options.effectWrapper ? new ThinBlackAndWhitePostProcess(name, engine, localOptions) : undefined,
            ...localOptions,
        });
    }

    /**
     * @internal
     */
    public static override _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): Nullable<BlackAndWhitePostProcess> {
        return SerializationHelper.Parse(
            () => {
                return new BlackAndWhitePostProcess(
                    parsedPostProcess.name,
                    parsedPostProcess.options,
                    targetCamera,
                    parsedPostProcess.renderTargetSamplingMode,
                    scene.getEngine(),
                    parsedPostProcess.reusable
                );
            },
            parsedPostProcess,
            scene,
            rootUrl
        );
    }
}

RegisterClass("BABYLON.BlackAndWhitePostProcess", BlackAndWhitePostProcess);
