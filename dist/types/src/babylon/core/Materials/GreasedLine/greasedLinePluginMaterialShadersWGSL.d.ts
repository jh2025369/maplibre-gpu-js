import type { Nullable } from "../../types";
/**
 * Returns WGSL custom shader code
 * @param shaderType vertex or fragment
 * @param cameraFacing is in camera facing mode?
 * @returns WGSL custom shader code
 */
/** @internal */
export declare function GetCustomCode(shaderType: string, cameraFacing: boolean): Nullable<{
    [pointName: string]: string;
}>;
