import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import { RegisterClass } from "../../../../Misc/typeStore";
import { ShaderLanguage } from "core/Materials/shaderLanguage";

/**
 * Block used to get the derivative value on x and y of a given input
 */
export class DerivativeBlock extends NodeMaterialBlock {
    /**
     * Create a new DerivativeBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Fragment);

        this.registerInput("input", NodeMaterialBlockConnectionPointTypes.AutoDetect, false);
        this.registerOutput("dx", NodeMaterialBlockConnectionPointTypes.BasedOnInput);
        this.registerOutput("dy", NodeMaterialBlockConnectionPointTypes.BasedOnInput);

        this._outputs[0]._typeConnectionSource = this._inputs[0];
        this._outputs[1]._typeConnectionSource = this._inputs[0];
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "DerivativeBlock";
    }

    /**
     * Gets the input component
     */
    public get input(): NodeMaterialConnectionPoint {
        return this._inputs[0];
    }

    /**
     * Gets the derivative output on x
     */
    public get dx(): NodeMaterialConnectionPoint {
        return this._outputs[0];
    }

    /**
     * Gets the derivative output on y
     */
    public get dy(): NodeMaterialConnectionPoint {
        return this._outputs[1];
    }

    protected override _buildBlock(state: NodeMaterialBuildState) {
        super._buildBlock(state);

        const dx = this._outputs[0];
        const dy = this._outputs[1];

        state._emitExtension("derivatives", "#extension GL_OES_standard_derivatives : enable");
        let dpdx = "dFdx";
        let dpdy = "dFdy";

        if (state.shaderLanguage === ShaderLanguage.WGSL) {
            dpdx = "dpdx";
            dpdy = "dpdy";
        }

        if (dx.hasEndpoints) {
            state.compilationString += state._declareOutput(dx) + ` = ${dpdx}(${this.input.associatedVariableName});\n`;
        }

        if (dy.hasEndpoints) {
            state.compilationString += state._declareOutput(dy) + ` = ${dpdy}(${this.input.associatedVariableName});\n`;
        }

        return this;
    }
}

RegisterClass("BABYLON.DerivativeBlock", DerivativeBlock);
