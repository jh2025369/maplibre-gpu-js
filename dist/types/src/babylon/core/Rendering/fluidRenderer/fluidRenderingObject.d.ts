import type { VertexBuffer } from "core/Buffers/buffer";
import type { DataBuffer } from "core/Buffers/dataBuffer";
import type { AbstractEngine } from "core/Engines/abstractEngine";
import { EffectWrapper } from "core/Materials/effectRenderer";
import { Observable } from "core/Misc/observable";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import { ShaderLanguage } from "core/Materials/shaderLanguage";
/**
 * Defines the base object used for fluid rendering.
 * It is based on a list of vertices (particles)
 */
export declare abstract class FluidRenderingObject {
    protected _scene: Scene;
    protected _engine: AbstractEngine;
    protected _effectsAreDirty: boolean;
    protected _depthEffectWrapper: Nullable<EffectWrapper>;
    protected _thicknessEffectWrapper: Nullable<EffectWrapper>;
    /** Defines the priority of the object. Objects will be rendered in ascending order of priority */
    priority: number;
    protected _particleSize: number;
    /** Observable triggered when the size of the particle is changed */
    onParticleSizeChanged: Observable<FluidRenderingObject>;
    /** Gets or sets the size of the particle */
    get particleSize(): number;
    set particleSize(size: number);
    /** Defines the alpha value of a particle */
    particleThicknessAlpha: number;
    /** Indicates if the object uses instancing or not */
    get useInstancing(): boolean;
    private _useVelocity;
    /** Indicates if velocity of particles should be used when rendering the object. The vertex buffer set must contain a "velocity" buffer for this to work! */
    get useVelocity(): boolean;
    set useVelocity(use: boolean);
    private _hasVelocity;
    /**
     * Gets the vertex buffers
     */
    abstract get vertexBuffers(): {
        [key: string]: VertexBuffer;
    };
    /**
     * Gets the index buffer (or null if the object is using instancing)
     */
    get indexBuffer(): Nullable<DataBuffer>;
    /**
     * @returns the name of the class
     */
    getClassName(): string;
    /** Shader language used by the object */
    protected _shaderLanguage: ShaderLanguage;
    /**
     * Gets the shader language used in this object
     */
    get shaderLanguage(): ShaderLanguage;
    /**
     * Instantiates a fluid rendering object
     * @param scene The scene the object is part of
     * @param shaderLanguage The shader language to use
     */
    constructor(scene: Scene, shaderLanguage?: ShaderLanguage);
    protected _createEffects(): void;
    /**
     * Indicates if the object is ready to be rendered
     * @returns True if everything is ready for the object to be rendered, otherwise false
     */
    isReady(): boolean;
    /**
     * Gets the number of particles (vertices) of this object
     * @returns The number of particles
     */
    abstract get numParticles(): number;
    /**
     * Render the depth texture for this object
     */
    renderDepthTexture(): void;
    /**
     * Render the thickness texture for this object
     */
    renderThicknessTexture(): void;
    /**
     * Render the diffuse texture for this object
     */
    renderDiffuseTexture(): void;
    /**
     * Releases the ressources used by the class
     */
    dispose(): void;
}
