import { NodeMaterialBlock } from "../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import { RegisterClass } from "../../../Misc/typeStore";

/**
 * Block used to expand a Color3/4 into 4 outputs (one for each component)
 */
export class ColorSplitterBlock extends NodeMaterialBlock {
    /**
     * Create a new ColorSplitterBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Neutral);

        this.registerInput("rgba", NodeMaterialBlockConnectionPointTypes.Color4, true);
        this.registerInput("rgb ", NodeMaterialBlockConnectionPointTypes.Color3, true);

        this.registerOutput("rgb", NodeMaterialBlockConnectionPointTypes.Color3);
        this.registerOutput("r", NodeMaterialBlockConnectionPointTypes.Float);
        this.registerOutput("g", NodeMaterialBlockConnectionPointTypes.Float);
        this.registerOutput("b", NodeMaterialBlockConnectionPointTypes.Float);
        this.registerOutput("a", NodeMaterialBlockConnectionPointTypes.Float);

        this.inputsAreExclusive = true;
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "ColorSplitterBlock";
    }

    /**
     * Gets the rgba component (input)
     */
    public get rgba(): NodeMaterialConnectionPoint {
        return this._inputs[0];
    }

    /**
     * Gets the rgb component (input)
     */
    public get rgbIn(): NodeMaterialConnectionPoint {
        return this._inputs[1];
    }

    /**
     * Gets the rgb component (output)
     */
    public get rgbOut(): NodeMaterialConnectionPoint {
        return this._outputs[0];
    }

    /**
     * Gets the r component (output)
     */
    public get r(): NodeMaterialConnectionPoint {
        return this._outputs[1];
    }

    /**
     * Gets the g component (output)
     */
    public get g(): NodeMaterialConnectionPoint {
        return this._outputs[2];
    }
    /**
     * Gets the b component (output)
     */
    public get b(): NodeMaterialConnectionPoint {
        return this._outputs[3];
    }
    /**
     * Gets the a component (output)
     */
    public get a(): NodeMaterialConnectionPoint {
        return this._outputs[4];
    }

    protected override _inputRename(name: string) {
        if (name === "rgb ") {
            return "rgbIn";
        }
        return name;
    }

    protected override _outputRename(name: string) {
        if (name === "rgb") {
            return "rgbOut";
        }
        return name;
    }

    protected override _buildBlock(state: NodeMaterialBuildState) {
        super._buildBlock(state);

        const input = this.rgba.isConnected ? this.rgba : this.rgbIn;

        if (!input.isConnected) {
            return;
        }

        const rgbOutput = this._outputs[0];
        const rOutput = this._outputs[1];
        const gOutput = this._outputs[2];
        const bOutput = this._outputs[3];
        const aOutput = this._outputs[4];

        if (rgbOutput.hasEndpoints) {
            state.compilationString += state._declareOutput(rgbOutput) + ` = ${input.associatedVariableName}.rgb;\n`;
        }
        if (rOutput.hasEndpoints) {
            state.compilationString += state._declareOutput(rOutput) + ` = ${input.associatedVariableName}.r;\n`;
        }
        if (gOutput.hasEndpoints) {
            state.compilationString += state._declareOutput(gOutput) + ` = ${input.associatedVariableName}.g;\n`;
        }
        if (bOutput.hasEndpoints) {
            state.compilationString += state._declareOutput(bOutput) + ` = ${input.associatedVariableName}.b;\n`;
        }
        if (aOutput.hasEndpoints) {
            state.compilationString += state._declareOutput(aOutput) + ` = ${input.associatedVariableName}.a;\n`;
        }

        return this;
    }
}

RegisterClass("BABYLON.ColorSplitterBlock", ColorSplitterBlock);
