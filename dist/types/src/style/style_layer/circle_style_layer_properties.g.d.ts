import { Properties, DataConstantProperty, DataDrivenProperty, PossiblyEvaluatedPropertyValue } from '../properties';
import type { Color } from '@maplibre/maplibre-gl-style-spec';
export type CircleLayoutProps = {
    "circle-sort-key": DataDrivenProperty<number>;
};
export type CircleLayoutPropsPossiblyEvaluated = {
    "circle-sort-key": PossiblyEvaluatedPropertyValue<number>;
};
export type CirclePaintProps = {
    "circle-radius": DataDrivenProperty<number>;
    "circle-color": DataDrivenProperty<Color>;
    "circle-blur": DataDrivenProperty<number>;
    "circle-opacity": DataDrivenProperty<number>;
    "circle-translate": DataConstantProperty<[number, number]>;
    "circle-translate-anchor": DataConstantProperty<"map" | "viewport">;
    "circle-pitch-scale": DataConstantProperty<"map" | "viewport">;
    "circle-pitch-alignment": DataConstantProperty<"map" | "viewport">;
    "circle-stroke-width": DataDrivenProperty<number>;
    "circle-stroke-color": DataDrivenProperty<Color>;
    "circle-stroke-opacity": DataDrivenProperty<number>;
};
export type CirclePaintPropsPossiblyEvaluated = {
    "circle-radius": PossiblyEvaluatedPropertyValue<number>;
    "circle-color": PossiblyEvaluatedPropertyValue<Color>;
    "circle-blur": PossiblyEvaluatedPropertyValue<number>;
    "circle-opacity": PossiblyEvaluatedPropertyValue<number>;
    "circle-translate": [number, number];
    "circle-translate-anchor": "map" | "viewport";
    "circle-pitch-scale": "map" | "viewport";
    "circle-pitch-alignment": "map" | "viewport";
    "circle-stroke-width": PossiblyEvaluatedPropertyValue<number>;
    "circle-stroke-color": PossiblyEvaluatedPropertyValue<Color>;
    "circle-stroke-opacity": PossiblyEvaluatedPropertyValue<number>;
};
declare const _default: {
    readonly paint: Properties<CirclePaintProps>;
    readonly layout: Properties<CircleLayoutProps>;
};
export default _default;
