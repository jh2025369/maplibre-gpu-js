import { MaterialDefines } from "core/Materials/materialDefines";
import { MaterialPluginBase } from "core/Materials/materialPluginBase";
import type { InternalTexture } from "core/Materials/Textures/internalTexture";
import type { Material } from "core/Materials/material";
import type { StandardMaterial } from "core/Materials/standardMaterial";
import { PBRBaseMaterial } from "core/Materials/PBR/pbrBaseMaterial";
import type { UniformBuffer } from "core/Materials/uniformBuffer";
import { ShaderLanguage } from "core/Materials/shaderLanguage";
/**
 * @internal
 */
declare class MaterialIBLShadowsRenderDefines extends MaterialDefines {
    RENDER_WITH_IBL_SHADOWS: boolean;
}
/**
 * Plugin used to render the contribution from IBL shadows.
 */
export declare class IBLShadowsPluginMaterial extends MaterialPluginBase {
    /**
     * Defines the name of the plugin.
     */
    static readonly Name = "IBLShadowsPluginMaterial";
    /**
     * The texture containing the contribution from IBL shadows.
     */
    iblShadowsTexture: InternalTexture;
    /**
     * The opacity of the shadows.
     */
    shadowOpacity: number;
    private _isEnabled;
    /**
     * Defines if the plugin is enabled in the material.
     */
    isEnabled: boolean;
    protected _markAllSubMeshesAsTexturesDirty(): void;
    private _internalMarkAllSubMeshesAsTexturesDirty;
    /**
     * Gets a boolean indicating that the plugin is compatible with a give shader language.
     * @returns true if the plugin is compatible with the shader language
     */
    isCompatible(): boolean;
    constructor(material: Material | StandardMaterial | PBRBaseMaterial);
    prepareDefines(defines: MaterialIBLShadowsRenderDefines): void;
    getClassName(): string;
    getUniforms(): {
        ubo: {
            name: string;
            size: number;
            type: string;
        }[];
        fragment: string;
    };
    getSamplers(samplers: string[]): void;
    bindForSubMesh(uniformBuffer: UniformBuffer): void;
    getCustomCode(shaderType: string, shaderLanguage: ShaderLanguage): {
        [name: string]: string;
    };
}
export {};
