import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets";
import { RegisterClass } from "../../../../Misc/typeStore";
import { InputBlock } from "../Input/inputBlock";
import { Vector2 } from "../../../../Maths/math.vector";

/**
 * Block used to generate a twirl
 */
export class TwirlBlock extends NodeMaterialBlock {
    /**
     * Creates a new TwirlBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Fragment);

        this.registerInput("input", NodeMaterialBlockConnectionPointTypes.Vector2);
        this.registerInput("strength", NodeMaterialBlockConnectionPointTypes.Float);
        this.registerInput("center", NodeMaterialBlockConnectionPointTypes.Vector2);
        this.registerInput("offset", NodeMaterialBlockConnectionPointTypes.Vector2);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.Vector2);
        this.registerOutput("x", NodeMaterialBlockConnectionPointTypes.Float);
        this.registerOutput("y", NodeMaterialBlockConnectionPointTypes.Float);
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "TwirlBlock";
    }

    /**
     * Gets the input component
     */
    public get input(): NodeMaterialConnectionPoint {
        return this._inputs[0];
    }

    /**
     * Gets the strength component
     */
    public get strength(): NodeMaterialConnectionPoint {
        return this._inputs[1];
    }

    /**
     * Gets the center component
     */
    public get center(): NodeMaterialConnectionPoint {
        return this._inputs[2];
    }

    /**
     * Gets the offset component
     */
    public get offset(): NodeMaterialConnectionPoint {
        return this._inputs[3];
    }

    /**
     * Gets the output component
     */
    public get output(): NodeMaterialConnectionPoint {
        return this._outputs[0];
    }

    /**
     * Gets the x output component
     */
    public get x(): NodeMaterialConnectionPoint {
        return this._outputs[1];
    }

    /**
     * Gets the y output component
     */
    public get y(): NodeMaterialConnectionPoint {
        return this._outputs[2];
    }

    public override autoConfigure() {
        if (!this.center.isConnected) {
            const centerInput = new InputBlock("center");
            centerInput.value = new Vector2(0.5, 0.5);

            centerInput.output.connectTo(this.center);
        }

        if (!this.strength.isConnected) {
            const strengthInput = new InputBlock("strength");
            strengthInput.value = 1.0;

            strengthInput.output.connectTo(this.strength);
        }

        if (!this.offset.isConnected) {
            const offsetInput = new InputBlock("offset");
            offsetInput.value = new Vector2(0, 0);

            offsetInput.output.connectTo(this.offset);
        }
    }

    protected override _buildBlock(state: NodeMaterialBuildState) {
        super._buildBlock(state);

        const tempDelta = state._getFreeVariableName("delta");
        const tempAngle = state._getFreeVariableName("angle");
        const tempX = state._getFreeVariableName("x");
        const tempY = state._getFreeVariableName("y");
        const tempResult = state._getFreeVariableName("result");

        state.compilationString += `        
            ${state._declareLocalVar(tempDelta, NodeMaterialBlockConnectionPointTypes.Vector2)} = ${this.input.associatedVariableName} - ${this.center.associatedVariableName};
            ${state._declareLocalVar(tempAngle, NodeMaterialBlockConnectionPointTypes.Float)} = ${this.strength.associatedVariableName} * length(${tempDelta});
            ${state._declareLocalVar(tempX, NodeMaterialBlockConnectionPointTypes.Float)} = cos(${tempAngle}) * ${tempDelta}.x - sin(${tempAngle}) * ${tempDelta}.y;
            ${state._declareLocalVar(tempY, NodeMaterialBlockConnectionPointTypes.Float)} = sin(${tempAngle}) * ${tempDelta}.x + cos(${tempAngle}) * ${tempDelta}.y;
            ${state._declareLocalVar(tempResult, NodeMaterialBlockConnectionPointTypes.Vector2)} = vec2(${tempX} + ${this.center.associatedVariableName}.x + ${this.offset.associatedVariableName}.x, ${tempY} + ${this.center.associatedVariableName}.y + ${this.offset.associatedVariableName}.y);
        `;

        if (this.output.hasEndpoints) {
            state.compilationString += state._declareOutput(this.output) + ` = ${tempResult};\n`;
        }

        if (this.x.hasEndpoints) {
            state.compilationString += state._declareOutput(this.x) + ` = ${tempResult}.x;\n`;
        }

        if (this.y.hasEndpoints) {
            state.compilationString += state._declareOutput(this.y) + ` = ${tempResult}.y;\n`;
        }

        return this;
    }
}

RegisterClass("BABYLON.TwirlBlock", TwirlBlock);
