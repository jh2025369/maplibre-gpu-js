import type { TransformNode } from "core/Meshes/transformNode";
import type { IAnimation, ICamera, IGLTF, IKHRLightsPunctual_Light, IMaterial, IMesh, INode } from "../glTFLoaderInterfaces";
import type { Vector3 } from "core/Maths/math.vector";
import { Matrix, Quaternion, Vector2 } from "core/Maths/math.vector";
import type { Color3 } from "core/Maths/math.color";
import { Color4 } from "core/Maths/math.color";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { Light } from "core/Lights/light";
import type { Nullable } from "core/types";
import type { IEXTLightsImageBased_LightImageBased } from "babylonjs-gltf2interface";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { IInterpolationPropertyInfo, IObjectAccessor } from "core/FlowGraph/typeDefinitions";
import { GLTFPathToObjectConverter } from "./gltfPathToObjectConverter";
import type { AnimationGroup } from "core/Animations/animationGroup";
import type { Mesh } from "core/Meshes/mesh";
export interface IGLTFObjectModelTree {
    cameras: IGLTFObjectModelTreeCamerasObject;
    nodes: IGLTFObjectModelTreeNodesObject;
    materials: IGLTFObjectModelTreeMaterialsObject;
    extensions: IGLTFObjectModelTreeExtensionsObject;
    animations: {
        length: IObjectAccessor<IAnimation[], AnimationGroup[], number>;
        __array__: {};
    };
    meshes: {
        length: IObjectAccessor<IMesh[], (Mesh | undefined)[], number>;
        __array__: {};
    };
}
export interface IGLTFObjectModelTreeNodesObject<GLTFTargetType = INode, BabylonTargetType = TransformNode> {
    length: IObjectAccessor<GLTFTargetType[], BabylonTargetType[], number>;
    __array__: {
        __target__: boolean;
        translation: IObjectAccessor<GLTFTargetType, BabylonTargetType, Vector3>;
        rotation: IObjectAccessor<GLTFTargetType, BabylonTargetType, Quaternion>;
        scale: IObjectAccessor<GLTFTargetType, BabylonTargetType, Vector3>;
        matrix: IObjectAccessor<GLTFTargetType, BabylonTargetType, Matrix>;
        globalMatrix: IObjectAccessor<GLTFTargetType, BabylonTargetType, Matrix>;
        weights: {
            length: IObjectAccessor<GLTFTargetType, BabylonTargetType, number>;
            __array__: {
                __target__: boolean;
            } & IObjectAccessor<GLTFTargetType, BabylonTargetType, number>;
        } & IObjectAccessor<GLTFTargetType, BabylonTargetType, number[]>;
        extensions: {
            EXT_lights_ies?: {
                multiplier: IObjectAccessor<INode, Light, number>;
                color: IObjectAccessor<INode, Light, Color3>;
            };
        };
    };
}
export interface IGLTFObjectModelTreeCamerasObject {
    __array__: {
        __target__: boolean;
        orthographic: {
            xmag: IObjectAccessor<ICamera, ICamera, Vector2>;
            ymag: IObjectAccessor<ICamera, ICamera, Vector2>;
            zfar: IObjectAccessor<ICamera, ICamera, number>;
            znear: IObjectAccessor<ICamera, ICamera, number>;
        };
        perspective: {
            yfov: IObjectAccessor<ICamera, ICamera, number>;
            zfar: IObjectAccessor<ICamera, ICamera, number>;
            znear: IObjectAccessor<ICamera, ICamera, number>;
            aspectRatio: IObjectAccessor<ICamera, ICamera, Nullable<number>>;
        };
    };
}
export interface IGLTFObjectModelTreeMaterialsObject {
    __array__: {
        __target__: boolean;
        pbrMetallicRoughness: {
            baseColorFactor: IObjectAccessor<IMaterial, PBRMaterial, Color4>;
            metallicFactor: IObjectAccessor<IMaterial, PBRMaterial, Nullable<number>>;
            roughnessFactor: IObjectAccessor<IMaterial, PBRMaterial, Nullable<number>>;
            baseColorTexture: {
                extensions: {
                    KHR_texture_transform: ITextureDefinition;
                };
            };
            metallicRoughnessTexture: {
                extensions: {
                    KHR_texture_transform: ITextureDefinition;
                };
            };
        };
        emissiveFactor: IObjectAccessor<IMaterial, PBRMaterial, Color3>;
        normalTexture: {
            scale: IObjectAccessor<IMaterial, PBRMaterial, number>;
            extensions: {
                KHR_texture_transform: ITextureDefinition;
            };
        };
        occlusionTexture: {
            strength: IObjectAccessor<IMaterial, PBRMaterial, number>;
            extensions: {
                KHR_texture_transform: ITextureDefinition;
            };
        };
        emissiveTexture: {
            extensions: {
                KHR_texture_transform: ITextureDefinition;
            };
        };
        extensions: {
            KHR_materials_anisotropy: {
                anisotropyStrength: IObjectAccessor<IMaterial, PBRMaterial, number>;
                anisotropyRotation: IObjectAccessor<IMaterial, PBRMaterial, number>;
                anisotropyTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
            };
            KHR_materials_clearcoat: {
                clearcoatFactor: IObjectAccessor<IMaterial, PBRMaterial, number>;
                clearcoatRoughnessFactor: IObjectAccessor<IMaterial, PBRMaterial, number>;
                clearcoatTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
                clearcoatNormalTexture: {
                    scale: IObjectAccessor<IMaterial, PBRMaterial, number>;
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
                clearcoatRoughnessTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
            };
            KHR_materials_dispersion: {
                dispersion: IObjectAccessor<IMaterial, PBRMaterial, number>;
            };
            KHR_materials_emissive_strength: {
                emissiveStrength: IObjectAccessor<IMaterial, PBRMaterial, number>;
            };
            KHR_materials_ior: {
                ior: IObjectAccessor<IMaterial, PBRMaterial, number>;
            };
            KHR_materials_iridescence: {
                iridescenceFactor: IObjectAccessor<IMaterial, PBRMaterial, number>;
                iridescenceIor: IObjectAccessor<IMaterial, PBRMaterial, number>;
                iridescenceThicknessMinimum: IObjectAccessor<IMaterial, PBRMaterial, number>;
                iridescenceThicknessMaximum: IObjectAccessor<IMaterial, PBRMaterial, number>;
                iridescenceTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
                iridescenceThicknessTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
            };
            KHR_materials_sheen: {
                sheenColorFactor: IObjectAccessor<IMaterial, PBRMaterial, Color3>;
                sheenRoughnessFactor: IObjectAccessor<IMaterial, PBRMaterial, number>;
                sheenColorTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
                sheenRoughnessTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
            };
            KHR_materials_specular: {
                specularFactor: IObjectAccessor<IMaterial, PBRMaterial, number>;
                specularColorFactor: IObjectAccessor<IMaterial, PBRMaterial, Color3>;
                specularTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
                specularColorTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
            };
            KHR_materials_transmission: {
                transmissionFactor: IObjectAccessor<IMaterial, PBRMaterial, number>;
                transmissionTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
            };
            KHR_materials_diffuse_transmission: {
                diffuseTransmissionFactor: IObjectAccessor<IMaterial, PBRMaterial, number>;
                diffuseTransmissionTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
                diffuseTransmissionColorFactor: IObjectAccessor<IMaterial, PBRMaterial, Nullable<Color3>>;
                diffuseTransmissionColorTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
            };
            KHR_materials_volume: {
                thicknessFactor: IObjectAccessor<IMaterial, PBRMaterial, number>;
                attenuationColor: IObjectAccessor<IMaterial, PBRMaterial, Color3>;
                attenuationDistance: IObjectAccessor<IMaterial, PBRMaterial, number>;
                thicknessTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
            };
        };
    };
}
interface ITextureDefinition {
    offset: IObjectAccessor<IMaterial, PBRMaterial, Vector2>;
    rotation: IObjectAccessor<IMaterial, PBRMaterial, number>;
    scale: IObjectAccessor<IMaterial, PBRMaterial, Vector2>;
}
export interface IGLTFObjectModelTreeMeshesObject {
}
export interface IGLTFObjectModelTreeExtensionsObject {
    KHR_lights_punctual: {
        lights: {
            length: IObjectAccessor<IKHRLightsPunctual_Light[], Light[], number>;
            __array__: {
                __target__: boolean;
                color: IObjectAccessor<IKHRLightsPunctual_Light, Light, Color3>;
                intensity: IObjectAccessor<IKHRLightsPunctual_Light, Light, number>;
                range: IObjectAccessor<IKHRLightsPunctual_Light, Light, number>;
                spot: {
                    innerConeAngle: IObjectAccessor<IKHRLightsPunctual_Light, Light, number>;
                    outerConeAngle: IObjectAccessor<IKHRLightsPunctual_Light, Light, number>;
                };
            };
        };
    };
    EXT_lights_ies: {
        lights: {
            length: IObjectAccessor<IKHRLightsPunctual_Light[], Light[], number>;
        };
    };
    EXT_lights_image_based: {
        lights: {
            __array__: {
                __target__: boolean;
                intensity: IObjectAccessor<IEXTLightsImageBased_LightImageBased, BaseTexture, number>;
                rotation: IObjectAccessor<IEXTLightsImageBased_LightImageBased, BaseTexture, Quaternion>;
            };
            length: IObjectAccessor<IEXTLightsImageBased_LightImageBased[], BaseTexture[], number>;
        };
    };
}
/**
 * get a path-to-object converter for the given glTF tree
 * @param gltf the glTF tree to use
 * @returns a path-to-object converter for the given glTF tree
 */
export declare function GetPathToObjectConverter(gltf: IGLTF): GLTFPathToObjectConverter<unknown, unknown, unknown>;
/**
 * This function will return the object accessor for the given key in the object model
 * If the key is not found, it will return undefined
 * @param key the key to get the mapping for, for example /materials/\{\}/emissiveFactor
 * @returns an object accessor for the given key, or undefined if the key is not found
 */
export declare function GetMappingForKey(key: string): IObjectAccessor | undefined;
/**
 * Set interpolation for a specific key in the object model
 * @param key the key to set, for example /materials/\{\}/emissiveFactor
 * @param interpolation the interpolation elements array
 */
export declare function SetInterpolationForKey(key: string, interpolation?: IInterpolationPropertyInfo[]): void;
/**
 * This will ad a new object accessor in the object model at the given key.
 * Note that this will NOT change the typescript types. To do that you will need to change the interface itself (extending it in the module that uses it)
 * @param key the key to add the object accessor at. For example /cameras/\{\}/perspective/aspectRatio
 * @param accessor the object accessor to add
 */
export declare function AddObjectAccessorToKey<GLTFTargetType = any, BabylonTargetType = any, BabylonValueType = any>(key: string, accessor: IObjectAccessor<GLTFTargetType, BabylonTargetType, BabylonValueType>): void;
export {};
