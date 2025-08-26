import Point from '@mapbox/point-geometry';
import type { WorkerGlobalScopeInterface } from './web_worker';
/**
 * Given a value `t` that varies between 0 and 1, return
 * an interpolation function that eases between 0 and 1 in a pleasing
 * cubic in-out fashion.
 */
export declare function easeCubicInOut(t: number): number;
/**
 * Given given (x, y), (x1, y1) control points for a bezier curve,
 * return a function that interpolates along that curve.
 *
 * @param p1x - control point 1 x coordinate
 * @param p1y - control point 1 y coordinate
 * @param p2x - control point 2 x coordinate
 * @param p2y - control point 2 y coordinate
 */
export declare function bezier(p1x: number, p1y: number, p2x: number, p2y: number): (t: number) => number;
/**
 * A default bezier-curve powered easing function with
 * control points (0.25, 0.1) and (0.25, 1)
 */
export declare const defaultEasing: (t: number) => number;
/**
 * constrain n to the given range via min + max
 *
 * @param n - value
 * @param min - the minimum value to be returned
 * @param max - the maximum value to be returned
 * @returns the clamped value
 */
export declare function clamp(n: number, min: number, max: number): number;
/**
 * constrain n to the given range, excluding the minimum, via modular arithmetic
 *
 * @param n - value
 * @param min - the minimum value to be returned, exclusive
 * @param max - the maximum value to be returned, inclusive
 * @returns constrained number
 */
export declare function wrap(n: number, min: number, max: number): number;
/**
 * Compute the difference between the keys in one object and the keys
 * in another object.
 *
 * @returns keys difference
 */
export declare function keysDifference<S, T>(obj: {
    [key: string]: S;
}, other: {
    [key: string]: T;
}): Array<string>;
/**
 * Given a destination object and optionally many source objects,
 * copy all properties from the source objects into the destination.
 * The last source object given overrides properties from previous
 * source objects.
 *
 * @param dest - destination object
 * @param sources - sources from which properties are pulled
 */
export declare function extend<T extends {}, U>(dest: T, source: U): T & U;
export declare function extend<T extends {}, U, V>(dest: T, source1: U, source2: V): T & U & V;
export declare function extend<T extends {}, U, V, W>(dest: T, source1: U, source2: V, source3: W): T & U & V & W;
export declare function extend(dest: object, ...sources: Array<any>): any;
type KeysOfUnion<T> = T extends T ? keyof T : never;
/**
 * Given an object and a number of properties as strings, return version
 * of that object with only those properties.
 *
 * @param src - the object
 * @param properties - an array of property names chosen
 * to appear on the resulting object.
 * @returns object with limited properties.
 * @example
 * ```ts
 * let foo = { name: 'Charlie', age: 10 };
 * let justName = pick(foo, ['name']); // justName = { name: 'Charlie' }
 * ```
 */
export declare function pick<T extends object>(src: T, properties: Array<KeysOfUnion<T>>): Partial<T>;
/**
 * Return a unique numeric id, starting at 1 and incrementing with
 * each call.
 *
 * @returns unique numeric id.
 */
export declare function uniqueId(): number;
/**
 * Return whether a given value is a power of two
 */
export declare function isPowerOfTwo(value: number): boolean;
/**
 * Return the next power of two, or the input value if already a power of two
 */
export declare function nextPowerOfTwo(value: number): number;
/**
 * Create an object by mapping all the values of an existing object while
 * preserving their keys.
 */
export declare function mapObject(input: any, iterator: Function, context?: any): any;
/**
 * Create an object by filtering out values of an existing object.
 */
export declare function filterObject(input: any, iterator: Function, context?: any): any;
/**
 * Deeply compares two object literals.
 * @param a - first object literal to be compared
 * @param b - second object literal to be compared
 * @returns true if the two object literals are deeply equal, false otherwise
 */
export declare function deepEqual(a?: unknown | null, b?: unknown | null): boolean;
/**
 * Deeply clones two objects.
 */
export declare function clone<T>(input: T): T;
/**
 * Check if two arrays have at least one common element.
 */
export declare function arraysIntersect<T>(a: Array<T>, b: Array<T>): boolean;
export declare function warnOnce(message: string): void;
/**
 * Indicates if the provided Points are in a counter clockwise (true) or clockwise (false) order
 *
 * @returns true for a counter clockwise set of points
 */
export declare function isCounterClockwise(a: Point, b: Point, c: Point): boolean;
/**
 * For two lines a and b in 2d space, defined by any two points along the lines,
 * find the intersection point, or return null if the lines are parallel
 *
 * @param a1 - First point on line a
 * @param a2 - Second point on line a
 * @param b1 - First point on line b
 * @param b2 - Second point on line b
 *
 * @returns the intersection point of the two lines or null if they are parallel
 */
export declare function findLineIntersection(a1: Point, a2: Point, b1: Point, b2: Point): Point | null;
/**
 * Returns the signed area for the polygon ring.  Positive areas are exterior rings and
 * have a clockwise winding.  Negative areas are interior rings and have a counter clockwise
 * ordering.
 *
 * @param ring - Exterior or interior ring
 */
export declare function calculateSignedArea(ring: Array<Point>): number;
/**
 * Detects closed polygons, first + last point are equal
 *
 * @param points - array of points
 * @returns `true` if the points are a closed polygon
 */
