import { ZoomHistory } from './zoom_history';
import type { TransitionSpecification } from '@maplibre/maplibre-gl-style-spec';
export type CrossfadeParameters = {
    fromScale: number;
    toScale: number;
    t: number;
};
/**
 * @internal
 * A parameter that can be evaluated to a value
 */
export declare class EvaluationParameters {
    zoom: number;
    now: number;
    fadeDuration: number;
    zoomHistory: ZoomHistory;
    transition: TransitionSpecification;
    constructor(zoom: number, options?: any);
    isSupportedScript(str: string): boolean;
    crossFadingFactor(): number;
    getCrossfadeParameters(): CrossfadeParameters;
}
