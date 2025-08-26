/**
 * Interface for IES texture data.
 */
export interface IIESTextureData {
    /** The width of the texture */
    width: number;
    /** The height of the texture */
    height: number;
    /** The data of the texture */
    data: Float32Array;
}
/**
 * Generates IES data buffer from a string representing the IES data.
 * @param uint8Array defines the IES data
 * @returns the IES data buffer
 * @see https://ieslibrary.com/browse
 * @see https://playground.babylonjs.com/#UQGPDT#1
 */
export declare function LoadIESData(uint8Array: Uint8Array): IIESTextureData;
