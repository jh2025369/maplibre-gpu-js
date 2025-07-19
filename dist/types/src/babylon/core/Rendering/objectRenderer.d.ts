import type { SmartArray, Nullable, Immutable, Camera, Scene, AbstractMesh, SubMesh, Material, IParticleSystem } from "core/index";
import { Observable } from "../Misc/observable";
import { RenderingManager } from "../Rendering/renderingManager";
/**
 * Defines the options of the object renderer
 */
export interface ObjectRendererOptions {
    /** The number of passes the renderer will support (1 by default) */
    numPasses?: number;
    /** True (default) to not change the aspect ratio of the scene in the RTT */
    doNotChangeAspectRatio?: boolean;
}
/**
 * A class that renders objects to the currently bound render target.
 * This class only renders objects, and is not concerned with the output texture or post-processing.
 */
export declare class ObjectRenderer {
    /**
     * Objects will only be rendered once which can be useful to improve performance if everything in your render is static for instance.
     */
    static readonly REFRESHRATE_RENDER_ONCE: number;
    /**
     * Objects will be rendered every frame and is recommended for dynamic contents.
     */
    static readonly REFRESHRATE_RENDER_ONEVERYFRAME: number;
    /**
     * Objects will be rendered every 2 frames which could be enough if your dynamic objects are not
     * the central point of your effect and can save a lot of performances.
     */
    static readonly REFRESHRATE_RENDER_ONEVERYTWOFRAMES: number;
    /**
     * Use this predicate to dynamically define the list of mesh you want to render.
     * If set, the renderList property will be overwritten.
     */
    renderListPredicate: (AbstractMesh: AbstractMesh) => boolean;
    private _renderList;
    private _unObserveRenderList;
    /**
     * Use this list to define the list of mesh you want to render.
     */
    get renderList(): Nullable<Array<AbstractMesh>>;
    set renderList(value: Nullable<Array<AbstractMesh>>);
    private _renderListHasChanged;
    /**
     * Define the list of particle systems to render. If not provided, will render all the particle systems of the scene.
     * Note that the particle systems are rendered only if renderParticles is set to true.
     */
    particleSystemList: Nullable<Array<IParticleSystem>>;
    /**
     * Use this function to overload the renderList array at rendering time.
     * Return null to render with the current renderList, else return the list of meshes to use for rendering.
     * For 2DArray, layerOrFace is the index of the layer that is going to be rendered, else it is the faceIndex of
     * the cube (if the RTT is a cube, else layerOrFace=0).
     * The renderList passed to the function is the current render list (the one that will be used if the function returns null).
     * The length of this list is passed through renderListLength: don't use renderList.length directly because the array can
     * hold dummy elements!
     */
    getCustomRenderList: Nullable<(layerOrFace: number, renderList: Nullable<Immutable<Array<AbstractMesh>>>, renderListLength: number) => Nullable<Array<AbstractMesh>>>;
    /**
     * Define if particles should be rendered.
     */
    renderParticles: boolean;
    /**
     * Define if sprites should be rendered.
     */
    renderSprites: boolean;
    /**
     * Force checking the layerMask property even if a custom list of meshes is provided (ie. if renderList is not undefined)
     */
    forceLayerMaskCheck: boolean;
    /**
     * Define the camera used to render the objects.
     */
    activeCamera: Nullable<Camera>;
    /**
     * Override the mesh isReady function with your own one.
     */
    customIsReadyFunction: (mesh: AbstractMesh, refreshRate: number, preWarm?: boolean) => boolean;
    /**
     * Override the render function with your own one.
     */
    customRenderFunction: (opaqueSubMeshes: SmartArray<SubMesh>, alphaTestSubMeshes: SmartArray<SubMesh>, transparentSubMeshes: SmartArray<SubMesh>, depthOnlySubMeshes: SmartArray<SubMesh>, beforeTransparents?: () => void) => void;
    /**
     * An event triggered before rendering the objects
     */
    readonly onBeforeRenderObservable: Observable<number>;
    /**
     * An event triggered after rendering the objects
     */
    readonly onAfterRenderObservable: Observable<number>;
    /**
     * An event triggered before the rendering group is processed
     */
    readonly onBeforeRenderingManagerRenderObservable: Observable<number>;
    /**
     * An event triggered after the rendering group is processed
     */
    readonly onAfterRenderingManagerRenderObservable: Observable<number>;
    /**
     * An event triggered when fast path rendering is used
     */
    readonly onFastPathRenderObservable: Observable<number>;
    protected _scene: Scene;
    protected _renderingManager: RenderingManager;
    /** @internal */
    _waitingRenderList?: string[];
    protected _currentRefreshId: number;
    protected _refreshRate: number;
    protected _doNotChangeAspectRatio: boolean;
    /**
     * The options used by the object renderer
     */
    options: Required<ObjectRendererOptions>;
    /**
     * Friendly name of the object renderer
     */
    name: string;
    /**
     * Current render pass id. Note it can change over the rendering as there's a separate id for each face of a cube / each layer of an array layer!
     */
    renderPassId: number;
    private _renderPassIds;
    /**
     * Gets the render pass ids used by the object renderer.
     */
    get renderPassIds(): readonly number[];
    /**
     * Gets the current value of the refreshId counter
     */
    get currentRefreshId(): number;
    /**
     * Sets a specific material to be used to render a mesh/a list of meshes with this object renderer
     * @param mesh mesh or array of meshes
     * @param material material or array of materials to use for this render pass. If undefined is passed, no specific material will be used but the regular material instead (mesh.material). It's possible to provide an array of materials to use a different material for each rendering pass.
     */
    setMaterialForRendering(mesh: AbstractMesh | AbstractMesh[], material?: Material | Material[]): void;
    /**
     * Instantiates an object renderer.
     * @param name The friendly name of the object renderer
     * @param scene The scene the renderer belongs to
     * @param options The options used to create the renderer (optional)
     */
    constructor(name: string, scene: Scene, options?: ObjectRendererOptions);
    private _releaseRenderPassId;
    private _createRenderPassId;
    /**
     * Resets the refresh counter of the renderer and start back from scratch.
     * Could be useful to re-render if it is setup to render only once.
     */
    resetRefreshCounter(): void;
    /**
     * Defines the refresh rate of the rendering or the rendering frequency.
     * Use 0 to render just once, 1 to render on every frame, 2 to render every two frames and so on...
     */
    get refreshRate(): number;
    set refreshRate(value: number);
    /**
     * Indicates if the renderer should render the current frame.
     * The output is based on the specified refresh rate.
     * @returns true if the renderer should render the current frame
     */
    shouldRender(): boolean;
    /**
     * This function will check if the renderer is ready to render (textures are loaded, shaders are compiled)
     * @param viewportWidth defines the width of the viewport
     * @param viewportHeight defines the height of the viewport
     * @returns true if all required resources are ready
     */
    isReadyForRendering(viewportWidth: number, viewportHeight: number): boolean;
    /**
     * Makes sure the list of meshes is ready to be rendered
     * You should call this function before "initRender", but if you know the render list is ok, you may call "initRender" directly
     */
    prepareRenderList(): void;
    private _defaultRenderListPrepared;
    private _currentSceneCamera;
    /**
     * This method makes sure everything is setup before "render" can be called
     * @param viewportWidth Width of the viewport to render to
     * @param viewportHeight Height of the viewport to render to
     */
    initRender(viewportWidth: number, viewportHeight: number): void;
    /**
     * This method must be called after the "render" call(s), to complete the rendering process.
     */
    finishRender(): void;
    /**
     * Renders all the objects (meshes, particles systems, sprites) to the currently bound render target texture.
     * @param passIndex defines the pass index to use (default: 0)
     * @param skipOnAfterRenderObservable defines a flag to skip raising the onAfterRenderObservable
     */
    render(passIndex?: number, skipOnAfterRenderObservable?: boolean): void;
    /** @internal */
    _checkReadiness(): boolean;
    private _prepareRenderingManager;
    /**
     * Overrides the default sort function applied in the rendering group to prepare the meshes.
     * This allowed control for front to back rendering or reversely depending of the special needs.
     *
     * @param renderingGroupId The rendering group id corresponding to its index
     * @param opaqueSortCompareFn The opaque queue comparison function use to sort.
     * @param alphaTestSortCompareFn The alpha test queue comparison function use to sort.
     * @param transparentSortCompareFn The transparent queue comparison function use to sort.
     */
    setRenderingOrder(renderingGroupId: number, opaqueSortCompareFn?: Nullable<(a: SubMesh, b: SubMesh) => number>, alphaTestSortCompareFn?: Nullable<(a: SubMesh, b: SubMesh) => number>, transparentSortCompareFn?: Nullable<(a: SubMesh, b: SubMesh) => number>): void;
    /**
     * Specifies whether or not the stencil and depth buffer are cleared between two rendering groups.
     *
     * @param renderingGroupId The rendering group id corresponding to its index
     * @param autoClearDepthStencil Automatically clears depth and stencil between groups if true.
     */
    setRenderingAutoClearDepthStencil(renderingGroupId: number, autoClearDepthStencil: boolean): void;
    /**
     * Clones the renderer.
     * @returns the cloned renderer
     */
    clone(): ObjectRenderer;
    /**
     * Dispose the renderer and release its associated resources.
     */
    dispose(): void;
    /** @internal */
    _rebuild(): void;
    /**
     * Clear the info related to rendering groups preventing retention point in material dispose.
     */
    freeRenderingGroups(): void;
}
