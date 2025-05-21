import type { Map } from '../map';
import type { ControlPosition, IControl } from './control';
/**
 * The unit type for length to use for the {@link ScaleControl}
 */
export type Unit = 'imperial' | 'metric' | 'nautical';
/**
 * The {@link ScaleControl} options object
 */
type ScaleControlOptions = {
    /**
     * The maximum length of the scale control in pixels.
     * @defaultValue 100
     */
    maxWidth?: number;
    /**
     * Unit of the distance (`'imperial'`, `'metric'` or `'nautical'`).
     * @defaultValue 'metric'
     */
    unit?: Unit;
};
/**
 * A `ScaleControl` control displays the ratio of a distance on the map to the corresponding distance on the ground.
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * let scale = new ScaleControl({
 *     maxWidth: 80,
 *     unit: 'imperial'
 * });
 * map.addControl(scale);
 *
 * scale.setUnit('metric');
 * ```
 */
export declare class ScaleControl implements IControl {
    _map: Map;
    _container: HTMLElement;
    options: ScaleControlOptions;
    constructor(options?: ScaleControlOptions);
    getDefaultPosition(): ControlPosition;
    _onMove: () => void;
    /** {@inheritDoc IControl.onAdd} */
    onAdd(map: Map): HTMLElement;
    /** {@inheritDoc IControl.onRemove} */
    onRemove(): void;
    /**
     * Set the scale's unit of the distance
     *
     * @param unit - Unit of the distance (`'imperial'`, `'metric'` or `'nautical'`).
     */
    setUnit: (unit: Unit) => void;
}
export {};
