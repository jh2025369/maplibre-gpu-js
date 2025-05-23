import { NodeMaterialBlock } from "../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets";
import { RegisterClass } from "../../../Misc/typeStore";
/**
 * Block used to replace a color by another one
 */
export class ReplaceColorBlock extends NodeMaterialBlock {
    /**
     * Creates a new ReplaceColorBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Neutral);

        this.registerInput("value", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerInput("reference", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerInput("distance", NodeMaterialBlockConnectionPointTypes.Float);
        this.registerInput("replacement", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.BasedOnInput);

        this._outputs[0]._typeConnectionSource = this._inputs[0];
        this._linkConnectionTypes(0, 1);
        this._linkConnectionTypes(0, 3);

        this._inputs[0].excludedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Float);
        this._inputs[0].excludedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Matrix);
        this._inputs[1].excludedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Float);
        this._inputs[1].excludedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Matrix);
        this._inputs[3].excludedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Float);
        this._inputs[3].excludedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Matrix);
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "ReplaceColorBlock";
    }

    /**
     * Gets the value input component
     */
    public get value(): NodeMaterialConnectionPoint {
        return this._inputs[0];
    }

    /**
     * Gets the reference input component
     */
    public get reference(): NodeMaterialConnectionPoint {
        return this._inputs[1];
    }

    /**
     * Gets the distance input component
     */
    public get distance(): NodeMaterialConnectionPoint {
        return this._inputs[2];
    }

    /**
     * Gets the replacement input component
     */
    public get replacement(): NodeMaterialConnectionPoint {
        return this._inputs[3];
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

        state.compilationString += state._declareOutput(output) + `;\n`;
        state.compilationString += `if (length(${this.value.associatedVariableName} - ${this.reference.associatedVariableName}) < ${this.distance.associatedVariableName}) {\n`;
        state.compilationString += `${output.associatedVariableName} = ${this.replacement.associatedVariableName};\n`;
        state.compilationString += `} else {\n`;
        state.compilationString += `${output.associatedVariableName} = ${this.value.associatedVariableName};\n`;
        state.compilationString += `}\n`;
        return this;
    }
}

RegisterClass("BABYLON.ReplaceColorBlock", ReplaceColorBlock);
