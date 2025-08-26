import type { Nullable } from "../../types";
/**
 * Returns GLSL custom shader code
 * @param shaderType vertex or fragment
 * @param cameraFacing is in camera facing mode?
 * @returns GLSL custom shader code
 */
/** @internal */
export declare function GetCustomCode(shaderType: string, cameraFacing: boolean): Nullable<{
    [pointName: string]: string;
}>;
