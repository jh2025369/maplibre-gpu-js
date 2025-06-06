/**
 * Registers the async plugin factories for all built-in loaders.
 * Loaders will be dynamically imported on demand, only when a SceneLoader load operation needs each respective loader.
 */
export declare function registerBuiltInLoaders(): void;
