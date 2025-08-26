import { Properties, DataConstantProperty } from '../properties';
import type { Color } from '@maplibre/maplibre-gl-style-spec';
export type HillshadePaintProps = {
    "hillshade-illumination-direction": DataConstantProperty<number>;
    "hillshade-illumination-anchor": DataConstantProperty<"map" | "viewport">;
    "hillshade-exaggeration": DataConstantProperty<number>;
    "hillshade-shadow-color": DataConstantProperty<Color>;
    "hillshade-highlight-color": DataConstantProperty<Color>;
    "hillshade-accent-color": DataConstantProperty<Color>;
};
export type HillshadePaintPropsPossiblyEvaluated = {
    "hillshade-illumination-direction": number;
    "hillshade-illumination-anchor": "map" | "viewport";
    "hillshade-exaggeration": number;
    "hillshade-shadow-color": Color;
    "hillshade-highlight-color": Color;
    "hillshade-accent-color": Color;
};
declare const _default: {
    readonly paint: Properties<HillshadePaintProps>;
};
export default _default;
