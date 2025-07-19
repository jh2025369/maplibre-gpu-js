import type { Nullable } from "../types";
import type { IMatrixLike } from "../Maths/math.like";
import type { AbstractEngine } from "../Engines/abstractEngine";
import type { ThinSprite } from "./thinSprite";
import type { ISize } from "../Maths/math.size";
import type { ThinTexture } from "../Materials/Textures/thinTexture";
import type { Scene } from "../scene";
import { ShaderLanguage } from "../Materials/shaderLanguage";
/**
 * Options for the SpriteRenderer
 */
export interface SpriteRendererOptions {
    /**
     * Sets a boolean indicating if the renderer must render sprites with pixel perfect rendering.
     * In this mode, sprites are rendered as "pixel art", which means that they appear as pixelated but remain stable when moving or when rotated or scaled.
     * Note that for this mode to work as expected, the sprite texture must use the BILINEAR sampling mode, not NEAREST!
     * Default is false.
     */
    pixelPerfect?: boolean;
}
/**
 * Class used to render sprites.
 *
 * It can be used either to render Sprites or ThinSprites with ThinEngine only.
 */
export declare class SpriteRenderer {
    /**
     * Force all the sprites to compile to glsl even on WebGPU engines.
     * False by default. This is mostly meant for backward compatibility.
     */
    static ForceGLSL: boolean;
    /**
     * Defines the texture of the spritesheet
     */
    texture: Nullable<ThinTexture>;
    /**
     * Defines the default width of a cell in the spritesheet
     */
    cellWidth: number;
    /**
     * Defines the default height of a cell in the spritesheet
     */
    cellHeight: number;
    /**
     * Blend mode use to render the particle, it can be any of
     * the static Constants.ALPHA_x properties provided in this class.
     * Default value is Constants.ALPHA_COMBINE
     */
    blendMode: number;
    /**
     * Gets or sets a boolean indicating if alpha mode is automatically
     * reset.
     */
    autoResetAlpha: boolean;
    /**
     * Disables writing to the depth buffer when rendering the sprites.
     * It can be handy to disable depth writing when using textures without alpha channel
     * and setting some specific blend modes.
     */
    disableDepthWrite: boolean;
    private _fogEnabled;
    /**
     * Gets or sets a boolean indicating if the manager must consider scene fog when rendering
     */
    get fogEnabled(): boolean;
    set fogEnabled(value: boolean);
    protected _useLogarithmicDepth: boolean;
    /**
     * In case the depth buffer does not allow enough depth precision for your scene (might be the case in large scenes)
     * You can try switching to logarithmic depth.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/logarithmicDepthBuffer
     */
    get useLogarithmicDepth(): boolean;
    set useLogarithmicDepth(value: boolean);
    /**
     * Gets the capacity of the manager
     */
    get capacity(): number;
    private _pixelPerfect;
    /**
     * Gets or sets a boolean indicating if the renderer must render sprites with pixel perfect rendering
     * Note that pixel perfect mode is not supported in WebGL 1
     */
    get pixelPerfect(): boolean;
    set pixelPerfect(value: boolean);
    /** Shader language used by the material */
    protected _shaderLanguage: ShaderLanguage;
    /**
     * Gets the shader language used in this renderer.
     */
    get shaderLanguage(): ShaderLanguage;
    private readonly _engine;
    private readonly _useVAO;
    private readonly _useInstancing;
    private readonly _scene;
    private readonly _capacity;
    private readonly _epsilon;
    private _vertexBufferSize;
    private _vertexData;
    private _buffer;
    private _vertexBuffers;
    private _spriteBuffer;
    private _indexBuffer;
    private _drawWrapperBase;
    private _drawWrapperDepth;
    private _vertexArrayObject;
    private _isDisposed;
    /**
     * Creates a new sprite renderer
     * @param engine defines the engine the renderer works with
     * @param capacity defines the maximum allowed number of sprites
     * @param epsilon defines the epsilon value to align texture (0.01 by default)
     * @param scene defines the hosting scene
     * @param rendererOptions options for the sprite renderer
     */
    constructor(engine: AbstractEngine, capacity: number, epsilon?: number, scene?: Nullable<Scene>, rendererOptions?: SpriteRendererOptions);
    private _shadersLoaded;
    private _initShaderSourceAsync;
    private _createEffects;
    /**
     * Render all child sprites
     * @param sprites defines the list of sprites to render
     * @param deltaTime defines the time since last frame
     * @param viewMatrix defines the viewMatrix to use to render the sprites
     * @param projectionMatrix defines the projectionMatrix to use to render the sprites
     * @param customSpriteUpdate defines a custom function to update the sprites data before they render
     */
    render(sprites: ThinSprite[], deltaTime: number, viewMatrix: IMatrixLike, projectionMatrix: IMatrixLike, customSpriteUpdate?: Nullable<(sprite: ThinSprite, baseSize: ISize) => void>): void;
    private _appendSpriteVertex;
    private _buildIndexBuffer;
    /**
     * Rebuilds the renderer (after a context lost, for eg)
     */
    rebuild(): void;
    /**
     * Release associated resources
     */
    dispose(): void;
}
