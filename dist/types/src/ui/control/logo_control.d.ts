import type { Map } from '../map';
import type { ControlPosition, IControl } from './control';
/**
 * The {@link LogoControl} options object
 */
type LogoControlOptions = {
    /**
     * If `true`, force a compact logo.
     * If `false`, force the full logo. The default is a responsive logo that collapses when the map is less than 640 pixels wide.
     */
    compact?: boolean;
};
/**
 * A `LogoControl` is a control that adds the watermark.
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * map.addControl(new LogoControl({compact: false}));
 * ```
 **/
export declare class LogoControl implements IControl {
    options: LogoControlOptions;
    _map: Map;
    _compact: boolean;
    _container: HTMLElement;
    constructor(options?: LogoControlOptions);
    getDefaultPosition(): ControlPosition;
    /** {@inheritDoc IControl.onAdd} */
    onAdd(map: Map): HTMLElement;
    /** {@inheritDoc IControl.onRemove} */
    onRemove(): void;
    _updateCompact: () => void;
}
export {};
