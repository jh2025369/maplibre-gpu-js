/**
 * A listener method used as a callback to events
 */
export type Listener = (a: any) => any;
type Listeners = {
    [_: string]: Array<Listener>;
};
/**
 * The event class
 */
export declare class Event {
    readonly type: string;
    constructor(type: string, data?: any);
}
interface ErrorLike {
    message: string;
}
/**
 * An error event
 */
export declare class ErrorEvent extends Event {
    error: ErrorLike;
    constructor(error: ErrorLike, data?: any);
}
/**
 * Methods mixed in to other classes for event capabilities.
 *
 * @group Event Related
 */
export declare class Evented {
    _listeners: Listeners;
    _oneTimeListeners: Listeners;
    _eventedParent: Evented;
    _eventedParentData: any | (() => any);
    /**
     * Adds a listener to a specified event type.
     *
     * @param type - The event type to add a listen for.
     * @param listener - The function to be called when the event is fired.
     * The listener function is called with the data object passed to `fire`,
     * extended with `target` and `type` properties.
     * @returns `this`
     */
    on(type: string, listener: Listener): this;
    /**
     * Removes a previously registered event listener.
     *
     * @param type - The event type to remove listeners for.
     * @param listener - The listener function to remove.
     * @returns `this`
     */
    off(type: string, listener: Listener): this;
    /**
     * Adds a listener that will be called only once to a specified event type.
     *
     * The listener will be called first time the event fires after the listener is registered.
     *
     * @param type - The event type to listen for.
     * @param listener - The function to be called when the event is fired the first time.
     * @returns `this` or a promise if a listener is not provided
     */
    once(type: string, listener?: Listener): this | Promise<any>;
    fire(event: Event | string, properties?: any): this;
    /**
     * Returns a true if this instance of Evented or any forwardeed instances of Evented have a listener for the specified type.
     *
     * @param type - The event type
     * @returns `true` if there is at least one registered listener for specified event type, `false` otherwise
     */
    listens(type: string): boolean;
    /**
     * Bubble all events fired by this instance of Evented to this parent instance of Evented.
     * @returns `this`
     */
    setEventedParent(parent?: Evented | null, data?: any | (() => any)): this;
}
export {};
