import { NodeMaterialBlock } from "../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets";
import { RegisterClass } from "../../../Misc/typeStore";

/**
 * Block used to posterize a value
 * @see https://en.wikipedia.org/wiki/Posterization
 */
export class PosterizeBlock extends NodeMaterialBlock {
    /**
     * Creates a new PosterizeBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Neutral);

        this.registerInput("value", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerInput("steps", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.BasedOnInput);

        this._outputs[0]._typeConnectionSource = this._inputs[0];
        this._linkConnectionTypes(0, 1);

        this._inputs[0].excludedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Matrix);
        this._inputs[1].excludedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Matrix);
        this._inputs[1].acceptedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Float);
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "PosterizeBlock";
    }

    /**
     * Gets the value input component
     */
    public get value(): NodeMaterialConnectionPoint {
        return this._inputs[0];
    }

    /**
     * Gets the steps input component
     */
    public get steps(): NodeMaterialConnectionPoint {
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

        state.compilationString +=
            state._declareOutput(output) +
            ` = floor(${this.value.associatedVariableName} / (1.0 / ${this.steps.associatedVariableName})) * (1.0 / ${this.steps.associatedVariableName});\n`;
        return this;
    }
}

RegisterClass("BABYLON.PosterizeBlock", PosterizeBlock);
