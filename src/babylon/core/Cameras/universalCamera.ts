import { TouchCamera } from "./touchCamera";
import { Node } from "../node";
import type { FreeCameraGamepadInput } from "../Cameras/Inputs/freeCameraGamepadInput";
import type { Scene } from "../scene";
import { Vector3 } from "../Maths/math.vector";
import { Camera } from "./camera";

import "../Gamepads/gamepadSceneComponent";

Node.AddNodeConstructor("FreeCamera", (name, scene) => {
    // Forcing to use the Universal camera
    return () => new UniversalCamera(name, Vector3.Zero(), scene);
});

/**
 * The Universal Camera is the one to choose for first person shooter type games, and works with all the keyboard, mouse, touch and gamepads. This replaces the earlier Free Camera,
 * which still works and will still be found in many Playgrounds.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
 */
export class UniversalCamera extends TouchCamera {
    /**
     * Defines the gamepad rotation sensibility.
     * This is the threshold from when rotation starts to be accounted for to prevent jittering.
     */
    public get gamepadAngularSensibility(): number {
        const gamepad = <FreeCameraGamepadInput>this.inputs.attached["gamepad"];
        if (gamepad) {
            return gamepad.gamepadAngularSensibility;
        }

        return 0;
    }

    public set gamepadAngularSensibility(value: number) {
        const gamepad = <FreeCameraGamepadInput>this.inputs.attached["gamepad"];
        if (gamepad) {
            gamepad.gamepadAngularSensibility = value;
        }
    }

    /**
     * Defines the gamepad move sensibility.
     * This is the threshold from when moving starts to be accounted for to prevent jittering.
     */
    public get gamepadMoveSensibility(): number {
        const gamepad = <FreeCameraGamepadInput>this.inputs.attached["gamepad"];
        if (gamepad) {
            return gamepad.gamepadMoveSensibility;
        }

        return 0;
    }

    public set gamepadMoveSensibility(value: number) {
        const gamepad = <FreeCameraGamepadInput>this.inputs.attached["gamepad"];
        if (gamepad) {
            gamepad.gamepadMoveSensibility = value;
        }
    }

    /**
     * The Universal Camera is the one to choose for first person shooter type games, and works with all the keyboard, mouse, touch and gamepads. This replaces the earlier Free Camera,
     * which still works and will still be found in many Playgrounds.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
     * @param name Define the name of the camera in the scene
     * @param position Define the start position of the camera in the scene
     * @param scene Define the scene the camera belongs to
     */
    constructor(name: string, position: Vector3, scene?: Scene) {
        super(name, position, scene);
        this.inputs.addGamepad();
    }

    /**
     * Gets the current object class name.
     * @returns the class name
     */
    public override getClassName(): string {
        return "UniversalCamera";
    }
}

Camera._CreateDefaultParsedCamera = (name: string, scene: Scene) => {
    return new UniversalCamera(name, Vector3.Zero(), scene);
};
