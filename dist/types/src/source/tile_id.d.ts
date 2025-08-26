import Point from '@mapbox/point-geometry';
import { MercatorCoordinate } from '../geo/mercator_coordinate';
import { mat4 } from 'gl-matrix';
import { ICanonicalTileID, IMercatorCoordinate } from '@maplibre/maplibre-gl-style-spec';
/**
 * A canonical way to define a tile ID
 */
export declare class CanonicalTileID implements ICanonicalTileID {
    z: number;
    x: number;
    y: number;
    key: string;
    constructor(z: number, x: number, y: number);
    equals(id: ICanonicalTileID): boolean;
    url(urls: Array<string>, pixelRatio: number, scheme?: string | null): string;
    isChildOf(parent: ICanonicalTileID): boolean;
    getTilePoint(coord: IMercatorCoordinate): Point;
    toString(): string;
}
/**
 * @internal
 * An unwrapped tile identifier
 */
export declare class UnwrappedTileID {
    wrap: number;
    canonical: CanonicalTileID;
    key: string;
    constructor(wrap: number, canonical: CanonicalTileID);
}
/**
 * An overscaled tile identifier
 */
export declare class OverscaledTileID {
    overscaledZ: number;
    wrap: number;
    canonical: CanonicalTileID;
    key: string;
    posMatrix: mat4;
    constructor(overscaledZ: number, wrap: number, z: number, x: number, y: number);
    clone(): OverscaledTileID;
    equals(id: OverscaledTileID): boolean;
    scaledTo(targetZ: number): OverscaledTileID;
    calculateScaledKey(targetZ: number, withWrap: boolean): string;
    isChildOf(parent: OverscaledTileID): boolean;
    children(sourceMaxZoom: number): OverscaledTileID[];
    isLessThan(rhs: OverscaledTileID): boolean;
    wrapped(): OverscaledTileID;
    unwrapTo(wrap: number): OverscaledTileID;
    overscaleFactor(): number;
    toUnwrapped(): UnwrappedTileID;
    toString(): string;
    getTilePoint(coord: MercatorCoordinate): Point;
}
