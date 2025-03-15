import { NodeMaterialBlock } from "../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets";
import { RegisterClass } from "../../../Misc/typeStore";
/**
 * Block used to normalize lerp between 2 values
 */
export class NLerpBlock extends NodeMaterialBlock {
    /**
     * Creates a new NLerpBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Neutral);

        this.registerInput("left", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerInput("right", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerInput("gradient", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.BasedOnInput);

        this._outputs[0]._typeConnectionSource = this._inputs[0];
        this._linkConnectionTypes(0, 1);
        this._linkConnectionTypes(1, 2, true);

        this._inputs[2].acceptedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Float);
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "NLerpBlock";
    }

    /**
     * Gets the left operand input component
     */
    public get left(): NodeMaterialConnectionPoint {
        return this._inputs[0];
    }

    /**
     * Gets the right operand input component
     */
    public get right(): NodeMaterialConnectionPoint {
        return this._inputs[1];
    }

    /**
     * Gets the gradient operand input component
     */
    public get gradient(): NodeMaterialConnectionPoint {
        return this._inputs[2];
    }

    /**
     * Gets the output component
     */
    public get output(): NodeMaterialConnectionPoint {
        return this._outputs[0];
    }

    protected override _buildBlock(state: NodeMaterialBuildState) {
        super._buildBlock(state);

        const output = this._outputs[0];

        state.compilationString +=
            state._declareOutput(output) +
            ` = normalize(mix(${this.left.associatedVariableName} , ${this.right.associatedVariableName}, ${this.gradient.associatedVariableName}));\n`;

        return this;
    }
}

RegisterClass("BABYLON.NLerpBlock", NLerpBlock);
