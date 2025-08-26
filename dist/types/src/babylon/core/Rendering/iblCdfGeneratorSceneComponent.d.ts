import type { Nullable } from "../types";
import { Scene } from "../scene";
import type { ISceneComponent } from "../sceneComponent";
import { IblCdfGenerator } from "./iblCdfGenerator";
declare module "../scene" {
    interface Scene {
        /** @internal (Backing field) */
        _iblCdfGenerator: Nullable<IblCdfGenerator>;
        /**
         * Gets or Sets the current CDF generator associated to the scene.
         * The CDF (cumulative distribution function) generator creates CDF maps
         * for a given IBL texture that can then be used for more efficient
         * importance sampling.
         */
        iblCdfGenerator: Nullable<IblCdfGenerator>;
        /**
         * Enables a IblCdfGenerator and associates it with the scene.
         * @returns the IblCdfGenerator
         */
        enableIblCdfGenerator(): Nullable<IblCdfGenerator>;
        /**
         * Disables the GeometryBufferRender associated with the scene
         */
        disableIblCdfGenerator(): void;
    }
}
/**
 * Defines the IBL CDF Generator scene component responsible for generating CDF maps for a given IBL.
 */
export declare class IblCdfGeneratorSceneComponent implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "iblCDFGenerator";
    /**
     * The scene the component belongs to.
     */
    scene: Scene;
    /**
     * Creates a new instance of the component for the given scene
     * @param scene Defines the scene to register the component in
     */
    constructor(scene: Scene);
    /**
     * Registers the component in a given scene
     */
    register(): void;
    /**
     * Rebuilds the elements related to this component in case of
     * context lost for instance.
     */
    rebuild(): void;
    /**
     * Disposes the component and the associated resources
     */
    dispose(): void;
    private _updateIblSource;
    private _newIblObserver;
}
