import type { Nullable } from "../../../types";
import type { Scene } from "../../../scene";
import { EngineStore } from "../../../Engines/engineStore";
import type { Texture } from "../../../Materials/Textures/texture";
import { ProceduralTexture } from "./proceduralTexture";
import { RegisterClass } from "../../../Misc/typeStore";

import "../../../Shaders/noise.fragment";

/**
 * Class used to generate noise procedural textures
 */
export class NoiseProceduralTexture extends ProceduralTexture {
    /** Gets or sets the start time (default is 0) */
    public time: number = 0.0;

    /** Gets or sets a value between 0 and 1 indicating the overall brightness of the texture (default is 0.2) */
    public brightness = 0.2;

    /** Defines the number of octaves to process */
    public octaves = 3;

    /** Defines the level of persistence (0.8 by default) */
    public persistence = 0.8;

    /** Gets or sets animation speed factor (default is 1) */
    public animationSpeedFactor = 1;

    /**
     * Creates a new NoiseProceduralTexture
     * @param name defines the name fo the texture
     * @param size defines the size of the texture (default is 256)
     * @param scene defines the hosting scene
     * @param fallbackTexture defines the texture to use if the NoiseProceduralTexture can't be created
     * @param generateMipMaps defines if mipmaps must be generated (true by default)
     */
    constructor(name: string, size: number = 256, scene: Nullable<Scene> = EngineStore.LastCreatedScene, fallbackTexture?: Texture, generateMipMaps?: boolean) {
        super(name, size, "noise", scene, fallbackTexture, generateMipMaps);
        this.autoClear = false;
        this._updateShaderUniforms();
    }

    private _updateShaderUniforms() {
        const scene = this.getScene();

        if (!scene) {
            return;
        }

        this.time += scene.getAnimationRatio() * this.animationSpeedFactor * 0.01;

        this.setFloat("brightness", this.brightness);
        this.setFloat("persistence", this.persistence);
        this.setFloat("timeScale", this.time);
    }

    protected override _getDefines(): string {
        return "#define OCTAVES " + (this.octaves | 0);
    }

    /**
     * Generate the current state of the procedural texture
     * @param useCameraPostProcess Define if camera post process should be applied to the texture
     */
    public override render(useCameraPostProcess?: boolean) {
        this._updateShaderUniforms();
        super.render(useCameraPostProcess);
    }

    /**
     * Serializes this noise procedural texture
     * @returns a serialized noise procedural texture object
     */
    public override serialize(): any {
        const serializationObject: any = {};
        serializationObject.customType = "BABYLON.NoiseProceduralTexture";

        serializationObject.brightness = this.brightness;
        serializationObject.octaves = this.octaves;
        serializationObject.persistence = this.persistence;
        serializationObject.animationSpeedFactor = this.animationSpeedFactor;
        serializationObject.size = this.getSize().width;
        serializationObject.generateMipMaps = this._generateMipMaps;
        serializationObject.time = this.time;

        return serializationObject;
    }

    /**
     * Clone the texture.
     * @returns the cloned texture
     */
    public override clone(): NoiseProceduralTexture {
        const textureSize = this.getSize();
        const newTexture = new NoiseProceduralTexture(
            this.name,
            textureSize.width,
            this.getScene(),
            this._fallbackTexture ? this._fallbackTexture : undefined,
            this._generateMipMaps
        );

        // Base texture
        newTexture.hasAlpha = this.hasAlpha;
        newTexture.level = this.level;

        // RenderTarget Texture
        newTexture.coordinatesMode = this.coordinatesMode;

        // Noise Specifics
        newTexture.brightness = this.brightness;
        newTexture.octaves = this.octaves;
        newTexture.persistence = this.persistence;
        newTexture.animationSpeedFactor = this.animationSpeedFactor;
        newTexture.time = this.time;

        return newTexture;
    }

    /**
     * Creates a NoiseProceduralTexture from parsed noise procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @returns a parsed NoiseProceduralTexture
     */
    public static override Parse(parsedTexture: any, scene: Scene): NoiseProceduralTexture {
        const texture = new NoiseProceduralTexture(parsedTexture.name, parsedTexture.size, scene, undefined, parsedTexture.generateMipMaps);

        texture.brightness = parsedTexture.brightness;
        texture.octaves = parsedTexture.octaves;
        texture.persistence = parsedTexture.persistence;
        texture.animationSpeedFactor = parsedTexture.animationSpeedFactor;
        texture.time = parsedTexture.time ?? 0;

        return texture;
    }
}

RegisterClass("BABYLON.NoiseProceduralTexture", NoiseProceduralTexture);
