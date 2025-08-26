import type { Nullable } from "core/types";
import type { Particle } from "../particle";
import type { ThinParticleSystem } from "../thinParticleSystem";
/** @internal */
export interface _IExecutionQueueItem {
    /** @internal */
    process: (particle: Particle, system: ThinParticleSystem) => void;
    /** @internal */
    previousItem: Nullable<_IExecutionQueueItem>;
    /** @internal */
    nextItem: Nullable<_IExecutionQueueItem>;
}
/** @internal */
export declare function _ConnectBefore(newOne: _IExecutionQueueItem, activeOne: _IExecutionQueueItem): void;
/** @internal */
export declare function _ConnectAfter(newOne: _IExecutionQueueItem, activeOne: _IExecutionQueueItem): void;
/** @internal */
export declare function _ConnectAtTheEnd(newOne: _IExecutionQueueItem, root: _IExecutionQueueItem): void;
/** @internal */
export declare function _RemoveFromQueue(item: _IExecutionQueueItem): void;
