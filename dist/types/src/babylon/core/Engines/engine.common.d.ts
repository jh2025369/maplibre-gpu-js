import type { Nullable } from "../types";
import { AbstractEngine } from "./abstractEngine";
import type { AbstractEngineOptions } from "./abstractEngine";
/** @internal */
export declare function _CommonInit(commonEngine: AbstractEngine, canvas: HTMLCanvasElement, creationOptions: AbstractEngineOptions): void;
/** @internal */
export declare function _CommonDispose(commonEngine: AbstractEngine, canvas: Nullable<HTMLCanvasElement>): void;
/**
 * Get Font size information
 * @param font font name
 * @returns an object containing ascent, height and descent
 */
export declare function GetFontOffset(font: string): {
    ascent: number;
    height: number;
    descent: number;
};
/** @internal */
export declare function CreateImageBitmapFromSource(engine: AbstractEngine, imageSource: string, options?: ImageBitmapOptions): Promise<ImageBitmap>;
/** @internal */
export declare function ResizeImageBitmap(engine: AbstractEngine, image: HTMLImageElement | ImageBitmap, bufferWidth: number, bufferHeight: number): Uint8Array;
/**
 * Ask the browser to promote the current element to fullscreen rendering mode
 * @param element defines the DOM element to promote
 */
export declare function RequestFullscreen(element: HTMLElement): void;
/**
 * Asks the browser to exit fullscreen mode
 */
export declare function ExitFullscreen(): void;
/**
 * Ask the browser to promote the current element to pointerlock mode
 * @param element defines the DOM element to promote
 */
export declare function RequestPointerlock(element: HTMLElement): void;
/**
 * Asks the browser to exit pointerlock mode
 */
export declare function ExitPointerlock(): void;
