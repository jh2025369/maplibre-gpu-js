/* eslint-disable @typescript-eslint/no-unused-vars */
import { serialize } from "../Misc/decorators";
import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import { Scene } from "../scene";
import { Vector2 } from "../Maths/math.vector";
import { VertexBuffer } from "../Buffers/buffer";
import type { SubMesh } from "../Meshes/subMesh";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Mesh } from "../Meshes/mesh";
import { Texture } from "../Materials/Textures/texture";
import { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture";
import type { Effect } from "../Materials/effect";
import { Material } from "../Materials/material";
import type { PostProcess } from "../PostProcesses/postProcess";
import { BlurPostProcess } from "../PostProcesses/blurPostProcess";
import { EffectLayer } from "./effectLayer";
import { Constants } from "../Engines/constants";
import { RegisterClass } from "../Misc/typeStore";
import { Color4 } from "../Maths/math.color";
import type { PBRMaterial } from "../Materials/PBR/pbrMaterial";

import "../Layers/effectLayerSceneComponent";
import { SerializationHelper } from "../Misc/decorators.serialization";
import { GetExponentOfTwo } from "../Misc/tools.functions";
import { ShaderLanguage } from "core/Materials/shaderLanguage";

declare module "../scene" {
    export interface Scene {
        /**
         * Return the first glow layer of the scene with a given name.
         * @param name The name of the glow layer to look for.
         * @returns The glow layer if found otherwise null.
         */
        getGlowLayerByName(name: string): Nullable<GlowLayer>;
    }
}

Scene.prototype.getGlowLayerByName = function (name: string): Nullable<GlowLayer> {
    for (let index = 0; index < this.effectLayers?.length; index++) {
        if (this.effectLayers[index].name === name && this.effectLayers[index].getEffectName() === GlowLayer.EffectName) {
            return (<any>this.effectLayers[index]) as GlowLayer;
        }
    }

    return null;
};

/**
 * Glow layer options. This helps customizing the behaviour
 * of the glow layer.
 */
export interface IGlowLayerOptions {
    /**
     * Multiplication factor apply to the canvas size to compute the render target size
     * used to generated the glowing objects (the smaller the faster). Default: 0.5
     */
    mainTextureRatio: number;

    /**
     * Enforces a fixed size texture to ensure resize independent blur. Default: undefined
     */
    mainTextureFixedSize?: number;

    /**
     * How big is the kernel of the blur texture. Default: 32
     */
    blurKernelSize: number;

    /**
     * The camera attached to the layer. Default: null
     */
    camera: Nullable<Camera>;

    /**
     * Enable MSAA by choosing the number of samples. Default: 1
     */
    mainTextureSamples?: number;

    /**
     * The rendering group to draw the layer in. Default: -1
     */
    renderingGroupId: number;

    /**
     * Forces the merge step to be done in ldr (clamp values > 1). Default: false
     */
    ldrMerge?: boolean;

    /**
     * Defines the blend mode used by the merge. Default: ALPHA_ADD
     */
    alphaBlendingMode?: number;

    /**
     * The type of the main texture. Default: TEXTURETYPE_UNSIGNED_BYTE
     */
    mainTextureType: number;

    /**
     * Whether or not to generate a stencil buffer. Default: false
     */
    generateStencilBuffer: boolean;
}

/**
 * The glow layer Helps adding a glow effect around the emissive parts of a mesh.
 *
 * Once instantiated in a scene, by default, all the emissive meshes will glow.
 *
 * Documentation: https://doc.babylonjs.com/features/featuresDeepDive/mesh/glowLayer
 */
export class GlowLayer extends EffectLayer {
    /**
     * Effect Name of the layer.
     */
    public static readonly EffectName = "GlowLayer";

    /**
     * The default blur kernel size used for the glow.
     */
    public static DefaultBlurKernelSize = 32;

    /**
     * The default texture size ratio used for the glow.
     */
    public static DefaultTextureRatio = 0.5;

    /**
     * Sets the kernel size of the blur.
     */
    public set blurKernelSize(value: number) {
        if (value === this._options.blurKernelSize) {
            return;
        }

        this._options.blurKernelSize = value;

        const effectiveKernel = this._getEffectiveBlurKernelSize();
        this._horizontalBlurPostprocess1.kernel = effectiveKernel;
        this._verticalBlurPostprocess1.kernel = effectiveKernel;
        this._horizontalBlurPostprocess2.kernel = effectiveKernel;
        this._verticalBlurPostprocess2.kernel = effectiveKernel;
    }

    /**
     * Gets the kernel size of the blur.
     */
    @serialize()
    public get blurKernelSize(): number {
        return this._options.blurKernelSize;
    }

    /**
     * Sets the glow intensity.
     */
    public set intensity(value: number) {
        this._intensity = value;
    }

    /**
     * Gets the glow intensity.
     */
    @serialize()
    public get intensity(): number {
        return this._intensity;
    }

    @serialize("options")
    private _options: IGlowLayerOptions;

    private _intensity: number = 1.0;
    private _horizontalBlurPostprocess1: BlurPostProcess;
    private _verticalBlurPostprocess1: BlurPostProcess;
    private _horizontalBlurPostprocess2: BlurPostProcess;
    private _verticalBlurPostprocess2: BlurPostProcess;
    private _blurTexture1: RenderTargetTexture;
    private _blurTexture2: RenderTargetTexture;
    private _postProcesses1: PostProcess[];
    private _postProcesses2: PostProcess[];

    private _includedOnlyMeshes: number[] = [];
    private _excludedMeshes: number[] = [];
    private _meshesUsingTheirOwnMaterials: number[] = [];

    /**
     * Callback used to let the user override the color selection on a per mesh basis
     */
    public customEmissiveColorSelector: (mesh: Mesh, subMesh: SubMesh, material: Material, result: Color4) => void;
    /**
     * Callback used to let the user override the texture selection on a per mesh basis
     */
    public customEmissiveTextureSelector: (mesh: Mesh, subMesh: SubMesh, material: Material) => Texture;

    /**
     * Instantiates a new glow Layer and references it to the scene.
     * @param name The name of the layer
     * @param scene The scene to use the layer in
     * @param options Sets of none mandatory options to use with the layer (see IGlowLayerOptions for more information)
     */
    constructor(name: string, scene?: Scene, options?: Partial<IGlowLayerOptions>) {
        super(name, scene);
        this.neutralColor = new Color4(0, 0, 0, 1);

        // Adapt options
        this._options = {
            mainTextureRatio: GlowLayer.DefaultTextureRatio,
            blurKernelSize: 32,
            mainTextureFixedSize: undefined,
            camera: null,
            mainTextureSamples: 1,
            renderingGroupId: -1,
            ldrMerge: false,
            alphaBlendingMode: Constants.ALPHA_ADD,
            mainTextureType: Constants.TEXTURETYPE_UNSIGNED_BYTE,
            generateStencilBuffer: false,
            ...options,
        };

        // Initialize the layer
        this._init({
            alphaBlendingMode: this._options.alphaBlendingMode,
            camera: this._options.camera,
            mainTextureFixedSize: this._options.mainTextureFixedSize,
            mainTextureRatio: this._options.mainTextureRatio,
            renderingGroupId: this._options.renderingGroupId,
            mainTextureType: this._options.mainTextureType,
            generateStencilBuffer: this._options.generateStencilBuffer,
        });
    }

    protected override async _importShadersAsync() {
        if (this._shaderLanguage === ShaderLanguage.WGSL) {
            await Promise.all([
                import("../ShadersWGSL/glowMapMerge.fragment"),
                import("../ShadersWGSL/glowMapMerge.vertex"),
                import("../ShadersWGSL/glowBlurPostProcess.fragment"),
            ]);
        } else {
            await Promise.all([import("../Shaders/glowMapMerge.fragment"), import("../Shaders/glowMapMerge.vertex"), import("../Shaders/glowBlurPostProcess.fragment")]);
        }

        await super._importShadersAsync();
    }

    /**
     * Get the effect name of the layer.
     * @returns The effect name
     */
    public getEffectName(): string {
        return GlowLayer.EffectName;
    }

    /**
     * @internal
     * Create the merge effect. This is the shader use to blit the information back
     * to the main canvas at the end of the scene rendering.
     */
    protected _createMergeEffect(): Effect {
        let defines = "#define EMISSIVE \n";
        if (this._options.ldrMerge) {
            defines += "#define LDR \n";
        }

        // Effect
        return this._engine.createEffect(
            "glowMapMerge",
            [VertexBuffer.PositionKind],
            ["offset"],
            ["textureSampler", "textureSampler2"],
            defines,
            undefined,
            undefined,
            undefined,
            undefined,
            this.shaderLanguage,
            this._shadersLoaded
                ? undefined
                : async () => {
                      await this._importShadersAsync();
                      this._shadersLoaded = true;
                  }
        );
    }

    /**
     * Creates the render target textures and post processes used in the glow layer.
     */
    protected _createTextureAndPostProcesses(): void {
        let blurTextureWidth = this._mainTextureDesiredSize.width;
        let blurTextureHeight = this._mainTextureDesiredSize.height;
        blurTextureWidth = this._engine.needPOTTextures ? GetExponentOfTwo(blurTextureWidth, this._maxSize) : blurTextureWidth;
        blurTextureHeight = this._engine.needPOTTextures ? GetExponentOfTwo(blurTextureHeight, this._maxSize) : blurTextureHeight;

        let textureType = 0;
        if (this._engine.getCaps().textureHalfFloatRender) {
            textureType = Constants.TEXTURETYPE_HALF_FLOAT;
        } else {
            textureType = Constants.TEXTURETYPE_UNSIGNED_BYTE;
        }

        this._blurTexture1 = new RenderTargetTexture(
            "GlowLayerBlurRTT",
            {
                width: blurTextureWidth,
                height: blurTextureHeight,
            },
            this._scene,
            false,
            true,
            textureType
        );
        this._blurTexture1.wrapU = Texture.CLAMP_ADDRESSMODE;
        this._blurTexture1.wrapV = Texture.CLAMP_ADDRESSMODE;
        this._blurTexture1.updateSamplingMode(Texture.BILINEAR_SAMPLINGMODE);
        this._blurTexture1.renderParticles = false;
        this._blurTexture1.ignoreCameraViewport = true;

        const blurTextureWidth2 = Math.floor(blurTextureWidth / 2);
        const blurTextureHeight2 = Math.floor(blurTextureHeight / 2);

        this._blurTexture2 = new RenderTargetTexture(
            "GlowLayerBlurRTT2",
            {
                width: blurTextureWidth2,
                height: blurTextureHeight2,
            },
            this._scene,
            false,
            true,
            textureType
        );
        this._blurTexture2.wrapU = Texture.CLAMP_ADDRESSMODE;
        this._blurTexture2.wrapV = Texture.CLAMP_ADDRESSMODE;
        this._blurTexture2.updateSamplingMode(Texture.BILINEAR_SAMPLINGMODE);
        this._blurTexture2.renderParticles = false;
        this._blurTexture2.ignoreCameraViewport = true;

        this._textures = [this._blurTexture1, this._blurTexture2];

        const effectiveKernel = this._getEffectiveBlurKernelSize();
        this._horizontalBlurPostprocess1 = new BlurPostProcess(
            "GlowLayerHBP1",
            new Vector2(1.0, 0),
            effectiveKernel,
            {
                width: blurTextureWidth,
                height: blurTextureHeight,
            },
            null,
            Texture.BILINEAR_SAMPLINGMODE,
            this._scene.getEngine(),
            false,
            textureType
        );
        this._horizontalBlurPostprocess1.width = blurTextureWidth;
        this._horizontalBlurPostprocess1.height = blurTextureHeight;
        this._horizontalBlurPostprocess1.externalTextureSamplerBinding = true;
        this._horizontalBlurPostprocess1.onApplyObservable.add((effect) => {
            effect.setTexture("textureSampler", this._mainTexture);
        });

        this._verticalBlurPostprocess1 = new BlurPostProcess(
            "GlowLayerVBP1",
            new Vector2(0, 1.0),
            effectiveKernel,
            {
                width: blurTextureWidth,
                height: blurTextureHeight,
            },
            null,
            Texture.BILINEAR_SAMPLINGMODE,
            this._scene.getEngine(),
            false,
            textureType
        );

        this._horizontalBlurPostprocess2 = new BlurPostProcess(
            "GlowLayerHBP2",
            new Vector2(1.0, 0),
            effectiveKernel,
            {
                width: blurTextureWidth2,
                height: blurTextureHeight2,
            },
            null,
            Texture.BILINEAR_SAMPLINGMODE,
            this._scene.getEngine(),
            false,
            textureType
        );
        this._horizontalBlurPostprocess2.width = blurTextureWidth2;
        this._horizontalBlurPostprocess2.height = blurTextureHeight2;
        this._horizontalBlurPostprocess2.externalTextureSamplerBinding = true;
        this._horizontalBlurPostprocess2.onApplyObservable.add((effect) => {
            effect.setTexture("textureSampler", this._blurTexture1);
        });

        this._verticalBlurPostprocess2 = new BlurPostProcess(
            "GlowLayerVBP2",
            new Vector2(0, 1.0),
            effectiveKernel,
            {
                width: blurTextureWidth2,
                height: blurTextureHeight2,
            },
            null,
            Texture.BILINEAR_SAMPLINGMODE,
            this._scene.getEngine(),
            false,
            textureType
        );

        this._postProcesses = [this._horizontalBlurPostprocess1, this._verticalBlurPostprocess1, this._horizontalBlurPostprocess2, this._verticalBlurPostprocess2];
        this._postProcesses1 = [this._horizontalBlurPostprocess1, this._verticalBlurPostprocess1];
        this._postProcesses2 = [this._horizontalBlurPostprocess2, this._verticalBlurPostprocess2];

        this._mainTexture.samples = this._options.mainTextureSamples!;
        this._mainTexture.onAfterUnbindObservable.add(() => {
            const internalTexture = this._blurTexture1.renderTarget;
            if (internalTexture) {
                this._scene.postProcessManager.directRender(this._postProcesses1, internalTexture, true);

                const internalTexture2 = this._blurTexture2.renderTarget;
                if (internalTexture2) {
                    this._scene.postProcessManager.directRender(this._postProcesses2, internalTexture2, true);
                }
                this._engine.unBindFramebuffer(internalTexture2 ?? internalTexture, true);
            }
        });

        // Prevent autoClear.
        this._postProcesses.map((pp) => {
            pp.autoClear = false;
        });
    }

    /**
     * @returns The blur kernel size used by the glow.
     * Note: The value passed in the options is divided by 2 for back compatibility.
     */
    private _getEffectiveBlurKernelSize() {
        return this._options.blurKernelSize / 2;
    }

    /**
     * Checks for the readiness of the element composing the layer.
     * @param subMesh the mesh to check for
     * @param useInstances specify whether or not to use instances to render the mesh
     * @returns true if ready otherwise, false
     */
    public isReady(subMesh: SubMesh, useInstances: boolean): boolean {
        const material = subMesh.getMaterial();
        const mesh = subMesh.getRenderingMesh();

        if (!material || !mesh) {
            return false;
        }

        const emissiveTexture = (<any>material).emissiveTexture;
        return super._isReady(subMesh, useInstances, emissiveTexture);
    }

    /**
     * @returns whether or not the layer needs stencil enabled during the mesh rendering.
     */
    public needStencil(): boolean {
        return false;
    }

    /**
     * Returns true if the mesh can be rendered, otherwise false.
     * @param mesh The mesh to render
     * @param material The material used on the mesh
     * @returns true if it can be rendered otherwise false
     */
    protected override _canRenderMesh(mesh: AbstractMesh, material: Material): boolean {
        return true;
    }

    /**
     * Implementation specific of rendering the generating effect on the main canvas.
     * @param effect The effect used to render through
     */
    protected _internalRender(effect: Effect): void {
        // Texture
        effect.setTexture("textureSampler", this._blurTexture1);
        effect.setTexture("textureSampler2", this._blurTexture2);
        effect.setFloat("offset", this._intensity);

        // Cache
        const engine = this._engine;
        const previousStencilBuffer = engine.getStencilBuffer();

        // Draw order
        engine.setStencilBuffer(false);

        engine.drawElementsType(Material.TriangleFillMode, 0, 6);

        // Draw order
        engine.setStencilBuffer(previousStencilBuffer);
    }

    /**
     * Sets the required values for both the emissive texture and and the main color.
     * @param mesh
     * @param subMesh
     * @param material
     */
    protected _setEmissiveTextureAndColor(mesh: Mesh, subMesh: SubMesh, material: Material): void {
        let textureLevel = 1.0;

        if (this.customEmissiveTextureSelector) {
            this._emissiveTextureAndColor.texture = this.customEmissiveTextureSelector(mesh, subMesh, material);
        } else {
            if (material) {
                this._emissiveTextureAndColor.texture = (<any>material).emissiveTexture;
                if (this._emissiveTextureAndColor.texture) {
                    textureLevel = this._emissiveTextureAndColor.texture.level;
                }
            } else {
                this._emissiveTextureAndColor.texture = null;
            }
        }

        if (this.customEmissiveColorSelector) {
            this.customEmissiveColorSelector(mesh, subMesh, material, this._emissiveTextureAndColor.color);
        } else {
            if ((<any>material).emissiveColor) {
                const emissiveIntensity = (<PBRMaterial>material).emissiveIntensity ?? 1;
                textureLevel *= emissiveIntensity;
                this._emissiveTextureAndColor.color.set(
                    (<any>material).emissiveColor.r * textureLevel,
                    (<any>material).emissiveColor.g * textureLevel,
                    (<any>material).emissiveColor.b * textureLevel,
                    material.alpha
                );
            } else {
                this._emissiveTextureAndColor.color.set(this.neutralColor.r, this.neutralColor.g, this.neutralColor.b, this.neutralColor.a);
            }
        }
    }

    /**
     * Returns true if the mesh should render, otherwise false.
     * @param mesh The mesh to render
     * @returns true if it should render otherwise false
     */
    protected override _shouldRenderMesh(mesh: Mesh): boolean {
        return this.hasMesh(mesh);
    }

    /**
     * Adds specific effects defines.
     * @param defines The defines to add specifics to.
     */
    protected override _addCustomEffectDefines(defines: string[]): void {
        defines.push("#define GLOW");
    }

    /**
     * Add a mesh in the exclusion list to prevent it to impact or being impacted by the glow layer.
     * @param mesh The mesh to exclude from the glow layer
     */
    public addExcludedMesh(mesh: Mesh): void {
        if (this._excludedMeshes.indexOf(mesh.uniqueId) === -1) {
            this._excludedMeshes.push(mesh.uniqueId);
        }
    }

    /**
     * Remove a mesh from the exclusion list to let it impact or being impacted by the glow layer.
     * @param mesh The mesh to remove
     */
    public removeExcludedMesh(mesh: Mesh): void {
        const index = this._excludedMeshes.indexOf(mesh.uniqueId);
        if (index !== -1) {
            this._excludedMeshes.splice(index, 1);
        }
    }

    /**
     * Add a mesh in the inclusion list to impact or being impacted by the glow layer.
     * @param mesh The mesh to include in the glow layer
     */
    public addIncludedOnlyMesh(mesh: Mesh): void {
        if (this._includedOnlyMeshes.indexOf(mesh.uniqueId) === -1) {
            this._includedOnlyMeshes.push(mesh.uniqueId);
        }
    }

    /**
     * Remove a mesh from the Inclusion list to prevent it to impact or being impacted by the glow layer.
     * @param mesh The mesh to remove
     */
    public removeIncludedOnlyMesh(mesh: Mesh): void {
        const index = this._includedOnlyMeshes.indexOf(mesh.uniqueId);
        if (index !== -1) {
            this._includedOnlyMeshes.splice(index, 1);
        }
    }

    /**
     * Determine if a given mesh will be used in the glow layer
     * @param mesh The mesh to test
     * @returns true if the mesh will be highlighted by the current glow layer
     */
    public override hasMesh(mesh: AbstractMesh): boolean {
        if (!super.hasMesh(mesh)) {
            return false;
        }

        // Included Mesh
        if (this._includedOnlyMeshes.length) {
            return this._includedOnlyMeshes.indexOf(mesh.uniqueId) !== -1;
        }

        // Excluded Mesh
        if (this._excludedMeshes.length) {
            return this._excludedMeshes.indexOf(mesh.uniqueId) === -1;
        }

        return true;
    }

    /**
     * Defines whether the current material of the mesh should be use to render the effect.
     * @param mesh defines the current mesh to render
     * @returns true if the material of the mesh should be use to render the effect
     */
    protected override _useMeshMaterial(mesh: AbstractMesh): boolean {
        if (this._meshesUsingTheirOwnMaterials.length == 0) {
            return false;
        }
        return this._meshesUsingTheirOwnMaterials.indexOf(mesh.uniqueId) > -1;
    }

    /**
     * Add a mesh to be rendered through its own material and not with emissive only.
     * @param mesh The mesh for which we need to use its material
     */
    public referenceMeshToUseItsOwnMaterial(mesh: AbstractMesh): void {
        mesh.resetDrawCache(this._mainTexture.renderPassId);

        this._meshesUsingTheirOwnMaterials.push(mesh.uniqueId);

        mesh.onDisposeObservable.add(() => {
            this._disposeMesh(mesh as Mesh);
        });
    }

    /**
     * Remove a mesh from being rendered through its own material and not with emissive only.
     * @param mesh The mesh for which we need to not use its material
     */
    public unReferenceMeshFromUsingItsOwnMaterial(mesh: AbstractMesh): void {
        let index = this._meshesUsingTheirOwnMaterials.indexOf(mesh.uniqueId);
        while (index >= 0) {
            this._meshesUsingTheirOwnMaterials.splice(index, 1);
            index = this._meshesUsingTheirOwnMaterials.indexOf(mesh.uniqueId);
        }
        mesh.resetDrawCache(this._mainTexture.renderPassId);
    }

    /**
     * Free any resources and references associated to a mesh.
     * Internal use
     * @param mesh The mesh to free.
     * @internal
     */
    public _disposeMesh(mesh: Mesh): void {
        this.removeIncludedOnlyMesh(mesh);
        this.removeExcludedMesh(mesh);
    }

    /**
     * Gets the class name of the effect layer
     * @returns the string with the class name of the effect layer
     */
    public override getClassName(): string {
        return "GlowLayer";
    }

    /**
     * Serializes this glow layer
     * @returns a serialized glow layer object
     */
    public serialize(): any {
        const serializationObject = SerializationHelper.Serialize(this);
        serializationObject.customType = "BABYLON.GlowLayer";

        let index;

        // Included meshes
        serializationObject.includedMeshes = [];

        if (this._includedOnlyMeshes.length) {
            for (index = 0; index < this._includedOnlyMeshes.length; index++) {
                const mesh = this._scene.getMeshByUniqueId(this._includedOnlyMeshes[index]);
                if (mesh) {
                    serializationObject.includedMeshes.push(mesh.id);
                }
            }
        }

        // Excluded meshes
        serializationObject.excludedMeshes = [];

        if (this._excludedMeshes.length) {
            for (index = 0; index < this._excludedMeshes.length; index++) {
                const mesh = this._scene.getMeshByUniqueId(this._excludedMeshes[index]);
                if (mesh) {
                    serializationObject.excludedMeshes.push(mesh.id);
                }
            }
        }

        return serializationObject;
    }

    /**
     * Creates a Glow Layer from parsed glow layer data
     * @param parsedGlowLayer defines glow layer data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing the glow layer information
     * @returns a parsed Glow Layer
     */
    public static override Parse(parsedGlowLayer: any, scene: Scene, rootUrl: string): GlowLayer {
        const gl = SerializationHelper.Parse(() => new GlowLayer(parsedGlowLayer.name, scene, parsedGlowLayer.options), parsedGlowLayer, scene, rootUrl);
        let index;

        // Excluded meshes
        for (index = 0; index < parsedGlowLayer.excludedMeshes.length; index++) {
            const mesh = scene.getMeshById(parsedGlowLayer.excludedMeshes[index]);
            if (mesh) {
                gl.addExcludedMesh(<Mesh>mesh);
            }
        }

        // Included meshes
        for (index = 0; index < parsedGlowLayer.includedMeshes.length; index++) {
            const mesh = scene.getMeshById(parsedGlowLayer.includedMeshes[index]);
            if (mesh) {
                gl.addIncludedOnlyMesh(<Mesh>mesh);
            }
        }

        return gl;
    }
}

RegisterClass("BABYLON.GlowLayer", GlowLayer);
