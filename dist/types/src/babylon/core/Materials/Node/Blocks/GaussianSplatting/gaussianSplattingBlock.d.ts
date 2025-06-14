import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
/**
 * Block used for the Gaussian Splatting
 */
export declare class GaussianSplattingBlock extends NodeMaterialBlock {
    /**
     * Create a new GaussianSplattingBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the position input component
     */
    get splatPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the scale input component
     */
    get splatScale(): NodeMaterialConnectionPoint;
    /**
     * Gets the View matrix input component
     */
    get world(): NodeMaterialConnectionPoint;
    /**
     * Gets the View matrix input component
     */
    get view(): NodeMaterialConnectionPoint;
    /**
     * Gets the projection matrix input component
     */
    get projection(): NodeMaterialConnectionPoint;
    /**
     * Gets the splatVertex output component
     */
    get splatVertex(): NodeMaterialConnectionPoint;
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state: NodeMaterialBuildState): void;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
