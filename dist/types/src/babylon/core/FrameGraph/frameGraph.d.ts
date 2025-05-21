import type { Scene, AbstractEngine, FrameGraphTask } from "core/index";
import { FrameGraphRenderPass } from "./Passes/renderPass";
import { FrameGraphCullPass } from "./Passes/cullPass";
import { FrameGraphTextureManager } from "./frameGraphTextureManager";
import { Observable } from "core/Misc/observable";
/**
 * Class used to implement a frame graph
 * @experimental
 */
export declare class FrameGraph {
    /**
     * Gets the texture manager used by the frame graph
     */
    readonly textureManager: FrameGraphTextureManager;
    private readonly _engine;
    private readonly _tasks;
    private readonly _passContext;
    private readonly _renderContext;
    private _currentProcessedTask;
    /**
     * Observable raised when the node render graph is built
     */
    onBuildObservable: Observable<FrameGraph>;
    /**
     * Gets the engine used by the frame graph
     */
    get engine(): AbstractEngine;
    /**
     * Constructs the frame graph
     * @param engine defines the hosting engine
     * @param debugTextures defines a boolean indicating that textures created by the frame graph should be visible in the inspector
     * @param scene defines the scene the frame graph is associated with
     */
    constructor(engine: AbstractEngine, debugTextures: boolean, scene: Scene);
    /**
     * Gets a task by name
     * @param name Name of the task to get
     * @returns The task or undefined if not found
     */
    getTaskByName<T extends FrameGraphTask>(name: string): T | undefined;
    /**
     * Adds a task to the frame graph
     * @param task Task to add
     */
    addTask(task: FrameGraphTask): void;
    /**
     * Adds a render pass to a task. This method can only be called during a Task.record execution.
     * @param name The name of the pass
     * @param whenTaskDisabled If true, the pass will be added to the list of passes to execute when the task is disabled (default is false)
     * @returns The render pass created
     */
    addRenderPass(name: string, whenTaskDisabled?: boolean): FrameGraphRenderPass;
    /**
     * Adds a cull pass to a task. This method can only be called during a Task.record execution.
     * @param name The name of the pass
     * @param whenTaskDisabled If true, the pass will be added to the list of passes to execute when the task is disabled (default is false)
     * @returns The cull pass created
     */
    addCullPass(name: string, whenTaskDisabled?: boolean): FrameGraphCullPass;
    private _addPass;
    /**
     * Builds the frame graph.
     * This method should be called after all tasks have been added to the frame graph (FrameGraph.addTask) and before the graph is executed (FrameGraph.execute).
     */
    build(): void;
    /**
     * Returns a promise that resolves when the frame graph is ready to be executed
     * This method must be called after the graph has been built (FrameGraph.build called)!
     * @param timeout Timeout in ms between retries (default is 16)
     * @returns The promise that resolves when the graph is ready
     */
    whenReadyAsync(timeout?: number): Promise<void>;
    /**
     * Executes the frame graph.
     */
    execute(): void;
    /**
     * Clears the frame graph (remove the tasks and release the textures).
     * The frame graph can be built again after this method is called.
     */
    clear(): void;
    /**
     * Disposes the frame graph
     */
    dispose(): void;
}
