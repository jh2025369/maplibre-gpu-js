import { StyleLayer } from './style_layer';
import type { TypedStyleLayer } from './style_layer/typed_style_layer';
import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
export type LayerConfigs = {
    [_: string]: LayerSpecification;
};
export type Family<Layer extends TypedStyleLayer> = Array<Layer>;
export declare class StyleLayerIndex {
    familiesBySource: {
        [source: string]: {
            [sourceLayer: string]: Array<Family<any>>;
        };
    };
    keyCache: {
        [source: string]: string;
    };
    _layerConfigs: LayerConfigs;
    _layers: {
        [_: string]: StyleLayer;
    };
    constructor(layerConfigs?: Array<LayerSpecification> | null);
    replace(layerConfigs: Array<LayerSpecification>): void;
    update(layerConfigs: Array<LayerSpecification>, removedIds: Array<string>): void;
}
