import type { PropertyValue, PossiblyEvaluatedPropertyValue } from '../style/properties';
import type { InterpolationType } from '@maplibre/maplibre-gl-style-spec';
declare const MAX_GLYPH_ICON_SIZE = 255;
declare const SIZE_PACK_FACTOR = 128;
declare const MAX_PACKED_SIZE: number;
export { getSizeData, evaluateSizeForFeature, evaluateSizeForZoom, SIZE_PACK_FACTOR, MAX_GLYPH_ICON_SIZE, MAX_PACKED_SIZE };
export type SizeData = {
    kind: 'constant';
    layoutSize: number;
} | {
    kind: 'source';
} | {
    kind: 'camera';
    minZoom: number;
    maxZoom: number;
    minSize: number;
    maxSize: number;
    interpolationType: InterpolationType;
} | {
    kind: 'composite';
    minZoom: number;
    maxZoom: number;
    interpolationType: InterpolationType;
};
export type EvaluatedZoomSize = {
    uSizeT: number;
    uSize: number;
};
declare function getSizeData(tileZoom: number, value: PropertyValue<number, PossiblyEvaluatedPropertyValue<number>>): SizeData;
declare function evaluateSizeForFeature(sizeData: SizeData, { uSize, uSizeT }: {
    uSize: number;
    uSizeT: number;
}, { lowerSize, upperSize }: {
    lowerSize: number;
    upperSize: number;
}): number;
declare function evaluateSizeForZoom(sizeData: SizeData, zoom: number): EvaluatedZoomSize;
