import type { RequestParameters } from '../util/ajax';
export type PerformanceMetrics = {
    loadTime: number;
    fullLoadTime: number;
    fps: number;
    percentDroppedFrames: number;
    totalFrames: number;
};
export declare enum PerformanceMarkers {
    create = "create",
    load = "load",
    fullLoad = "fullLoad"
}
export declare const PerformanceUtils: {
    mark(marker: PerformanceMarkers): void;
    frame(timestamp: number): void;
    clearMetrics(): void;
    getPerformanceMetrics(): PerformanceMetrics;
};
/**
 * @internal
 * Safe wrapper for the performance resource timing API in web workers with graceful degradation
 */
export declare class RequestPerformance {
    _marks: {
        start: string;
        end: string;
        measure: string;
    };
    constructor(request: RequestParameters);
    finish(): PerformanceEntryList;
}
export default performance;
