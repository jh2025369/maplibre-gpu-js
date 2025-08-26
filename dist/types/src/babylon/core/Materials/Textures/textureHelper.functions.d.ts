/**
 * Checks if a given format is a depth texture format
 * @param format Format to check
 * @returns True if the format is a depth texture format
 */
export declare function IsDepthTexture(format: number): boolean;
/**
 * Gets the type of a depth texture for a given format
 * @param format Format of the texture
 * @returns The type of the depth texture
 */
export declare function GetTypeForDepthTexture(format: number): number;
/**
 * Checks if a given format has a stencil aspect
 * @param format Format to check
 * @returns True if the format has a stencil aspect
 */
export declare function HasStencilAspect(format: number): boolean;
