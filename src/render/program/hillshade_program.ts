import {mat4} from 'gl-matrix';

import {EXTENT} from '../../data/extent';
import {MercatorCoordinate} from '../../geo/mercator_coordinate';

import type {Tile} from '../../source/tile';
import type {Painter} from '../painter';
import type {HillshadeStyleLayer} from '../../style/style_layer/hillshade_style_layer';
import type {DEMData} from '../../data/dem_data';
import type {OverscaledTileID} from '../../source/tile_id';
import {UniformBuffer} from 'core/Materials/uniformBuffer';

const hillshadeUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_latrange', 2);
    uniformBuffer.addUniform('u_light', 2);
    uniformBuffer.addUniform('u_shadow', 4);
    uniformBuffer.addUniform('u_highlight', 4);
    uniformBuffer.addUniform('u_accent', 4);
};

const hillshadePrepareUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_dimension', 2);
    uniformBuffer.addUniform('u_zoom', 1);
    uniformBuffer.addUniform('u_unpack', 4);
};

const hillshadeUniformValues = (
    painter: Painter,
    tile: Tile,
    layer: HillshadeStyleLayer,
    coord: OverscaledTileID
) => {
    const shadow = layer.paint.get('hillshade-shadow-color');
    const highlight = layer.paint.get('hillshade-highlight-color');
    const accent = layer.paint.get('hillshade-accent-color');

    let azimuthal = layer.paint.get('hillshade-illumination-direction') * (Math.PI / 180);
    // modify azimuthal angle by map rotation if light is anchored at the viewport
    if (layer.paint.get('hillshade-illumination-anchor') === 'viewport') {
        azimuthal -= painter.transform.angle;
    }
    const align = !painter.options.moving;
    return {
        'u_matrix': {
            value: coord ? coord.posMatrix : painter.transform.calculatePosMatrix(tile.tileID.toUnwrapped(), align),
            type: 'mat4'
        },
        'u_latrange': {value: getTileLatRange(painter, tile.tileID), type: 'vec2'},
        'u_light': {value: [layer.paint.get('hillshade-exaggeration'), azimuthal], type: 'vec2'},
        'u_shadow': {value: shadow.rgb, type: 'vec4'},
        'u_highlight': {value: highlight.rgb, type: 'vec4'},
        'u_accent': {value: accent.rgb, type: 'vec4'}
    };
};

const hillshadeUniformPrepareValues = (tileID: OverscaledTileID, dem: DEMData) => {

    const stride = dem.stride;
    const matrix = mat4.create();
    // Flip rendering at y axis.
    mat4.orthoZO(matrix, 0, EXTENT, -EXTENT, 0, 0, 1);
    mat4.translate(matrix, matrix, [0, -EXTENT, 0]);

    return {
        'u_matrix': {value: matrix, type: 'mat4'},
        'u_dimension': {value: [stride, stride], type: 'vec2'},
        'u_zoom': {value: tileID.overscaledZ, type: 'float'},
        'u_unpack': {value: dem.getUnpackVector(), type: 'vec4'}
    };
};

function getTileLatRange(painter: Painter, tileID: OverscaledTileID) {
    // for scaling the magnitude of a points slope by its latitude
    const tilesAtZoom = Math.pow(2, tileID.canonical.z);
    const y = tileID.canonical.y;
    return [
        new MercatorCoordinate(0, y / tilesAtZoom).toLngLat().lat,
        new MercatorCoordinate(0, (y + 1) / tilesAtZoom).toLngLat().lat
    ];
}

export {
    hillshadeUniforms,
    hillshadePrepareUniforms,
    hillshadeUniformValues,
    hillshadeUniformPrepareValues
};
