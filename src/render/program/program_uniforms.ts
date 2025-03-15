import {lineSDFUniforms, lineUniforms} from './line_program';
import {backgroundUniforms} from './background_program';
import {circleUniforms} from './circle_program';
import {clippingMaskUniforms} from './clipping_mask_program';
import {fillUniforms,
    fillOutlineUniforms,
    fillPatternUniforms,
    fillOutlinePatternUniforms} from './fill_program';
import {fillExtrusionUniforms, fillExtrusionPatternUniforms} from './fill_extrusion_program';
import {terrainUniforms} from './terrain_program';
import {rasterUniforms} from './raster_program';

export const programUniforms = {
    line: lineUniforms,
    line2: lineUniforms,
    lineSDF: lineSDFUniforms,
    background: backgroundUniforms,
    circle: circleUniforms,
    clippingMask: clippingMaskUniforms,
    fill: fillUniforms,
    fillOutline: fillOutlineUniforms,
    fillPattern: fillPatternUniforms,
    fillOutlinePattern: fillOutlinePatternUniforms,
    fillExtrusion: fillExtrusionUniforms,
    fillExtrusionPattern: fillExtrusionPatternUniforms,
    terrain: terrainUniforms,
    terrainDepth: terrainUniforms,
    terrainCoords: terrainUniforms,
    raster: rasterUniforms,
};
