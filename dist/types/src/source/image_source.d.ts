import { CanonicalTileID } from './tile_id';
import { Evented } from '../util/evented';
import { RasterBoundsArray } from '../data/array_types.g';
import { SegmentVector } from '../data/segment';
import { Texture } from 'core/Materials/Textures/texture';
import { MercatorCoordinate } from '../geo/mercator_coordinate';
import type { Source } from './source';
import type { CanvasSourceSpecification } from './canvas_source';
import type { Map } from '../ui/map';
import type { Dispatcher } from '../util/dispatcher';
import type { Tile } from './tile';
import type { ImageSourceSpecification, VideoSourceSpecification } from '@maplibre/maplibre-gl-style-spec';
import { DataBuffer } from 'core/Buffers/dataBuffer';
/**
 * Four geographical coordinates,
 * represented as arrays of longitude and latitude numbers, which define the corners of the image.
 * The coordinates start at the top left corner of the image and proceed in clockwise order.
 * They do not have to represent a rectangle.
 */
export type Coordinates = [[number, number], [number, number], [number, number], [number, number]];
/**
 * The options object for the {@link ImageSource#updateImage} method
 */
export type UpdateImageOptions = {
    /**
     * Required image URL.
     */
    url: string;
    /**
     * The image coordinates
     */
    coordinates?: Coordinates;
};
/**
 * A data source containing an image.
 * (See the [Style Specification](https://maplibre.org/maplibre-style-spec/#sources-image) for detailed documentation of options.)
 *
 * @group Sources
 *
 * @example
 * ```ts
 * // add to map
 * map.addSource('some id', {
 *    type: 'image',
 *    url: 'https://www.maplibre.org/images/foo.png',
 *    coordinates: [
 *        [-76.54, 39.18],
 *        [-76.52, 39.18],
 *        [-76.52, 39.17],
 *        [-76.54, 39.17]
 *    ]
 * });
 *
 * // update coordinates
 * let mySource = map.getSource('some id');
 * mySource.setCoordinates([
 *     [-76.54335737228394, 39.18579907229748],
 *     [-76.52803659439087, 39.1838364847587],
 *     [-76.5295386314392, 39.17683392507606],
 *     [-76.54520273208618, 39.17876344106642]
 * ]);
 *
 * // update url and coordinates simultaneously
 * mySource.updateImage({
 *    url: 'https://www.maplibre.org/images/bar.png',
 *    coordinates: [
 *        [-76.54335737228394, 39.18579907229748],
 *        [-76.52803659439087, 39.1838364847587],
 *        [-76.5295386314392, 39.17683392507606],
 *        [-76.54520273208618, 39.17876344106642]
 *    ]
 * })
 *
 * map.removeSource('some id');  // remove
 * ```
 */
export declare class ImgSource extends Evented implements Source {
    type: string;
    id: string;
    minzoom: number;
    maxzoom: number;
    tileSize: number;
    url: string;
    coordinates: Coordinates;
    tiles: {
        [_: string]: Tile;
    };
    options: any;
    dispatcher: Dispatcher;
    map: Map;
    texture: Texture;
    image: HTMLImageElement | ImageBitmap;
    tileID: CanonicalTileID;
    _boundsArray: RasterBoundsArray;
    boundsBuffer: DataBuffer;
    boundsSegments: SegmentVector;
    _loaded: boolean;
    _request: AbortController;
    /** @internal */
    constructor(id: string, options: ImageSourceSpecification | VideoSourceSpecification | CanvasSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
    load(newCoordinates?: Coordinates): Promise<void>;
    loaded(): boolean;
    /**
     * Updates the image URL and, optionally, the coordinates. To avoid having the image flash after changing,
     * set the `raster-fade-duration` paint property on the raster layer to 0.
     *
     * @param options - The options object.
     * @returns `this`
     */
    updateImage(options: UpdateImageOptions): this;
    _finishLoading(): void;
    onAdd(map: Map): void;
    onRemove(): void;
    /**
     * Sets the image's coordinates and re-renders the map.
     *
     * @param coordinates - Four geographical coordinates,
     * represented as arrays of longitude and latitude numbers, which define the corners of the image.
     * The coordinates start at the top left corner of the image and proceed in clockwise order.
     * They do not have to represent a rectangle.
     * @returns `this`
     */
    setCoordinates(coordinates: Coordinates): this;
    prepare(): void;
    loadTile(tile: Tile): Promise<void>;
    serialize(): ImageSourceSpecification | VideoSourceSpecification | CanvasSourceSpecification;
    hasTransition(): boolean;
}
/**
 * Given a list of coordinates, get their center as a coordinate.
 *
 * @returns centerpoint
 * @internal
 */
export declare function getCoordinatesCenterTileID(coords: Array<MercatorCoordinate>): CanonicalTileID;
