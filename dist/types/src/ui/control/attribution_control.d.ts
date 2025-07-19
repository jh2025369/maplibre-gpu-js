import type { Map } from '../map';
import type { ControlPosition, IControl } from './control';
import type { MapDataEvent } from '../events';
/**
 * The {@link AttributionControl} options object
 */
export type AttributionControlOptions = {
    /**
     * If `true`, the attribution control will always collapse when moving the map. If `false`,
     * force the expanded attribution control. The default is a responsive attribution that collapses when the user moves the map on maps less than 640 pixels wide.
     * **Attribution should not be collapsed if it can comfortably fit on the map. `compact` should only be used to modify default attribution when map size makes it impossible to fit default attribution and when the automatic compact resizing for default settings are not sufficient.**
     */
    compact?: boolean;
    /**
     * Attributions to show in addition to any other attributions.
     */
    customAttribution?: string | Array<string>;
};
export declare const defaultAtributionControlOptions: AttributionControlOptions;
/**
 * An `AttributionControl` control presents the map's attribution information. By default, the attribution control is expanded (regardless of map width).
 * @group Markers and Controls
 * @example
 * ```ts
 * let map = new Map({attributionControl: false})
 *     .addControl(new AttributionControl({
 *         compact: true
 *     }));
 * ```
 */
export declare class AttributionControl implements IControl {
    options: AttributionControlOptions;
    _map: Map;
    _compact: boolean | undefined;
    _container: HTMLElement;
    _innerContainer: HTMLElement;
    _compactButton: HTMLElement;
    _editLink: HTMLAnchorElement;
    _attribHTML: string;
    styleId: string;
    styleOwner: string;
    /**
     * @param options - the attribution options
     */
    constructor(options?: AttributionControlOptions);
    getDefaultPosition(): ControlPosition;
    /** {@inheritDoc IControl.onAdd} */
    onAdd(map: Map): HTMLElement;
    /** {@inheritDoc IControl.onRemove} */
    onRemove(): void;
    _setElementTitle(element: HTMLElement, title: 'ToggleAttribution' | 'MapFeedback'): void;
    _toggleAttribution: () => void;
    _updateData: (e: MapDataEvent) => void;
    _updateAttributions(): void;
    _updateCompact: () => void;
    _updateCompactMinimize: () => void;
}
