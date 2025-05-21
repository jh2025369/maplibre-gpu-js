import { Evented } from '../util/evented';
import { StyleLayer } from './style_layer';
import { ImageManager } from '../render/image_manager';
import { GlyphManager } from '../render/glyph_manager';
import { Light } from './light';
import { LineAtlas } from '../render/line_atlas';
import { Dispatcher } from '../util/dispatcher';
import { Source } from '../source/source';
import { QueryRenderedFeaturesOptions, QuerySourceFeatureOptions } from '../source/query_features';
import { SourceCache } from '../source/source_cache';
import { DiffCommand } from '@maplibre/maplibre-gl-style-spec';
import { PauseablePlacement } from './pauseable_placement';
import { ZoomHistory } from './zoom_history';
import { CrossTileSymbolIndex } from '../symbol/cross_tile_symbol_index';
import type { MapGeoJSONFeature } from '../util/vectortile_to_geojson';
import type { Map } from '../ui/map';
import type { Transform } from '../geo/transform';
import type { StyleImage } from './style_image';
import type { EvaluationParameters } from './evaluation_parameters';
import type { Placement } from '../symbol/placement';
import type { LayerSpecification, FilterSpecification, StyleSpecification, LightSpecification, SourceSpecification, SpriteSpecification, DiffOperations } from '@maplibre/maplibre-gl-style-spec';
import type { CustomLayerInterface } from './style_layer/custom_style_layer';
import type { Validator } from './validate_style';
import { type GetGlyphsParamerters, type GetGlyphsResponse, type GetImagesParamerters, type GetImagesResponse } from '../util/actor_messages';
/**
 * A feature identifier that is bound to a source
 */
export type FeatureIdentifier = {
    /**
     * Unique id of the feature.
     */
    id?: string | number | undefined;
    /**
     * The id of the vector or GeoJSON source for the feature.
     */
    source: string;
    /**
     * *For vector tile sources, `sourceLayer` is required.*
     */
    sourceLayer?: string | undefined;
};
/**
 * The options object related to the {@link Map}'s style related methods
 */
export type StyleOptions = {
    /**
     * If false, style validation will be skipped. Useful in production environment.
     */
    validate?: boolean;
    /**
     * Defines a CSS
     * font-family for locally overriding generation of glyphs in the 'CJK Unified Ideographs', 'Hiragana', 'Katakana' and 'Hangul Syllables' ranges.
     * In these ranges, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
     * Set to `false`, to enable font settings from the map's style for these glyph ranges.
     * Forces a full update.
     */
    localIdeographFontFamily?: string | false;
};
/**
 * Supporting type to add validation to another style related type
 */
export type StyleSetterOptions = {
    /**
     * Whether to check if the filter conforms to the MapLibre Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
     */
    validate?: boolean;
};
/**
 * Part of {@link Map#setStyle} options, transformStyle is a convenience function that allows to modify a style after it is fetched but before it is committed to the map state
 * this function exposes previous and next styles, it can be commonly used to support a range of functionalities like:
 *      when previous style carries certain 'state' that needs to be carried over to a new style gracefully
 *      when a desired style is a certain combination of previous and incoming style
 *      when an incoming style requires modification based on external state
 *
 * @param previousStyle - The current style.
 * @param nextStyle - The next style.
 * @returns resulting style that will to be applied to the map
 *
 * @example
 * ```ts
 * map.setStyle('https://demotiles.maplibre.org/style.json', {
 *   transformStyle: (previousStyle, nextStyle) => ({
 *       ...nextStyle,
 *       sources: {
 *           ...nextStyle.sources,
 *           // copy a source from previous style
 *           'osm': previousStyle.sources.osm
 *       },
 *       layers: [
 *           // background layer
 *           nextStyle.layers[0],
 *           // copy a layer from previous style
 *           previousStyle.layers[0],
 *           // other layers from the next style
 *           ...nextStyle.layers.slice(1).map(layer => {
 *               // hide the layers we don't need from demotiles style
 *               if (layer.id.startsWith('geolines')) {
 *                   layer.layout = {...layer.layout || {}, visibility: 'none'};
 *               // filter out US polygons
 *               } else if (layer.id.startsWith('coastline') || layer.id.startsWith('countries')) {
 *                   layer.filter = ['!=', ['get', 'ADM0_A3'], 'USA'];
 *               }
 *               return layer;
 *           })
 *       ]
 *   })
 * });
 * ```
 */
export type TransformStyleFunction = (previous: StyleSpecification | undefined, next: StyleSpecification) => StyleSpecification;
/**
 * The options object related to the {@link Map}'s style related methods
 */
export type StyleSwapOptions = {
    /**
     * If false, force a 'full' update, removing the current style
     * and building the given one instead of attempting a diff-based update.
     */
    diff?: boolean;
    /**
     * TransformStyleFunction is a convenience function
     * that allows to modify a style after it is fetched but before it is committed to the map state. Refer to {@link TransformStyleFunction}.
     */
    transformStyle?: TransformStyleFunction;
};
/**
 * Specifies a layer to be added to a {@link Style}. In addition to a standard {@link LayerSpecification}
 * or a {@link CustomLayerInterface}, a {@link LayerSpecification} with an embedded {@link SourceSpecification} can also be provided.
 */
