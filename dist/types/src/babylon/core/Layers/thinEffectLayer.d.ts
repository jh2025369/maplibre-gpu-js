import { Observable } from "../Misc/observable";
import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { Scene } from "../scene";
import { Color4 } from "../Maths/math.color";
import type { AbstractEngine } from "../Engines/abstractEngine";
import type { SubMesh } from "../Meshes/subMesh";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Mesh } from "../Meshes/mesh";
import type { EffectWrapperCreationOptions } from "core/Materials/effectRenderer";
import { EffectWrapper } from "core/Materials/effectRenderer";
import type { BaseTexture } from "../Materials/Textures/baseTexture";
import type { Effect } from "../Materials/effect";
import { Material } from "../Materials/material";
import { ShaderLanguage } from "core/Materials/shaderLanguage";
import { ObjectRenderer } from "core/Rendering/objectRenderer";
import type { Vector2 } from "../Maths/math.vector";
/**
 * Special Glow Blur post process only blurring the alpha channel
 * It enforces keeping the most luminous color in the color channel.
 * @internal
 */
export declare class ThinGlowBlurPostProcess extends EffectWrapper {
    direction: Vector2;
    kernel: number;
    /**
     * The fragment shader url
     */
    static readonly FragmentUrl = "glowBlurPostProcess";
    /**
     * The list of uniforms used by the effect
     */
    static readonly Uniforms: string[];
    constructor(name: string, engine: Nullable<AbstractEngine>, direction: Vector2, kernel: number, options?: EffectWrapperCreationOptions);
    protected _gatherImports(useWebGPU: boolean, list: Promise<any>[]): void;
    textureWidth: number;
    textureHeight: number;
    bind(): void;
}
/**
 * Effect layer options. This helps customizing the behaviour
 * of the effect layer.
 */
export interface IThinEffectLayerOptions {
    /**
     * Multiplication factor apply to the canvas size to compute the render target size
     * used to generated the glowing objects (the smaller the faster). Default: 0.5
     */
    mainTextureRatio?: number;
    /**
     * Enforces a fixed size texture to ensure resize independent blur. Default: undefined
     */
    mainTextureFixedSize?: number;
    /**
     * The type of the main texture. Default: TEXTURETYPE_UNSIGNED_BYTE
     */
    mainTextureType?: number;
    /**
     * Alpha blending mode used to apply the blur. Default depends of the implementation. Default: ALPHA_COMBINE
     */
    alphaBlendingMode?: number;
    /**
     * The camera attached to the layer. Default: null
     */
    camera?: Nullable<Camera>;
    /**
     * The rendering group to draw the layer in. Default: -1
     */
    renderingGroupId?: number;
}
/**
 * @internal
 */
