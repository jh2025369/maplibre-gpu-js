import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import { FlowGraphBlock } from "core/FlowGraph/flowGraphBlock";
import type { IGLTF } from "../../glTFLoaderInterfaces";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import type { AnimationGroup } from "core/Animations/animationGroup";
import type { TransformNode } from "core/Meshes/transformNode";
/**
 * a configuration interface for this block
 */
export interface IFlowGraphGLTFDataProviderBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * the glTF object to provide data from
     */
    glTF: IGLTF;
}
/**
 * a glTF-based FlowGraph block that provides arrays with babylon object, based on the glTF tree
 * Can be used, for example, to get animation index from a glTF animation
 */
export declare class FlowGraphGLTFDataProvider extends FlowGraphBlock {
    /**
     * Output: an array of animation groups
     * Corresponds directly to the glTF animations array
     */
    readonly animationGroups: FlowGraphDataConnection<AnimationGroup[]>;
    /**
     * Output an array of (Transform) nodes
     * Corresponds directly to the glTF nodes array
     */
    readonly nodes: FlowGraphDataConnection<TransformNode[]>;
    constructor(config: IFlowGraphGLTFDataProviderBlockConfiguration);
    getClassName(): string;
}
