import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { GLTFLoader } from "../glTFLoader";
import type { Nullable } from "core/types";
import type { Animation } from "core/Animations/animation";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { IAnimation, IAnimationChannel } from "../glTFLoaderInterfaces";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_animation_pointer extension.
         */
        ["KHR_animation_pointer"]: {};
    }
}
/**
 * [Specification PR](https://github.com/KhronosGroup/glTF/pull/2147)
 * !!! Experimental Extension Subject to Changes !!!
 */
export declare class KHR_animation_pointer implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "KHR_animation_pointer";
    private _loader;
    private _pathToObjectConverter?;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /**
     * Defines whether this extension is enabled.
     */
    get enabled(): boolean;
    /** @internal */
    dispose(): void;
    /**
     * Loads a glTF animation channel.
     * @param context The context when loading the asset
     * @param animationContext The context of the animation when loading the asset
     * @param animation The glTF animation property
     * @param channel The glTF animation channel property
     * @param onLoad Called for each animation loaded
     * @returns A void promise that resolves when the load is complete or null if not handled
     */
    _loadAnimationChannelAsync(context: string, animationContext: string, animation: IAnimation, channel: IAnimationChannel, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Nullable<Promise<void>>;
}
