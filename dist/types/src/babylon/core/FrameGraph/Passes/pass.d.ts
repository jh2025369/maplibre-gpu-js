import type { Nullable, FrameGraphContext, IFrameGraphPass, FrameGraphTask } from "core/index";
/**
 * @internal
 */
export declare class FrameGraphPass<T extends FrameGraphContext> implements IFrameGraphPass {
    name: string;
    protected readonly _parentTask: FrameGraphTask;
    protected readonly _context: T;
    private _executeFunc;
    constructor(name: string, _parentTask: FrameGraphTask, _context: T);
    setExecuteFunc(func: (context: T) => void): void;
    _execute(): void;
    _isValid(): Nullable<string>;
}
