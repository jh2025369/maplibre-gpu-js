import { Tile } from '../source/tile';
import { mat4 } from 'gl-matrix';
import { OverscaledTileID } from '../source/tile_id';
import { SegmentVector } from '../data/segment';
import { Painter } from './painter';
import { Texture } from 'core/Materials/Textures/texture';
import Point from '@mapbox/point-geometry';
import { MercatorCoordinate } from '../geo/mercator_coordinate';
import { TerrainSourceCache } from '../source/terrain_source_cache';
import { SourceCache } from '../source/source_cache';
import type { TerrainSpecification } from '@maplibre/maplibre-gl-style-spec';
import { LngLat } from '../geo/lng_lat';
import { DataBuffer } from 'core/Buffers/dataBuffer';
import { RenderTargetWrapper } from 'core/Engines';
/**
 * @internal
 * A terrain GPU related object
 */
export type TerrainData = {
    'u_terrain_dim': {
        value: number;
        type: 'float';
    };
    'u_terrain_matrix': {
        value: mat4;
        type: 'mat4';
    };
    'u_terrain_unpack': {
        value: number[];
        type: 'vec4';
    };
    'u_terrain_exaggeration': {
        value: number;
        type: 'float';
    };
    texture: Texture;
    depthTexture: Texture;
    tile: Tile;
};
/**
 * @internal
 * A terrain mesh object
 */
export type TerrainMesh = {
    indexBuffer: DataBuffer;
    vertexBuffer: DataBuffer;
    segments: SegmentVector;
};
/**
 * @internal
 * This is the main class which handles most of the 3D Terrain logic. It has the following topics:
 *    1) loads raster-dem tiles via the internal sourceCache this.sourceCache
 *    2) creates a depth-framebuffer, which is used to calculate the visibility of coordinates
 *    3) creates a coords-framebuffer, which is used the get to tile-coordinate for a screen-pixel
 *    4) stores all render-to-texture tiles in the this.sourceCache._tiles
 *    5) calculates the elevation for a specific tile-coordinate
 *    6) creates a terrain-mesh
 *
 *    A note about the GPU resource-usage:
 *    Framebuffers:
 *       - one for the depth & coords framebuffer with the size of the map-div.
 *       - one for rendering a tile to texture with the size of tileSize (= 512x512).
 *    Textures:
 *       - one texture for an empty raster-dem tile with size 1x1
 *       - one texture for an empty depth-buffer, when terrain is disabled with size 1x1
 *       - one texture for an each loaded raster-dem with size of the source.tileSize
 *       - one texture for the coords-framebuffer with the size of the map-div.
 *       - one texture for the depth-framebuffer with the size of the map-div.
 *       - one texture for the encoded tile-coords with the size 2*tileSize (=1024x1024)
 *       - finally for each render-to-texture tile (= this._tiles) a set of textures
 *         for each render stack (The stack-concept is documented in painter.ts).
 *         Normally there exists 1-3 Textures per tile, depending on the stylesheet.
 *         Each Textures has the size 2*tileSize (= 1024x1024). Also there exists a
 *         cache of the last 150 newest rendered tiles.
 *
 */
