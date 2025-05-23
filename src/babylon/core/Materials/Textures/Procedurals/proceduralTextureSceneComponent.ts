import { Tools } from "../../../Misc/tools";
import type { Scene } from "../../../scene";
import type { ISceneComponent } from "../../../sceneComponent";
import { SceneComponentConstants } from "../../../sceneComponent";

/**
 * Defines the Procedural Texture scene component responsible to manage any Procedural Texture
 * in a given scene.
 */
export class ProceduralTextureSceneComponent implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    public readonly name = SceneComponentConstants.NAME_PROCEDURALTEXTURE;

    /**
     * The scene the component belongs to.
     */
    public scene: Scene;

    /**
     * Creates a new instance of the component for the given scene
     * @param scene Defines the scene to register the component in
     */
    constructor(scene: Scene) {
        this.scene = scene;
    }

    /**
     * Registers the component in a given scene
     */
    public register(): void {
        this.scene._beforeClearStage.registerStep(SceneComponentConstants.STEP_BEFORECLEAR_PROCEDURALTEXTURE, this, this._beforeClear);
    }

    /**
     * Rebuilds the elements related to this component in case of
     * context lost for instance.
     */
    public rebuild(): void {
        // Nothing to do here.
    }

    /**
     * Disposes the component and the associated resources.
     */
    public dispose(): void {
        // Nothing to do here.
    }

    private _beforeClear(): void {
        if (this.scene.proceduralTexturesEnabled) {
            Tools.StartPerformanceCounter("Procedural textures", this.scene.proceduralTextures.length > 0);
            for (let proceduralIndex = 0; proceduralIndex < this.scene.proceduralTextures.length; proceduralIndex++) {
                const proceduralTexture = this.scene.proceduralTextures[proceduralIndex];
                if (proceduralTexture._shouldRender()) {
                    proceduralTexture.render();
                }
            }
            Tools.EndPerformanceCounter("Procedural textures", this.scene.proceduralTextures.length > 0);
        }
    }
}
