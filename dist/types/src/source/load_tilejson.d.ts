import type { RequestManager } from '../util/request_manager';
import type { RasterDEMSourceSpecification, RasterSourceSpecification, VectorSourceSpecification } from '@maplibre/maplibre-gl-style-spec';
export type LoadTileJsonResponse = {
    tiles: Array<string>;
    minzoom: number;
    maxzoom: number;
    attribution: string;
    bounds: RasterSourceSpecification['bounds'];
    scheme: RasterSourceSpecification['scheme'];
    tileSize: number;
    encoding: RasterDEMSourceSpecification['encoding'];
    vectorLayerIds?: Array<string>;
};
export declare function loadTileJson(options: RasterSourceSpecification | RasterDEMSourceSpecification | VectorSourceSpecification, requestManager: RequestManager, abortController: AbortController): Promise<LoadTileJsonResponse | null>;
