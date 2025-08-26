import { Actor, MessageHandler } from './actor';
import type { WorkerPool } from './worker_pool';
import type { RequestResponseMessageMap } from './actor_messages';
import { MessageType } from './actor_messages';
/**
 * Responsible for sending messages from a {@link Source} to an associated
 * {@link WorkerSource}.
 */
export declare class Dispatcher {
    workerPool: WorkerPool;
    actors: Array<Actor>;
    currentActor: number;
    id: string | number;
    constructor(workerPool: WorkerPool, mapId: string | number);
    /**
     * Broadcast a message to all Workers.
     */
    broadcast<T extends MessageType>(type: T, data: RequestResponseMessageMap[T][0]): Promise<RequestResponseMessageMap[T][1][]>;
    /**
     * Acquires an actor to dispatch messages to. The actors are distributed in round-robin fashion.
     * @returns An actor object backed by a web worker for processing messages.
     */
    getActor(): Actor;
    remove(mapRemoved?: boolean): void;
    registerMessageHandler<T extends MessageType>(type: T, handler: MessageHandler<T>): void;
}
export declare function getGlobalDispatcher(): Dispatcher;
