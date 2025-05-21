import { mat4, vec3, vec4 } from 'gl-matrix';
declare class Frustum {
    points: vec4[];
    planes: vec4[];
    constructor(points: vec4[], planes: vec4[]);
    static fromInvProjectionMatrix(invProj: mat4, worldSize: number, zoom: number): Frustum;
}
declare class Aabb {
    min: vec3;
    max: vec3;
    center: vec3;
    constructor(min_: vec3, max_: vec3);
    quadrant(index: number): Aabb;
    distanceX(point: Array<number>): number;
    distanceY(point: Array<number>): number;
    intersects(frustum: Frustum): number;
}
export { Aabb, Frustum };
