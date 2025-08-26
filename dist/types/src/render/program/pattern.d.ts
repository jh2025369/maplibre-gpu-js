import type { Painter } from '../painter';
import type { OverscaledTileID } from '../../source/tile_id';
import type { CrossFaded } from '../../style/properties';
import type { CrossfadeParameters } from '../../style/evaluation_parameters';
import type { Tile } from '../../source/tile';
import type { ResolvedImage } from '@maplibre/maplibre-gl-style-spec';
declare function patternUniformValues(crossfade: CrossfadeParameters, painter: Painter, tile: Tile): {
    u_texsize: {
        value: number[];
        type: string;
    };
    u_scale: {
        value: number[];
        type: string;
    };
    u_fade: {
        value: number;
        type: string;
    };
    u_pixel_coord_upper: {
        value: number[];
        type: string;
    };
    u_pixel_coord_lower: {
        value: number[];
        type: string;
    };
};
declare function bgPatternUniformValues(image: CrossFaded<ResolvedImage>, crossfade: CrossfadeParameters, painter: Painter, tile: {
    tileID: OverscaledTileID;
    tileSize: number;
}): {
    u_pattern_tl_a: {
        value: any;
        type: string;
    };
    u_pattern_br_a: {
        value: any;
        type: string;
    };
    u_pattern_tl_b: {
        value: any;
        type: string;
    };
    u_pattern_br_b: {
        value: any;
        type: string;
    };
    u_texsize: {
        value: number[];
        type: string;
    };
    u_mix: {
        value: number;
        type: string;
    };
    u_pattern_size_a: {
        value: any;
        type: string;
    };
    u_pattern_size_b: {
        value: any;
        type: string;
    };
    u_scale_a: {
        value: number;
        type: string;
    };
    u_scale_b: {
        value: number;
        type: string;
    };
    u_tile_units_to_pixels: {
        value: number;
        type: string;
    };
    u_pixel_coord_upper: {
        value: number[];
        type: string;
    };
    u_pixel_coord_lower: {
        value: number[];
        type: string;
    };
};
export { bgPatternUniformValues, patternUniformValues };
