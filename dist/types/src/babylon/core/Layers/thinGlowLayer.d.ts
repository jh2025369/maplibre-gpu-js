import type { Scene } from "../scene";
import type { SubMesh } from "../Meshes/subMesh";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Mesh } from "../Meshes/mesh";
import type { Texture } from "../Materials/Textures/texture";
import type { Effect } from "../Materials/effect";
import { Material } from "../Materials/material";
import { ThinEffectLayer } from "./thinEffectLayer";
import { Color4 } from "../Maths/math.color";
import type { IThinEffectLayerOptions } from "./thinEffectLayer";
/**
 * Glow layer options. This helps customizing the behaviour
 * of the glow layer.
 */
export interface IThinGlowLayerOptions extends IThinEffectLayerOptions {
    /**
     * How big is the kernel of the blur texture. Default: 32
     */
    blurKernelSize?: number;
    /**
     * Forces the merge step to be done in ldr (clamp values > 1). Default: false
     */
    ldrMerge?: boolean;
}
/**
 * @internal
 */
export declare class ThinGlowLayer extends ThinEffectLayer {
    /**
     * Effect Name of the layer.
     */
    static readonly EffectName = "GlowLayer";
    /**
     * The default blur kernel size used for the glow.
     */
    static DefaultBlurKernelSize: number;
    /**
     * Gets the ldrMerge option.
     */
    get ldrMerge(): boolean;
    /**
     * Sets the kernel size of the blur.
     */
    set blurKernelSize(value: number);
    /**
     * Gets the kernel size of the blur.
     */
    get blurKernelSize(): number;
    /**
     * Sets the glow intensity.
     */
    set intensity(value: number);
    /**
     * Gets the glow intensity.
     */
    get intensity(): number;
    /** @internal */
    _options: Required<IThinGlowLayerOptions>;
    private _intensity;
    private _horizontalBlurPostprocess1;
    private _verticalBlurPostprocess1;
    private _horizontalBlurPostprocess2;
    private _verticalBlurPostprocess2;
    /** @internal */
    _includedOnlyMeshes: number[];
    /** @internal */
    _excludedMeshes: number[];
    private _meshesUsingTheirOwnMaterials;
    /**
     * Callback used to let the user override the color selection on a per mesh basis
     */
    customEmissiveColorSelector: (mesh: Mesh, subMesh: SubMesh, material: Material, result: Color4) => void;
    /**
     * Callback used to let the user override the texture selection on a per mesh basis
     */
    customEmissiveTextureSelector: (mesh: Mesh, subMesh: SubMesh, material: Material) => Texture;
    /** @internal */
    _renderPassId: number;
    /**
     * Instantiates a new glow Layer and references it to the scene.
     * @param name The name of the layer
     * @param scene The scene to use the layer in
     * @param options Sets of none mandatory options to use with the layer (see IGlowLayerOptions for more information)
     * @param dontCheckIfReady Specifies if the layer should disable checking whether all the post processes are ready (default: false). To save performance, this should be set to true and you should call `isReady` manually before rendering to the layer.
     */
    constructor(name: string, scene?: Scene, options?: IThinGlowLayerOptions, dontCheckIfReady?: boolean);
    /**
     * Gets the class name of the thin glow layer
     * @returns the string with the class name of the glow layer
     */
    getClassName(): string;
    protected _importShadersAsync(): Promise<void>;
    getEffectName(): string;
    _createMergeEffect(): Effect;
    _createTextureAndPostProcesses(): void;
    private _getEffectiveBlurKernelSize;
    isReady(subMesh: SubMesh, useInstances: boolean): boolean;
    _canRenderMesh(_mesh: AbstractMesh, _material: Material): boolean;
    _internalCompose(effect: Effect): void;
    _setEmissiveTextureAndColor(mesh: Mesh, subMesh: SubMesh, material: Material): void;
    _shouldRenderMesh(mesh: Mesh): boolean;
    _addCustomEffectDefines(defines: string[]): void;
    /**
     * Add a mesh in the exclusion list to prevent it to impact or being impacted by the glow layer.
     * @param mesh The mesh to exclude from the glow layer
     */
    addExcludedMesh(mesh: Mesh): void;
    /**
     * Remove a mesh from the exclusion list to let it impact or being impacted by the glow layer.
     * @param mesh The mesh to remove
     */
    removeExcludedMesh(mesh: Mesh): void;
    /**
     * Add a mesh in the inclusion list to impact or being impacted by the glow layer.
     * @param mesh The mesh to include in the glow layer
     */
    addIncludedOnlyMesh(mesh: Mesh): void;
    /**
     * Remove a mesh from the Inclusion list to prevent it to impact or being impacted by the glow layer.
     * @param mesh The mesh to remove
     */
    removeIncludedOnlyMesh(mesh: Mesh): void;
    hasMesh(mesh: AbstractMesh): boolean;
    _useMeshMaterial(mesh: AbstractMesh): boolean;
    /**
     * Add a mesh to be rendered through its own material and not with emissive only.
     * @param mesh The mesh for which we need to use its material
     */
    referenceMeshToUseItsOwnMaterial(mesh: AbstractMesh): void;
    /**
     * Remove a mesh from being rendered through its own material and not with emissive only.
     * @param mesh The mesh for which we need to not use its material
     * @param renderPassId The render pass id used when rendering the mesh
     */
    unReferenceMeshFromUsingItsOwnMaterial(mesh: AbstractMesh, renderPassId: number): void;
    /** @internal */
    _disposeMesh(mesh: Mesh): void;
}
