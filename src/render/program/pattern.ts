import {pixelsToTileUnits} from '../../source/pixels_to_tile_units';

import type {Painter} from '../painter';
import type {OverscaledTileID} from '../../source/tile_id';
import type {CrossFaded} from '../../style/properties';
import type {CrossfadeParameters} from '../../style/evaluation_parameters';
import type {Tile} from '../../source/tile';
import type {ResolvedImage} from '@maplibre/maplibre-gl-style-spec';

function patternUniformValues(crossfade: CrossfadeParameters, painter: Painter, tile: Tile) {

    const tileRatio = 1 / pixelsToTileUnits(tile, 1, painter.transform.tileZoom);

    const numTiles = Math.pow(2, tile.tileID.overscaledZ);
    const tileSizeAtNearestZoom = tile.tileSize * Math.pow(2, painter.transform.tileZoom) / numTiles;

    const pixelX = tileSizeAtNearestZoom * (tile.tileID.canonical.x + tile.tileID.wrap * numTiles);
    const pixelY = tileSizeAtNearestZoom * tile.tileID.canonical.y;

    const size = tile.imageAtlasTexture.getSize();

    return {
        'u_texsize': {value: [size.width, size.height], type: 'vec2'},
        'u_scale': {value: [tileRatio, crossfade.fromScale, crossfade.toScale], type: 'vec3'},
        'u_fade': {value: crossfade.t, type: 'float'},
        // split the pixel coord into two pairs of 16 bit numbers. The glsl spec only guarantees 16 bits of precision.
        'u_pixel_coord_upper': {value: [pixelX >> 16, pixelY >> 16], type: 'vec2'},
        'u_pixel_coord_lower': {value: [pixelX & 0xFFFF, pixelY & 0xFFFF], type: 'vec2'},
    };
}

function bgPatternUniformValues(
    image: CrossFaded<ResolvedImage>,
    crossfade: CrossfadeParameters,
    painter: Painter,
    tile: {
        tileID: OverscaledTileID;
        tileSize: number;
    }
) {
    const imagePosA = painter.imageManager.getPattern(image.from.toString());
    const imagePosB = painter.imageManager.getPattern(image.to.toString());
    const {width, height} = painter.imageManager.getPixelSize();

    const numTiles = Math.pow(2, tile.tileID.overscaledZ);
    const tileSizeAtNearestZoom = tile.tileSize * Math.pow(2, painter.transform.tileZoom) / numTiles;

    const pixelX = tileSizeAtNearestZoom * (tile.tileID.canonical.x + tile.tileID.wrap * numTiles);
    const pixelY = tileSizeAtNearestZoom * tile.tileID.canonical.y;

    return {
        'u_pattern_tl_a': {value: (imagePosA as any).tl, type: 'vec2'},
        'u_pattern_br_a': {value: (imagePosA as any).br, type: 'vec2'},
        'u_pattern_tl_b': {value: (imagePosB as any).tl, type: 'vec2'},
        'u_pattern_br_b': {value: (imagePosB as any).br, type: 'vec2'},
        'u_texsize': {value: [width, height], type: 'vec2'},
        'u_mix': {value: crossfade.t, type: 'float'},
        'u_pattern_size_a': {value: (imagePosA as any).displaySize, type: 'vec2'},
        'u_pattern_size_b': {value: (imagePosB as any).displaySize, type: 'vec2'},
        'u_scale_a': {value: crossfade.fromScale, type: 'float'},
        'u_scale_b': {value: crossfade.toScale, type: 'float'},
        'u_tile_units_to_pixels': {value: 1 / pixelsToTileUnits(tile, 1, painter.transform.tileZoom), type: 'float'},
        // split the pixel coord into two pairs of 16 bit numbers. The glsl spec only guarantees 16 bits of precision.
        'u_pixel_coord_upper': {value: [pixelX >> 16, pixelY >> 16], type: 'vec2'},
        'u_pixel_coord_lower': {value: [pixelX & 0xFFFF, pixelY & 0xFFFF], type: 'vec2'}
    };
}
export {bgPatternUniformValues, patternUniformValues};
