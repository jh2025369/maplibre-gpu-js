import { Properties, DataConstantProperty } from '../properties';
export type RasterPaintProps = {
    "raster-opacity": DataConstantProperty<number>;
    "raster-hue-rotate": DataConstantProperty<number>;
    "raster-brightness-min": DataConstantProperty<number>;
    "raster-brightness-max": DataConstantProperty<number>;
    "raster-saturation": DataConstantProperty<number>;
    "raster-contrast": DataConstantProperty<number>;
    "raster-resampling": DataConstantProperty<"linear" | "nearest">;
    "raster-fade-duration": DataConstantProperty<number>;
};
export type RasterPaintPropsPossiblyEvaluated = {
    "raster-opacity": number;
    "raster-hue-rotate": number;
    "raster-brightness-min": number;
    "raster-brightness-max": number;
    "raster-saturation": number;
    "raster-contrast": number;
    "raster-resampling": "linear" | "nearest";
    "raster-fade-duration": number;
};
declare const _default: {
    readonly paint: Properties<RasterPaintProps>;
};
export default _default;
