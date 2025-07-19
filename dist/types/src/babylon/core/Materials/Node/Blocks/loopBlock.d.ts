import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import type { Scene } from "core/scene";
/**
 * Block used to repeat code
 */
export declare class LoopBlock extends NodeMaterialBlock {
    /**
     * Gets or sets number of iterations
     * Will be ignored if the iterations input is connected
     */
    iterations: number;
    /**
     * Creates a new LoopBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the main input component
     */
    get input(): NodeMaterialConnectionPoint;
    /**
     * Gets the iterations input component
     */
    get iterationsInput(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    /**
     * Gets the index component which will be incremented at each iteration
     */
    get index(): NodeMaterialConnectionPoint;
    /**
     * Gets the loop ID component
     */
    get loopID(): NodeMaterialConnectionPoint;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    protected _postBuildBlock(state: NodeMaterialBuildState): this;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
