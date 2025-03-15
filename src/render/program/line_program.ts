import {Transform} from '../../geo/transform';
import {UniformBuffer} from 'core/Materials/uniformBuffer';
import {pixelsToTileUnits} from '../../source/pixels_to_tile_units';
import {Tile} from '../../source/tile';
import {OverscaledTileID} from '../../source/tile_id';
import {CrossfadeParameters} from '../../style/evaluation_parameters';
import {CrossFaded} from '../../style/properties';
import {LineStyleLayer} from '../../style/style_layer/line_style_layer';
import {Painter} from '../painter';

const lineUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_ratio', 1);
    uniformBuffer.addUniform('u_units_to_pixels', 2);
    uniformBuffer.addUniform('u_device_pixel_ratio', 1);
};

const lineSDFUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_ratio', 1);
    uniformBuffer.addUniform('u_units_to_pixels', 2);
    uniformBuffer.addUniform('u_device_pixel_ratio', 1);
    uniformBuffer.addUniform('u_patternscale_a', 2);
    uniformBuffer.addUniform('u_patternscale_b', 2);
    uniformBuffer.addUniform('u_sdfgamma', 1);
    uniformBuffer.addUniform('u_tex_y_a', 1);
    uniformBuffer.addUniform('u_tex_y_b', 1);
    uniformBuffer.addUniform('u_mix', 1);
};

const lineUniformValues = (
    painter: Painter,
    tile: Tile,
    layer: LineStyleLayer,
    coord: OverscaledTileID
) => {
    const transform = painter.transform;

    return {
        'u_matrix': calculateMatrix(painter, tile, layer, coord),
        'u_ratio': 1 / pixelsToTileUnits(tile, 1, transform.zoom),
        'u_device_pixel_ratio': painter.pixelRatio,
        'u_units_to_pixels': [
            1 / transform.pixelsToGLUnits[0],
            1 / transform.pixelsToGLUnits[1]
        ]
    };
};

const lineGradientUniformValues = (
    painter: Painter,
    tile: Tile,
    layer: LineStyleLayer,
    imageHeight: number,
    coord: OverscaledTileID
) => {
    return extend(lineUniformValues(painter, tile, layer, coord), {
        'u_image': 0,
        'u_image_height': imageHeight,
    });
};

const linePatternUniformValues = (
    painter: Painter,
    tile: Tile,
    layer: LineStyleLayer,
    crossfade: CrossfadeParameters,
    coord: OverscaledTileID
) => {
    const transform = painter.transform;
    const tileZoomRatio = calculateTileRatio(tile, transform);
    const size = tile.imageAtlasTexture.getSize();
    return {
        'u_matrix': calculateMatrix(painter, tile, layer, coord),
        'u_texsize': [size.width, size.height],
        // camera zoom ratio
        'u_ratio': 1 / pixelsToTileUnits(tile, 1, transform.zoom),
        'u_device_pixel_ratio': painter.pixelRatio,
        'u_image': 0,
        'u_scale': [tileZoomRatio, crossfade.fromScale, crossfade.toScale],
        'u_fade': crossfade.t,
        'u_units_to_pixels': [
            1 / transform.pixelsToGLUnits[0],
            1 / transform.pixelsToGLUnits[1]
        ]
    };
};

const lineSDFUniformValues = (
    painter: Painter,
    tile: Tile,
    layer: LineStyleLayer,
    dasharray: CrossFaded<Array<number>>,
    crossfade: CrossfadeParameters,
    coord: OverscaledTileID
) => {
    const transform = painter.transform;
    const lineAtlas = painter.lineAtlas;
    const tileRatio = calculateTileRatio(tile, transform);

    const round = layer.layout.get('line-cap') === 'round';

    const posA = lineAtlas.getDash(dasharray.from, round);
    const posB = lineAtlas.getDash(dasharray.to, round);

    const widthA = posA.width * crossfade.fromScale;
    const widthB = posB.width * crossfade.toScale;

    return extend(lineUniformValues(painter, tile, layer, coord), {
        'u_patternscale_a': [tileRatio / widthA, -posA.height / 2],
        'u_patternscale_b': [tileRatio / widthB, -posB.height / 2],
        'u_sdfgamma': lineAtlas.width / (Math.min(widthA, widthB) * 256 * painter.pixelRatio) / 2,
        // 'u_image': 0,
        'u_tex_y_a': posA.y,
        'u_tex_y_b': posB.y,
        'u_mix': crossfade.t
    });
};

function calculateTileRatio(tile: Tile, transform: Transform) {
    return 1 / pixelsToTileUnits(tile, 1, transform.tileZoom);
}

function calculateMatrix(painter: Painter, tile: Tile, layer: LineStyleLayer, coord: OverscaledTileID) {
    return painter.translatePosMatrix(
        coord ? coord.posMatrix : tile.tileID.posMatrix,
        tile,
        layer.paint.get('line-translate'),
        layer.paint.get('line-translate-anchor')
    );
}

const extend = (dest: object, ...sources: Array<any>): any => {
    for (const src of sources) {
        for (const k in src) {
            dest[k] = src[k];
        }
    }
    return dest;
};

export {
    lineUniforms,
    lineSDFUniforms,
    lineUniformValues,
    linePatternUniformValues,
    lineSDFUniformValues,
    lineGradientUniformValues
};
