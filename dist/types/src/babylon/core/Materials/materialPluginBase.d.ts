import type { Nullable } from "../types";
import { MaterialPluginManager } from "./materialPluginManager";
import type { SmartArray } from "../Misc/smartArray";
import type { AbstractEngine } from "../Engines/abstractEngine";
import type { Scene } from "../scene";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { SubMesh } from "../Meshes/subMesh";
import type { IAnimatable } from "../Animations/animatable.interface";
import type { UniformBuffer } from "./uniformBuffer";
import type { EffectFallbacks } from "./effectFallbacks";
import type { MaterialDefines } from "./materialDefines";
import type { Material } from "./material";
import type { BaseTexture } from "./Textures/baseTexture";
import type { RenderTargetTexture } from "./Textures/renderTargetTexture";
import { ShaderLanguage } from "./shaderLanguage";
/**
 * Base class for material plugins.
 * @since 5.0
 */
export declare class MaterialPluginBase {
    /**
     * Defines the name of the plugin
     */
    name: string;
    /**
     * Defines the priority of the plugin. Lower numbers run first.
     */
    priority: number;
    /**
     * Indicates that any #include directive in the plugin code must be replaced by the corresponding code.
     */
    resolveIncludes: boolean;
    /**
     * Indicates that this plugin should be notified for the extra events (HasRenderTargetTextures / FillRenderTargetTextures / HardBindForSubMesh)
     */
    registerForExtraEvents: boolean;
    /**
     * Specifies if the material plugin should be serialized, `true` to skip serialization
     */
    doNotSerialize: boolean;
    protected _material: Material;
    protected _pluginManager: MaterialPluginManager;
    protected _pluginDefineNames?: {
        [name: string]: any;
    };
    /**
     * Gets a boolean indicating that the plugin is compatible with a given shader language.
     * @param shaderLanguage The shader language to use.
     * @returns true if the plugin is compatible with the shader language
     */
    isCompatible(shaderLanguage: ShaderLanguage): boolean;
    protected _enable(enable: boolean): void;
    /**
     * Helper function to mark defines as being dirty.
     */
    readonly markAllDefinesAsDirty: () => void;
    /**
     * Creates a new material plugin
     * @param material parent material of the plugin
     * @param name name of the plugin
     * @param priority priority of the plugin
     * @param defines list of defines used by the plugin. The value of the property is the default value for this property
     * @param addToPluginList true to add the plugin to the list of plugins managed by the material plugin manager of the material (default: true)
     * @param enable true to enable the plugin (it is handy if the plugin does not handle properties to switch its current activation)
     * @param resolveIncludes Indicates that any #include directive in the plugin code must be replaced by the corresponding code (default: false)
     */
    constructor(material: Material, name: string, priority: number, defines?: {
        [key: string]: any;
    }, addToPluginList?: boolean, enable?: boolean, resolveIncludes?: boolean);
    /**
     * Gets the current class name useful for serialization or dynamic coding.
     * @returns The class name.
     */
    getClassName(): string;
    /**
     * Specifies that the submesh is ready to be used.
     * @param _defines the list of "defines" to update.
     * @param _scene defines the scene the material belongs to.
     * @param _engine the engine this scene belongs to.
     * @param _subMesh the submesh to check for readiness
     * @returns - boolean indicating that the submesh is ready or not.
     */
    isReadyForSubMesh(_defines: MaterialDefines, _scene: Scene, _engine: AbstractEngine, _subMesh: SubMesh): boolean;
    /**
     * Binds the material data (this function is called even if mustRebind() returns false)
     * @param _uniformBuffer defines the Uniform buffer to fill in.
     * @param _scene defines the scene the material belongs to.
     * @param _engine defines the engine the material belongs to.
     * @param _subMesh the submesh to bind data for
     */
    hardBindForSubMesh(_uniformBuffer: UniformBuffer, _scene: Scene, _engine: AbstractEngine, _subMesh: SubMesh): void;
    /**
     * Binds the material data.
     * @param _uniformBuffer defines the Uniform buffer to fill in.
     * @param _scene defines the scene the material belongs to.
     * @param _engine the engine this scene belongs to.
     * @param _subMesh the submesh to bind data for
     */
    bindForSubMesh(_uniformBuffer: UniformBuffer, _scene: Scene, _engine: AbstractEngine, _subMesh: SubMesh): void;
    /**
     * Disposes the resources of the material.
     * @param _forceDisposeTextures - Forces the disposal of all textures.
     */
    dispose(_forceDisposeTextures?: boolean): void;
    /**
     * Returns a list of custom shader code fragments to customize the shader.
     * @param _shaderType "vertex" or "fragment"
     * @param _shaderLanguage The shader language to use.
     * @returns null if no code to be added, or a list of pointName =\> code.
     * Note that `pointName` can also be a regular expression if it starts with a `!`.
     * In that case, the string found by the regular expression (if any) will be
     * replaced by the code provided.
     */
    getCustomCode(_shaderType: string, _shaderLanguage?: ShaderLanguage): Nullable<{
        [pointName: string]: string;
    }>;
    /**
     * Collects all defines.
     * @param defines The object to append to.
     */
    collectDefines(defines: {
        [name: string]: {
            type: string;
            default: any;
        };
    }): void;
    /**
     * Sets the defines for the next rendering. Called before PrepareDefinesForAttributes is called.
     * @param _defines the list of "defines" to update.
     * @param _scene defines the scene to the material belongs to.
     * @param _mesh the mesh being rendered
     */
    prepareDefinesBeforeAttributes(_defines: MaterialDefines, _scene: Scene, _mesh: AbstractMesh): void;
    /**
     * Sets the defines for the next rendering
     * @param _defines the list of "defines" to update.
     * @param _scene defines the scene to the material belongs to.
     * @param _mesh the mesh being rendered
     */
    prepareDefines(_defines: MaterialDefines, _scene: Scene, _mesh: AbstractMesh): void;
    /**
     * Checks to see if a texture is used in the material.
     * @param _texture - Base texture to use.
     * @returns - Boolean specifying if a texture is used in the material.
     */
    hasTexture(_texture: BaseTexture): boolean;
    /**
     * Gets a boolean indicating that current material needs to register RTT
     * @returns true if this uses a render target otherwise false.
     */
    hasRenderTargetTextures(): boolean;
    /**
     * Fills the list of render target textures.
     * @param _renderTargets the list of render targets to update
     */
    fillRenderTargetTextures(_renderTargets: SmartArray<RenderTargetTexture>): void;
    /**
     * Returns an array of the actively used textures.
     * @param _activeTextures Array of BaseTextures
     */
    getActiveTextures(_activeTextures: BaseTexture[]): void;
    /**
     * Returns the animatable textures.
     * @param _animatables Array of animatable textures.
     */
    getAnimatables(_animatables: IAnimatable[]): void;
    /**
     * Add fallbacks to the effect fallbacks list.
     * @param defines defines the Base texture to use.
     * @param fallbacks defines the current fallback list.
     * @param currentRank defines the current fallback rank.
     * @returns the new fallback rank.
     */
    addFallbacks(defines: MaterialDefines, fallbacks: EffectFallbacks, currentRank: number): number;
    /**
     * Gets the samplers used by the plugin.
     * @param _samplers list that the sampler names should be added to.
     */
    getSamplers(_samplers: string[]): void;
    /**
     * Gets the attributes used by the plugin.
     * @param _attributes list that the attribute names should be added to.
     * @param _scene the scene that the material belongs to.
     * @param _mesh the mesh being rendered.
     */
    getAttributes(_attributes: string[], _scene: Scene, _mesh: AbstractMesh): void;
    /**
     * Gets the uniform buffers names added by the plugin.
     * @param _ubos list that the ubo names should be added to.
     */
    getUniformBuffersNames(_ubos: string[]): void;
    /**
     * Gets the description of the uniforms to add to the ubo (if engine supports ubos) or to inject directly in the vertex/fragment shaders (if engine does not support ubos)
     * @param _shaderLanguage The shader language to use.
     * @returns the description of the uniforms
     */
    getUniforms(_shaderLanguage?: ShaderLanguage): {
        ubo?: Array<{
            name: string;
            size?: number;
            type?: string;
            arraySize?: number;
        }>;
        vertex?: string;
        fragment?: string;
    };
    /**
     * Makes a duplicate of the current configuration into another one.
     * @param plugin define the config where to copy the info
     */
    copyTo(plugin: MaterialPluginBase): void;
    /**
     * Serializes this plugin configuration.
     * @returns - An object with the serialized config.
     */
    serialize(): any;
    /**
     * Parses a plugin configuration from a serialized object.
     * @param source - Serialized object.
     * @param scene Defines the scene we are parsing for
     * @param rootUrl Defines the rootUrl to load from
     */
    parse(source: any, scene: Scene, rootUrl: string): void;
}
