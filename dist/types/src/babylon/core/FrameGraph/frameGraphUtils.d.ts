import type { Camera, FrameGraph, Nullable } from "core/index";
import { FrameGraphObjectRendererTask } from "core/FrameGraph/Tasks/Rendering/objectRendererTask";
import { UtilityLayerRenderer } from "core/Rendering/utilityLayerRenderer";
/**
 * Looks for the main camera used by the frame graph.
 * By default, this is the camera used by the main object renderer task.
 * If no such task, we try to find a camera in either a geometry renderer or a utility layer renderer tasks.
 * @param frameGraph The frame graph to search in
 * @returns The main camera used by the frame graph, or null if not found
 */
export declare function FindMainCamera(frameGraph: FrameGraph): Nullable<Camera>;
/**
 * Looks for the main object renderer task in the frame graph.
 * By default, this is the object renderer task with isMainObjectRenderer set to true.
 * If no such task, we return the last object renderer task that has an object list with meshes (or null if none found).
 * @param frameGraph The frame graph to search in
 * @returns The main object renderer of the frame graph, or null if not found
 */
export declare function FindMainObjectRenderer(frameGraph: FrameGraph): Nullable<FrameGraphObjectRendererTask>;
/**
 * Creates a utility layer renderer compatible with the given frame graph.
 * @param frameFraph The frame graph to create the utility layer renderer for
 * @param handleEvents True if the utility layer renderer should handle events, false otherwise (default is true)
 * @returns The created utility layer renderer
 */
export declare function CreateUtilityLayerRenderer(frameFraph: FrameGraph, handleEvents?: boolean): UtilityLayerRenderer;
/**
 * Class used to host frame graph specific utilities
 */
export declare const FrameGraphUtils: {
    /**
     * Looks for the main camera used by the frame graph.
     * We assume that the camera used by the the last rendering task in the graph is the main camera.
     * @param frameGraph The frame graph to search in
     * @returns The main camera used by the frame graph, or null if not found
     */
    FindMainCamera: typeof FindMainCamera;
    /**
     * Looks for the main object renderer task in the frame graph.
     * We assume that the last object renderer task that has an object list with meshes is the main object renderer.
     * @param frameGraph The frame graph to search in
     * @returns The main object renderer of the frame graph, or null if not found
     */
    FindMainObjectRenderer: typeof FindMainObjectRenderer;
    /**
     * Creates a utility layer renderer compatible with the given frame graph.
     * @param frameFraph The frame graph to create the utility layer renderer for
     * @param handleEvents True if the utility layer renderer should handle events, false otherwise
     * @returns The created utility layer renderer
     */
    CreateUtilityLayerRenderer: typeof CreateUtilityLayerRenderer;
};
