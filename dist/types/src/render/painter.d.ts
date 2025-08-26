import { mat4 } from 'gl-matrix';
import { SourceCache } from '../source/source_cache';
import { SegmentVector } from '../data/segment';
import { ProgramConfiguration } from '../data/program_configuration';
import { CrossTileSymbolIndex } from '../symbol/cross_tile_symbol_index';
import { OverscaledTileID } from '../source/tile_id';
import type { Transform } from '../geo/transform';
import type { Tile } from '../source/tile';
import type { Style } from '../style/style';
import type { StyleLayer } from '../style/style_layer';
import type { CrossFaded } from '../style/properties';
import type { ResolvedImage } from '@maplibre/maplibre-gl-style-spec';
import type { WebGPUEngine } from 'core/Engines/webgpuEngine';
import { DataBuffer } from 'core/Buffers/dataBuffer';
import { LineAtlas } from './line_atlas';
import { Texture } from 'core/Materials/Textures/texture';
import type { ImageManager } from './image_manager';
import type { GlyphManager } from './glyph_manager';
import { Program } from './program';
import { Nullable } from 'core/types';
import { RenderToTexture } from './render_to_texture';
export type RenderPass = 'offscreen' | 'opaque' | 'translucent';
type PainterOptions = {
    showOverdrawInspector: boolean;
    showTileBoundaries: boolean;
    showPadding: boolean;
    rotating: boolean;
    zooming: boolean;
    moving: boolean;
    fadeDuration: number;
};
/**
 * @internal
 * Initialize a new painter object.
 */
export declare class Painter {
    engine: WebGPUEngine;
    transform: Transform;
    renderToTexture: RenderToTexture;
    _tileTextures: {};
    numSublayers: number;
    depthEpsilon: number;
    emptyProgramConfiguration: ProgramConfiguration;
    width: number;
    height: number;
    pixelRatio: number;
    tileExtentBuffer: DataBuffer;
    tileExtentSegments: SegmentVector;
    debugBuffer: DataBuffer;
    debugSegments: SegmentVector;
    rasterBoundsBuffer: DataBuffer;
    rasterBoundsSegments: SegmentVector;
    viewportBuffer: DataBuffer;
    viewportSegments: SegmentVector;
    quadTriangleIndexBuffer: DataBuffer;
    tileBorderIndexBuffer: DataBuffer;
    _tileClippingMaskIDs: {
        [_: string]: number;
    };
    style: Style;
    options: PainterOptions;
    lineAtlas: LineAtlas;
    imageManager: ImageManager;
    glyphManager: GlyphManager;
    depthRangeFor3D: [number, number];
    opaquePassCutoff: number;
    renderPass: RenderPass;
    currentLayer: number;
    currentStencilSource: string;
    nextStencilID: number;
    id: string;
    _showOverdrawInspector: boolean;
    cache: {
        [_: string]: Program;
    };
    crossTileSymbolIndex: CrossTileSymbolIndex;
    symbolFadeChange: number;
    debugOverlayCanvas: HTMLCanvasElement;
    terrainFacilitator: {
        dirty: boolean;
        matrix: mat4;
        renderTime: number;
    };
    lastProgram: Program;
    constructor(engine: WebGPUEngine, transform: Transform);
    resize(width: number, height: number, pixelRatio: number): void;
    setup(): void;
    clearStencil(): void;
    _renderTileClippingMasks(layer: StyleLayer, tileIDs: Array<OverscaledTileID>): void;
    stencilModeFor3D(): void;
    stencilModeForClipping(tileID: OverscaledTileID): void;
    stencilConfigForOverlap(tileIDs: Array<OverscaledTileID>): [
        {
            [_: number]: number;
        },
        Array<OverscaledTileID>
    ];
    colorModeForRenderPass(): void;
    depthModeForSublayer(n: number, mask: boolean, func?: Nullable<number>): number;
    opaquePassEnabledForLayer(): boolean;
    render(style: Style, options: PainterOptions): void;
    maybeDrawDepthAndCoords(requireExact: boolean): void;
    renderLayer(painter: Painter, sourceCache: SourceCache, layer: StyleLayer, coords: Array<OverscaledTileID>): void;
    /**
     * Transform a matrix to incorporate the *-translate and *-translate-anchor properties into it.
     * @param inViewportPixelUnitsUnits - True when the units accepted by the matrix are in viewport pixels instead of tile units.
     * @returns matrix
     */
    translatePosMatrix(matrix: mat4, tile: Tile, translate: [number, number], translateAnchor: 'map' | 'viewport', inViewportPixelUnitsUnits?: boolean): mat4;
    saveTileTexture(texture: Texture): void;
    getTileTexture(size: number): any;
    isPatternMissing(image?: CrossFaded<ResolvedImage> | null): boolean;
    useProgram(name: string, programConfiguration?: ProgramConfiguration | null): Program;
    setCustomLayerDefaults(): void;
    destroy(): void;
    resetProgram(): void;
}
export {};
