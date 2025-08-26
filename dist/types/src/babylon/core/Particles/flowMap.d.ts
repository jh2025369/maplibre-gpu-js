import { Matrix, Vector3 } from "../Maths/math.vector";
import type { Particle } from "../Particles/particle";
import type { IVector3Like } from "../Maths/math.like";
import type { Texture } from "core/Materials/Textures/texture";
/**
 * Represents an object that can move or be influenced by FlowMap
 */
export interface IFlowable {
    /**
     * The direction vector indicating the flow or movement direction of the object.
     */
    direction: Vector3;
    /**
     * The current position of the object in 3D space.
     */
    position: Vector3;
}
/**
 * Class used to represent a particle flow map.
 * #5DM02T#7
 * GPUParts: #5DM02T#12 (webgl2)
 * GPUParts: #5DM02T#13 (webgpu)
 */
export declare class FlowMap {
    readonly width: number;
    readonly height: number;
    readonly data: Uint8ClampedArray;
    /**
     * Create a new flow map.
     * @param width defines the width of the flow map
     * @param height defines the height of the flow map
     * @param data defines the data of the flow map
     */
    constructor(width: number, height: number, data: Uint8ClampedArray);
    processFlowable(flowable: IFlowable, strength?: number, flowMapSamplePosOrTransformationMatrix?: IVector3Like | Matrix): void;
    /** @internal */
    _processParticle(particle: Particle, strength?: number, matrix?: Matrix): void;
    /**
     * Creates a FlowMap from a url.
     * @param url The url of the image to load
     * @returns a promise that resolves to a FlowMap object
     */
    static FromUrlAsync(url: string): Promise<FlowMap>;
    /**
     * Load from a texture
     * @param texture defines the source texture
     * @returns a promise fulfilled when image data is loaded
     */
    static ExtractFromTextureAsync(texture: Texture): Promise<FlowMap>;
}
