import Point from '@mapbox/point-geometry';
export declare class PathInterpolator {
    points: Array<Point>;
    length: number;
    paddedLength: number;
    padding: number;
    _distances: Array<number>;
    constructor(points_?: Array<Point> | null, padding_?: number | null);
    reset(points_?: Array<Point> | null, padding_?: number | null): void;
    lerp(t: number): Point;
}
