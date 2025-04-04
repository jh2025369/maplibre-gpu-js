import { NodeMaterialBlock } from "../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets";
import { RegisterClass } from "../../../Misc/typeStore";
import { Vector2 } from "../../../Maths/math.vector";
import type { Scene } from "../../../scene";
import { editableInPropertyPage, PropertyTypeForEdition } from "../../../Decorators/nodeDecorator";
/**
 * Block used to remap a float from a range to a new one
 */
export class RemapBlock extends NodeMaterialBlock {
    /**
     * Gets or sets the source range
     */
    @editableInPropertyPage("From", PropertyTypeForEdition.Vector2)
    public sourceRange = new Vector2(-1, 1);

    /**
     * Gets or sets the target range
     */
    @editableInPropertyPage("To", PropertyTypeForEdition.Vector2)
    public targetRange = new Vector2(0, 1);

    /**
     * Creates a new RemapBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Neutral);

        this.registerInput("input", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerInput("sourceMin", NodeMaterialBlockConnectionPointTypes.Float, true);
        this.registerInput("sourceMax", NodeMaterialBlockConnectionPointTypes.Float, true);
        this.registerInput("targetMin", NodeMaterialBlockConnectionPointTypes.Float, true);
        this.registerInput("targetMax", NodeMaterialBlockConnectionPointTypes.Float, true);

        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.BasedOnInput);

        this._outputs[0]._typeConnectionSource = this._inputs[0];
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "RemapBlock";
    }

    /**
     * Gets the input component
     */
    public get input(): NodeMaterialConnectionPoint {
        return this._inputs[0];
    }

    /**
     * Gets the source min input component
     */
    public get sourceMin(): NodeMaterialConnectionPoint {
        return this._inputs[1];
    }

    /**
     * Gets the source max input component
     */
    public get sourceMax(): NodeMaterialConnectionPoint {
        return this._inputs[2];
    }

    /**
     * Gets the target min input component
     */
    public get targetMin(): NodeMaterialConnectionPoint {
        return this._inputs[3];
    }

    /**
     * Gets the target max input component
     */
    public get targetMax(): NodeMaterialConnectionPoint {
        return this._inputs[4];
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

        const sourceMin = this.sourceMin.isConnected ? this.sourceMin.associatedVariableName : this._writeFloat(this.sourceRange.x);
        const sourceMax = this.sourceMax.isConnected ? this.sourceMax.associatedVariableName : this._writeFloat(this.sourceRange.y);

        const targetMin = this.targetMin.isConnected ? this.targetMin.associatedVariableName : this._writeFloat(this.targetRange.x);
        const targetMax = this.targetMax.isConnected ? this.targetMax.associatedVariableName : this._writeFloat(this.targetRange.y);

        state.compilationString +=
            state._declareOutput(output) +
            ` = ${targetMin} + (${this._inputs[0].associatedVariableName} - ${sourceMin}) * (${targetMax} - ${targetMin}) / (${sourceMax} - ${sourceMin});\n`;

        return this;
    }

    protected override _dumpPropertiesCode() {
        let codeString = super._dumpPropertiesCode() + `${this._codeVariableName}.sourceRange = new BABYLON.Vector2(${this.sourceRange.x}, ${this.sourceRange.y});\n`;

        codeString += `${this._codeVariableName}.targetRange = new BABYLON.Vector2(${this.targetRange.x}, ${this.targetRange.y});\n`;

        return codeString;
    }

    public override serialize(): any {
        const serializationObject = super.serialize();

        serializationObject.sourceRange = this.sourceRange.asArray();
        serializationObject.targetRange = this.targetRange.asArray();

        return serializationObject;
    }

    public override _deserialize(serializationObject: any, scene: Scene, rootUrl: string) {
        super._deserialize(serializationObject, scene, rootUrl);

        this.sourceRange = Vector2.FromArray(serializationObject.sourceRange);
        this.targetRange = Vector2.FromArray(serializationObject.targetRange);
    }
}

RegisterClass("BABYLON.RemapBlock", RemapBlock);
