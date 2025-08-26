import type { AssetType, FlowGraphAssetType } from "core/FlowGraph/flowGraphAssetsContext";
import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { FlowGraphBlock } from "core/FlowGraph/flowGraphBlock";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import type { Nullable } from "core/types";
import { FlowGraphInteger } from "core/FlowGraph/CustomTypes/flowGraphInteger";
import type { FlowGraphNumber } from "core/FlowGraph/utils";
/**
 * Configuration for the get asset block.
 */
export interface IFlowGraphGetAssetBlockConfiguration<T> extends IFlowGraphBlockConfiguration {
    /**
     * The type of the asset that will be retrieved.
     */
    type: T;
    /**
     * The index of the asset in the corresponding array in the assets context.
     * If not provided you can still change it using the input connection.
     */
    index?: number | FlowGraphInteger;
    /**
     * If set to true, instead of the index in the array it will search for the unique id of the asset.
     * The value of index will be used as the unique id.
     */
    useIndexAsUniqueId?: boolean;
}
/**
 * A block that will deliver an asset as an output, based on its type and place in the assets index.
 *
 * The assets are loaded from the assetsContext defined in the context running this block. The assetsContext is a class extending AbstractClass,
 * meaning it can be a Scene, an AssetsContainers, and any other class that extends AbstractClass.
 */
export declare class FlowGraphGetAssetBlock<T extends FlowGraphAssetType> extends FlowGraphBlock {
    /**
     * the configuration of the block
     */
    config: IFlowGraphGetAssetBlockConfiguration<T>;
    /**
     * Output connection: The value of the property.
     */
    readonly value: FlowGraphDataConnection<Nullable<AssetType<T>>>;
    /**
     * Input connection: The type of the asset.
     */
    readonly type: FlowGraphDataConnection<T>;
    /**
     * Input connection: The index of the asset in the corresponding array in the assets context.
     */
    readonly index: FlowGraphDataConnection<FlowGraphNumber>;
    constructor(
    /**
     * the configuration of the block
     */
    config: IFlowGraphGetAssetBlockConfiguration<T>);
    _updateOutputs(context: FlowGraphContext): void;
    /**
     * Gets the class name of this block
     * @returns the class name
     */
    getClassName(): string;
}
