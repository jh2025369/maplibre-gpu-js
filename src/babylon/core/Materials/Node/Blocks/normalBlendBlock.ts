import { NodeMaterialBlock } from "../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets";
import { RegisterClass } from "../../../Misc/typeStore";
/**
 * Block used to blend normals
 */
export class NormalBlendBlock extends NodeMaterialBlock {
    /**
     * Creates a new NormalBlendBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Neutral);

        this.registerInput("normalMap0", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerInput("normalMap1", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.Vector3);

        this._inputs[0].addExcludedConnectionPointFromAllowedTypes(
            NodeMaterialBlockConnectionPointTypes.Color3 |
                NodeMaterialBlockConnectionPointTypes.Color4 |
                NodeMaterialBlockConnectionPointTypes.Vector3 |
                NodeMaterialBlockConnectionPointTypes.Vector4
        );

        this._inputs[1].addExcludedConnectionPointFromAllowedTypes(
            NodeMaterialBlockConnectionPointTypes.Color3 |
                NodeMaterialBlockConnectionPointTypes.Color4 |
                NodeMaterialBlockConnectionPointTypes.Vector3 |
                NodeMaterialBlockConnectionPointTypes.Vector4
        );
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "NormalBlendBlock";
    }

    /**
     * Gets the first input component
     */
    public get normalMap0(): NodeMaterialConnectionPoint {
        return this._inputs[0];
    }

    /**
     * Gets the second input component
     */
    public get normalMap1(): NodeMaterialConnectionPoint {
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
        const input0 = this._inputs[0];
        const input1 = this._inputs[1];
        const stepR = state._getFreeVariableName("stepR");
        const stepG = state._getFreeVariableName("stepG");

        state.compilationString += `${state._declareLocalVar(stepR, NodeMaterialBlockConnectionPointTypes.Float)} = step(0.5, ${input0.associatedVariableName}.r);\n`;
        state.compilationString += `${state._declareLocalVar(stepG, NodeMaterialBlockConnectionPointTypes.Float)} = step(0.5, ${input0.associatedVariableName}.g);\n`;
        state.compilationString += state._declareOutput(output) + `;\n`;
        state.compilationString += `${output.associatedVariableName}.r = (1.0 - ${stepR}) * ${input0.associatedVariableName}.r * ${input1.associatedVariableName}.r * 2.0 + ${stepR} * (1.0 - (1.0 - ${input0.associatedVariableName}.r) * (1.0 - ${input1.associatedVariableName}.r) * 2.0);\n`;
        state.compilationString += `${output.associatedVariableName}.g = (1.0 - ${stepG}) * ${input0.associatedVariableName}.g * ${input1.associatedVariableName}.g * 2.0 + ${stepG} * (1.0 - (1.0 - ${input0.associatedVariableName}.g) * (1.0 - ${input1.associatedVariableName}.g) * 2.0);\n`;
        state.compilationString += `${output.associatedVariableName}.b = ${input0.associatedVariableName}.b * ${input1.associatedVariableName}.b;\n`;

        return this;
    }
}

RegisterClass("BABYLON.NormalBlendBlock", NormalBlendBlock);
