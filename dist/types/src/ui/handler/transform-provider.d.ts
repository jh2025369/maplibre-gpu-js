import type { Map } from '../map';
import type { PointLike } from '../camera';
import type { Transform } from '../../geo/transform';
import { LngLat } from '../../geo/lng_lat';
/**
 * @internal
 * Shared utilities for the Handler classes to access the correct camera state.
 * If Camera.transformCameraUpdate is specified, the "desired state" of camera may differ from the state used for rendering.
 * The handlers need the "desired state" to track accumulated changes.
 */
export declare class TransformProvider {
    _map: Map;
    constructor(map: Map);
    get transform(): Transform;
    get center(): {
        lng: number;
        lat: number;
    };
    get zoom(): number;
    get pitch(): number;
    get bearing(): number;
    unproject(point: PointLike): LngLat;
}