export type AddLayerObject = LayerSpecification | (Omit<LayerSpecification, 'source'> & {
    source: SourceSpecification;
}) | CustomLayerInterface;
/**
 * The Style base class
 */
export declare class Style extends Evented {
    map: Map;
    stylesheet: StyleSpecification;
    dispatcher: Dispatcher;
    imageManager: ImageManager;
    glyphManager: GlyphManager;
    lineAtlas: LineAtlas;
    light: Light;
    _frameRequest: AbortController;
    _loadStyleRequest: AbortController;
    _spriteRequest: AbortController;
    _layers: {
        [_: string]: StyleLayer;
    };
    _serializedLayers: {
        [_: string]: LayerSpecification;
    };
    _order: Array<string>;
    sourceCaches: {
        [_: string]: SourceCache;
    };
    zoomHistory: ZoomHistory;
    _loaded: boolean;
    _changed: boolean;
    _updatedSources: {
        [_: string]: 'clear' | 'reload';
    };
    _updatedLayers: {
        [_: string]: true;
    };
    _removedLayers: {
        [_: string]: StyleLayer;
    };
    _changedImages: {
        [_: string]: true;
    };
    _glyphsDidChange: boolean;
    _updatedPaintProps: {
        [layer: string]: true;
    };
    _layerOrderChanged: boolean;
    _spritesImagesIds: {
        [spriteId: string]: string[];
    };
    _availableImages: Array<string>;
    crossTileSymbolIndex: CrossTileSymbolIndex;
    pauseablePlacement: PauseablePlacement;
    placement: Placement;
    z: number;
    constructor(map: Map, options?: StyleOptions);
    _rtlPluginLoaded: () => void;
    loadURL(url: string, options?: StyleSwapOptions & StyleSetterOptions, previousStyle?: StyleSpecification): void;
    loadJSON(json: StyleSpecification, options?: StyleSetterOptions & StyleSwapOptions, previousStyle?: StyleSpecification): void;
    loadEmpty(): void;
    _load(json: StyleSpecification, options: StyleSwapOptions & StyleSetterOptions, previousStyle?: StyleSpecification): void;
    private _createLayers;
    _loadSprite(sprite: SpriteSpecification, isUpdate?: boolean, completion?: (err: Error) => void): void;
    _unloadSprite(): void;
    _validateLayer(layer: StyleLayer): void;
    loaded(): boolean;
    /**
     * @hidden
     * take an array of string IDs, and based on this._layers, generate an array of LayerSpecification
     * @param ids - an array of string IDs, for which serialized layers will be generated. If omitted, all serialized layers will be returned
     * @returns generated result
     */
    private _serializeByIds;
    /**
     * @hidden
     * Lazy initialization of this._serializedLayers dictionary and return it
     * @returns this._serializedLayers dictionary
     */
    private _serializedAllLayers;
    hasTransitions(): boolean;
    _checkLoaded(): void;
    /**
     * @internal
     * Apply queued style updates in a batch and recalculate zoom-dependent paint properties.
     */
    update(parameters: EvaluationParameters): void;
    _updateTilesForChangedImages(): void;
    _updateTilesForChangedGlyphs(): void;
    _updateWorkerLayers(updatedIds: Array<string>, removedIds: Array<string>): void;
    _resetUpdates(): void;
    /**
     * Update this style's state to match the given style JSON, performing only
     * the necessary mutations.
     *
     * May throw an Error ('Unimplemented: METHOD') if the mapbox-gl-style-spec
     * diff algorithm produces an operation that is not supported.
     *
     * @returns true if any changes were made; false otherwise
     */
    setState(nextState: StyleSpecification, options?: StyleSwapOptions & StyleSetterOptions): boolean;
    _getOperationsToPerform(diff: DiffCommand<DiffOperations>[]): {
        operations: Function[];
        unimplemented: string[];
    };
    addImage(id: string, image: StyleImage): this;
    updateImage(id: string, image: StyleImage): void;
    getImage(id: string): StyleImage;
    removeImage(id: string): this;
    _afterImageUpdated(id: string): void;
    listImages(): string[];
    addSource(id: string, source: SourceSpecification, options?: StyleSetterOptions): void;
    /**
     * Remove a source from this stylesheet, given its id.
     * @param id - id of the source to remove
     * @throws if no source is found with the given ID
     * @returns `this`.
     */
    removeSource(id: string): this;
    /**
     * Set the data of a GeoJSON source, given its id.
     * @param id - id of the source
     * @param data - GeoJSON source
     */
    setGeoJSONSourceData(id: string, data: GeoJSON.GeoJSON | string): void;
    /**
     * Get a source by ID.
     * @param id - ID of the desired source
     * @returns source
     */
    getSource(id: string): Source | undefined;
    /**
     * Add a layer to the map style. The layer will be inserted before the layer with
     * ID `before`, or appended if `before` is omitted.
     * @param layerObject - The style layer to add.
     * @param before - ID of an existing layer to insert before
     * @param options - Style setter options.
     * @returns `this`.
     */
    addLayer(layerObject: AddLayerObject, before?: string, options?: StyleSetterOptions): this;
    /**
     * Moves a layer to a different z-position. The layer will be inserted before the layer with
     * ID `before`, or appended if `before` is omitted.
     * @param id - ID of the layer to move
     * @param before - ID of an existing layer to insert before
     */
    moveLayer(id: string, before?: string): void;
    /**
     * Remove the layer with the given id from the style.
     *
     * If no such layer exists, an `error` event is fired.
     *
     * @param id - id of the layer to remove
     * @event `error` - Fired if the layer does not exist
     */
    removeLayer(id: string): void;
    /**
     * Return the style layer object with the given `id`.
     *
     * @param id - id of the desired layer
     * @returns a layer, if one with the given `id` exists
     */
    getLayer(id: string): StyleLayer | undefined;
    /**
     * Return the ids of all layers currently in the style, including custom layers, in order.
     *
     * @returns ids of layers, in order
     */
    getLayersOrder(): string[];
    /**
     * Checks if a specific layer is present within the style.
     *
     * @param id - the id of the desired layer
     * @returns a boolean specifying if the given layer is present
     */
    hasLayer(id: string): boolean;
    setLayerZoomRange(layerId: string, minzoom?: number | null, maxzoom?: number | null): void;
    setFilter(layerId: string, filter?: FilterSpecification | null, options?: StyleSetterOptions): void;
    /**
     * Get a layer's filter object
     * @param layer - the layer to inspect
     * @returns the layer's filter, if any
     */
    getFilter(layer: string): FilterSpecification | void;
    setLayoutProperty(layerId: string, name: string, value: any, options?: StyleSetterOptions): void;
    /**
     * Get a layout property's value from a given layer
     * @param layerId - the layer to inspect
     * @param name - the name of the layout property
     * @returns the property value
     */
    getLayoutProperty(layerId: string, name: string): any;
    setPaintProperty(layerId: string, name: string, value: any, options?: StyleSetterOptions): void;
    getPaintProperty(layer: string, name: string): unknown;
    setFeatureState(target: FeatureIdentifier, state: any): void;
    removeFeatureState(target: FeatureIdentifier, key?: string): void;
    getFeatureState(target: FeatureIdentifier): import("@maplibre/maplibre-gl-style-spec").FeatureState;
    getTransition(): {
        duration: number;
        delay: number;
    } & import("@maplibre/maplibre-gl-style-spec").TransitionSpecification;
    serialize(): StyleSpecification;
    _updateLayer(layer: StyleLayer): void;
    _flattenAndSortRenderedFeatures(sourceResults: Array<{
        [key: string]: Array<{
            featureIndex: number;
            feature: MapGeoJSONFeature;
        }>;
    }>): any[];
    queryRenderedFeatures(queryGeometry: any, params: QueryRenderedFeaturesOptions, transform: Transform): any[];
    querySourceFeatures(sourceID: string, params?: QuerySourceFeatureOptions): any[];
    getLight(): LightSpecification;
    setLight(lightOptions: LightSpecification, options?: StyleSetterOptions): void;
    _validate(validate: Validator, key: string, value: any, props: any, options?: {
        validate?: boolean;
    }): boolean;
    _remove(mapRemoved?: boolean): void;
    _clearSource(id: string): void;
    _reloadSource(id: string): void;
    _updateSources(transform: Transform): void;
    _generateCollisionBoxes(): void;
    _updatePlacement(transform: Transform, showCollisionBoxes: boolean, fadeDuration: number, crossSourceCollisions: boolean, forceFullPlacement?: boolean): boolean;
    _releaseSymbolFadeTiles(): void;
    getImages(mapId: string | number, params: GetImagesParamerters): Promise<GetImagesResponse>;
    getGlyphs(mapId: string | number, params: GetGlyphsParamerters): Promise<GetGlyphsResponse>;
    getGlyphsUrl(): string;
    setGlyphs(glyphsUrl: string | null, options?: StyleSetterOptions): void;
    /**
     * Add a sprite.
     *
     * @param id - The id of the desired sprite
     * @param url - The url to load the desired sprite from
     * @param options - The style setter options
     * @param completion - The completion handler
     */
    addSprite(id: string, url: string, options?: StyleSetterOptions, completion?: (err: Error) => void): void;
    /**
     * Remove a sprite by its id. When the last sprite is removed, the whole `this.stylesheet.sprite` object becomes
     * `undefined`. This falsy `undefined` value later prevents attempts to load the sprite when it's absent.
     *
     * @param id - the id of the sprite to remove
     */
    removeSprite(id: string): void;
    /**
     * Get the current sprite value.
     *
     * @returns empty array when no sprite is set; id-url pairs otherwise
     */
    getSprite(): {
        id: string;
        url: string;
    }[];
    /**
     * Set a new value for the style's sprite.
     *
     * @param sprite - new sprite value
     * @param options - style setter options
     * @param completion - the completion handler
     */
    setSprite(sprite: SpriteSpecification, options?: StyleSetterOptions, completion?: (err: Error) => void): void;
}
