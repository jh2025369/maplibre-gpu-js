import type { Nullable } from "core/types";
import type { AnimationGroup } from "core/Animations/animationGroup";
import type { TransformNode } from "core/Meshes/transformNode";
import type { IScene, INode, IAnimation } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
import "core/Audio/audioSceneComponent";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the MSFT_audio_emitter extension.
         */
        ["MSFT_audio_emitter"]: {};
    }
}
/**
 * [Specification](https://github.com/najadojo/glTF/blob/MSFT_audio_emitter/extensions/2.0/Vendor/MSFT_audio_emitter/README.md)
 * !!! Experimental Extension Subject to Changes !!!
 */
export declare class MSFT_audio_emitter implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "MSFT_audio_emitter";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    private _clips;
    private _emitters;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    onLoading(): void;
    /**
     * @internal
     */
    loadSceneAsync(context: string, scene: IScene): Nullable<Promise<void>>;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    /**
     * @internal
     */
    loadAnimationAsync(context: string, animation: IAnimation): Nullable<Promise<AnimationGroup>>;
    private _loadClipAsync;
    private _loadEmitterAsync;
    private _getEventAction;
    private _loadAnimationEventAsync;
}
