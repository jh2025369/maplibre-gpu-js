import { Vector3 } from "../Maths/math.vector";
import type { Effect } from "core/Materials/effect";
import type { Scene } from "core/scene";
import { AreaLight } from "./areaLight";
/**
 * A rectangular area light defined by an unique point in world space, a width and a height.
 * The light is emitted from the rectangular area in the -Z direction.
 */
export declare class RectAreaLight extends AreaLight {
    private readonly _width;
    private readonly _height;
    protected readonly _pointTransformedPosition: Vector3;
    protected readonly _pointTransformedWidth: Vector3;
    protected readonly _pointTransformedHeight: Vector3;
    /**
     * Rect Area Light width.
     */
    get width(): number;
    /**
     * Rect Area Light width.
     */
    set width(value: number);
    /**
     * Rect Area Light height.
     */
    get height(): number;
    /**
     * Rect Area Light height.
     */
    set height(value: number);
    /**
     * Creates a rectangular area light object.
     * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
     * @param name The friendly name of the light
     * @param position The position of the area light.
     * @param width The width of the area light.
     * @param height The height of the area light.
     * @param scene The scene the light belongs to
     */
    constructor(name: string, position: Vector3, width: number, height: number, scene?: Scene);
    /**
     * Returns the string "RectAreaLight"
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Returns the integer 4.
     * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
     */
    getTypeID(): number;
    protected _buildUniformLayout(): void;
    protected _computeTransformedInformation(): boolean;
    /**
     * Sets the passed Effect "effect" with the PointLight transformed position (or position, if none) and passed name (string).
     * @param effect The effect to update
     * @param lightIndex The index of the light in the effect to update
     * @returns The point light
     */
    transferToEffect(effect: Effect, lightIndex: string): RectAreaLight;
    transferToNodeMaterialEffect(effect: Effect, lightDataUniformName: string): this;
}
