import type { IObjectInfo, IPathToObjectConverter } from "../ObjectModel/objectModelInterfaces";
import type { FlowGraphBlock } from "./flowGraphBlock";
import type { FlowGraphContext } from "./flowGraphContext";
import type { FlowGraphDataConnection } from "./flowGraphDataConnection";
import { FlowGraphInteger } from "./CustomTypes/flowGraphInteger";
import type { IObjectAccessor } from "./typeDefinitions";
/**
 * @experimental
 * A component that converts a path to an object accessor.
 */
export declare class FlowGraphPathConverterComponent {
    path: string;
    ownerBlock: FlowGraphBlock;
    /**
     * The templated inputs for the provided path.
     */
    readonly templatedInputs: FlowGraphDataConnection<FlowGraphInteger>[];
    constructor(path: string, ownerBlock: FlowGraphBlock);
    /**
     * Get the accessor for the path.
     * @param pathConverter the path converter to use to convert the path to an object accessor.
     * @param context the context to use.
     * @returns the accessor for the path.
     * @throws if the value for a templated input is invalid.
     */
    getAccessor(pathConverter: IPathToObjectConverter<IObjectAccessor>, context: FlowGraphContext): IObjectInfo<IObjectAccessor>;
}