export declare function isClosedPolygon(points: Array<Point>): boolean;
/**
 * Converts spherical coordinates to cartesian coordinates.
 *
 * @param spherical - Spherical coordinates, in [radial, azimuthal, polar]
 * @returns cartesian coordinates in [x, y, z]
 */
export declare function sphericalToCartesian([r, azimuthal, polar]: [number, number, number]): {
    x: number;
    y: number;
    z: number;
};
/**
 *  Returns true if the when run in the web-worker context.
 *
 * @returns `true` if the when run in the web-worker context.
 */
export declare function isWorker(self: any): self is WorkerGlobalScopeInterface;
/**
 * Parses data from 'Cache-Control' headers.
 *
 * @param cacheControl - Value of 'Cache-Control' header
 * @returns object containing parsed header info.
 */
export declare function parseCacheControl(cacheControl: string): any;
/**
 * Returns true when run in WebKit derived browsers.
 * This is used as a workaround for a memory leak in Safari caused by using Transferable objects to
 * transfer data between WebWorkers and the main thread.
 * https://github.com/mapbox/mapbox-gl-js/issues/8771
 *
 * This should be removed once the underlying Safari issue is fixed.
 *
 * @param scope - Since this function is used both on the main thread and WebWorker context,
 *      let the calling scope pass in the global scope object.
 * @returns `true` when run in WebKit derived browsers.
 */
export declare function isSafari(scope: any): boolean;
export declare function storageAvailable(type: string): boolean;
export declare function b64EncodeUnicode(str: string): string;
export declare function b64DecodeUnicode(str: string): string;
export declare function isImageBitmap(image: any): image is ImageBitmap;
/**
 * Converts an ArrayBuffer to an ImageBitmap.
 *
 * Used mostly for testing purposes only, because mocking libs don't know how to work with ArrayBuffers, but work
 * perfectly fine with ImageBitmaps. Might also be used for environments (other than testing) not supporting
 * ArrayBuffers.
 *
 * @param data - Data to convert
 * @returns - A  promise resolved when the conversion is finished
 */
export declare const arrayBufferToImageBitmap: (data: ArrayBuffer) => Promise<ImageBitmap>;
/**
 * Converts an ArrayBuffer to an HTMLImageElement.
 *
 * Used mostly for testing purposes only, because mocking libs don't know how to work with ArrayBuffers, but work
 * perfectly fine with ImageBitmaps. Might also be used for environments (other than testing) not supporting
 * ArrayBuffers.
 *
 * @param data - Data to convert
 * @returns - A promise resolved when the conversion is finished
 */
export declare const arrayBufferToImage: (data: ArrayBuffer) => Promise<HTMLImageElement>;
/**
 * Reads pixels from an ImageBitmap/Image/canvas using webcodec VideoFrame API.
 *
 * @param data - image, imagebitmap, or canvas to parse
 * @param x - top-left x coordinate to read from the image
 * @param y - top-left y coordinate to read from the image
 * @param width - width of the rectangle to read from the image
 * @param height - height of the rectangle to read from the image
 * @returns a promise containing the parsed RGBA pixel values of the image, or the error if an error occurred
 */
export declare function readImageUsingVideoFrame(image: HTMLImageElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas, x: number, y: number, width: number, height: number): Promise<Uint8ClampedArray>;
/**
 * Reads pixels from an ImageBitmap/Image/canvas using OffscreenCanvas
 *
 * @param data - image, imagebitmap, or canvas to parse
 * @param x - top-left x coordinate to read from the image
 * @param y - top-left y coordinate to read from the image
 * @param width - width of the rectangle to read from the image
 * @param height - height of the rectangle to read from the image
 * @returns a promise containing the parsed RGBA pixel values of the image, or the error if an error occurred
 */
export declare function readImageDataUsingOffscreenCanvas(imgBitmap: HTMLImageElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas, x: number, y: number, width: number, height: number): Uint8ClampedArray;
/**
 * Reads RGBA pixels from an preferring OffscreenCanvas, but falling back to VideoFrame if supported and
 * the browser is mangling OffscreenCanvas getImageData results.
 *
 * @param data - image, imagebitmap, or canvas to parse
 * @param x - top-left x coordinate to read from the image
 * @param y - top-left y coordinate to read from the image
 * @param width - width of the rectangle to read from the image
 * @param height - height of the rectangle to read from the image
 * @returns a promise containing the parsed RGBA pixel values of the image
 */
export declare function getImageData(image: HTMLImageElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas, x: number, y: number, width: number, height: number): Promise<Uint8ClampedArray>;
export interface Subscription {
    unsubscribe(): void;
}
export interface Subscriber {
    addEventListener: typeof window.addEventListener;
    removeEventListener: typeof window.removeEventListener;
}
/**
 * This method is used in order to register an event listener using a lambda function.
 * The return value will allow unsubscribing from the event, without the need to store the method reference.
 * @param target - The target
 * @param message - The message
 * @param listener - The listener
 * @param options - The options
 * @returns a subscription object that can be used to unsubscribe from the event
 */
export declare function subscribe(target: Subscriber, message: keyof WindowEventMap, listener: (...args: any) => void, options: boolean | AddEventListenerOptions): Subscription;
/**
 * This method converts degrees to radians.
 * The return value is the radian value.
 * @param degrees - The number of degrees
 * @returns radians
 */
export declare function degreesToRadians(degrees: number): number;
export {};
