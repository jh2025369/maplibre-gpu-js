import type { Observer, Nullable, Scene, SubMesh, AbstractMesh, Mesh, Effect, IThinEffectLayerOptions, Color3 } from "core/index";
import { Material } from "../Materials/material";
import { ThinEffectLayer } from "./thinEffectLayer";
import { Color4 } from "../Maths/math.color";
/**
 * Highlight layer options. This helps customizing the behaviour
 * of the highlight layer.
 */
export interface IThinHighlightLayerOptions extends IThinEffectLayerOptions {
    /**
     * Multiplication factor apply to the main texture size in the first step of the blur to reduce the size
     * of the picture to blur (the smaller the faster). Default: 0.5
     */
    blurTextureSizeRatio?: number;
    /**
     * How big in texel of the blur texture is the vertical blur. Default: 1
     */
    blurVerticalSize?: number;
    /**
     * How big in texel of the blur texture is the horizontal blur. Default: 1
     */
    blurHorizontalSize?: number;
    /**
     * Should we display highlight as a solid stroke? Default: false
     */
    isStroke?: boolean;
    /**
     * Use the GLSL code generation for the shader (even on WebGPU). Default is false
     */
    forceGLSL?: boolean;
}
/**
 * Storage interface grouping all the information required for glowing a mesh.
 */
interface IHighlightLayerMesh {
    /**
     * The glowy mesh
     */
    mesh: Mesh;
    /**
     * The color of the glow
     */
    color: Color3;
    /**
     * The mesh render callback use to insert stencil information
     */
    observerHighlight: Nullable<Observer<Mesh>>;
    /**
     * The mesh render callback use to come to the default behavior
     */
    observerDefault: Nullable<Observer<Mesh>>;
    /**
     * If it exists, the emissive color of the material will be used to generate the glow.
     * Else it falls back to the current color.
     */
    glowEmissiveOnly: boolean;
}
/**
 * Storage interface grouping all the information required for an excluded mesh.
 */
interface IHighlightLayerExcludedMesh {
    /**
     * The glowy mesh
     */
    mesh: Mesh;
    /**
     * The mesh render callback use to prevent stencil use
     */
    beforeBind: Nullable<Observer<Mesh>>;
    /**
     * The mesh render callback use to restore previous stencil use
     */
    afterRender: Nullable<Observer<Mesh>>;
    /**
     * Current stencil state of the engine
     */
    stencilState: boolean;
}
/**
 * @internal
 */
export declare class ThinHighlightLayer extends ThinEffectLayer {
    /**
     * Effect Name of the highlight layer.
     */
    static readonly EffectName = "HighlightLayer";
    /**
     * The neutral color used during the preparation of the glow effect.
     * This is black by default as the blend operation is a blend operation.
     */
    static NeutralColor: Color4;
    /**
     * Stencil value used for glowing meshes.
     */
    static GlowingMeshStencilReference: number;
    /**
     * Stencil value used for the other meshes in the scene.
     */
    static NormalMeshStencilReference: number;
    /**
     * Specifies whether or not the inner glow is ACTIVE in the layer.
     */
    innerGlow: boolean;
    /**
     * Specifies whether or not the outer glow is ACTIVE in the layer.
     */
    outerGlow: boolean;
    /**
     * Specifies the horizontal size of the blur.
     */
    set blurHorizontalSize(value: number);
    /**
     * Specifies the vertical size of the blur.
     */
    set blurVerticalSize(value: number);
    /**
     * Gets the horizontal size of the blur.
     */
    get blurHorizontalSize(): number;
    /**
     * Gets the vertical size of the blur.
     */
    get blurVerticalSize(): number;
    private _instanceGlowingMeshStencilReference;
    /** @internal */
    _options: Required<IThinHighlightLayerOptions>;
    private _downSamplePostprocess;
    private _horizontalBlurPostprocess;
    private _verticalBlurPostprocess;
    /** @internal */
    _meshes: Nullable<{
        [id: string]: Nullable<IHighlightLayerMesh>;
    }>;
    /** @internal */
    _excludedMeshes: Nullable<{
        [id: string]: Nullable<IHighlightLayerExcludedMesh>;
    }>;
    /** @internal */
    _mainObjectRendererRenderPassId: number;
    /**
     * Instantiates a new highlight Layer and references it to the scene..
     * @param name The name of the layer
     * @param scene The scene to use the layer in
     * @param options Sets of none mandatory options to use with the layer (see IHighlightLayerOptions for more information)
     * @param dontCheckIfReady Specifies if the layer should disable checking whether all the post processes are ready (default: false). To save performance, this should be set to true and you should call `isReady` manually before rendering to the layer.
     */
    constructor(name: string, scene?: Scene, options?: Partial<IThinHighlightLayerOptions>, dontCheckIfReady?: boolean);
    /**
     * Gets the class name of the effect layer
     * @returns the string with the class name of the effect layer
     */
    getClassName(): string;
    protected _importShadersAsync(): Promise<void>;
    getEffectName(): string;
    _numInternalDraws(): number;
    _createMergeEffect(): Effect;
    _createTextureAndPostProcesses(): void;
    needStencil(): boolean;
    isReady(subMesh: SubMesh, useInstances: boolean): boolean;
    _canRenderMesh(_mesh: AbstractMesh, _material: Material): boolean;
    _internalCompose(effect: Effect, renderIndex: number): void;
    _setEmissiveTextureAndColor(mesh: Mesh, _subMesh: SubMesh, material: Material): void;
    shouldRender(): boolean;
    _shouldRenderMesh(mesh: Mesh): boolean;
    _addCustomEffectDefines(defines: string[]): void;
    /**
     * Add a mesh in the exclusion list to prevent it to impact or being impacted by the highlight layer.
     * @param mesh The mesh to exclude from the highlight layer
     */
    addExcludedMesh(mesh: Mesh): void;
    /**
     * Remove a mesh from the exclusion list to let it impact or being impacted by the highlight layer.
     * @param mesh The mesh to highlight
     */
    removeExcludedMesh(mesh: Mesh): void;
    hasMesh(mesh: AbstractMesh): boolean;
    /**
     * Add a mesh in the highlight layer in order to make it glow with the chosen color.
     * @param mesh The mesh to highlight
     * @param color The color of the highlight
     * @param glowEmissiveOnly Extract the glow from the emissive texture
     */
    addMesh(mesh: Mesh, color: Color3, glowEmissiveOnly?: boolean): void;
    /**
     * Remove a mesh from the highlight layer in order to make it stop glowing.
     * @param mesh The mesh to highlight
     */
    removeMesh(mesh: Mesh): void;
    /**
     * Remove all the meshes currently referenced in the highlight layer
     */
    removeAllMeshes(): void;
    private _defaultStencilReference;
    _disposeMesh(mesh: Mesh): void;
    dispose(): void;
}
export {};
