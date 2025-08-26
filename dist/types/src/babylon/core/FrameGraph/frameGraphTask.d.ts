import type { FrameGraph, IFrameGraphPass, FrameGraphTextureHandle, FrameGraphRenderContext } from "core/index";
import { Observable } from "core/Misc/observable";
/**
 * Represents a task in a frame graph.
 * @experimental
 */
export declare abstract class FrameGraphTask {
    protected readonly _frameGraph: FrameGraph;
    private readonly _passes;
    private readonly _passesDisabled;
    protected _name: string;
    /**
     * The name of the task.
     */
    get name(): string;
    set name(value: string);
    protected _disabled: boolean;
    /**
     * Whether the task is disabled.
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * Gets the render passes of the task.
     */
    get passes(): IFrameGraphPass[];
    /**
     * Gets the disabled render passes of the task.
     */
    get passesDisabled(): IFrameGraphPass[];
    /**
     * The (texture) dependencies of the task (optional).
     */
    dependencies?: Set<FrameGraphTextureHandle>;
    /**
     * Records the task in the frame graph. Use this function to add content (render passes, ...) to the task.
     */
    abstract record(): void;
    /**
     * An observable that is triggered after the textures have been allocated.
     */
    onTexturesAllocatedObservable: Observable<FrameGraphRenderContext>;
    /**
     * Checks if the task is ready to be executed.
     * @returns True if the task is ready to be executed, else false.
     */
    isReady(): boolean;
    /**
     * Disposes of the task.
     */
    dispose(): void;
    /**
     * Constructs a new frame graph task.
     * @param name The name of the task.
     * @param frameGraph The frame graph this task is associated with.
     */
    constructor(name: string, frameGraph: FrameGraph);
    /** @internal */
    _reset(): void;
    /** @internal */
    _addPass(pass: IFrameGraphPass, disabled: boolean): void;
    /** @internal */
    _checkTask(): void;
    /** @internal */
    _getPasses(): IFrameGraphPass[];
    private _checkSameRenderTarget;
}
