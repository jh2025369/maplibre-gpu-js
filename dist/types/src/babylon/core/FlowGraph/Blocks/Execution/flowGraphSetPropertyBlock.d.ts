import type { AssetType, FlowGraphAssetType } from "core/FlowGraph/flowGraphAssetsContext";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import { FlowGraphExecutionBlockWithOutSignal } from "core/FlowGraph/flowGraphExecutionBlockWithOutSignal";
import type { FlowGraphSignalConnection } from "core/FlowGraph/flowGraphSignalConnection";
export interface IFlowGraphSetPropertyBlockConfiguration<O extends FlowGraphAssetType> {
    /**
     * The name of the property that will be set
     */
    propertyName?: string;
    /**
     * The target asset from which the property will be retrieved
     */
    target?: AssetType<O>;
}
/**
 * This block will set a property on a given target asset.
 * The property name can include dots ("."), which will be interpreted as a path to the property.
 * The target asset is an input and can be changed at any time.
 * The value of the property is an input and can be changed at any time.
 *
 * For example, with an input of a mesh asset, the property name "position.x" will set the x component of the position of the mesh.
 *
 * Note that it is recommended to input the object on which you are working on (i.e. a material) than providing a mesh and then getting the material from it.
 */
export declare class FlowGraphSetPropertyBlock<P extends any, O extends FlowGraphAssetType> extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * the configuration of the block
     */
    config: IFlowGraphSetPropertyBlockConfiguration<O>;
    /**
     * Input connection: The value to set on the property.
     */
    readonly value: FlowGraphDataConnection<P>;
    /**
     * Input connection: The target asset from which the property will be retrieved
     */
    readonly object: FlowGraphDataConnection<AssetType<O>>;
    /**
     * Input connection: The name of the property that will be set
     */
    readonly propertyName: FlowGraphDataConnection<string>;
    /**
     * Input connection: A function that can be used to set the value of the property.
     * If set it will be used instead of the default set function.
     */
    readonly customSetFunction: FlowGraphDataConnection<(target: AssetType<O>, propertyName: string, value: P, context: FlowGraphContext) => void>;
    constructor(
    /**
     * the configuration of the block
     */
    config: IFlowGraphSetPropertyBlockConfiguration<O>);
    _execute(context: FlowGraphContext, _callingSignal: FlowGraphSignalConnection): void;
    private _stopRunningAnimations;
    private _setPropertyValue;
    getClassName(): string;
}
