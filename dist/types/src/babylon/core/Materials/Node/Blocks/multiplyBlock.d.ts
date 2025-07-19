import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import { BaseMathBlock } from "./baseMathBlock";
/**
 * Block used to multiply 2 values
 */
export declare class MultiplyBlock extends BaseMathBlock {
    /**
     * Creates a new MultiplyBlock
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
