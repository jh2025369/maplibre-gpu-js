import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import type { Scene } from "core/scene";
/**
 * Block used to render intermediate debug values
 * Please note that the node needs to be active to be generated in the shader
 * Only one DebugBlock should be active at a time
 */
export declare class NodeMaterialDebugBlock extends NodeMaterialBlock {
    private _isActive;
    /** Gets or sets a boolean indicating if we want to render alpha when using a rgba input*/
    renderAlpha: boolean;
    /**
     * Gets or sets a boolean indicating that the block is active
     */
    get isActive(): boolean;
    set isActive(value: boolean);
    /**
     * Creates a new NodeMaterialDebugBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /** @internal */
    get _isFinalOutputAndActive(): boolean;
    /** @internal */
    get _hasPrecedence(): boolean;
    /**
     * Gets the rgba input component
     */
    get debug(): NodeMaterialConnectionPoint;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
