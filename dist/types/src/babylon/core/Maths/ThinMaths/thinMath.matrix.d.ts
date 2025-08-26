import type { Tuple } from "core/types";
import type { IMatrixLike } from "../math.like";
/**
 * A thin matrix class that is used for size reasons.
 * The class is identity by default
 */
export declare class ThinMatrix implements IMatrixLike {
    private readonly _m;
    /**
     * Returns the matrix as a Array<number>
     * @returns the matrix underlying array.
     */
    asArray(): Tuple<number, 16>;
    /**
     * Gets the update flag of the matrix which is an unique number for the matrix.
     * It will be incremented every time the matrix data change.
     * You can use it to speed the comparison between two versions of the same matrix.
     */
    updateFlag: number;
}
