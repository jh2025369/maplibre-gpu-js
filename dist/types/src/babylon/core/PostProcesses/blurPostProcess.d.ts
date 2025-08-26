import type { Vector2 } from "../Maths/math.vector";
import type { Nullable } from "../types";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { Camera } from "../Cameras/camera";
import type { Effect } from "../Materials/effect";
import type { Scene } from "../scene";
import type { AbstractEngine } from "core/Engines/abstractEngine";
import { ThinBlurPostProcess } from "./thinBlurPostProcess";
/**
 * The Blur Post Process which blurs an image based on a kernel and direction.
 * Can be used twice in x and y directions to perform a gaussian blur in two passes.
 */
export declare class BlurPostProcess extends PostProcess {
    /** The direction in which to blur the image. */
    get direction(): Vector2;
    set direction(value: Vector2);
    /**
     * Sets the length in pixels of the blur sample region
     */
    set kernel(v: number);
    /**
     * Gets the length in pixels of the blur sample region
     */
    get kernel(): number;
    /**
     * Sets whether or not the blur needs to unpack/repack floats
     */
    set packedFloat(v: boolean);
    /**
     * Gets whether or not the blur is unpacking/repacking floats
     */
    get packedFloat(): boolean;
    /**
     * Gets a string identifying the name of the class
     * @returns "BlurPostProcess" string
     */
    getClassName(): string;
    protected _effectWrapper: ThinBlurPostProcess;
    /**
     * Creates a new instance BlurPostProcess
     * @param name The name of the effect.
     * @param direction The direction in which to blur the image.
     * @param kernel The size of the kernel to be used when computing the blur. eg. Size of 3 will blur the center pixel by 2 pixels surrounding it.
     * @param options The required width/height ratio to downsize to before computing the render pass. (Use 1.0 for full size)
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of textures used when performing the post process. (default: 0)
     * @param defines
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     * @param textureFormat Format of textures used when performing the post process. (default: TEXTUREFORMAT_RGBA)
     */
    constructor(name: string, direction: Vector2, kernel: number, options: number | PostProcessOptions, camera?: Nullable<Camera>, samplingMode?: number, engine?: AbstractEngine, reusable?: boolean, textureType?: number, defines?: string, blockCompilation?: boolean, textureFormat?: number);
    updateEffect(_defines?: Nullable<string>, _uniforms?: Nullable<string[]>, _samplers?: Nullable<string[]>, _indexParameters?: any, onCompiled?: (effect: Effect) => void, onError?: (effect: Effect, errors: string) => void): void;
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): Nullable<BlurPostProcess>;
}
