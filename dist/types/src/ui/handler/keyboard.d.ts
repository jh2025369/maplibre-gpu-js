import { Handler } from '../handler_manager';
import type { Map } from '../map';
import { TransformProvider } from './transform-provider';
/**
 * The `KeyboardHandler` allows the user to zoom, rotate, and pan the map using
 * the following keyboard shortcuts:
 *
 * - `=` / `+`: Increase the zoom level by 1.
 * - `Shift-=` / `Shift-+`: Increase the zoom level by 2.
 * - `-`: Decrease the zoom level by 1.
 * - `Shift--`: Decrease the zoom level by 2.
 * - Arrow keys: Pan by 100 pixels.
 * - `Shift+⇢`: Increase the rotation by 15 degrees.
 * - `Shift+⇠`: Decrease the rotation by 15 degrees.
 * - `Shift+⇡`: Increase the pitch by 10 degrees.
 * - `Shift+⇣`: Decrease the pitch by 10 degrees.
 *
 * @group Handlers
 */
export declare class KeyboardHandler implements Handler {
    _tr: TransformProvider;
    _enabled: boolean;
    _active: boolean;
    _panStep: number;
    _bearingStep: number;
    _pitchStep: number;
    _rotationDisabled: boolean;
    /** @internal */
    constructor(map: Map);
    reset(): void;
    keydown(e: KeyboardEvent): {
        cameraAnimation: (map: Map) => void;
    };
    /**
     * Enables the "keyboard rotate and zoom" interaction.
     *
     * @example
     * ```ts
     * map.keyboard.enable();
     * ```
     */
    enable(): void;
    /**
     * Disables the "keyboard rotate and zoom" interaction.
     *
     * @example
     * ```ts
     * map.keyboard.disable();
     * ```
     */
    disable(): void;
    /**
     * Returns a Boolean indicating whether the "keyboard rotate and zoom"
     * interaction is enabled.
     *
     * @returns `true` if the "keyboard rotate and zoom"
     * interaction is enabled.
     */
    isEnabled(): boolean;
    /**
     * Returns true if the handler is enabled and has detected the start of a
     * zoom/rotate gesture.
     *
     * @returns `true` if the handler is enabled and has detected the
     * start of a zoom/rotate gesture.
     */
    isActive(): boolean;
    /**
     * Disables the "keyboard pan/rotate" interaction, leaving the
     * "keyboard zoom" interaction enabled.
     *
     * @example
     * ```ts
     * map.keyboard.disableRotation();
     * ```
     */
    disableRotation(): void;
    /**
     * Enables the "keyboard pan/rotate" interaction.
     *
     * @example
     * ```ts
     * map.keyboard.enable();
     * map.keyboard.enableRotation();
     * ```
     */
    enableRotation(): void;
}
