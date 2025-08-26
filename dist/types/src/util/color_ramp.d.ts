import { RGBAImage } from './image';
import type { StylePropertyExpression } from '@maplibre/maplibre-gl-style-spec';
export type ColorRampParams = {
    expression: StylePropertyExpression;
    evaluationKey: string;
    resolution?: number;
    image?: RGBAImage;
    clips?: Array<any>;
};
/**
 * Given an expression that should evaluate to a color ramp,
 * return a RGBA image representing that ramp expression.
 */
export declare function renderColorRamp(params: ColorRampParams): RGBAImage;
