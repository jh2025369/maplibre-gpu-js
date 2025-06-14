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

const lineGradientUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_ratio', 1);
    uniformBuffer.addUniform('u_units_to_pixels', 2);
    uniformBuffer.addUniform('u_device_pixel_ratio', 1);
    uniformBuffer.addUniform('u_image_height', 1);
};

const linePatternUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_texsize', 2);
    uniformBuffer.addUniform('u_ratio', 1);
    uniformBuffer.addUniform('u_units_to_pixels', 2);
    uniformBuffer.addUniform('u_device_pixel_ratio', 1);
    uniformBuffer.addUniform('u_scale', 3);
    uniformBuffer.addUniform('u_fade', 1);
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
        'u_matrix': {value: calculateMatrix(painter, tile, layer, coord), type: 'mat4'},
        'u_ratio': {value: 1 / pixelsToTileUnits(tile, 1, transform.zoom), type: 'float'},
        'u_device_pixel_ratio': {value: painter.pixelRatio, type: 'float'},
        'u_units_to_pixels': {
            value: [
                1 / transform.pixelsToGLUnits[0],
                1 / transform.pixelsToGLUnits[1]
            ],
            type: 'vec2'
        }
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
        'u_image_height': {value: imageHeight, type: 'float'}
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
        'u_matrix': {value: calculateMatrix(painter, tile, layer, coord), type: 'mat4'},
        'u_texsize': {value: [size.width, size.height], type: 'vec2'},
        // camera zoom ratio
        'u_ratio': {value: 1 / pixelsToTileUnits(tile, 1, transform.zoom), type: 'float'},
        'u_device_pixel_ratio': {value: painter.pixelRatio, type: 'float'},
        'u_scale': {value: [tileZoomRatio, crossfade.fromScale, crossfade.toScale], type: 'vec3'},
        'u_fade': {value: crossfade.t, type: 'float'},
        'u_units_to_pixels': {
            value: [
                1 / transform.pixelsToGLUnits[0],
                1 / transform.pixelsToGLUnits[1]
            ],
            type: 'vec2'
        }
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
        'u_patternscale_a': {value: [tileRatio / widthA, -posA.height / 2], type: 'vec2'},
        'u_patternscale_b': {value: [tileRatio / widthB, -posB.height / 2], type: 'vec2'},
        'u_sdfgamma': {value: lineAtlas.width / (Math.min(widthA, widthB) * 256 * painter.pixelRatio) / 2, type: 'float'},
        'u_tex_y_a': {value: posA.y, type: 'float'},
        'u_tex_y_b': {value: posB.y, type: 'float'},
        'u_mix': {value: crossfade.t, type: 'float'}
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
    lineGradientUniforms,
    linePatternUniforms,
    lineSDFUniforms,
    lineUniformValues,
    linePatternUniformValues,
    lineSDFUniformValues,
    lineGradientUniformValues
};
