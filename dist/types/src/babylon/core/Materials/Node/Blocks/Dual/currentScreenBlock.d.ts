import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterialDefines } from "../../nodeMaterial";
import type { BaseTexture } from "../../../Textures/baseTexture";
import type { Nullable } from "../../../../types";
import type { Scene } from "../../../../scene";
/**
 * Base block used as input for post process
 */
export declare class CurrentScreenBlock extends NodeMaterialBlock {
    protected _samplerName: string;
    protected _linearDefineName: string;
    protected _gammaDefineName: string;
    protected _mainUVName: string;
    protected _tempTextureRead: string;
    /**
     * The name of the sampler to read the screen texture from.
     */
    get samplerName(): string;
    /**
     * Gets or sets the texture associated with the node
     */
    texture: Nullable<BaseTexture>;
    /**
     * Gets or sets a boolean indicating if content needs to be converted to gamma space
     */
    convertToGammaSpace: boolean;
    /**
     * Gets or sets a boolean indicating if content needs to be converted to linear space
     */
    convertToLinearSpace: boolean;
    /**
     * Create a new CurrentScreenBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the uv input component
     */
    get uv(): NodeMaterialConnectionPoint;
    /**
     * Gets the rgba output component
     */
    get rgba(): NodeMaterialConnectionPoint;
    /**
     * Gets the rgb output component
     */
    get rgb(): NodeMaterialConnectionPoint;
    /**
     * Gets the r output component
     */
    get r(): NodeMaterialConnectionPoint;
    /**
     * Gets the g output component
     */
    get g(): NodeMaterialConnectionPoint;
    /**
     * Gets the b output component
     */
    get b(): NodeMaterialConnectionPoint;
    /**
     * Gets the a output component
     */
    get a(): NodeMaterialConnectionPoint;
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state: NodeMaterialBuildState): void;
    get target(): NodeMaterialBlockTargets.Fragment | NodeMaterialBlockTargets.VertexAndFragment;
    prepareDefines(defines: NodeMaterialDefines): void;
    isReady(): boolean;
    protected _getMainUvName(state: NodeMaterialBuildState): string;
    protected _injectVertexCode(state: NodeMaterialBuildState): void;
    protected _writeTextureRead(state: NodeMaterialBuildState, vertexMode?: boolean): void;
    protected _writeOutput(state: NodeMaterialBuildState, output: NodeMaterialConnectionPoint, swizzle: string, vertexMode?: boolean): void;
    protected _emitUvAndSampler(state: NodeMaterialBuildState): void;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
