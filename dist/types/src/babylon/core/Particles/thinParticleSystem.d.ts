import type { Immutable, Nullable } from "../types";
import { FactorGradient, Color3Gradient } from "../Misc/gradients";
import { Observable } from "../Misc/observable";
import { Vector3, Matrix } from "../Maths/math.vector";
import { VertexBuffer } from "../Buffers/buffer";
import type { Effect } from "../Materials/effect";
import type { IDisposable, Scene } from "../scene";
import type { IParticleSystem } from "./IParticleSystem";
import { BaseParticleSystem } from "./baseParticleSystem";
import { Particle } from "./particle";
import type { IAnimatable } from "../Animations/animatable.interface";
import { DrawWrapper } from "../Materials/drawWrapper";
import type { DataBuffer } from "../Buffers/dataBuffer";
import { Color4, Color3 } from "../Maths/math.color";
import type { ISize } from "../Maths/math.size";
import type { AbstractEngine } from "../Engines/abstractEngine";
import "../Engines/Extensions/engine.alpha";
import type { ProceduralTexture } from "../Materials/Textures/Procedurals/proceduralTexture";
import { ShaderLanguage } from "core/Materials/shaderLanguage";
import type { _IExecutionQueueItem } from "./Queue/executionQueue";
/**
 * This represents a thin particle system in Babylon.
 * Particles are often small sprites used to simulate hard-to-reproduce phenomena like fire, smoke, water, or abstract visual effects like magic glitter and faery dust.
 * Particles can take different shapes while emitted like box, sphere, cone or you can write your custom function.
 * This thin version contains a limited subset of the total features in order to provide users with a way to get particles but with a smaller footprint
 * @example https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/particle_system_intro
 */
