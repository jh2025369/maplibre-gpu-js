import { ImgSource } from './image_source';
import type { Map } from '../ui/map';
import type { Dispatcher } from '../util/dispatcher';
import type { Evented } from '../util/evented';
/**
 * Options to add a canvas source type to the map.
 */
export type CanvasSourceSpecification = {
    /**
     * Source type. Must be `"canvas"`.
     */
    type: 'canvas';
    /**
     * Four geographical coordinates denoting where to place the corners of the canvas, specified in `[longitude, latitude]` pairs.
     */
    coordinates: [[number, number], [number, number], [number, number], [number, number]];
    /**
     * Whether the canvas source is animated. If the canvas is static (i.e. pixels do not need to be re-read on every frame), `animate` should be set to `false` to improve performance.
     * @defaultValue true
     */
    animate?: boolean;
    /**
     * Canvas source from which to read pixels. Can be a string representing the ID of the canvas element, or the `HTMLCanvasElement` itself.
     */
    canvas?: string | HTMLCanvasElement;
};
/**
 * A data source containing the contents of an HTML canvas. See {@link CanvasSourceSpecification} for detailed documentation of options.
 *
 * @group Sources
 *
 * @example
 * ```ts
 * // add to map
 * map.addSource('some id', {
 *    type: 'canvas',
 *    canvas: 'idOfMyHTMLCanvas',
 *    animate: true,
 *    coordinates: [
 *        [-76.54, 39.18],
 *        [-76.52, 39.18],
 *        [-76.52, 39.17],
 *        [-76.54, 39.17]
 *    ]
 * });
 *
 * // update
 * let mySource = map.getSource('some id');
 * mySource.setCoordinates([
 *     [-76.54335737228394, 39.18579907229748],
 *     [-76.52803659439087, 39.1838364847587],
 *     [-76.5295386314392, 39.17683392507606],
 *     [-76.54520273208618, 39.17876344106642]
 * ]);
 *
 * map.removeSource('some id');  // remove
 * ```
 */
export declare class CanvasSource extends ImgSource {
    options: CanvasSourceSpecification;
    animate: boolean;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    /**
     * Enables animation. The image will be copied from the canvas to the map on each frame.
     */
    play: () => void;
    /**
     * Disables animation. The map will display a static copy of the canvas image.
     */
    pause: () => void;
    _playing: boolean;
    /** @internal */
    constructor(id: string, options: CanvasSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
    load(): Promise<void>;
    /**
     * Returns the HTML `canvas` element.
     *
     * @returns The HTML `canvas` element.
     */
    getCanvas(): HTMLCanvasElement;
    onAdd(map: Map): void;
    onRemove(): void;
    prepare(): void;
    serialize(): CanvasSourceSpecification;
    hasTransition(): boolean;
    _hasInvalidDimensions(): boolean;
}
