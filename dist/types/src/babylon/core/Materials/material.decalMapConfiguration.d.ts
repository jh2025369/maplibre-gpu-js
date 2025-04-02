import { MaterialDefines } from "./materialDefines";
import { MaterialPluginBase } from "./materialPluginBase";
import type { Scene } from "core/scene";
import type { Engine } from "core/Engines/engine";
import type { SubMesh } from "core/Meshes/subMesh";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { UniformBuffer } from "./uniformBuffer";
import type { PBRBaseMaterial } from "./PBR/pbrBaseMaterial";
import type { StandardMaterial } from "./standardMaterial";
/**
 * @internal
 */
export declare class DecalMapDefines extends MaterialDefines {
    DECAL: boolean;
    DECALDIRECTUV: number;
    DECAL_SMOOTHALPHA: boolean;
    GAMMADECAL: boolean;
}
/**
 * Plugin that implements the decal map component of a material
 * @since 5.49.1
 */
export declare class DecalMapConfiguration extends MaterialPluginBase {
    private _isEnabled;
    /**
     * Enables or disables the decal map on this material
     */
    isEnabled: boolean;
    private _smoothAlpha;
    /**
     * Enables or disables the smooth alpha mode on this material. Default: false.
     * When enabled, the alpha value used to blend the decal map will be the squared value and will produce a smoother result.
     */
    smoothAlpha: boolean;
    private _internalMarkAllSubMeshesAsTexturesDirty;
    /** @internal */
    _markAllSubMeshesAsTexturesDirty(): void;
    /**
     * Gets a boolean indicating that the plugin is compatible with a given shader language.
     * @returns true if the plugin is compatible with the shader language
     */
    isCompatible(): boolean;
    /**
     * Creates a new DecalMapConfiguration
     * @param material The material to attach the decal map plugin to
     * @param addToPluginList If the plugin should be added to the material plugin list
     */
    constructor(material: PBRBaseMaterial | StandardMaterial, addToPluginList?: boolean);
    isReadyForSubMesh(defines: DecalMapDefines, scene: Scene, engine: Engine, subMesh: SubMesh): boolean;
    prepareDefinesBeforeAttributes(defines: DecalMapDefines, scene: Scene, mesh: AbstractMesh): void;
    hardBindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene, _engine: Engine, subMesh: SubMesh): void;
    getClassName(): string;
    getSamplers(samplers: string[]): void;
    getUniforms(): {
        ubo?: Array<{
            name: string;
            size: number;
            type: string;
        }>;
        vertex?: string;
        fragment?: string;
    };
}
