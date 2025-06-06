import Point from '@mapbox/point-geometry';
export declare class Anchor extends Point {
    angle: any;
    segment?: number;
    constructor(x: number, y: number, angle: number, segment?: number);
    clone(): Anchor;
}
