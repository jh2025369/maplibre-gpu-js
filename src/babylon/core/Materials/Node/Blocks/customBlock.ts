import { NodeMaterialBlock } from "../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets";
import { RegisterClass } from "../../../Misc/typeStore";
import type { Scene } from "../../../scene";
import type { Nullable } from "../../../types";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import { NodeMaterialConnectionPointDirection } from "../nodeMaterialBlockConnectionPoint";
import { ImageSourceBlock } from "./Dual/imageSourceBlock";
import { NodeMaterialConnectionPointCustomObject } from "../nodeMaterialConnectionPointCustomObject";

/**
 * Custom block created from user-defined json
 */
export class CustomBlock extends NodeMaterialBlock {
    private _options: any;
    private _code: string;
    private _inputSamplers: string[];

    /**
     * Gets or sets the options for this custom block
     */
    public get options() {
        return this._options;
    }

    public set options(options: any) {
        this._deserializeOptions(options);
    }

    /**
     * Creates a new CustomBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name);
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "CustomBlock";
    }

    protected override _buildBlock(state: NodeMaterialBuildState) {
        super._buildBlock(state);

        let code = this._code;

        let functionName = this._options.functionName;

        // Replace the TYPE_XXX placeholders (if any)
        this._inputs.forEach((input) => {
            const rexp = new RegExp("\\{TYPE_" + input.name + "\\}", "gm");
            const type = state._getGLType(input.type);
            code = code.replace(rexp, type);
            functionName = functionName.replace(rexp, type);
        });
        this._outputs.forEach((output) => {
            const rexp = new RegExp("\\{TYPE_" + output.name + "\\}", "gm");
            const type = state._getGLType(output.type);
            code = code.replace(rexp, type);
            functionName = functionName.replace(rexp, type);
        });

        state._emitFunction(functionName, code, "");

        // Declare the output variables
        this._outputs.forEach((output) => {
            state.compilationString += state._declareOutput(output) + ";\n";
        });

        // Generate the function call
        state.compilationString += functionName + "(";

        let hasInput = false;
        this._inputs.forEach((input, index) => {
            if (index > 0) {
                state.compilationString += ", ";
            }
            if (this._inputSamplers && this._inputSamplers.indexOf(input.name) !== -1) {
                state.compilationString += (input.connectedPoint?.ownerBlock as ImageSourceBlock)?.samplerName ?? input.associatedVariableName;
            } else {
                state.compilationString += input.associatedVariableName;
            }
            hasInput = true;
        });

        this._outputs.forEach((output, index) => {
            if (index > 0 || hasInput) {
                state.compilationString += ", ";
            }
            state.compilationString += output.associatedVariableName;
        });

        state.compilationString += ");\n";

        return this;
    }

    protected override _dumpPropertiesCode() {
        let codeString = super._dumpPropertiesCode();

        codeString += `${this._codeVariableName}.options = ${JSON.stringify(this._options)};\n`;

        return codeString;
    }

    public override serialize(): any {
        const serializationObject = super.serialize();

        serializationObject.options = this._options;

        return serializationObject;
    }

    public override _deserialize(serializationObject: any, scene: Scene, rootUrl: string) {
        this._deserializeOptions(serializationObject.options);

        super._deserialize(serializationObject, scene, rootUrl);
    }

    private _deserializeOptions(options: any) {
        this._options = options;
        this._code = options.code.join("\n") + "\n";
        this.name = this.name || options.name;
        this.target = (<any>NodeMaterialBlockTargets)[options.target];

        options.inParameters?.forEach((input: any, index: number) => {
            const type = (<any>NodeMaterialBlockConnectionPointTypes)[input.type];
            if (input.type === "sampler2D" || input.type === "samplerCube") {
                this._inputSamplers = this._inputSamplers || [];
                this._inputSamplers.push(input.name);
                this.registerInput(
                    input.name,
                    NodeMaterialBlockConnectionPointTypes.Object,
                    true,
                    NodeMaterialBlockTargets.VertexAndFragment,
                    new NodeMaterialConnectionPointCustomObject(input.name, this, NodeMaterialConnectionPointDirection.Input, ImageSourceBlock, "ImageSourceBlock")
                );
            } else {
                this.registerInput(input.name, type);
            }

            Object.defineProperty(this, input.name, {
                get: function () {
                    return this._inputs[index];
                },
                enumerable: true,
                configurable: true,
            });
        });

        options.outParameters?.forEach((output: any, index: number) => {
            this.registerOutput(output.name, (<any>NodeMaterialBlockConnectionPointTypes)[output.type]);

            Object.defineProperty(this, output.name, {
                get: function () {
                    return this._outputs[index];
                },
                enumerable: true,
                configurable: true,
            });

            if (output.type === "BasedOnInput") {
                this._outputs[index]._typeConnectionSource = this._findInputByName(output.typeFromInput)![0];
            }
        });

        options.inLinkedConnectionTypes?.forEach((connection: any) => {
            this._linkConnectionTypes(this._findInputByName(connection.input1)![1], this._findInputByName(connection.input2)![1]);
        });
    }

    private _findInputByName(name: string): Nullable<[NodeMaterialConnectionPoint, number]> {
        if (!name) {
            return null;
        }

        for (let i = 0; i < this._inputs.length; i++) {
            if (this._inputs[i].name === name) {
                return [this._inputs[i], i];
            }
        }

        return null;
    }
}

RegisterClass("BABYLON.CustomBlock", CustomBlock);
