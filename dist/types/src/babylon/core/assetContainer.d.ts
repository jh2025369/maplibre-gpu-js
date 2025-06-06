import type { Scene } from "./scene";
import { Mesh } from "./Meshes/mesh";
import { TransformNode } from "./Meshes/transformNode";
import type { Skeleton } from "./Bones/skeleton";
import type { AnimationGroup } from "./Animations/animationGroup";
import { type Animatable } from "./Animations/animatable.core";
import { AbstractMesh } from "./Meshes/abstractMesh";
import type { MultiMaterial } from "./Materials/multiMaterial";
import type { Material } from "./Materials/material";
import type { Nullable } from "./types";
import type { Node } from "./node";
import { Light } from "./Lights/light";
import { Camera } from "./Cameras/camera";
import type { IParticleSystem } from "./Particles/IParticleSystem";
import type { IAssetContainer } from "./IAssetContainer";
import type { Animation } from "./Animations/animation";
import type { MorphTargetManager } from "./Morph/morphTargetManager";
import type { Geometry } from "./Meshes/geometry";
import type { AbstractActionManager } from "./Actions/abstractActionManager";
import type { BaseTexture } from "./Materials/Textures/baseTexture";
import type { PostProcess } from "./PostProcesses/postProcess";
import type { Sound } from "./Audio/sound";
import type { Layer } from "./Layers/layer";
import type { EffectLayer } from "./Layers/effectLayer";
import type { ReflectionProbe } from "./Probes/reflectionProbe";
import type { LensFlareSystem } from "./LensFlares/lensFlareSystem";
import type { ProceduralTexture } from "./Materials/Textures/Procedurals/proceduralTexture";
/**
 * Root class for AssetContainer and KeepAssets
 */
export declare class AbstractAssetContainer implements IAssetContainer {
    /**
     * Gets the list of root nodes (ie. nodes with no parent)
     */
    rootNodes: Node[];
    /** All of the cameras added to this scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras
     */
    cameras: Camera[];
    /**
     * All of the lights added to this scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
     */
    lights: Light[];
    /**
     * All of the (abstract) meshes added to this scene
     */
    meshes: AbstractMesh[];
    /**
     * The list of skeletons added to the scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/bonesSkeletons
     */
    skeletons: Skeleton[];
    /**
     * All of the particle systems added to this scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/particle_system_intro
     */
    particleSystems: IParticleSystem[];
    /**
     * Gets a list of Animations associated with the scene
     */
    animations: Animation[];
    /**
     * All of the animation groups added to this scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/groupAnimations
     */
    animationGroups: AnimationGroup[];
    /**
     * All of the multi-materials added to this scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/multiMaterials
     */
    multiMaterials: MultiMaterial[];
    /**
     * All of the materials added to this scene
     * In the context of a Scene, it is not supposed to be modified manually.
     * Any addition or removal should be done using the addMaterial and removeMaterial Scene methods.
     * Note also that the order of the Material within the array is not significant and might change.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/materials_introduction
     */
    materials: Material[];
    /**
     * The list of morph target managers added to the scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph
     */
    morphTargetManagers: MorphTargetManager[];
    /**
     * The list of geometries used in the scene.
     */
    geometries: Geometry[];
    /**
     * All of the transform nodes added to this scene
     * In the context of a Scene, it is not supposed to be modified manually.
     * Any addition or removal should be done using the addTransformNode and removeTransformNode Scene methods.
     * Note also that the order of the TransformNode within the array is not significant and might change.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/parent_pivot/transform_node
     */
    transformNodes: TransformNode[];
    /**
     * ActionManagers available on the scene.
     * @deprecated
     */
    actionManagers: AbstractActionManager[];
    /**
     * Textures to keep.
     */
    textures: BaseTexture[];
    /** @internal */
    protected _environmentTexture: Nullable<BaseTexture>;
    /**
     * Texture used in all pbr material as the reflection texture.
     * As in the majority of the scene they are the same (exception for multi room and so on),
     * this is easier to reference from here than from all the materials.
     */
    get environmentTexture(): Nullable<BaseTexture>;
    set environmentTexture(value: Nullable<BaseTexture>);
    /**
     * The list of postprocesses added to the scene
     */
    postProcesses: PostProcess[];
    /**
     * The list of sounds
     */
    sounds: Nullable<Sound[]>;
    /**
     * The list of effect layers added to the scene
     */
    effectLayers: EffectLayer[];
    /**
     * The list of layers added to the scene
     */
    layers: Layer[];
    /**
     * The list of reflection probes added to the scene
     */
    reflectionProbes: ReflectionProbe[];
    /**
     * The list of lens flare systems added to the scene
     */
    lensFlareSystems: LensFlareSystem[];
    /**
     * The list of procedural textures added to the scene
     */
    proceduralTextures: ProceduralTexture[];
    /**
     * @returns all meshes, lights, cameras, transformNodes and bones
     */
    getNodes(): Array<Node>;
}
/**
 * Set of assets to keep when moving a scene into an asset container.
 */
