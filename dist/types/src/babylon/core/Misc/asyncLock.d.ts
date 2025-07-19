/**
 * Provides a simple way of creating the rough equivalent of an async critical section.
 *
 * @example
 * ```typescript
 * const myLock = new AsyncLock();
 *
 * private async MyFuncAsync(): Promise<void> {
 *   await myLock.lockAsync(async () => {
 *     await operation1Async();
 *     await operation2Async();
 *   });
 * }
 * ```
 */
export declare class AsyncLock {
    private _currentOperation;
    /**
     * Executes the provided function when the lock is acquired (e.g. when the previous operation finishes).
     * @param func The function to execute.
     * @param signal An optional signal that can be used to abort the operation.
     * @returns A promise that resolves when the func finishes executing.
     */
    lockAsync<T>(func: () => T | Promise<T>, signal?: AbortSignal): Promise<T>;
    /**
     * Executes the provided function when all the specified locks are acquired.
     * @param func The function to execute.
     * @param locks The locks to acquire.
     * @param signal An optional signal that can be used to abort the operation.
     * @returns A promise that resolves when the func finishes executing.
     */
    static LockAsync<T>(func: () => T | Promise<T>, locks: AsyncLock[], signal?: AbortSignal): Promise<T>;
}
