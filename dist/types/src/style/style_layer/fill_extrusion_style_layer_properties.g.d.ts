import { Properties, DataConstantProperty, DataDrivenProperty, CrossFadedDataDrivenProperty, PossiblyEvaluatedPropertyValue, CrossFaded } from '../properties';
import type { Color, ResolvedImage } from '@maplibre/maplibre-gl-style-spec';
export type FillExtrusionPaintProps = {
    "fill-extrusion-opacity": DataConstantProperty<number>;
    "fill-extrusion-color": DataDrivenProperty<Color>;
    "fill-extrusion-translate": DataConstantProperty<[number, number]>;
    "fill-extrusion-translate-anchor": DataConstantProperty<"map" | "viewport">;
    "fill-extrusion-pattern": CrossFadedDataDrivenProperty<ResolvedImage>;
    "fill-extrusion-height": DataDrivenProperty<number>;
    "fill-extrusion-base": DataDrivenProperty<number>;
    "fill-extrusion-vertical-gradient": DataConstantProperty<boolean>;
};
export type FillExtrusionPaintPropsPossiblyEvaluated = {
    "fill-extrusion-opacity": number;
    "fill-extrusion-color": PossiblyEvaluatedPropertyValue<Color>;
    "fill-extrusion-translate": [number, number];
    "fill-extrusion-translate-anchor": "map" | "viewport";
    "fill-extrusion-pattern": PossiblyEvaluatedPropertyValue<CrossFaded<ResolvedImage>>;
    "fill-extrusion-height": PossiblyEvaluatedPropertyValue<number>;
    "fill-extrusion-base": PossiblyEvaluatedPropertyValue<number>;
    "fill-extrusion-vertical-gradient": boolean;
};
declare const _default: {
    readonly paint: Properties<FillExtrusionPaintProps>;
};
export default _default;
