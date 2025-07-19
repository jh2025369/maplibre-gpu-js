export declare class ZoomHistory {
    lastZoom: number;
    lastFloorZoom: number;
    lastIntegerZoom: number;
    lastIntegerZoomTime: number;
    first: boolean;
    constructor();
    update(z: number, now: number): boolean;
}
