/** */
export declare const browser: {
    /**
     * Provides a function that outputs milliseconds: either performance.now()
     * or a fallback to Date.now()
     */
    now: any;
    frameAsync(abortController: AbortController): Promise<number>;
    getImageData(img: HTMLImageElement | ImageBitmap, padding?: number): ImageData;
    getImageCanvasContext(img: HTMLImageElement | ImageBitmap): CanvasRenderingContext2D;
    resolveURL(path: string): any;
    hardwareConcurrency: number;
    readonly prefersReducedMotion: boolean;
};
