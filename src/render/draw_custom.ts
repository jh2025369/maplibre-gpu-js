import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {CustomStyleLayer} from '../style/style_layer/custom_style_layer';
import {Constants} from 'core/Engines/constants';

export function drawCustom(painter: Painter, sourceCache: SourceCache, layer: CustomStyleLayer) {

    const engine = painter.engine;
    const implementation = layer.implementation;

    if (painter.renderPass === 'offscreen') {

        const prerender = implementation.prerender;
        if (prerender) {
            painter.setCustomLayerDefaults();
            painter.colorModeForRenderPass();

            prerender.call(implementation, engine, painter.transform.customLayerMatrix());
        }

    } else if (painter.renderPass === 'translucent') {

        painter.setCustomLayerDefaults();

        painter.colorModeForRenderPass();

        if (implementation.renderingMode === '3d') {
            engine._cacheRenderPipeline.setDepthCompare(Constants.LEQUAL);
        } else {
            painter.depthModeForSublayer(0, false);
        }

        // implementation.render(engine, painter.transform.customLayerMatrix());
        implementation.render(painter, painter.transform.customLayerMatrix());
    }
}
