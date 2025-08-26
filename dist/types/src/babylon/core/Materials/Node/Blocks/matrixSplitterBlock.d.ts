import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
/**
 * Block used to split a matrix into Vector4
 */
export declare class MatrixSplitterBlock extends NodeMaterialBlock {
    /**
     * Creates a new MatrixSplitterBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the input component
     */
    get input(): NodeMaterialConnectionPoint;
    /**
     * Gets the row0 output vector
     */
    get row0(): NodeMaterialConnectionPoint;
    /**
     * Gets the row1 output vector
     */
    get row1(): NodeMaterialConnectionPoint;
    /**
     * Gets the row2 output vector
     */
    get row2(): NodeMaterialConnectionPoint;
    /**
     * Gets the row3 output vector
     */
    get row3(): NodeMaterialConnectionPoint;
    /**
     * Gets the col0 output vector
     */
    get col0(): NodeMaterialConnectionPoint;
    /**
     * Gets the col1 output vector
     */
    get col1(): NodeMaterialConnectionPoint;
    /**
     * Gets the col2 output vector
     */
    get col2(): NodeMaterialConnectionPoint;
    /**
     * Gets the col3 output vector
     */
    get col3(): NodeMaterialConnectionPoint;
    private _exportColumn;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