export declare class ThinEffectLayer {
    private _additionalImportShadersAsync?;
    private _vertexBuffers;
    private _indexBuffer;
    private _mergeDrawWrapper;
    private _dontCheckIfReady;
    protected _scene: Scene;
    protected _engine: AbstractEngine;
    /** @internal */
    _options: Required<IThinEffectLayerOptions>;
    protected _objectRenderer: ObjectRenderer;
    /** @internal */
    _shouldRender: boolean;
    /** @internal */
    _emissiveTextureAndColor: {
        texture: Nullable<BaseTexture>;
        color: Color4;
    };
    /** @internal */
    _effectIntensity: {
        [meshUniqueId: number]: number;
    };
    /** @internal */
    _postProcesses: EffectWrapper[];
    /**
     * Force all the effect layers to compile to glsl even on WebGPU engines.
     * False by default. This is mostly meant for backward compatibility.
     */
    static ForceGLSL: boolean;
    /**
     * The name of the layer
     */
    name: string;
    /**
     * The clear color of the texture used to generate the glow map.
     */
    neutralColor: Color4;
    /**
     * Specifies whether the effect layer is enabled or not.
     */
    isEnabled: boolean;
    /**
     * Gets/sets the camera attached to the layer.
     */
    get camera(): Nullable<Camera>;
    set camera(camera: Nullable<Camera>);
    /**
     * Gets the rendering group id the layer should render in.
     */
    get renderingGroupId(): number;
    set renderingGroupId(renderingGroupId: number);
    /**
     * Specifies if the bounding boxes should be rendered normally or if they should undergo the effect of the layer
     */
    disableBoundingBoxesFromEffectLayer: boolean;
    /**
     * An event triggered when the effect layer has been disposed.
     */
    onDisposeObservable: Observable<ThinEffectLayer>;
    /**
     * An event triggered when the effect layer is about rendering the main texture with the glowy parts.
     */
    onBeforeRenderLayerObservable: Observable<ThinEffectLayer>;
    /**
     * An event triggered when the generated texture is being merged in the scene.
     */
    onBeforeComposeObservable: Observable<ThinEffectLayer>;
    /**
     * An event triggered when the mesh is rendered into the effect render target.
     */
    onBeforeRenderMeshToEffect: Observable<AbstractMesh>;
    /**
     * An event triggered after the mesh has been rendered into the effect render target.
     */
    onAfterRenderMeshToEffect: Observable<AbstractMesh>;
    /**
     * An event triggered when the generated texture has been merged in the scene.
     */
    onAfterComposeObservable: Observable<ThinEffectLayer>;
    /**
     * An event triggered when the layer is being blurred.
     */
    onBeforeBlurObservable: Observable<ThinEffectLayer>;
    /**
     * An event triggered when the layer has been blurred.
     */
    onAfterBlurObservable: Observable<ThinEffectLayer>;
    /**
     * Gets the object renderer used to render objects in the layer
     */
    get objectRenderer(): ObjectRenderer;
    protected _shaderLanguage: ShaderLanguage;
    /**
     * Gets the shader language used in this material.
     */
    get shaderLanguage(): ShaderLanguage;
    private _materialForRendering;
    /**
     * Sets a specific material to be used to render a mesh/a list of meshes in the layer
     * @param mesh mesh or array of meshes
     * @param material material to use by the layer when rendering the mesh(es). If undefined is passed, the specific material created by the layer will be used.
     */
    setMaterialForRendering(mesh: AbstractMesh | AbstractMesh[], material?: Material): void;
    /**
     * Gets the intensity of the effect for a specific mesh.
     * @param mesh The mesh to get the effect intensity for
     * @returns The intensity of the effect for the mesh
     */
    getEffectIntensity(mesh: AbstractMesh): number;
    /**
     * Sets the intensity of the effect for a specific mesh.
     * @param mesh The mesh to set the effect intensity for
     * @param intensity The intensity of the effect for the mesh
     */
    setEffectIntensity(mesh: AbstractMesh, intensity: number): void;
    /**
     * Instantiates a new effect Layer
     * @param name The name of the layer
     * @param scene The scene to use the layer in
     * @param forceGLSL Use the GLSL code generation for the shader (even on WebGPU). Default is false
     * @param dontCheckIfReady Specifies if the layer should disable checking whether all the post processes are ready (default: false). To save performance, this should be set to true and you should call `isReady` manually before rendering to the layer.
     * @param _additionalImportShadersAsync Additional shaders to import when the layer is created
     */
    constructor(name: string, scene?: Scene, forceGLSL?: boolean, dontCheckIfReady?: boolean, _additionalImportShadersAsync?: () => Promise<void>);
    /** @internal */
    _shadersLoaded: boolean;
    /**
     * Get the effect name of the layer.
     * @returns The effect name
     */
    getEffectName(): string;
    /**
     * Checks for the readiness of the element composing the layer.
     * @param _subMesh the mesh to check for
     * @param _useInstances specify whether or not to use instances to render the mesh
     * @returns true if ready otherwise, false
     */
    isReady(_subMesh: SubMesh, _useInstances: boolean): boolean;
    /**
     * Returns whether or not the layer needs stencil enabled during the mesh rendering.
     * @returns true if the effect requires stencil during the main canvas render pass.
     */
    needStencil(): boolean;
    /** @internal */
    _createMergeEffect(): Effect;
    /** @internal */
    _createTextureAndPostProcesses(): void;
    /** @internal */
    bindTexturesForCompose: (effect: Effect) => void;
    /** @internal */
    _internalCompose(_effect: Effect, _renderIndex: number): void;
    /** @internal */
    _setEmissiveTextureAndColor(_mesh: Mesh, _subMesh: SubMesh, _material: Material): void;
    /** @internal */
    _numInternalDraws(): number;
    /** @internal */
    _init(options: IThinEffectLayerOptions): void;
    private _generateIndexBuffer;
    private _generateVertexBuffer;
    protected _createObjectRenderer(): void;
    /** @internal */
    _addCustomEffectDefines(_defines: string[]): void;
    /** @internal */
    _internalIsSubMeshReady(subMesh: SubMesh, useInstances: boolean, emissiveTexture: Nullable<BaseTexture>): boolean;
    /** @internal */
    _isSubMeshReady(subMesh: SubMesh, useInstances: boolean, emissiveTexture: Nullable<BaseTexture>): boolean;
    protected _importShadersAsync(): Promise<void>;
    /** @internal */
    _internalIsLayerReady(): boolean;
    /**
     * Checks if the layer is ready to be used.
     * @returns true if the layer is ready to be used
     */
    isLayerReady(): boolean;
    /**
     * Renders the glowing part of the scene by blending the blurred glowing meshes on top of the rendered scene.
     * @returns true if the rendering was successful
     */
    compose(): boolean;
    /** @internal */
    _internalHasMesh(mesh: AbstractMesh): boolean;
    /**
     * Determine if a given mesh will be used in the current effect.
     * @param mesh mesh to test
     * @returns true if the mesh will be used
     */
    hasMesh(mesh: AbstractMesh): boolean;
    /** @internal */
    _internalShouldRender(): boolean;
    /**
     * Returns true if the layer contains information to display, otherwise false.
     * @returns true if the glow layer should be rendered
     */
    shouldRender(): boolean;
    /** @internal */
    _shouldRenderMesh(_mesh: AbstractMesh): boolean;
    /** @internal */
    _internalCanRenderMesh(mesh: AbstractMesh, material: Material): boolean;
    /** @internal */
    _canRenderMesh(mesh: AbstractMesh, material: Material): boolean;
    protected _renderSubMesh(subMesh: SubMesh, enableAlphaMode?: boolean): void;
    /** @internal */
    _useMeshMaterial(_mesh: AbstractMesh): boolean;
    /** @internal */
    _rebuild(): void;
    /**
     * Dispose the effect layer and free resources.
     */
    dispose(): void;
}
