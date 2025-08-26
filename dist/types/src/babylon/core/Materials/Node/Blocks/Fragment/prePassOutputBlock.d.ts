import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
/**
 * Block used to output values on the prepass textures
 * @see https://playground.babylonjs.com/#WW65SN#9
 */
export declare class PrePassOutputBlock extends NodeMaterialBlock {
    /**
     * Create a new PrePassOutputBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the view depth component
     */
    get viewDepth(): NodeMaterialConnectionPoint;
    /**
     * Gets the screen depth component
     */
    get screenDepth(): NodeMaterialConnectionPoint;
    /**
     * Gets the world position component
     */
    get worldPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the position in local space component
     */
    get localPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the view normal component
     */
    get viewNormal(): NodeMaterialConnectionPoint;
    /**
     * Gets the world normal component
     */
    get worldNormal(): NodeMaterialConnectionPoint;
    /**
     * Gets the reflectivity component
     */
    get reflectivity(): NodeMaterialConnectionPoint;
    /**
     * Gets the velocity component
     */
    get velocity(): NodeMaterialConnectionPoint;
    /**
     * Gets the linear velocity component
     */
    get velocityLinear(): NodeMaterialConnectionPoint;
    private _getFragData;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
