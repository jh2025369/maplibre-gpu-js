import type { AssetType, FlowGraphAssetType } from "core/FlowGraph/flowGraphAssetsContext";
import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import { FlowGraphCachedOperationBlock } from "./flowGraphCachedOperationBlock";
export interface IFlowGraphGetPropertyBlockConfiguration<O extends FlowGraphAssetType> extends IFlowGraphBlockConfiguration {
    /**
     * The name of the property that will be set
     */
    propertyName?: string;
    /**
     * The target asset from which the property will be retrieved
     */
    object?: AssetType<O>;
    /**
     * If true, the block will reset the output to the default value when the target asset is undefined.
     */
    resetToDefaultWhenUndefined?: boolean;
}
/**
 * This block will deliver a property of an asset, based on the property name and an input asset.
 * The property name can include dots ("."), which will be interpreted as a path to the property.
 *
 * For example, with an input of a mesh asset, the property name "position.x" will deliver the x component of the position of the mesh.
 *
 * Note that it is recommended to input the object on which you are working on (i.e. a material) rather than providing a mesh as object and then getting the material from it.
 */
export declare class FlowGraphGetPropertyBlock<P extends any, O extends FlowGraphAssetType> extends FlowGraphCachedOperationBlock<P> {
    /**
     * the configuration of the block
     */
    config: IFlowGraphGetPropertyBlockConfiguration<O>;
    /**
     * Input connection: The asset from which the property will be retrieved
     */
    readonly object: FlowGraphDataConnection<AssetType<O>>;
    /**
     * Input connection: The name of the property that will be set
     */
    readonly propertyName: FlowGraphDataConnection<string>;
    /**
     * Input connection: A function that can be used to get the value of the property.
     * This will be used if defined, instead of the default get function.
     */
    readonly customGetFunction: FlowGraphDataConnection<(target: AssetType<O>, propertyName: string, context: FlowGraphContext) => P | undefined>;
    constructor(
    /**
     * the configuration of the block
     */
    config: IFlowGraphGetPropertyBlockConfiguration<O>);
    _doOperation(context: FlowGraphContext): P | undefined;
    private _getPropertyValue;
    getClassName(): string;
}