export declare class ThinParticleSystem extends BaseParticleSystem implements IDisposable, IAnimatable, IParticleSystem {
    /**
     * Force all the particle systems to compile to glsl even on WebGPU engines.
     * False by default. This is mostly meant for backward compatibility.
     */
    static ForceGLSL: boolean;
    /**
     * This function can be defined to provide custom update for active particles.
     * This function will be called instead of regular update (age, position, color, etc.).
     * Do not forget that this function will be called on every frame so try to keep it simple and fast :)
     */
    updateFunction: (particles: Particle[]) => void;
    /** @internal */
    _emitterWorldMatrix: Matrix;
    /** @internal */
    _emitterInverseWorldMatrix: Matrix;
    private _startDirectionFunction;
    /**
     * This function can be defined to specify initial direction for every new particle.
     * It by default use the emitterType defined function
     */
    get startDirectionFunction(): Nullable<(worldMatrix: Matrix, directionToUpdate: Vector3, particle: Particle, isLocal: boolean) => void>;
    set startDirectionFunction(value: Nullable<(worldMatrix: Matrix, directionToUpdate: Vector3, particle: Particle, isLocal: boolean) => void>);
    private _startPositionFunction;
    /**
     * This function can be defined to specify initial position for every new particle.
     * It by default use the emitterType defined function
     */
    get startPositionFunction(): Nullable<(worldMatrix: Matrix, positionToUpdate: Vector3, particle: Particle, isLocal: boolean) => void>;
    set startPositionFunction(value: Nullable<(worldMatrix: Matrix, positionToUpdate: Vector3, particle: Particle, isLocal: boolean) => void>);
    /**
     * @internal
     */
    _inheritedVelocityOffset: Vector3;
    /**
     * An event triggered when the system is disposed
     */
    onDisposeObservable: Observable<IParticleSystem>;
    /**
     * An event triggered when the system is stopped
     */
    onStoppedObservable: Observable<IParticleSystem>;
    /**
     * An event triggered when the system is started
     */
    onStartedObservable: Observable<IParticleSystem>;
    private _onDisposeObserver;
    /**
     * Sets a callback that will be triggered when the system is disposed
     */
    set onDispose(callback: () => void);
    /** @internal */
    _noiseTextureSize: Nullable<ISize>;
    /** @internal */
    _noiseTextureData: Nullable<Uint8Array>;
    private _particles;
    private _epsilon;
    private _capacity;
    private _stockParticles;
    private _newPartsExcess;
    private _vertexData;
    private _vertexBuffer;
    private _vertexBuffers;
    private _spriteBuffer;
    private _indexBuffer;
    private _linesIndexBuffer;
    private _linesIndexBufferUseInstancing;
    private _drawWrappers;
    /** @internal */
    _customWrappers: {
        [blendMode: number]: Nullable<DrawWrapper>;
    };
    /** @internal */
    _scaledColorStep: Color4;
    /** @internal */
    _colorDiff: Color4;
    /** @internal */
    _scaledDirection: Vector3;
    /** @internal */
    _scaledGravity: Vector3;
    private _currentRenderId;
    private _alive;
    private _useInstancing;
    private _vertexArrayObject;
    private _isDisposed;
    /**
     * Gets a boolean indicating that the particle system was disposed
     */
    get isDisposed(): boolean;
    private _started;
    private _stopped;
    /** @internal */
    _actualFrame: number;
    /** @internal */
    _scaledUpdateSpeed: number;
    private _vertexBufferSize;
    /** @internal */
    _currentEmitRateGradient: Nullable<FactorGradient>;
    /** @internal */
    _currentEmitRate1: number;
    /** @internal */
    _currentEmitRate2: number;
    /** @internal */
    _currentStartSizeGradient: Nullable<FactorGradient>;
    /** @internal */
    _currentStartSize1: number;
    /** @internal */
    _currentStartSize2: number;
    /** Indicates that the update of particles is done in the animate function */
    readonly updateInAnimate = true;
    private readonly _rawTextureWidth;
    private _rampGradientsTexture;
    private _useRampGradients;
    /** @internal */
    _updateQueueStart: Nullable<_IExecutionQueueItem>;
    protected _colorProcessing: _IExecutionQueueItem;
    protected _angularSpeedGradientProcessing: _IExecutionQueueItem;
    protected _angularSpeedProcessing: _IExecutionQueueItem;
    protected _velocityGradientProcessing: _IExecutionQueueItem;
    protected _directionProcessing: _IExecutionQueueItem;
    protected _limitVelocityGradientProcessing: _IExecutionQueueItem;
    protected _positionProcessing: _IExecutionQueueItem;
    protected _dragGradientProcessing: _IExecutionQueueItem;
    protected _noiseProcessing: _IExecutionQueueItem;
    protected _gravityProcessing: _IExecutionQueueItem;
    protected _sizeGradientProcessing: _IExecutionQueueItem;
    protected _remapGradientProcessing: _IExecutionQueueItem;
    /** @internal */
    _lifeTimeCreation: _IExecutionQueueItem;
    /** @internal */
    _positionCreation: _IExecutionQueueItem;
    private _isLocalCreation;
    /** @internal */
    _directionCreation: _IExecutionQueueItem;
    private _emitPowerCreation;
    /** @internal */
    _sizeCreation: _IExecutionQueueItem;
    private _startSizeCreation;
    /** @internal */
    _angleCreation: _IExecutionQueueItem;
    private _velocityCreation;
    private _limitVelocityCreation;
    private _dragCreation;
    /** @internal */
    _colorCreation: _IExecutionQueueItem;
    private _sheetCreation;
    private _rampCreation;
    private _noiseCreation;
    private _createQueueStart;
    /** @internal */
    _directionScale: number;
    /** @internal */
    _tempScaledUpdateSpeed: number;
    /** @internal */
    _ratio: number;
    /** @internal */
    _emitPower: number;
    /** Gets or sets a matrix to use to compute projection */
    defaultProjectionMatrix: Matrix;
    /** Gets or sets a matrix to use to compute view */
    defaultViewMatrix: Matrix;
    /** Gets or sets a boolean indicating that ramp gradients must be used
     * @see https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/particle_system_intro#ramp-gradients
     */
    get useRampGradients(): boolean;
    set useRampGradients(value: boolean);
    private _isLocal;
    /**
     * Specifies if the particles are updated in emitter local space or world space
     */
    get isLocal(): boolean;
    set isLocal(value: boolean);
    /** Indicates that the particle system is CPU based */
    readonly isGPU = false;
    /**
     * Gets the current list of active particles
     */
    get particles(): Particle[];
    /** Shader language used by the material */
    protected _shaderLanguage: ShaderLanguage;
    /**
     * Gets the shader language used in this material.
     */
    get shaderLanguage(): ShaderLanguage;
    /** @internal */
    get _isAnimationSheetEnabled(): boolean;
    set _isAnimationSheetEnabled(value: boolean);
    /**
     * Gets the number of particles active at the same time.
     * @returns The number of active particles.
     */
    getActiveCount(): number;
    /**
     * Returns the string "ParticleSystem"
     * @returns a string containing the class name
     */
    getClassName(): string;
    /**
     * Gets a boolean indicating that the system is stopping
     * @returns true if the system is currently stopping
     */
    isStopping(): boolean;
    /**
     * Gets the custom effect used to render the particles
     * @param blendMode Blend mode for which the effect should be retrieved
     * @returns The effect
     */
    getCustomEffect(blendMode?: number): Nullable<Effect>;
    private _getCustomDrawWrapper;
    /**
     * Sets the custom effect used to render the particles
     * @param effect The effect to set
     * @param blendMode Blend mode for which the effect should be set
     */
    setCustomEffect(effect: Nullable<Effect>, blendMode?: number): void;
    /** @internal */
    private _onBeforeDrawParticlesObservable;
    /**
     * Observable that will be called just before the particles are drawn
     */
    get onBeforeDrawParticlesObservable(): Observable<Nullable<Effect>>;
    /**
     * Gets the name of the particle vertex shader
     */
    get vertexShaderName(): string;
    /**
     * Gets the vertex buffers used by the particle system
     */
    get vertexBuffers(): Immutable<{
        [key: string]: VertexBuffer;
    }>;
    /**
     * Gets the index buffer used by the particle system (or null if no index buffer is used (if _useInstancing=true))
     */
    get indexBuffer(): Nullable<DataBuffer>;
    get noiseTexture(): Nullable<ProceduralTexture>;
    set noiseTexture(value: Nullable<ProceduralTexture>);
    /**
     * Instantiates a particle system.
     * Particles are often small sprites used to simulate hard-to-reproduce phenomena like fire, smoke, water, or abstract visual effects like magic glitter and faery dust.
     * @param name The name of the particle system
     * @param capacity The max number of particles alive at the same time
     * @param sceneOrEngine The scene the particle system belongs to or the engine to use if no scene
     * @param customEffect a custom effect used to change the way particles are rendered by default
     * @param isAnimationSheetEnabled Must be true if using a spritesheet to animate the particles texture
     * @param epsilon Offset used to render the particles
     * @param noUpdateQueue If true, the particle system will start with an empty update queue
     */
    constructor(name: string, capacity: number, sceneOrEngine: Scene | AbstractEngine, customEffect?: Nullable<Effect>, isAnimationSheetEnabled?: boolean, epsilon?: number, noUpdateQueue?: boolean);
    /** @internal */
    _emitFromParticle: (particle: Particle) => void;
    serialize(serializeTexture: boolean): void;
    /**
     * Clones the particle system.
     * @param name The name of the cloned object
     * @param newEmitter The new emitter to use
     * @param cloneTexture Also clone the textures if true
     */
    clone(name: string, newEmitter: any, cloneTexture?: boolean): ThinParticleSystem;
    private _addFactorGradient;
    private _removeFactorGradient;
    private _syncLifeTimeCreation;
    private _syncStartSizeCreation;
    get targetStopDuration(): number;
    set targetStopDuration(value: number);
    /**
     * Adds a new life time gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the life time factor to affect to the specified gradient
     * @param factor2 defines an additional factor used to define a range ([factor, factor2]) with main value to pick the final value from
     * @returns the current particle system
     */
    addLifeTimeGradient(gradient: number, factor: number, factor2?: number): IParticleSystem;
    /**
     * Remove a specific life time gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeLifeTimeGradient(gradient: number): IParticleSystem;
    /**
     * Adds a new size gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the size factor to affect to the specified gradient
     * @param factor2 defines an additional factor used to define a range ([factor, factor2]) with main value to pick the final value from
     * @returns the current particle system
     */
    addSizeGradient(gradient: number, factor: number, factor2?: number): IParticleSystem;
    /**
     * Remove a specific size gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeSizeGradient(gradient: number): IParticleSystem;
    /**
     * Adds a new color remap gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param min defines the color remap minimal range
     * @param max defines the color remap maximal range
     * @returns the current particle system
     */
    addColorRemapGradient(gradient: number, min: number, max: number): IParticleSystem;
    /**
     * Remove a specific color remap gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeColorRemapGradient(gradient: number): IParticleSystem;
    /**
     * Adds a new alpha remap gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param min defines the alpha remap minimal range
     * @param max defines the alpha remap maximal range
     * @returns the current particle system
     */
    addAlphaRemapGradient(gradient: number, min: number, max: number): IParticleSystem;
    /**
     * Remove a specific alpha remap gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeAlphaRemapGradient(gradient: number): IParticleSystem;
    /**
     * Adds a new angular speed gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the angular speed  to affect to the specified gradient
     * @param factor2 defines an additional factor used to define a range ([factor, factor2]) with main value to pick the final value from
     * @returns the current particle system
     */
    addAngularSpeedGradient(gradient: number, factor: number, factor2?: number): IParticleSystem;
    /**
     * Remove a specific angular speed gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeAngularSpeedGradient(gradient: number): IParticleSystem;
    /**
     * Adds a new velocity gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the velocity to affect to the specified gradient
     * @param factor2 defines an additional factor used to define a range ([factor, factor2]) with main value to pick the final value from
     * @returns the current particle system
     */
    addVelocityGradient(gradient: number, factor: number, factor2?: number): IParticleSystem;
    /**
     * Remove a specific velocity gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeVelocityGradient(gradient: number): IParticleSystem;
    /**
     * Adds a new limit velocity gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the limit velocity value to affect to the specified gradient
     * @param factor2 defines an additional factor used to define a range ([factor, factor2]) with main value to pick the final value from
     * @returns the current particle system
     */
    addLimitVelocityGradient(gradient: number, factor: number, factor2?: number): IParticleSystem;
    /**
     * Remove a specific limit velocity gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeLimitVelocityGradient(gradient: number): IParticleSystem;
    /**
     * Adds a new drag gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the drag value to affect to the specified gradient
     * @param factor2 defines an additional factor used to define a range ([factor, factor2]) with main value to pick the final value from
     * @returns the current particle system
     */
    addDragGradient(gradient: number, factor: number, factor2?: number): IParticleSystem;
    /**
     * Remove a specific drag gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeDragGradient(gradient: number): IParticleSystem;
    /**
     * Adds a new emit rate gradient (please note that this will only work if you set the targetStopDuration property)
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the emit rate value to affect to the specified gradient
     * @param factor2 defines an additional factor used to define a range ([factor, factor2]) with main value to pick the final value from
     * @returns the current particle system
     */
    addEmitRateGradient(gradient: number, factor: number, factor2?: number): IParticleSystem;
    /**
     * Remove a specific emit rate gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeEmitRateGradient(gradient: number): IParticleSystem;
    /**
     * Adds a new start size gradient (please note that this will only work if you set the targetStopDuration property)
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the start size value to affect to the specified gradient
     * @param factor2 defines an additional factor used to define a range ([factor, factor2]) with main value to pick the final value from
     * @returns the current particle system
     */
    addStartSizeGradient(gradient: number, factor: number, factor2?: number): IParticleSystem;
    /**
     * Remove a specific start size gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeStartSizeGradient(gradient: number): IParticleSystem;
    private _createRampGradientTexture;
    /**
     * Gets the current list of ramp gradients.
     * You must use addRampGradient and removeRampGradient to update this list
     * @returns the list of ramp gradients
     */
    getRampGradients(): Nullable<Array<Color3Gradient>>;
    /** Force the system to rebuild all gradients that need to be resync */
    forceRefreshGradients(): void;
    private _syncRampGradientTexture;
    /**
     * Adds a new ramp gradient used to remap particle colors
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param color defines the color to affect to the specified gradient
     * @returns the current particle system
     */
    addRampGradient(gradient: number, color: Color3): ThinParticleSystem;
    /**
     * Remove a specific ramp gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeRampGradient(gradient: number): ThinParticleSystem;
    /**
     * Adds a new color gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param color1 defines the color to affect to the specified gradient
     * @param color2 defines an additional color used to define a range ([color, color2]) with main color to pick the final color from
     * @returns this particle system
     */
    addColorGradient(gradient: number, color1: Color4, color2?: Color4): IParticleSystem;
    /**
     * Remove a specific color gradient
     * @param gradient defines the gradient to remove
     * @returns this particle system
     */
    removeColorGradient(gradient: number): IParticleSystem;
    /**
     * Resets the draw wrappers cache
     */
    resetDrawCache(): void;
    /** @internal */
    _fetchR(u: number, v: number, width: number, height: number, pixels: Uint8Array): number;
    protected _reset(): void;
    private _resetEffect;
    private _createVertexBuffers;
    private _createIndexBuffer;
    /**
     * Gets the maximum number of particles active at the same time.
     * @returns The max number of active particles.
     */
    getCapacity(): number;
    /**
     * Gets whether there are still active particles in the system.
     * @returns True if it is alive, otherwise false.
     */
    isAlive(): boolean;
    /**
     * Gets if the system has been started. (Note: this will still be true after stop is called)
     * @returns True if it has been started, otherwise false.
     */
    isStarted(): boolean;
    /** @internal */
    _preStart(): void;
    /**
     * Starts the particle system and begins to emit
     * @param delay defines the delay in milliseconds before starting the system (this.startDelay by default)
     */
    start(delay?: number): void;
    /**
     * Stops the particle system.
     * @param stopSubEmitters if true it will stop the current system and all created sub-Systems if false it will stop the current root system only, this param is used by the root particle system only. The default value is true.
     */
    stop(stopSubEmitters?: boolean): void;
    /** @internal */
    _postStop(_stopSubEmitters: boolean): void;
    /**
     * Remove all active particles
     */
    reset(): void;
    /**
     * @internal (for internal use only)
     */
    _appendParticleVertex(index: number, particle: Particle, offsetX: number, offsetY: number): void;
    /**
     * "Recycles" one of the particle by copying it back to the "stock" of particles and removing it from the active list.
     * Its lifetime will start back at 0.
     * @param particle
     */
    recycleParticle: (particle: Particle) => void;
    private _createParticle;
    /** @internal */
    _prepareParticle(_particle: Particle): void;
    private _createNewOnes;
    private _update;
    /**
     * @internal
     */
    static _GetAttributeNamesOrOptions(isAnimationSheetEnabled?: boolean, isBillboardBased?: boolean, useRampGradients?: boolean): string[];
    /**
     * @internal
     */
    static _GetEffectCreationOptions(isAnimationSheetEnabled?: boolean, useLogarithmicDepth?: boolean, applyFog?: boolean): string[];
    /**
     * Fill the defines array according to the current settings of the particle system
     * @param defines Array to be updated
     * @param blendMode blend mode to take into account when updating the array
     * @param fillImageProcessing fills the image processing defines
     */
    fillDefines(defines: Array<string>, blendMode: number, fillImageProcessing?: boolean): void;
    /**
     * Fill the uniforms, attributes and samplers arrays according to the current settings of the particle system
     * @param uniforms Uniforms array to fill
     * @param attributes Attributes array to fill
     * @param samplers Samplers array to fill
     */
    fillUniformsAttributesAndSamplerNames(uniforms: Array<string>, attributes: Array<string>, samplers: Array<string>): void;
    /**
     * @internal
     */
    private _getWrapper;
    /**
     * Gets or sets a boolean indicating that the particle system is paused (no animation will be done).
     */
    paused: boolean;
    /**
     * Animates the particle system for the current frame by emitting new particles and or animating the living ones.
     * @param preWarmOnly will prevent the system from updating the vertex buffer (default is false)
     */
    animate(preWarmOnly?: boolean): void;
    private _appendParticleVertices;
    /**
     * Rebuilds the particle system.
     */
    rebuild(): void;
    private _shadersLoaded;
    private _initShaderSourceAsync;
    /**
     * Is this system ready to be used/rendered
     * @returns true if the system is ready
     */
    isReady(): boolean;
    private _render;
    /**
     * Renders the particle system in its current state.
     * @returns the current number of particles
     */
    render(): number;
    /** @internal */
    _onDispose(_disposeAttachedSubEmitters?: boolean, _disposeEndSubEmitters?: boolean): void;
    /**
     * Disposes the particle system and free the associated resources
     * @param disposeTexture defines if the particle texture must be disposed as well (true by default)
     * @param disposeAttachedSubEmitters defines if the attached sub-emitters must be disposed as well (false by default)
     * @param disposeEndSubEmitters defines if the end type sub-emitters must be disposed as well (false by default)
     */
    dispose(disposeTexture?: boolean, disposeAttachedSubEmitters?: boolean, disposeEndSubEmitters?: boolean): void;
}
