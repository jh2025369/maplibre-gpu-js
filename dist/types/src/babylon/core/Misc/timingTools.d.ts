/**
 * Class used to provide helper for timing
 */
export declare class TimingTools {
    /**
     * Execute a function after the current execution block
     * @param action defines the action to execute after the current execution block
     */
    static SetImmediate(action: () => void): void;
}
/**
 * @internal
 */
export declare const _RetryWithInterval: (condition: () => boolean, onSuccess: () => void, onError?: (e?: any, isTimeout?: boolean) => void, step?: number, maxTimeout?: number, checkConditionOnCall?: boolean, additionalStringOnTimeout?: string) => () => void;