export declare class Terrain {
    /**
     * The style this terrain corresponds to
     */
    painter: Painter;
    /**
     * the sourcecache this terrain is based on
     */
    sourceCache: TerrainSourceCache;
    /**
     * the TerrainSpecification object passed to this instance
     */
    options: TerrainSpecification;
    /**
     * define the meshSize per tile.
     */
    meshSize: number;
    /**
     * multiplicator for the elevation. Used to make terrain more "extreme".
     */
    exaggeration: number;
    /**
     * to not see pixels in the render-to-texture tiles it is good to render them bigger
     * this number is the multiplicator (must be a power of 2) for the current tileSize.
     * So to get good results with not too much memory footprint a value of 2 should be fine.
     */
    qualityFactor: number;
    /**
     * holds the framebuffer object in size of the screen to render the coords & depth into a texture.
     */
    _fboCoords: RenderTargetWrapper;
    _fboDepth: RenderTargetWrapper;
    _fboCoordsTexture: Texture;
    _fboDepthTexture: Texture;
    _emptyDepthTexture: Texture;
    /**
     * GL Objects for the terrain-mesh
     * The mesh is a regular mesh, which has the advantage that it can be reused for all tiles.
     */
    _mesh: TerrainMesh;
    /**
     * coords index contains a list of tileID.keys. This index is used to identify
     * the tile via the alpha-cannel in the coords-texture.
     * As the alpha-channel has 1 Byte a max of 255 tiles can rendered without an error.
     */
    coordsIndex: Array<string>;
    /**
     * tile-coords encoded in the rgb channel, _coordsIndex is in the alpha-channel.
     */
    _coordsTexture: Texture;
    /**
     * accuracy of the coords. 2 * tileSize should be enough.
     */
    _coordsTextureSize: number;
    /**
     * variables for an empty dem texture, which is used while the raster-dem tile is loading.
     */
    _emptyDemUnpack: number[];
    _emptyDemTexture: Texture;
    _emptyDemMatrix: mat4;
    /**
     * as of overzooming of raster-dem tiles in high zoomlevels, this cache contains
     * matrices to transform from vector-tile coords to raster-dem-tile coords.
     */
    _demMatrixCache: {
        [_: string]: {
            matrix: mat4;
            coord: OverscaledTileID;
        };
    };
    constructor(painter: Painter, sourceCache: SourceCache, options: TerrainSpecification);
    /**
     * get the elevation-value from original dem-data for a given tile-coordinate
     * @param tileID - the tile to get elevation for
     * @param x - between 0 .. EXTENT
     * @param y - between 0 .. EXTENT
     * @param extent - optional, default 8192
     * @returns the elevation
     */
    getDEMElevation(tileID: OverscaledTileID, x: number, y: number, extent?: number): number;
    /**
     * Get the elevation for given {@link LngLat} in respect of exaggeration.
     * @param lnglat - the location
     * @param zoom - the zoom
     * @returns the elevation
     */
    getElevationForLngLatZoom(lnglat: LngLat, zoom: number): number;
    /**
     * Get the elevation for given coordinate in respect of exaggeration.
     * @param tileID - the tile id
     * @param x - between 0 .. EXTENT
     * @param y - between 0 .. EXTENT
     * @param extent - optional, default 8192
     * @returns the elevation
     */
    getElevation(tileID: OverscaledTileID, x: number, y: number, extent?: number): number;
    /**
     * returns a Terrain Object for a tile. Unless the tile corresponds to data (e.g. tile is loading), return a flat dem object
     * @param tileID - the tile to get the terrain for
     * @returns the terrain data to use in the program
     */
    getTerrainData(tileID: OverscaledTileID): TerrainData;
    /**
     * get a framebuffer as big as the map-div, which will be used to render depth & coords into a texture
     * @param texture - the texture
     * @returns the frame buffer
     */
    getFramebuffer(texture: string): RenderTargetWrapper;
    /**
     * create coords texture, needed to grab coordinates from canvas
     * encode coords coordinate into 4 bytes:
     *   - 8 lower bits for x
     *   - 8 lower bits for y
     *   - 4 higher bits for x
     *   - 4 higher bits for y
     *   - 8 bits for coordsIndex (1 .. 255) (= number of terraintile), is later setted in draw_terrain uniform value
     * @returns the texture
     */
    getCoordsTexture(): Texture;
    /**
     * Reads a pixel from the coords-framebuffer and translate this to mercator.
     * @param p - Screen-Coordinate
     * @returns mercator coordinate for a screen pixel
     */
    pointCoordinate(p: Point): MercatorCoordinate;
    /**
     * Reads the depth value from the depth-framebuffer at a given screen pixel
     * @param p - Screen coordinate
     * @returns depth value in clip space (between 0 and 1)
     */
    depthAtPoint(p: Point): number;
    /**
     * create a regular mesh which will be used by all terrain-tiles
     * @returns the created regular mesh
     */
    getTerrainMesh(): TerrainMesh;
    /**
     * Calculates a height of the frame around the terrain-mesh to avoid stiching between
     * tile boundaries in different zoomlevels.
     * @param zoom - current zoomlevel
     * @returns the elevation delta in meters
     */
    getMeshFrameDelta(zoom: number): number;
    getMinTileElevationForLngLatZoom(lnglat: LngLat, zoom: number): number;
    /**
     * Get the minimum and maximum elevation contained in a tile. This includes any
     * exaggeration included in the terrain.
     *
     * @param tileID - ID of the tile to be used as a source for the min/max elevation
     * @returns the minimum and maximum elevation found in the tile, including the terrain's
     * exaggeration
     */
    getMinMaxElevation(tileID: OverscaledTileID): {
        minElevation: number | null;
        maxElevation: number | null;
    };
    _getOverscaledTileIDFromLngLatZoom(lnglat: LngLat, zoom: number): {
        tileID: OverscaledTileID;
        mercatorX: number;
        mercatorY: number;
    };
}
