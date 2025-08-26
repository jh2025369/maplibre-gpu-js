/**
 * Interface used to present a loading screen while loading a scene
 * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/customLoadingScreen
 */
export interface ILoadingScreen {
    /**
     * Function called to display the loading screen
     */
    displayLoadingUI: () => void;
    /**
     * Function called to hide the loading screen
     */
    hideLoadingUI: () => void;
    /**
     * Gets or sets the color to use for the background
     */
    loadingUIBackgroundColor: string;
    /**
     * Gets or sets the text to display while loading
     */
    loadingUIText: string;
}
/**
 * Class used for the default loading screen
 * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/customLoadingScreen
 */
export declare class DefaultLoadingScreen implements ILoadingScreen {
    private _renderingCanvas;
    private _loadingText;
    private _loadingDivBackgroundColor;
    private _engine;
    private _resizeObserver;
    private _isLoading;
    /**
     * Maps a loading `HTMLDivElement` to a tuple containing the associated `HTMLCanvasElement`
     * and its `DOMRect` (or `null` if not yet available).
     */
    private _loadingDivToRenderingCanvasMap;
    private _loadingTextDiv;
    private _style;
    /** Gets or sets the logo url to use for the default loading screen */
    static DefaultLogoUrl: string;
    /** Gets or sets the spinner url to use for the default loading screen */
    static DefaultSpinnerUrl: string;
    /**
     * Creates a new default loading screen
     * @param _renderingCanvas defines the canvas used to render the scene
     * @param _loadingText defines the default text to display
     * @param _loadingDivBackgroundColor defines the default background color
     */
    constructor(_renderingCanvas: HTMLCanvasElement, _loadingText?: string, _loadingDivBackgroundColor?: string);
    /**
     * Function called to display the loading screen
     */
    displayLoadingUI(): void;
    /**
     * Function called to hide the loading screen
     */
    hideLoadingUI(): void;
    /**
     * Gets or sets the text to display while loading
     */
    set loadingUIText(text: string);
    get loadingUIText(): string;
    /**
     * Gets or sets the color to use for the background
     */
    get loadingUIBackgroundColor(): string;
    set loadingUIBackgroundColor(color: string);
    /**
     * Checks if the layout of the canvas has changed by comparing the current layout
     * rectangle with the previous one.
     *
     * This function compares of the two `DOMRect` objects to determine if any of the layout dimensions have changed.
     * If the layout has changed or if there is no previous layout (i.e., `previousCanvasRect` is `null`),
     * it returns `true`. Otherwise, it returns `false`.
     *
     * @param previousCanvasRect defines the previously recorded `DOMRect` of the canvas, or `null` if no previous state exists.
     * @param currentCanvasRect defines the current `DOMRect` of the canvas to compare against the previous layout.
     * @returns `true` if the layout has changed, otherwise `false`.
     */
    private _isCanvasLayoutChanged;
    private _resizeLoadingUI;
}
