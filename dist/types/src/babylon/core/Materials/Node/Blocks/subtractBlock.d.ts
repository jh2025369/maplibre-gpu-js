import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import { BaseMathBlock } from "./baseMathBlock";
/**
 * Block used to subtract 2 vectors
 */
export declare class SubtractBlock extends BaseMathBlock {
    /**
     * Creates a new SubtractBlock
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
