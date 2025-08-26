import type { Scene } from "core/scene";
/**
 * Interface used to define the optimization options for animations
 */
export type AnimationOptimization = {
    /**
     * Do not merge runtime animations
     * @defaultValue true
     */
    mergeRuntimeAnimations: false;
} | {
    /**
     * All runtime animations will be merged into the first animatable
     * @defaultValue true
     */
    mergeRuntimeAnimations: true;
    /**
     * If true, all keyframes evaluation will be merged from the first runtime animation
     * You need to turn on `mergeRuntimeAnimations` for this to work
     * @defaultValue false
     */
    mergeKeyFrames: boolean;
};
/**
 * This is a destructive optimization that merges all animatables into the first one.
 * That animatable will also host all the runtime animations.
 * We expect that all the animatables are on the same timeframe (same start, end, loop, etc..)
 * @param scene defines the scene to optimize
 * @param options defines the optimization options
 */
export declare function OptimizeAnimations(scene: Scene, options?: Partial<AnimationOptimization>): void;
