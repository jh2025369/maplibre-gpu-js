import { Scene } from "../scene";
import { AbstractMesh } from "../Meshes/abstractMesh";
import { SmartArray } from "../Misc/smartArray";
import type { Nullable } from "../types";
import type { ISceneComponent } from "../sceneComponent";
import { BoundingBox } from "../Culling/boundingBox";
import { Color3 } from "../Maths/math.color";
import { Observable } from "../Misc/observable";
import { DrawWrapper } from "../Materials/drawWrapper";
import { ShaderLanguage } from "core/Materials/shaderLanguage";
declare module "../scene" {
    interface Scene {
        /** @internal (Backing field) */
        _boundingBoxRenderer: BoundingBoxRenderer;
        /** @internal (Backing field) */
        _forceShowBoundingBoxes: boolean;
        /**
         * Gets or sets a boolean indicating if all bounding boxes must be rendered
         */
        forceShowBoundingBoxes: boolean;
        /**
         * Gets the bounding box renderer associated with the scene
         * @returns a BoundingBoxRenderer
         */
        getBoundingBoxRenderer(): BoundingBoxRenderer;
    }
}
declare module "../Meshes/abstractMesh" {
    interface AbstractMesh {
        /** @internal (Backing field) */
        _showBoundingBox: boolean;
        /**
         * Gets or sets a boolean indicating if the bounding box must be rendered as well (false by default)
         */
        showBoundingBox: boolean;
    }
}
/**
 * Component responsible of rendering the bounding box of the meshes in a scene.
 * This is usually used through the mesh.showBoundingBox or the scene.forceShowBoundingBoxes properties
 */
export declare class BoundingBoxRenderer implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "BoundingBoxRenderer";
    /**
     * The scene the component belongs to.
     */
    scene: Scene;
    /**
     * Color of the bounding box lines placed in front of an object
     */
    frontColor: Color3;
    /**
     * Color of the bounding box lines placed behind an object
     */
    backColor: Color3;
    /**
     * Defines if the renderer should show the back lines or not
     */
    showBackLines: boolean;
    /**
     * Observable raised before rendering a bounding box
     * When {@link BoundingBoxRenderer.useInstances} enabled,
     * this would only be triggered once for one rendering, instead of once every bounding box.
     * Events would be triggered with a dummy box to keep backwards compatibility,
     * the passed bounding box has no meaning and should be ignored.
     */
    onBeforeBoxRenderingObservable: Observable<BoundingBox>;
    /**
     * Observable raised after rendering a bounding box
     * When {@link BoundingBoxRenderer.useInstances} enabled,
     * this would only be triggered once for one rendering, instead of once every bounding box.
     * Events would be triggered with a dummy box to keep backwards compatibility,
     * the passed bounding box has no meaning and should be ignored.
     */
    onAfterBoxRenderingObservable: Observable<BoundingBox>;
    /**
     * Observable raised after resources are created
     */
    onResourcesReadyObservable: Observable<BoundingBoxRenderer>;
    /**
     * When false, no bounding boxes will be rendered
     */
    enabled: boolean;
    /** Shader language used by the renderer */
    protected _shaderLanguage: ShaderLanguage;
    /**
     * Gets the shader language used in this renderer.
     */
    get shaderLanguage(): ShaderLanguage;
    /**
     * @internal
     */
    renderList: SmartArray<BoundingBox>;
    private _colorShader;
    private _colorShaderForOcclusionQuery;
    private _vertexBuffers;
    private _indexBuffer;
    private _fillIndexBuffer;
    private _fillIndexData;
    private _uniformBufferFront;
    private _uniformBufferBack;
    private _renderPassIdForOcclusionQuery;
    /**
     * Internal buffer for instanced rendering
     */
    private _matrixBuffer;
    private _matrices;
    /**
     * Internal state of whether instanced rendering enabled
     */
    protected _useInstances: boolean;
    /** @internal */
    _drawWrapperFront: Nullable<DrawWrapper>;
    /** @internal */
    _drawWrapperBack: Nullable<DrawWrapper>;
    /**
     * Instantiates a new bounding box renderer in a scene.
     * @param scene the scene the  renderer renders in
     */
    constructor(scene: Scene);
    private _buildUniformLayout;
    /**
     * Registers the component in a given scene
     */
    register(): void;
    private _evaluateSubMesh;
    private _preActiveMesh;
    private _prepareResources;
    private _createIndexBuffer;
    /**
     * Rebuilds the elements related to this component in case of
     * context lost for instance.
     */
    rebuild(): void;
    /**
     * @internal
     */
    reset(): void;
    /**
     * Render the bounding boxes of a specific rendering group
     * @param renderingGroupId defines the rendering group to render
     */
    render(renderingGroupId: number): void;
    private _createWrappersForBoundingBox;
    /**
     * In case of occlusion queries, we can render the occlusion bounding box through this method
     * @param mesh Define the mesh to render the occlusion bounding box for
     */
    renderOcclusionBoundingBox(mesh: AbstractMesh): void;
    /**
     * Sets whether to use instanced rendering.
     * When not enabled, BoundingBoxRenderer renders in a loop,
     * calling engine.drawElementsType for each bounding box in renderList,
     * making every bounding box 1 or 2 draw call.
     * When enabled, it collects bounding boxes to render,
     * and render all boxes in 1 or 2 draw call.
     * This could make the rendering with many bounding boxes much faster than not enabled,
     * but could result in a difference in rendering result if
     * {@link BoundingBoxRenderer.showBackLines} enabled,
     * because drawing the black/white part of each box one after the other
     * can be different from drawing the black part of all boxes and then the white part.
     * Also, when enabled, events of {@link BoundingBoxRenderer.onBeforeBoxRenderingObservable}
     * and {@link BoundingBoxRenderer.onAfterBoxRenderingObservable} would only be triggered once
     * for one rendering, instead of once every bounding box.
     * Events would be triggered with a dummy box to keep backwards compatibility,
     * the passed bounding box has no meaning and should be ignored.
     * @param val whether to use instanced rendering
     */
    set useInstances(val: boolean);
    get useInstances(): boolean;
    /**
     * Instanced render the bounding boxes of a specific rendering group
     * @param renderingGroupId defines the rendering group to render
     */
    private _renderInstanced;
    /**
     * Creates buffer for instanced rendering
     * @param buffer buffer to set
     */
    private _createInstanceBuffer;
    /**
     * Clean up buffers for instanced rendering
     */
    private _cleanupInstanceBuffer;
    /**
     * Clean up resources for instanced rendering
     */
    private _cleanupInstances;
    /**
     * Dispose and release the resources attached to this renderer.
     */
    dispose(): void;
}
