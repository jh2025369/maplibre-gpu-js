import type { FlowGraphBlock } from "../flowGraphBlock";
import { FlowGraphBlockNames } from "./flowGraphBlockNames";
/**
 * If you want to add a new block to the block factory, you should use this function.
 * Please be sure to choose a unique name and define the responsible module.
 * @param module the name of the module that is responsible for the block
 * @param blockName the name of the block. This should be unique.
 * @param factory an async factory function to generate the block
 */
export declare function addToBlockFactory(module: string, blockName: string, factory: () => Promise<typeof FlowGraphBlock>): void;
/**
 * a function to get a factory function for a block.
 * @param blockName the block name to initialize. If the block comes from an external module, the name should be in the format "module/blockName"
 * @returns an async factory function that will return the block class when called.
 */
export declare function blockFactory(blockName: FlowGraphBlockNames | string): () => Promise<typeof FlowGraphBlock>;
