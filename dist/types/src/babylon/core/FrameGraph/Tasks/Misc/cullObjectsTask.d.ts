import type { Scene, Camera, FrameGraph, FrameGraphObjectList } from "core/index";
import { FrameGraphTask } from "../../frameGraphTask";
/**
 * Task used to cull objects that are not visible.
 */
export declare class FrameGraphCullObjectsTask extends FrameGraphTask {
    /**
     * The object list to cull.
     */
    objectList: FrameGraphObjectList;
    /**
     * The camera to use for culling.
     */
    camera: Camera;
    /**
     * The output object list containing the culled objects.
     */
    readonly outputObjectList: FrameGraphObjectList;
    private readonly _scene;
    /**
     * Creates a new cull objects task.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     * @param scene The scene to cull objects from.
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    record(): void;
}
