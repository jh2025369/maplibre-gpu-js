import type { Scene, AbstractEngine, FrameGraphTask, Nullable, NodeRenderGraph } from "core/index";
import { FrameGraphPass } from "./Passes/pass";
import { FrameGraphRenderPass } from "./Passes/renderPass";
import { FrameGraphCullPass } from "./Passes/cullPass";
import { FrameGraphContext } from "./frameGraphContext";
import { FrameGraphTextureManager } from "./frameGraphTextureManager";
import { Observable } from "core/Misc/observable";
import "core/Engines/Extensions/engine.multiRender";
import "core/Engines/WebGPU/Extensions/engine.multiRender";
/**
 * Class used to implement a frame graph
 * @experimental
 */
export declare class FrameGraph {
    private readonly _linkedNodeRenderGraph;
    /**
     * Gets the texture manager used by the frame graph
     */
    readonly textureManager: FrameGraphTextureManager;
    private readonly _engine;
    private readonly _scene;
    private readonly _tasks;
    private readonly _passContext;
    private readonly _renderContext;
    private _currentProcessedTask;
    private _whenReadyAsyncCancel;
    /**
     * Name of the frame graph
     */
    name: string;
    /**
     * Gets the unique id of the frame graph
     */
    readonly uniqueId: number;
    /**
     * Gets or sets a boolean indicating that texture allocation should be optimized (that is, reuse existing textures when possible to limit GPU memory usage) (default: true)
     */
    optimizeTextureAllocation: boolean;
    /**
     * Observable raised when the node render graph is built
     */
    onBuildObservable: Observable<FrameGraph>;
    /**
     * Gets the engine used by the frame graph
     */
    get engine(): AbstractEngine;
    /**
     * Gets the scene used by the frame graph
     */
    get scene(): Scene;
    /**
     * Gets the list of tasks in the frame graph
     */
    get tasks(): FrameGraphTask[];
    /**
     * Gets the node render graph linked to the frame graph (if any)
     * @returns the linked node render graph or null if none
     */
    getLinkedNodeRenderGraph(): Nullable<NodeRenderGraph>;
    /**
     * Constructs the frame graph
     * @param scene defines the scene the frame graph is associated with
     * @param debugTextures defines a boolean indicating that textures created by the frame graph should be visible in the inspector (default is false)
     * @param _linkedNodeRenderGraph defines the linked node render graph (if any)
     */
    constructor(scene: Scene, debugTextures?: boolean, _linkedNodeRenderGraph?: Nullable<NodeRenderGraph>);
    /**
     * Gets the class name of the frame graph
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets a task by name
     * @param name Name of the task to get
     * @returns The task or undefined if not found
     */
    getTaskByName<T extends FrameGraphTask>(name: string): T | undefined;
    /**
     * Gets all tasks of a specific type
     * @param taskType Type of the task(s) to get
     * @returns The list of tasks of the specified type
     */
    getTasksByType<T extends FrameGraphTask>(taskType: new (...args: any[]) => T): T[];
    /**
     * Adds a task to the frame graph
     * @param task Task to add
     */
    addTask(task: FrameGraphTask): void;
    /**
     * Adds a pass to a task. This method can only be called during a Task.record execution.
     * @param name The name of the pass
     * @param whenTaskDisabled If true, the pass will be added to the list of passes to execute when the task is disabled (default is false)
     * @returns The render pass created
     */
    addPass(name: string, whenTaskDisabled?: boolean): FrameGraphPass<FrameGraphContext>;
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
     * @param timeStep Time step in ms between retries (default is 16)
     * @param maxTimeout Maximum time in ms to wait for the graph to be ready (default is 30000)
     * @returns The promise that resolves when the graph is ready
     */
    whenReadyAsync(timeStep?: number, maxTimeout?: number): Promise<void>;
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
