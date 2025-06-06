import { ImgSource } from './image_source';
import type { Map } from '../ui/map';
import type { Dispatcher } from '../util/dispatcher';
import type { Evented } from '../util/evented';
import type { VideoSourceSpecification } from '@maplibre/maplibre-gl-style-spec';
/**
 * A data source containing video.
 * (See the [Style Specification](https://maplibre.org/maplibre-style-spec/#sources-video) for detailed documentation of options.)
 *
 * @group Sources
 *
 * @example
 * ```ts
 * // add to map
 * map.addSource('some id', {
 *    type: 'video',
 *    url: [
 *        'https://www.mapbox.com/blog/assets/baltimore-smoke.mp4',
 *        'https://www.mapbox.com/blog/assets/baltimore-smoke.webm'
 *    ],
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
 * @see [Add a video](https://maplibre.org/maplibre-gl-js/docs/examples/video-on-a-map/)
 *
 * Note that when rendered as a raster layer, the layer's `raster-fade-duration` property will cause the video to fade in.
 * This happens when playback is started, paused and resumed, or when the video's coordinates are updated. To avoid this behavior,
 * set the layer's `raster-fade-duration` property to `0`.
 */
export declare class VideoSource extends ImgSource {
    options: VideoSourceSpecification;
    urls: Array<string>;
    video: HTMLVideoElement;
    roundZoom: boolean;
    constructor(id: string, options: VideoSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
    load(): Promise<void>;
    /**
     * Pauses the video.
     */
    pause(): void;
    /**
     * Plays the video.
     */
    play(): void;
    /**
     * Sets playback to a timestamp, in seconds.
     */
    seek(seconds: number): void;
    /**
     * Returns the HTML `video` element.
     *
     * @returns The HTML `video` element.
     */
    getVideo(): HTMLVideoElement;
    onAdd(map: Map): void;
    /**
     * Sets the video's coordinates and re-renders the map.
     *
     * @returns `this`
     */
    prepare(): this;
    serialize(): VideoSourceSpecification;
    hasTransition(): boolean;
}
