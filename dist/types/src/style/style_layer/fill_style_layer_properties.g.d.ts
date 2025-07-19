import { Properties, DataConstantProperty, DataDrivenProperty, CrossFadedDataDrivenProperty, PossiblyEvaluatedPropertyValue, CrossFaded } from '../properties';
import type { Color, ResolvedImage } from '@maplibre/maplibre-gl-style-spec';
export type FillLayoutProps = {
    "fill-sort-key": DataDrivenProperty<number>;
};
export type FillLayoutPropsPossiblyEvaluated = {
    "fill-sort-key": PossiblyEvaluatedPropertyValue<number>;
};
export type FillPaintProps = {
    "fill-antialias": DataConstantProperty<boolean>;
    "fill-opacity": DataDrivenProperty<number>;
    "fill-color": DataDrivenProperty<Color>;
    "fill-outline-color": DataDrivenProperty<Color>;
    "fill-translate": DataConstantProperty<[number, number]>;
    "fill-translate-anchor": DataConstantProperty<"map" | "viewport">;
    "fill-pattern": CrossFadedDataDrivenProperty<ResolvedImage>;
};
export type FillPaintPropsPossiblyEvaluated = {
    "fill-antialias": boolean;
    "fill-opacity": PossiblyEvaluatedPropertyValue<number>;
    "fill-color": PossiblyEvaluatedPropertyValue<Color>;
    "fill-outline-color": PossiblyEvaluatedPropertyValue<Color>;
    "fill-translate": [number, number];
    "fill-translate-anchor": "map" | "viewport";
    "fill-pattern": PossiblyEvaluatedPropertyValue<CrossFaded<ResolvedImage>>;
};
declare const _default: {
    readonly paint: Properties<FillPaintProps>;
    readonly layout: Properties<FillLayoutProps>;
};
export default _default;
