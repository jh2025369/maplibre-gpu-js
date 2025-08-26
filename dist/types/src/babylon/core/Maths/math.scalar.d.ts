/**
 * Scalar computation library
 */
export declare const Scalar: {
    /**
     * Two pi constants convenient for computation.
     */
    TwoPi: number;
    /**
     * Returns -1 if value is negative and +1 is value is positive.
     * @param value the value
     * @returns the value itself if it's equal to zero.
     */
    Sign: (x: number) => number;
    /**
     * the log2 of value.
     * @param value the value to compute log2 of
     * @returns the log2 of value.
     */
    Log2: (x: number) => number;
    /**
     * Returns the highest common factor of two integers.
     * @param a first parameter
     * @param b second parameter
     * @returns HCF of a and b
     */
    HCF: (a: number, b: number) => number;
    ExtractAsInt(value: number): number;
    WithinEpsilon(a: number, b: number, epsilon?: number): boolean;
    OutsideRange(num: number, min: number, max: number, epsilon?: number): boolean;
    RandomRange(min: number, max: number): number;
    Lerp(start: number, end: number, amount: number): number;
    LerpAngle(start: number, end: number, amount: number): number;
    InverseLerp(a: number, b: number, value: number): number;
    Hermite(value1: number, tangent1: number, value2: number, tangent2: number, amount: number): number;
    Hermite1stDerivative(value1: number, tangent1: number, value2: number, tangent2: number, time: number): number;
    Clamp(value: number, min?: number, max?: number): number;
    NormalizeRadians(angle: number): number;
    ToHex(i: number): string;
    ILog2(value: number): number;
    Repeat(value: number, length: number): number;
    Normalize(value: number, min: number, max: number): number;
    Denormalize(normalized: number, min: number, max: number): number;
    DeltaAngle(current: number, target: number): number;
    PingPong(tx: number, length: number): number;
    SmoothStep(from: number, to: number, tx: number): number;
    MoveTowards(current: number, target: number, maxDelta: number): number;
    MoveTowardsAngle(current: number, target: number, maxDelta: number): number;
    RangeToPercent(number: number, min: number, max: number): number;
    PercentToRange(percent: number, min: number, max: number): number;
    HighestCommonFactor(a: number, b: number): number;
};
