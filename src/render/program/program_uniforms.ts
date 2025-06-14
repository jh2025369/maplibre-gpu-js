import {lineSDFUniforms, lineGradientUniforms, linePatternUniforms, lineUniforms} from './line_program';
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
import {hillshadeUniforms, hillshadePrepareUniforms} from './hillshade_program';
import {symbolIconUniforms, symbolSDFUniforms, symbolTextAndIconUniforms} from './symbol_program';
import {collisionUniforms, collisionCircleUniforms} from './collision_program';
import {heatmapUniforms, heatmapTextureUniforms} from './heatmap_program';

export const programUniforms = {
    line: lineUniforms,
    lineGradient: lineGradientUniforms,
    linePattern: linePatternUniforms,
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
    hillshade: hillshadeUniforms,
    hillshadePrepare: hillshadePrepareUniforms,
    symbolIcon: symbolIconUniforms,
    symbolSDF: symbolSDFUniforms,
    symbolTextAndIcon: symbolTextAndIconUniforms,
    collisionBox: collisionUniforms,
    collisionCircle: collisionCircleUniforms,
    heatmap: heatmapUniforms,
    heatmapTexture: heatmapTextureUniforms
};
