import { mat4 } from 'gl-matrix';
import type { Tile } from '../../source/tile';
import type { Painter } from '../painter';
import type { HillshadeStyleLayer } from '../../style/style_layer/hillshade_style_layer';
import type { DEMData } from '../../data/dem_data';
import type { OverscaledTileID } from '../../source/tile_id';
import { UniformBuffer } from 'core/Materials/uniformBuffer';
declare const hillshadeUniforms: (uniformBuffer: UniformBuffer) => void;
declare const hillshadePrepareUniforms: (uniformBuffer: UniformBuffer) => void;
declare const hillshadeUniformValues: (painter: Painter, tile: Tile, layer: HillshadeStyleLayer, coord: OverscaledTileID) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_latrange: {
        value: number[];
        type: string;
    };
    u_light: {
        value: number[];
        type: string;
    };
    u_shadow: {
        value: import("@maplibre/maplibre-gl-style-spec").RGBColor;
        type: string;
    };
    u_highlight: {
        value: import("@maplibre/maplibre-gl-style-spec").RGBColor;
        type: string;
    };
    u_accent: {
        value: import("@maplibre/maplibre-gl-style-spec").RGBColor;
        type: string;
    };
};
declare const hillshadeUniformPrepareValues: (tileID: OverscaledTileID, dem: DEMData) => {
    u_matrix: {
        value: mat4;
        type: string;
    };
    u_dimension: {
        value: number[];
        type: string;
    };
    u_zoom: {
        value: number;
        type: string;
    };
    u_unpack: {
        value: number[];
        type: string;
    };
};
export { hillshadeUniforms, hillshadePrepareUniforms, hillshadeUniformValues, hillshadeUniformPrepareValues };
