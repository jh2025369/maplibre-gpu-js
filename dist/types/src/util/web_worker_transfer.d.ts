/**
 * A class that is serizlized to and json, that can be constructed back to the original class in the worker or in the main thread
 */
type SerializedObject<S extends Serialized = any> = {
    [_: string]: S;
};
/**
 * All the possible values that can be serialized and sent to and from the worker
 */
export type Serialized = null | void | boolean | number | string | Boolean | Number | String | Date | RegExp | ArrayBuffer | ArrayBufferView | ImageData | ImageBitmap | Blob | Array<Serialized> | SerializedObject;
/**
 * Register options
 */
type RegisterOptions<T> = {
    /**
     * List of properties to omit from serialization (e.g., cached/computed properties)
     */
    omit?: ReadonlyArray<keyof T>;
    /**
     * List of properties that should be serialized by a simple shallow copy, rather than by a recursive call to serialize().
     */
    shallow?: ReadonlyArray<keyof T>;
};
/**
 * Register the given class as serializable.
 *
 * @param options - the registration options
 */
export declare function register<T extends any>(name: string, klass: {
    new (...args: any): T;
}, options?: RegisterOptions<T>): void;
/**
 * Serialize the given object for transfer to or from a web worker.
 *
 * For non-builtin types, recursively serialize each property (possibly
 * omitting certain properties - see register()), and package the result along
 * with the constructor's `name` so that the appropriate constructor can be
 * looked up in `deserialize()`.
 *
 * If a `transferables` array is provided, add any transferable objects (i.e.,
 * any ArrayBuffers or ArrayBuffer views) to the list. (If a copy is needed,
 * this should happen in the client code, before using serialize().)
 */
export declare function serialize(input: unknown, transferables?: Array<Transferable> | null): Serialized;
export declare function deserialize(input: Serialized): unknown;
export {};
