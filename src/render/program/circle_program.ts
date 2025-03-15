
import {UniformBuffer} from 'core/Materials/uniformBuffer';
import {Tile} from '../../source/tile';
import {pixelsToTileUnits} from '../../source/pixels_to_tile_units';

import type {OverscaledTileID} from '../../source/tile_id';
import  {CircleStyleLayer} from '../../style/style_layer/circle_style_layer';

import {Painter} from '../painter';

const circleUniforms = (uniformBuffer: UniformBuffer) => {
    uniformBuffer.addUniform('u_matrix', 16);
    uniformBuffer.addUniform('u_scale_with_map', 1);
    uniformBuffer.addUniform('u_pitch_with_map', 1);
    uniformBuffer.addUniform('u_extrude_scale', 2);
    uniformBuffer.addUniform('u_device_pixel_ratio', 1);
    uniformBuffer.addUniform('u_camera_to_center_distance', 1);
};

const circleUniformValues = (
    painter: Painter,
    coord: OverscaledTileID,
    tile: Tile,
    layer: CircleStyleLayer
) => {
    const transform = painter.transform;

    let pitchWithMap: boolean, extrudeScale: [number, number];
    if (layer.paint.get('circle-pitch-alignment') === 'map') {
        const pixelRatio = pixelsToTileUnits(tile, 1, transform.zoom);
        pitchWithMap = true;
        extrudeScale = [pixelRatio, pixelRatio];
    } else {
        pitchWithMap = false;
        extrudeScale = transform.pixelsToGLUnits;
    }

    return {
        'u_matrix': painter.translatePosMatrix(
            coord.posMatrix,
            tile,
            layer.paint.get('circle-translate'),
            layer.paint.get('circle-translate-anchor')),
        'u_pitch_with_map': +(pitchWithMap),
        'u_scale_with_map': +(layer.paint.get('circle-pitch-scale') === 'map'),
        'u_extrude_scale': extrudeScale,
        'u_device_pixel_ratio': painter.pixelRatio,
        'u_camera_to_center_distance': transform.cameraToCenterDistance,

    };
};

export {circleUniforms, circleUniformValues};
