import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
/**
 * Block used to apply rgb/hsl convertions
 */
export declare class ColorConverterBlock extends NodeMaterialBlock {
    /**
     * Create a new ColorConverterBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the rgb value (input)
     */
    get rgbIn(): NodeMaterialConnectionPoint;
    /**
     * Gets the hsl value (input)
     */
    get hslIn(): NodeMaterialConnectionPoint;
    /**
     * Gets the rgb value (output)
     */
    get rgbOut(): NodeMaterialConnectionPoint;
    /**
     * Gets the hsl value (output)
     */
    get hslOut(): NodeMaterialConnectionPoint;
    protected _inputRename(name: string): string;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
