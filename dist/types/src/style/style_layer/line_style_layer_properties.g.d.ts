import { Properties, DataConstantProperty, DataDrivenProperty, CrossFadedDataDrivenProperty, CrossFadedProperty, ColorRampProperty, PossiblyEvaluatedPropertyValue, CrossFaded } from '../properties';
import type { Color, ResolvedImage } from '@maplibre/maplibre-gl-style-spec';
export type LineLayoutProps = {
    "line-cap": DataConstantProperty<"butt" | "round" | "square">;
    "line-join": DataDrivenProperty<"bevel" | "round" | "miter">;
    "line-miter-limit": DataConstantProperty<number>;
    "line-round-limit": DataConstantProperty<number>;
    "line-sort-key": DataDrivenProperty<number>;
};
export type LineLayoutPropsPossiblyEvaluated = {
    "line-cap": "butt" | "round" | "square";
    "line-join": PossiblyEvaluatedPropertyValue<"bevel" | "round" | "miter">;
    "line-miter-limit": number;
    "line-round-limit": number;
    "line-sort-key": PossiblyEvaluatedPropertyValue<number>;
};
export type LinePaintProps = {
    "line-opacity": DataDrivenProperty<number>;
    "line-color": DataDrivenProperty<Color>;
    "line-translate": DataConstantProperty<[number, number]>;
    "line-translate-anchor": DataConstantProperty<"map" | "viewport">;
    "line-width": DataDrivenProperty<number>;
    "line-gap-width": DataDrivenProperty<number>;
    "line-offset": DataDrivenProperty<number>;
    "line-blur": DataDrivenProperty<number>;
    "line-dasharray": CrossFadedProperty<Array<number>>;
    "line-pattern": CrossFadedDataDrivenProperty<ResolvedImage>;
    "line-gradient": ColorRampProperty;
};
export type LinePaintPropsPossiblyEvaluated = {
    "line-opacity": PossiblyEvaluatedPropertyValue<number>;
    "line-color": PossiblyEvaluatedPropertyValue<Color>;
    "line-translate": [number, number];
    "line-translate-anchor": "map" | "viewport";
    "line-width": PossiblyEvaluatedPropertyValue<number>;
    "line-gap-width": PossiblyEvaluatedPropertyValue<number>;
    "line-offset": PossiblyEvaluatedPropertyValue<number>;
    "line-blur": PossiblyEvaluatedPropertyValue<number>;
    "line-dasharray": CrossFaded<Array<number>>;
    "line-pattern": PossiblyEvaluatedPropertyValue<CrossFaded<ResolvedImage>>;
    "line-gradient": ColorRampProperty;
};
declare const _default: {
    readonly paint: Properties<LinePaintProps>;
    readonly layout: Properties<LineLayoutProps>;
};
export default _default;
