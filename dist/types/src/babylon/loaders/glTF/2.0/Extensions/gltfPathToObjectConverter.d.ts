import type { IObjectInfo, IPathToObjectConverter } from "core/ObjectModel/objectModelInterfaces";
import type { IGLTF } from "../glTFLoaderInterfaces";
import type { IObjectAccessor } from "core/FlowGraph/typeDefinitions";
/**
 * Adding an exception here will break traversing through the glTF object tree.
 * This is used for properties that might not be in the glTF object model, but are optional and have a default value.
 * For example, the path /nodes/\{\}/extensions/KHR_node_visibility/visible is optional - the object can be deferred without the object fully existing.
 */
export declare const OptionalPathExceptionsList: {
    regex: RegExp;
}[];
/**
 * A converter that takes a glTF Object Model JSON Pointer
 * and transforms it into an ObjectAccessorContainer, allowing
 * objects referenced in the glTF to be associated with their
 * respective Babylon.js objects.
 */
export declare class GLTFPathToObjectConverter<T, BabylonType, BabylonValue> implements IPathToObjectConverter<IObjectAccessor<T, BabylonType, BabylonValue>> {
    private _gltf;
    private _infoTree;
    constructor(_gltf: IGLTF, _infoTree: any);
    /**
     * The pointer string is represented by a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901).
     * See also https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/ObjectModel.adoc#core-pointers
     * <animationPointer> := /<rootNode>/<assetIndex>/<propertyPath>
     * <rootNode> := "nodes" | "materials" | "meshes" | "cameras" | "extensions"
     * <assetIndex> := <digit> | <name>
     * <propertyPath> := <extensionPath> | <standardPath>
     * <extensionPath> := "extensions"/<name>/<standardPath>
     * <standardPath> := <name> | <name>/<standardPath>
     * <name> := W+
     * <digit> := D+
     *
     * Examples:
     *  - "/nodes/0/rotation"
     * - "/nodes.length"
     *  - "/materials/2/emissiveFactor"
     *  - "/materials/2/pbrMetallicRoughness/baseColorFactor"
     *  - "/materials/2/extensions/KHR_materials_emissive_strength/emissiveStrength"
     *
     * @param path The path to convert
     * @returns The object and info associated with the path
     */
    convert(path: string): IObjectInfo<IObjectAccessor<T, BabylonType, BabylonValue>>;
}
