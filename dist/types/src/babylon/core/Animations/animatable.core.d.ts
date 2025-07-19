import { Observable } from "core/Misc/observable";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import { RuntimeAnimation } from "./runtimeAnimation";
import { Animation } from "./animation";
import type { Bone } from "core/Bones/bone";
/**
 * Class used to store an actual running animation
 */
export declare class Animatable {
    /** defines the target object */
    target: any;
    /** [0] defines the starting frame number (default is 0) */
    fromFrame: number;
    /** [100] defines the ending frame number (default is 100) */
    toFrame: number;
    /** [false] defines if the animation must loop (default is false)  */
    loopAnimation: boolean;
    /** defines a callback to call when animation ends if it is not looping */
    onAnimationEnd?: Nullable<() => void>;
    /** defines a callback to call when animation loops */
    onAnimationLoop?: Nullable<() => void>;
    /** [false] defines whether the animation should be evaluated additively */
    isAdditive: boolean;
    /** [0] defines the order in which this animatable should be processed in the list of active animatables (default: 0) */
    playOrder: number;
    private _localDelayOffset;
    private _pausedDelay;
    private _manualJumpDelay;
    /** @hidden */
    _runtimeAnimations: RuntimeAnimation[];
    private _paused;
    private _scene;
    private _speedRatio;
    private _weight;
    private _syncRoot;
    private _frameToSyncFromJump;
    private _goToFrame;
    /**
     * Gets or sets a boolean indicating if the animatable must be disposed and removed at the end of the animation.
     * This will only apply for non looping animation (default is true)
     */
    disposeOnEnd: boolean;
    /**
     * Gets a boolean indicating if the animation has started
     */
    animationStarted: boolean;
    /**
     * Observer raised when the animation ends
     */
    onAnimationEndObservable: Observable<Animatable>;
    /**
     * Observer raised when the animation loops
     */
    onAnimationLoopObservable: Observable<Animatable>;
    /**
     * Gets the root Animatable used to synchronize and normalize animations
     */
    get syncRoot(): Nullable<Animatable>;
    /**
     * Gets the current frame of the first RuntimeAnimation
     * Used to synchronize Animatables
     */
    get masterFrame(): number;
    /**
     * Gets or sets the animatable weight (-1.0 by default meaning not weighted)
     */
    get weight(): number;
    set weight(value: number);
    /**
     * Gets or sets the speed ratio to apply to the animatable (1.0 by default)
     */
    get speedRatio(): number;
    set speedRatio(value: number);
    /**
     * Gets the elapsed time since the animatable started in milliseconds
     */
    get elapsedTime(): number;
    /**
     * Creates a new Animatable
     * @param scene defines the hosting scene
     * @param target defines the target object
     * @param fromFrame defines the starting frame number (default is 0)
     * @param toFrame defines the ending frame number (default is 100)
     * @param loopAnimation defines if the animation must loop (default is false)
     * @param speedRatio defines the factor to apply to animation speed (default is 1)
     * @param onAnimationEnd defines a callback to call when animation ends if it is not looping
     * @param animations defines a group of animation to add to the new Animatable
     * @param onAnimationLoop defines a callback to call when animation loops
     * @param isAdditive defines whether the animation should be evaluated additively
     * @param playOrder defines the order in which this animatable should be processed in the list of active animatables (default: 0)
     */
    constructor(scene: Scene, 
    /** defines the target object */
    target: any, 
    /** [0] defines the starting frame number (default is 0) */
    fromFrame?: number, 
    /** [100] defines the ending frame number (default is 100) */
    toFrame?: number, 
    /** [false] defines if the animation must loop (default is false)  */
    loopAnimation?: boolean, speedRatio?: number, 
    /** defines a callback to call when animation ends if it is not looping */
    onAnimationEnd?: Nullable<() => void>, animations?: Animation[], 
    /** defines a callback to call when animation loops */
    onAnimationLoop?: Nullable<() => void>, 
    /** [false] defines whether the animation should be evaluated additively */
    isAdditive?: boolean, 
    /** [0] defines the order in which this animatable should be processed in the list of active animatables (default: 0) */
    playOrder?: number);
    /**
     * Synchronize and normalize current Animatable with a source Animatable
     * This is useful when using animation weights and when animations are not of the same length
     * @param root defines the root Animatable to synchronize with (null to stop synchronizing)
     * @returns the current Animatable
     */
    syncWith(root: Nullable<Animatable>): Animatable;
    /**
     * Gets the list of runtime animations
     * @returns an array of RuntimeAnimation
     */
    getAnimations(): RuntimeAnimation[];
    /**
     * Adds more animations to the current animatable
     * @param target defines the target of the animations
     * @param animations defines the new animations to add
     */
    appendAnimations(target: any, animations: Animation[]): void;
    /**
     * Gets the source animation for a specific property
     * @param property defines the property to look for
     * @returns null or the source animation for the given property
     */
    getAnimationByTargetProperty(property: string): Nullable<Animation>;
    /**
     * Gets the runtime animation for a specific property
     * @param property defines the property to look for
     * @returns null or the runtime animation for the given property
     */
    getRuntimeAnimationByTargetProperty(property: string): Nullable<RuntimeAnimation>;
    /**
     * Resets the animatable to its original state
     */
    reset(): void;
    /**
     * Allows the animatable to blend with current running animations
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#animation-blending
     * @param blendingSpeed defines the blending speed to use
     */
    enableBlending(blendingSpeed: number): void;
    /**
     * Disable animation blending
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#animation-blending
     */
    disableBlending(): void;
    /**
     * Jump directly to a given frame
     * @param frame defines the frame to jump to
     * @param useWeight defines whether the animation weight should be applied to the image to be jumped to (false by default)
     */
    goToFrame(frame: number, useWeight?: boolean): void;
    /**
     * Returns true if the animations for this animatable are paused
     */
    get paused(): boolean;
    /**
     * Pause the animation
     */
    pause(): void;
    /**
     * Restart the animation
     */
    restart(): void;
    private _raiseOnAnimationEnd;
    /**
     * Stop and delete the current animation
     * @param animationName defines a string used to only stop some of the runtime animations instead of all
     * @param targetMask a function that determines if the animation should be stopped based on its target (all animations will be stopped if both this and animationName are empty)
     * @param useGlobalSplice if true, the animatables will be removed by the caller of this function (false by default)
     * @param skipOnAnimationEnd defines if the system should not raise onAnimationEnd. Default is false
     */
    stop(animationName?: string, targetMask?: (target: any) => boolean, useGlobalSplice?: boolean, skipOnAnimationEnd?: boolean): void;
    /**
     * Wait asynchronously for the animation to end
     * @returns a promise which will be fulfilled when the animation ends
     */
    waitAsync(): Promise<Animatable>;
    /**
     * @internal
     */
    _animate(delay: number): boolean;
}
/** @internal */
export declare function RegisterTargetForLateAnimationBinding(scene: Scene, runtimeAnimation: RuntimeAnimation, originalValue: any): void;
/**
 * Initialize all the inter dependecies between the animations and Scene and Bone
 * @param sceneClass defines the scene prototype to use
 * @param boneClass defines the bone prototype to use
 */
export declare function AddAnimationExtensions(sceneClass: typeof Scene, boneClass: typeof Bone): void;
