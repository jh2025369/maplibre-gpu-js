/**
 * An fixed size array that effectively stores boolean values where each value is a single bit of backing data.
 * @remarks
 * All bits are initialized to false.
 */
export declare class BitArray {
    readonly size: number;
    private readonly _byteArray;
    /**
     * Creates a new bit array with a fixed size.
     * @param size The number of bits to store.
     */
    constructor(size: number);
    /**
     * Gets the current value at the specified index.
     * @param bitIndex The index to get the value from.
     * @returns The value at the specified index.
     */
    get(bitIndex: number): boolean;
    /**
     * Sets the value at the specified index.
     * @param bitIndex The index to set the value at.
     * @param value The value to set.
     */
    set(bitIndex: number, value: boolean): void;
}
