import type { IEasingFunction } from "./easing";

/**
 * Defines an interface which represents an animation key frame
 */
export interface IAnimationKey {
    /**
     * Frame of the key frame
     */
    frame: number;
    /**
     * Value at the specifies key frame
     */
    value: any;
    /**
     * The input tangent for the cubic hermite spline
     */
    inTangent?: any;
    /**
     * The output tangent for the cubic hermite spline
     */
    outTangent?: any;
    /**
     * The animation interpolation type
     */
    interpolation?: AnimationKeyInterpolation;
    /**
     * Property defined by UI tools to link (or not ) the tangents
     */
    lockedTangent?: boolean;
    /**
     * The easing function associated with the key frame (optional). If not defined, the easing function defined at the animation level (if any) will be used instead
     */
    easingFunction?: IEasingFunction;
}

/**
 * Enum for the animation key frame interpolation type
 */
export const enum AnimationKeyInterpolation {
    /**
     * Use tangents to interpolate between start and end values.
     */
    NONE = 0,
    /**
     * Do not interpolate between keys and use the start key value only. Tangents are ignored
     */
    STEP = 1,
}
