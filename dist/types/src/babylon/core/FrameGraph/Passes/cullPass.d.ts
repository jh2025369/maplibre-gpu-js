import type { Nullable, AbstractEngine, IFrameGraphPass, FrameGraphContext, FrameGraphObjectList, FrameGraphTask } from "core/index";
import { FrameGraphPass } from "./pass";
/**
 * Cull pass used to filter objects that are not visible.
 */
export declare class FrameGraphCullPass extends FrameGraphPass<FrameGraphContext> {
    protected _engine: AbstractEngine;
    protected _objectList: FrameGraphObjectList;
    /**
     * Checks if a pass is a cull pass.
     * @param pass The pass to check.
     * @returns True if the pass is a cull pass, else false.
     */
    static IsCullPass(pass: IFrameGraphPass): pass is FrameGraphCullPass;
    /**
     * Gets the object list used by the cull pass.
     */
    get objectList(): FrameGraphObjectList;
    /**
     * Sets the object list to use for culling.
     * @param objectList The object list to use for culling.
     */
    setObjectList(objectList: FrameGraphObjectList): void;
    /** @internal */
    constructor(name: string, parentTask: FrameGraphTask, context: FrameGraphContext, engine: AbstractEngine);
    /** @internal */
    _isValid(): Nullable<string>;
}