export declare class KeepAssets extends AbstractAssetContainer {
}
/**
 * Class used to store the output of the AssetContainer.instantiateAllMeshesToScene function
 */
export declare class InstantiatedEntries {
    /**
     * List of new root nodes (eg. nodes with no parent)
     */
    rootNodes: Node[];
    /**
     * List of new skeletons
     */
    skeletons: Skeleton[];
    /**
     * List of new animation groups
     */
    animationGroups: AnimationGroup[];
    /**
     * Disposes the instantiated entries from the scene
     */
    dispose(): void;
}
/**
 * Container with a set of assets that can be added or removed from a scene.
 */
export declare class AssetContainer extends AbstractAssetContainer {
    private _wasAddedToScene;
    private _onContextRestoredObserver;
    /**
     * The scene the AssetContainer belongs to.
     */
    scene: Scene;
    /**
     * Instantiates an AssetContainer.
     * @param scene The scene the AssetContainer belongs to.
     */
    constructor(scene?: Nullable<Scene>);
    /**
     * Given a list of nodes, return a topological sorting of them.
     * @param nodes
     * @returns a sorted array of nodes
     */
    private _topologicalSort;
    private _addNodeAndDescendantsToList;
    /**
     * Check if a specific node is contained in this asset container.
     * @param node the node to check
     * @returns true if the node is contained in this container, otherwise false.
     */
    private _isNodeInContainer;
    /**
     * For every node in the scene, check if its parent node is also in the scene.
     * @returns true if every node's parent is also in the scene, otherwise false.
     */
    private _isValidHierarchy;
    /**
     * Instantiate or clone all meshes and add the new ones to the scene.
     * Skeletons and animation groups will all be cloned
     * @param nameFunction defines an optional function used to get new names for clones
     * @param cloneMaterials defines an optional boolean that defines if materials must be cloned as well (false by default)
     * @param options defines an optional list of options to control how to instantiate / clone models
     * @param options.doNotInstantiate defines if the model must be instantiated or just cloned
     * @param options.predicate defines a predicate used to filter whih mesh to instantiate/clone
     * @returns a list of rootNodes, skeletons and animation groups that were duplicated
     */
    instantiateModelsToScene(nameFunction?: (sourceName: string) => string, cloneMaterials?: boolean, options?: {
        doNotInstantiate?: boolean | ((node: Node) => boolean);
        predicate?: (entity: any) => boolean;
    }): InstantiatedEntries;
    /**
     * Adds all the assets from the container to the scene.
     */
    addAllToScene(): void;
    /**
     * Adds assets from the container to the scene.
     * @param predicate defines a predicate used to select which entity will be added (can be null)
     */
    addToScene(predicate?: Nullable<(entity: any) => boolean>): void;
    /**
     * Removes all the assets in the container from the scene
     */
    removeAllFromScene(): void;
    /**
     * Removes assets in the container from the scene
     * @param predicate defines a predicate used to select which entity will be added (can be null)
     */
    removeFromScene(predicate?: Nullable<(entity: any) => boolean>): void;
    /**
     * Disposes all the assets in the container
     */
    dispose(): void;
    private _moveAssets;
    /**
     * Removes all the assets contained in the scene and adds them to the container.
     * @param keepAssets Set of assets to keep in the scene. (default: empty)
     */
    moveAllFromScene(keepAssets?: KeepAssets): void;
    /**
     * Adds all meshes in the asset container to a root mesh that can be used to position all the contained meshes. The root mesh is then added to the front of the meshes in the assetContainer.
     * @returns the root mesh
     */
    createRootMesh(): Mesh;
    /**
     * Merge animations (direct and animation groups) from this asset container into a scene
     * @param scene is the instance of BABYLON.Scene to append to (default: last created scene)
     * @param animatables set of animatables to retarget to a node from the scene
     * @param targetConverter defines a function used to convert animation targets from the asset container to the scene (default: search node by name)
     * @returns an array of the new AnimationGroup added to the scene (empty array if none)
     */
    mergeAnimationsTo(scene: Nullable<Scene>, animatables: Animatable[], targetConverter?: Nullable<(target: any) => Nullable<Node>>): AnimationGroup[];
    /**
     * @since 6.15.0
     * This method checks for any node that has no parent
     * and is not in the rootNodes array, and adds the node
     * there, if so.
     */
    populateRootNodes(): void;
    /**
     * @since 6.26.0
     * Given a root asset, this method will traverse its hierarchy and add it, its children and any materials/skeletons/animation groups to the container.
     * @param root root node
     */
    addAllAssetsToContainer(root: Node): void;
}
