/**
 * Some browsers don't return the exact pixels from a canvas to prevent user fingerprinting (see #3185).
 * This function writes pixels to an OffscreenCanvas and reads them back using getImageData, returning false
 * if they don't match.
 *
 * @returns true if the browser supports OffscreenCanvas but it distorts getImageData results, false otherwise.
 */
export declare function isOffscreenCanvasDistorted(): boolean;
