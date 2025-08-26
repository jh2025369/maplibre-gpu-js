import { Subscription } from './util';
import { Serialized } from './web_worker_transfer';
import { ThrottledInvoker } from './throttled_invoker';
import { MessageType, type ActorMessage, type RequestResponseMessageMap } from './actor_messages';
/**
 * An interface to be sent to the actor in order for it to allow communication between the worker and the main thread
 */
export interface ActorTarget {
    addEventListener: typeof window.addEventListener;
    removeEventListener: typeof window.removeEventListener;
    postMessage: typeof window.postMessage;
    terminate?: () => void;
}
/**
 * This is used to define the parameters of the message that is sent to the worker and back
 */
type MessageData = {
    id: string;
    type: MessageType | '<cancel>' | '<response>';
    origin: string;
    data?: Serialized;
    targetMapId?: string | number | null;
    mustQueue?: boolean;
    error?: Serialized | null;
    sourceMapId: string | number | null;
};
type ResolveReject = {
    resolve: (value?: RequestResponseMessageMap[MessageType][1]) => void;
    reject: (reason?: Error) => void;
};
/**
 * This interface allowing to substitute only the sendAsync method of the Actor class.
 */
export interface IActor {
    sendAsync<T extends MessageType>(message: ActorMessage<T>, abortController?: AbortController): Promise<RequestResponseMessageMap[T][1]>;
}
export type MessageHandler<T extends MessageType> = (mapId: string | number, params: RequestResponseMessageMap[T][0], abortController?: AbortController) => Promise<RequestResponseMessageMap[T][1]>;
/**
 * An implementation of the [Actor design pattern](http://en.wikipedia.org/wiki/Actor_model)
 * that maintains the relationship between asynchronous tasks and the objects
 * that spin them off - in this case, tasks like parsing parts of styles,
 * owned by the styles
 */
export declare class Actor implements IActor {
    target: ActorTarget;
    mapId: string | number | null;
    resolveRejects: {
        [x: string]: ResolveReject;
    };
    name: string;
    tasks: {
        [x: string]: MessageData;
    };
    taskQueue: Array<string>;
    abortControllers: {
        [x: number | string]: AbortController;
    };
    invoker: ThrottledInvoker;
    globalScope: ActorTarget;
    messageHandlers: {
        [x in MessageType]?: MessageHandler<MessageType>;
    };
    subscription: Subscription;
    /**
     * @param target - The target
     * @param mapId - A unique identifier for the Map instance using this Actor.
     */
    constructor(target: ActorTarget, mapId?: string | number);
    registerMessageHandler<T extends MessageType>(type: T, handler: MessageHandler<T>): void;
    /**
     * Sends a message from a main-thread map to a Worker or from a Worker back to
     * a main-thread map instance.
     * @param message - the message to send
     * @param abortController - an optional AbortController to abort the request
     * @returns a promise that will be resolved with the response data
     */
    sendAsync<T extends MessageType>(message: ActorMessage<T>, abortController?: AbortController): Promise<RequestResponseMessageMap[T][1]>;
    receive(message: {
        data: MessageData;
    }): void;
    process(): void;
    processTask(id: string, task: MessageData): Promise<void>;
    completeTask(id: string, err: Error, data?: RequestResponseMessageMap[MessageType][1]): void;
    remove(): void;
}
export {};
