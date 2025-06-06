import { Properties, DataConstantProperty, DataDrivenProperty, ColorRampProperty, PossiblyEvaluatedPropertyValue } from '../properties';
export type HeatmapPaintProps = {
    "heatmap-radius": DataDrivenProperty<number>;
    "heatmap-weight": DataDrivenProperty<number>;
    "heatmap-intensity": DataConstantProperty<number>;
    "heatmap-color": ColorRampProperty;
    "heatmap-opacity": DataConstantProperty<number>;
};
export type HeatmapPaintPropsPossiblyEvaluated = {
    "heatmap-radius": PossiblyEvaluatedPropertyValue<number>;
    "heatmap-weight": PossiblyEvaluatedPropertyValue<number>;
    "heatmap-intensity": number;
    "heatmap-color": ColorRampProperty;
    "heatmap-opacity": number;
};
declare const _default: {
    readonly paint: Properties<HeatmapPaintProps>;
};
export default _default;
