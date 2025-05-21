import type { Painter } from '../painter';
import type { OverscaledTileID } from '../../source/tile_id';
import type { CrossFaded } from '../../style/properties';
import type { CrossfadeParameters } from '../../style/evaluation_parameters';
import type { Tile } from '../../source/tile';
import type { ResolvedImage } from '@maplibre/maplibre-gl-style-spec';
declare function patternUniformValues(crossfade: CrossfadeParameters, painter: Painter, tile: Tile): {
    u_texsize: number[];
    u_scale: number[];
    u_fade: number;
    u_pixel_coord_upper: number[];
    u_pixel_coord_lower: number[];
};
declare function bgPatternUniformValues(image: CrossFaded<ResolvedImage>, crossfade: CrossfadeParameters, painter: Painter, tile: {
    tileID: OverscaledTileID;
    tileSize: number;
}): {
    u_image: number;
    u_pattern_tl_a: any;
    u_pattern_br_a: any;
    u_pattern_tl_b: any;
    u_pattern_br_b: any;
    u_texsize: number[];
    u_mix: number;
    u_pattern_size_a: any;
    u_pattern_size_b: any;
    u_scale_a: number;
    u_scale_b: number;
    u_tile_units_to_pixels: number;
    u_pixel_coord_upper: number[];
    u_pixel_coord_lower: number[];
};
export { bgPatternUniformValues, patternUniformValues };
