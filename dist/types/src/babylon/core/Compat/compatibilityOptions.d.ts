/**
 * Defines if the system should use OpenGL convention for UVs when creating geometry or loading .babylon files (false by default)
 */
export declare let useOpenGLOrientationForUV: boolean;
/**
 * Sets whether to use OpenGL convention for UVs
 * @param value the new value
 */
export declare function setOpenGLOrientationForUV(value: boolean): void;
/**
 * Options used to control default behaviors regarding compatibility support
 * @deprecated please use named exports
 */
export declare const CompatibilityOptions: {
    UseOpenGLOrientationForUV: boolean;
};
