/**
 * Invokes the wrapped function in a non-blocking way when trigger() is called.
 * Invocation requests are ignored until the function was actually invoked.
 */
export declare class ThrottledInvoker {
    _channel: MessageChannel;
    _triggered: boolean;
    _methodToThrottle: Function;
    constructor(methodToThrottle: Function);
    trigger(): void;
    remove(): void;
}
