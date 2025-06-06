import type { IKHRInteractivity } from "babylonjs-gltf2interface";
import type { ISerializedFlowGraph } from "core/FlowGraph/typeDefinitions";
/**
 * @internal
 * Converts a glTF Interactivity Extension to a serialized flow graph.
 * @param gltf the interactivity data
 * @returns a serialized flow graph
 */
export declare function convertGLTFToSerializedFlowGraph(gltf: IKHRInteractivity): ISerializedFlowGraph;
