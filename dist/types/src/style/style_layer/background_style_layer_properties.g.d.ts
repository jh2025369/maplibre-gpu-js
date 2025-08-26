import { Properties, DataConstantProperty, CrossFadedProperty, CrossFaded } from '../properties';
import type { Color, ResolvedImage } from '@maplibre/maplibre-gl-style-spec';
export type BackgroundPaintProps = {
    "background-color": DataConstantProperty<Color>;
    "background-pattern": CrossFadedProperty<ResolvedImage>;
    "background-opacity": DataConstantProperty<number>;
};
export type BackgroundPaintPropsPossiblyEvaluated = {
    "background-color": Color;
    "background-pattern": CrossFaded<ResolvedImage>;
    "background-opacity": number;
};
declare const _default: {
    readonly paint: Properties<BackgroundPaintProps>;
};
export default _default;
