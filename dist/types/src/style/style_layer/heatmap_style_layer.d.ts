import { StyleLayer } from '../style_layer';
import { HeatmapBucket } from '../../data/bucket/heatmap_bucket';
import { RGBAImage } from '../../util/image';
import { HeatmapPaintPropsPossiblyEvaluated } from './heatmap_style_layer_properties.g';
import { Transitionable, Transitioning, PossiblyEvaluated } from '../properties';
import type { Texture } from 'core/Materials/Textures/texture';
import type { RenderTargetWrapper } from 'core/Engines';
import type { HeatmapPaintProps } from './heatmap_style_layer_properties.g';
import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
/**
 * A style layer that defines a heatmap
 */
export declare class HeatmapStyleLayer extends StyleLayer {
    heatmapFbo: RenderTargetWrapper;
    renderPassDescriptor: GPURenderPassDescriptor;
    colorRamp: RGBAImage;
    colorRampTexture: Texture;
    _transitionablePaint: Transitionable<HeatmapPaintProps>;
    _transitioningPaint: Transitioning<HeatmapPaintProps>;
    paint: PossiblyEvaluated<HeatmapPaintProps, HeatmapPaintPropsPossiblyEvaluated>;
    createBucket(options: any): HeatmapBucket;
    constructor(layer: LayerSpecification);
    _handleSpecialPaintPropertyUpdate(name: string): void;
    _updateColorRamp(): void;
    resize(): void;
    queryRadius(): number;
    queryIntersectsFeature(): boolean;
    hasOffscreenPass(): boolean;
}
