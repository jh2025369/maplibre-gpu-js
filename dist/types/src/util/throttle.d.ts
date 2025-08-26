/**
 * Throttle the given function to run at most every `period` milliseconds.
 */
export declare function throttle<T extends (...args: any) => void>(fn: T, time: number): (...args: Parameters<T>) => ReturnType<typeof setTimeout>;
