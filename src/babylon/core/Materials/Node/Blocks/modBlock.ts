import { NodeMaterialBlock } from "../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets";
import { RegisterClass } from "../../../Misc/typeStore";
import { ShaderLanguage } from "core/Materials/shaderLanguage";
/**
 * Block used to compute value of one parameter modulo another
 */
export class ModBlock extends NodeMaterialBlock {
    /**
     * Creates a new ModBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Neutral);

        this.registerInput("left", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerInput("right", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.BasedOnInput);

        this._outputs[0]._typeConnectionSource = this._inputs[0];
        this._linkConnectionTypes(0, 1);

        this._inputs[1].acceptedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Float);
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "ModBlock";
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
     * Gets the output component
     */
    public get output(): NodeMaterialConnectionPoint {
        return this._outputs[0];
    }

    protected override _buildBlock(state: NodeMaterialBuildState) {
        super._buildBlock(state);

        const output = this._outputs[0];

        if (state.shaderLanguage === ShaderLanguage.GLSL) {
            state.compilationString += state._declareOutput(output) + ` = mod(${this.left.associatedVariableName}, ${this.right.associatedVariableName});\n`;
        } else {
            state.compilationString += state._declareOutput(output) + ` = (${this.left.associatedVariableName} % ${this.right.associatedVariableName});\n`;
        }

        return this;
    }
}

RegisterClass("BABYLON.ModBlock", ModBlock);
