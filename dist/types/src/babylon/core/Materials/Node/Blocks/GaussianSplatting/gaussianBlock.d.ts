import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
/**
 * Block used for the Gaussian Splatting Fragment part
 */
export declare class GaussianBlock extends NodeMaterialBlock {
    /**
     * Create a new GaussianBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the color input component
     */
    get splatColor(): NodeMaterialConnectionPoint;
    /**
     * Gets the rgba output component
     */
    get rgba(): NodeMaterialConnectionPoint;
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state: NodeMaterialBuildState): void;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
