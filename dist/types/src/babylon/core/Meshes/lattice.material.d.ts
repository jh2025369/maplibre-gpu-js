import type { Material } from "core/Materials/material";
import { MaterialPluginBase } from "core/Materials/materialPluginBase";
import type { Lattice } from "./lattice";
import { ShaderLanguage } from "core/Materials/shaderLanguage";
import type { UniformBuffer } from "core/Materials/uniformBuffer";
/**
 * Material plugin to add hardware accelerated lattice support
 * #HBZD72#5 - webgl2
 * #HBZD72#6 - webgpu
 */
export declare class LatticePluginMaterial extends MaterialPluginBase {
    private _lattice;
    private _latticeDataTexture;
    private _latticeData;
    private _code;
    /**
     * Create a new LatticePluginMaterial
     * @param lattice defines the lattice this plugin is associated with
     * @param material defines the material this plugin is associated with
     */
    constructor(lattice: Lattice, material: Material);
    /**
     * Get the class name of the plugin
     * @returns the string "LatticePluginMaterial"
     */
    getClassName(): string;
    /**
     * Defines if the plugin supports the specified shader language
     * @param shaderLanguage defines the shader language to check
     * @returns true if supported, false otherwise
     */
    isCompatible(shaderLanguage: ShaderLanguage): boolean;
    /**
     * Must be called when the lattice data was updated
     */
    refreshData(): void;
    /**
     * Gets the description of the uniforms to add to the ubo (if engine supports ubos) or to inject directly in the vertex/fragment shaders (if engine does not support ubos)
     * @param shaderLanguage The shader language to use.
     * @returns the description of the uniforms
     */
    getUniforms(shaderLanguage?: ShaderLanguage): {
        ubo: {
            name: string;
            size: number;
            type: string;
        }[];
        vertex?: undefined;
    } | {
        ubo: {
            name: string;
            size: number;
            type: string;
        }[];
        vertex: string;
    };
    /**
     * Binds the material data.
     * @param uniformBuffer defines the Uniform buffer to fill in.
     */
    bindForSubMesh(uniformBuffer: UniformBuffer): void;
    /**
     * Gets the samplers used by the plugin.
     * @param samplers list that the sampler names should be added to.
     */
    getSamplers(samplers: string[]): void;
    private _prepareCode;
    /**
     * Returns a list of custom shader code fragments to customize the shader.
     * @param shaderType "vertex" or "fragment"
     * @param shaderLanguage The shader language to use.
     * @returns null if no code to be added, or a list of pointName =\> code.
     */
    getCustomCode(shaderType: string, shaderLanguage?: ShaderLanguage): {
        CUSTOM_VERTEX_DEFINITIONS: string;
        CUSTOM_VERTEX_UPDATE_POSITION: string;
    };
    /**
     * Disposes the resources of the material.
     */
    dispose(): void;
}
