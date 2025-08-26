import { Vector2 } from "core/Maths/math.vector";
/**
 * Evaluates a specified specular power value to determine the appropriate roughness value,
 * based on a pre-defined cubic bezier curve with specular on the abscissa axis (x-axis)
 * and roughness on the ordinant axis (y-axis)
 * @param specularPower specular power of standard material
 * @param p0 first control point
 * @param p1 second control point
 * @param p2 third control point
 * @param p3 fourth control point
 * @returns Number representing the roughness value
 */
export declare function SpecularPowerToRoughness(specularPower: number, p0?: Vector2, p1?: Vector2, p2?: Vector2, p3?: Vector2): number;
