import { CircleBucket } from './circle_bucket';
import type { HeatmapStyleLayer } from '../../style/style_layer/heatmap_style_layer';
export declare class HeatmapBucket extends CircleBucket<HeatmapStyleLayer> {
    layers: Array<HeatmapStyleLayer>;
}
