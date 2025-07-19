import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import { BaseMathBlock } from "./baseMathBlock";
/**
 * Block used to add 2 vectors
 */
export declare class AddBlock extends BaseMathBlock {
    /**
     * Creates a new AddBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
