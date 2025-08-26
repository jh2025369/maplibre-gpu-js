import { MaterialDefines } from "../materialDefines";
import { MaterialPluginBase } from "../materialPluginBase";
import type { PBRBaseMaterial } from "./pbrBaseMaterial";
/**
 * @internal
 */
export declare class MaterialBRDFDefines extends MaterialDefines {
    BRDF_V_HEIGHT_CORRELATED: boolean;
    MS_BRDF_ENERGY_CONSERVATION: boolean;
    SPHERICAL_HARMONICS: boolean;
    SPECULAR_GLOSSINESS_ENERGY_CONSERVATION: boolean;
    MIX_IBL_RADIANCE_WITH_IRRADIANCE: boolean;
    LEGACY_SPECULAR_ENERGY_CONSERVATION: boolean;
    BASE_DIFFUSE_MODEL: number;
    DIELECTRIC_SPECULAR_MODEL: number;
    CONDUCTOR_SPECULAR_MODEL: number;
}
/**
 * Plugin that implements the BRDF component of the PBR material
 */
export declare class PBRBRDFConfiguration extends MaterialPluginBase {
    /**
     * Default value used for the energy conservation.
     * This should only be changed to adapt to the type of texture in scene.environmentBRDFTexture.
     */
    static DEFAULT_USE_ENERGY_CONSERVATION: boolean;
    /**
     * Default value used for the Smith Visibility Height Correlated mode.
     * This should only be changed to adapt to the type of texture in scene.environmentBRDFTexture.
     */
    static DEFAULT_USE_SMITH_VISIBILITY_HEIGHT_CORRELATED: boolean;
    /**
     * Default value used for the IBL diffuse part.
     * This can help switching back to the polynomials mode globally which is a tiny bit
     * less GPU intensive at the drawback of a lower quality.
     */
    static DEFAULT_USE_SPHERICAL_HARMONICS: boolean;
    /**
     * Default value used for activating energy conservation for the specular workflow.
     * If activated, the albedo color is multiplied with (1. - maxChannel(specular color)).
     * If deactivated, a material is only physically plausible, when (albedo color + specular color) < 1.
     */
    static DEFAULT_USE_SPECULAR_GLOSSINESS_INPUT_ENERGY_CONSERVATION: boolean;
    /**
     * Default value for whether IBL irradiance is used to augment rough radiance.
     * If activated, irradiance is blended into the radiance contribution when the material is rough.
     * This better approximates raytracing results for rough surfaces.
     */
    static DEFAULT_MIX_IBL_RADIANCE_WITH_IRRADIANCE: boolean;
    /**
     * Default value for whether the legacy specular energy conservation is used.
     */
    static DEFAULT_USE_LEGACY_SPECULAR_ENERGY_CONSERVATION: boolean;
    /**
     * Defines the default diffuse model used by the material.
     */
    static DEFAULT_DIFFUSE_MODEL: number;
    /**
     * Defines the default dielectric specular model used by the material.
     */
    static DEFAULT_DIELECTRIC_SPECULAR_MODEL: number;
    /**
     * Defines the default conductor specular model used by the material.
     */
    static DEFAULT_CONDUCTOR_SPECULAR_MODEL: number;
    private _useEnergyConservation;
    /**
     * Defines if the material uses energy conservation.
     */
    useEnergyConservation: boolean;
    private _useSmithVisibilityHeightCorrelated;
    /**
     * LEGACY Mode set to false
     * Defines if the material uses height smith correlated visibility term.
     * If you intent to not use our default BRDF, you need to load a separate BRDF Texture for the PBR
     * You can either load https://assets.babylonjs.com/environments/uncorrelatedBRDF.png
     * or https://assets.babylonjs.com/environments/uncorrelatedBRDF.dds to have more precision
     * Not relying on height correlated will also disable energy conservation.
     */
    useSmithVisibilityHeightCorrelated: boolean;
    private _useSphericalHarmonics;
    /**
     * LEGACY Mode set to false
     * Defines if the material uses spherical harmonics vs spherical polynomials for the
     * diffuse part of the IBL.
     * The harmonics despite a tiny bigger cost has been proven to provide closer results
     * to the ground truth.
     */
    useSphericalHarmonics: boolean;
    private _useSpecularGlossinessInputEnergyConservation;
    /**
     * Defines if the material uses energy conservation, when the specular workflow is active.
     * If activated, the albedo color is multiplied with (1. - maxChannel(specular color)).
     * If deactivated, a material is only physically plausible, when (albedo color + specular color) < 1.
     * In the deactivated case, the material author has to ensure energy conservation, for a physically plausible rendering.
     */
    useSpecularGlossinessInputEnergyConservation: boolean;
    private _mixIblRadianceWithIrradiance;
    /**
     * Defines if IBL irradiance is used to augment rough radiance.
     * If activated, irradiance is blended into the radiance contribution when the material is rough.
     * This better approximates raytracing results for rough surfaces.
     */
    mixIblRadianceWithIrradiance: boolean;
    private _useLegacySpecularEnergyConservation;
    /**
     * Defines if the legacy specular energy conservation is used.
     * If activated, the specular color is multiplied with (1. - maxChannel(albedo color)).
     */
    useLegacySpecularEnergyConservation: boolean;
    private _baseDiffuseModel;
    /**
     * Defines the base diffuse roughness model of the material.
     */
    baseDiffuseModel: number;
    private _dielectricSpecularModel;
    /**
     * The material model to use for specular lighting of dielectric materials.
     */
    dielectricSpecularModel: number;
    private _conductorSpecularModel;
    /**
     * The material model to use for specular lighting.
     */
    conductorSpecularModel: number;
    /** @internal */
    private _internalMarkAllSubMeshesAsMiscDirty;
    /** @internal */
    _markAllSubMeshesAsMiscDirty(): void;
    /**
     * Gets a boolean indicating that the plugin is compatible with a given shader language.
     * @returns true if the plugin is compatible with the shader language
     */
    isCompatible(): boolean;
    constructor(material: PBRBaseMaterial, addToPluginList?: boolean);
    prepareDefines(defines: MaterialBRDFDefines): void;
    getClassName(): string;
}
