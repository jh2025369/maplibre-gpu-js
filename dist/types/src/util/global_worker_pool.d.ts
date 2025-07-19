/**
 * Creates (if necessary) and returns the single, global WorkerPool instance
 * to be shared across each Map
 */
export declare function getGlobalWorkerPool(): any;
/**
 * Initializes resources like WebWorkers that can be shared across maps to lower load
 * times in some situations. `setWorkerUrl()` and `setWorkerCount()`, if being
 * used, must be set before `prewarm()` is called to have an effect.
 *
 * By default, the lifecycle of these resources is managed automatically, and they are
 * lazily initialized when a Map is first created. By invoking `prewarm()`, these
 * resources will be created ahead of time, and will not be cleared when the last Map
 * is removed from the page. This allows them to be re-used by new Map instances that
 * are created later. They can be manually cleared by calling
 * `clearPrewarmedResources()`. This is only necessary if your web page remains
 * active but stops using maps altogether.
 *
 * This is primarily useful when using GL-JS maps in a single page app, wherein a user
 * would navigate between various views that can cause Map instances to constantly be
 * created and destroyed.
 *
 * @example
 * ```ts
 * prewarm()
 * ```
 */
export declare function prewarm(): void;
/**
 * Clears up resources that have previously been created by `prewarm()`.
 * Note that this is typically not necessary. You should only call this function
 * if you expect the user of your app to not return to a Map view at any point
 * in your application.
 *
 * @example
 * ```ts
 * clearPrewarmedResources()
 * ```
 */
export declare function clearPrewarmedResources(): void;
