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
    u_matrix: mat4;
    u_latrange: number[];
    u_light: number[];
    u_shadow: import("@maplibre/maplibre-gl-style-spec").Color;
    u_highlight: import("@maplibre/maplibre-gl-style-spec").Color;
    u_accent: import("@maplibre/maplibre-gl-style-spec").Color;
};
declare const hillshadeUniformPrepareValues: (tileID: OverscaledTileID, dem: DEMData) => {
    u_matrix: mat4;
    u_dimension: number[];
    u_zoom: number;
    u_unpack: number[];
};
export { hillshadeUniforms, hillshadePrepareUniforms, hillshadeUniformValues, hillshadeUniformPrepareValues };
