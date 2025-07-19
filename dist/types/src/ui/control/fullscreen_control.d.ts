import { Evented } from '../../util/evented';
import type { Map } from '../map';
import type { IControl } from './control';
/**
 * The {@link FullscreenControl} options object
 */
type FullscreenControlOptions = {
    /**
     * `container` is the [compatible DOM element](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen#Compatible_elements) which should be made full screen. By default, the map container element will be made full screen.
     */
    container?: HTMLElement;
};
/**
 * A `FullscreenControl` control contains a button for toggling the map in and out of fullscreen mode.
 * When [requestFullscreen](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen) is not supported, fullscreen is handled via CSS properties.
 * The map's `cooperativeGestures` option is temporarily disabled while the map
 * is in fullscreen mode, and is restored when the map exist fullscreen mode.
 *
 * @group Markers and Controls
 * @param options - the full screen control options
 *
 * @example
 * ```ts
 * map.addControl(new FullscreenControl({container: document.querySelector('body')}));
 * ```
 * @see [View a fullscreen map](https://maplibre.org/maplibre-gl-js/docs/examples/fullscreen/)
 *
 * ### Events
 *
 * @event `fullscreenstart` - Fired when fullscreen mode has started
 *
 * @event `fullscreenend` - Fired when fullscreen mode has ended
 */
export declare class FullscreenControl extends Evented implements IControl {
    _map: Map;
    _controlContainer: HTMLElement;
    _fullscreen: boolean;
    _fullscreenchange: string;
    _fullscreenButton: HTMLButtonElement;
    _container: HTMLElement;
    _prevCooperativeGesturesEnabled: boolean;
    constructor(options?: FullscreenControlOptions);
    /** {@inheritDoc IControl.onAdd} */
    onAdd(map: Map): HTMLElement;
    /** {@inheritDoc IControl.onRemove} */
    onRemove(): void;
    _setupUI(): void;
    _updateTitle(): void;
    _getTitle(): string;
    _isFullscreen(): boolean;
    _onFullscreenChange: () => void;
    _handleFullscreenChange(): void;
    _onClickFullscreen: () => void;
    _exitFullscreen(): void;
    _requestFullscreen(): void;
    _togglePseudoFullScreen(): void;
}
export {};
