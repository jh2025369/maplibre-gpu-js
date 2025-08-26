import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
/**
 * Block used to perform a mathematical operation on 2 values
 */
export declare class BaseMathBlock extends NodeMaterialBlock {
    private readonly _connectionObservers;
    protected constructor(name: string);
    /**
     * Gets the left operand input component
     */
    get left(): NodeMaterialConnectionPoint;
    /**
     * Gets the right operand input component
     */
    get right(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    private _updateInputOutputTypes;
    /**
     * Release resources
     */
    dispose(): void;
}
