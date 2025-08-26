import type { WorkerGlobalScopeInterface } from '../../../src/util/web_worker';
import type { ActorTarget } from '../../../src/util/actor';
export declare class MessageBus implements WorkerGlobalScopeInterface, ActorTarget {
    addListeners: Array<EventListener>;
    postListeners: Array<EventListener>;
    target: MessageBus;
    registerWorkerSource: any;
    registerRTLTextPlugin: any;
    addProtocol: any;
    removeProtocol: any;
    worker: any;
    constructor(addListeners: Array<EventListener>, postListeners: Array<EventListener>);
    addEventListener(event: 'message', callback: EventListener): void;
    removeEventListener(event: 'message', callback: EventListener): void;
    postMessage(data: any): void;
    terminate(): void;
    importScripts(): void;
}
export declare function setGlobalWorker(MockWorker: {
    new (...args: any): any;
}): void;
