/**
 * @internal
 * A view type size
 */
declare const viewTypes: {
    Int8: Int8ArrayConstructor;
    Uint8: Uint8ArrayConstructor;
    Int16: Int16ArrayConstructor;
    Uint16: Uint16ArrayConstructor;
    Int32: Int32ArrayConstructor;
    Uint32: Uint32ArrayConstructor;
    Float32: Float32ArrayConstructor;
};
/**
 * @internal
 * A view type size
 */
export type ViewType = keyof typeof viewTypes;
/** @internal */
declare class Struct {
    _pos1: number;
    _pos2: number;
    _pos4: number;
    _pos8: number;
    readonly _structArray: StructArray;
    size: number;
    /**
     * @param structArray - The StructArray the struct is stored in
     * @param index - The index of the struct in the StructArray.
     */
    constructor(structArray: StructArray, index: number);
}
/**
 * @internal
 * A struct array memeber
 */
export type StructArrayMember = {
    name: string;
    type: ViewType;
    components: number;
    offset: number;
};
export type StructArrayLayout = {
    members: Array<StructArrayMember>;
    size: number;
    alignment: number;
};
/**
 * An array that can be desialized
 */
export type SerializedStructArray = {
    length: number;
    arrayBuffer: ArrayBuffer;
};
/**
 * @internal
 * `StructArray` provides an abstraction over `ArrayBuffer` and `TypedArray`
 * making it behave like an array of typed structs.
 *
 * Conceptually, a StructArray is comprised of elements, i.e., instances of its
 * associated struct type. Each particular struct type, together with an
 * alignment size, determines the memory layout of a StructArray whose elements
 * are of that type.  Thus, for each such layout that we need, we have
 * a corresponding StructArrayLayout class, inheriting from StructArray and
 * implementing `emplaceBack()` and `_refreshViews()`.
 *
 * In some cases, where we need to access particular elements of a StructArray,
 * we implement a more specific subclass that inherits from one of the
 * StructArrayLayouts and adds a `get(i): T` accessor that returns a structured
 * object whose properties are proxies into the underlying memory space for the
 * i-th element.  This affords the convience of working with (seemingly) plain
 * Javascript objects without the overhead of serializing/deserializing them
 * into ArrayBuffers for efficient web worker transfer.
 */
declare abstract class StructArray {
    capacity: number;
    length: number;
    isTransferred: boolean;
    arrayBuffer: ArrayBuffer;
    uint8: Uint8Array;
    members: Array<StructArrayMember>;
    bytesPerElement: number;
    abstract emplaceBack(...v: number[]): any;
    abstract emplace(i: number, ...v: number[]): any;
    constructor();
    /**
     * Serialize a StructArray instance.  Serializes both the raw data and the
     * metadata needed to reconstruct the StructArray base class during
     * deserialization.
     */
    static serialize(array: StructArray, transferables?: Array<Transferable>): SerializedStructArray;
    static deserialize(input: SerializedStructArray): any;
    /**
     * Resize the array to discard unused capacity.
     */
    _trim(): void;
    /**
     * Resets the length of the array to 0 without de-allocating capcacity.
     */
    clear(): void;
    /**
     * Resize the array.
     * If `n` is greater than the current length then additional elements with undefined values are added.
     * If `n` is less than the current length then the array will be reduced to the first `n` elements.
     * @param n - The new size of the array.
     */
    resize(n: number): void;
    /**
     * Indicate a planned increase in size, so that any necessary allocation may
     * be done once, ahead of time.
     * @param n - The expected size of the array.
     */
    reserve(n: number): void;
    /**
     * Create TypedArray views for the current ArrayBuffer.
     */
    _refreshViews(): void;
}
/**
 * Given a list of member fields, create a full StructArrayLayout, in
 * particular calculating the correct byte offset for each field.  This data
 * is used at build time to generate StructArrayLayout_*#emplaceBack() and
 * other accessors, and at runtime for binding vertex buffer attributes.
 */
declare function createLayout(members: Array<{
    name: string;
    type: ViewType;
    readonly components?: number;
}>, alignment?: number): StructArrayLayout;
export { StructArray, Struct, viewTypes, createLayout };
