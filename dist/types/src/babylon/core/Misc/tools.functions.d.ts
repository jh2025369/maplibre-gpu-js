/**
 * Function indicating if a number is an exponent of 2
 * @param value defines the value to test
 * @returns true if the value is an exponent of 2
 */
export declare function IsExponentOfTwo(value: number): boolean;
/**
 * Interpolates between a and b via alpha
 * @param a The lower value (returned when alpha = 0)
 * @param b The upper value (returned when alpha = 1)
 * @param alpha The interpolation-factor
 * @returns The mixed value
 */
export declare function Mix(a: number, b: number, alpha: number): number;
/**
 * Find the nearest power of two.
 * @param x Number to start search from.
 * @returns Next nearest power of two.
 */
export declare function NearestPOT(x: number): number;
/**
 * Find the next highest power of two.
 * @param x Number to start search from.
 * @returns Next highest power of two.
 */
export declare function CeilingPOT(x: number): number;
/**
 * Find the next lowest power of two.
 * @param x Number to start search from.
 * @returns Next lowest power of two.
 */
export declare function FloorPOT(x: number): number;
/**
 * Get the closest exponent of two
 * @param value defines the value to approximate
 * @param max defines the maximum value to return
 * @param mode defines how to define the closest value
 * @returns closest exponent of two of the given value
 */
export declare function GetExponentOfTwo(value: number, max: number, mode?: number): number;
