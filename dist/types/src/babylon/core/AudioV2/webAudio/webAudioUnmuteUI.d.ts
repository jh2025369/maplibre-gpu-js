import type { _WebAudioEngine } from "./webAudioEngine";
/**
 * Adds a UI button that starts the audio engine's underlying audio context when the user presses it.
 * @internal
 */
export declare class _WebAudioUnmuteUI {
    private _button;
    private _engine;
    private _style;
    /** @internal */
    constructor(engine: _WebAudioEngine, parentElement?: HTMLElement);
    /** @internal */
    dispose(): void;
    private _onStateChanged;
}
