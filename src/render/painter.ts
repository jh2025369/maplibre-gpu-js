import {browser} from '../util/browser';
import {mat4, vec3} from 'gl-matrix';
import {SourceCache} from '../source/source_cache';
import {EXTENT} from '../data/extent';
import {pixelsToTileUnits} from '../source/pixels_to_tile_units';
import {SegmentVector} from '../data/segment';
import {RasterBoundsArray, PosArray, TriangleIndexArray, LineStripIndexArray} from '../data/array_types.g';
import {ProgramConfiguration} from '../data/program_configuration';
import {CrossTileSymbolIndex} from '../symbol/cross_tile_symbol_index';
import {Color} from '@maplibre/maplibre-gl-style-spec';
import {drawLine} from './draw_line';
import {drawCircles} from './draw_circle';
import {drawHeatmap} from './draw_heatmap';
import {drawCustom} from './draw_custom';
import {drawDepth, drawCoords} from './draw_terrain';

import {OverscaledTileID} from '../source/tile_id';

import type {Transform} from '../geo/transform';
import type {Tile} from '../source/tile';
import type {Style} from '../style/style';
import type {StyleLayer} from '../style/style_layer';
import type {CrossFaded} from '../style/properties';
import type {ResolvedImage} from '@maplibre/maplibre-gl-style-spec';
import type {WebGPUEngine} from 'core/Engines/webgpuEngine';
import {DataBuffer} from 'core/Buffers/dataBuffer';
import {LineAtlas} from './line_atlas';
import {Texture} from 'core/Materials/Textures/texture';
import {drawTest} from './draw_test';
import {drawSweep} from './draw_sweep';
import {drawFill} from './draw_fill';
import {drawFillExtrusion} from './draw_fill_extrusion';
import {drawHillshade} from './draw_hillshade';
import {drawBackground} from './draw_background';
import {drawRaster} from './draw_raster';
import {drawSymbols} from './draw_symbol';
import type {ImageManager} from './image_manager';
import type {GlyphManager} from './glyph_manager';
import {Program} from './program';
import {programUniforms} from './program/program_uniforms';
import {Constants} from 'core/Engines/constants';
import {clippingMaskUniformValues} from './program/clipping_mask_program';
import {VertexBuffer} from 'core/Buffers/buffer';
import {Nullable} from 'core/types';
import * as WebGPUConstants from 'core/Engines/WebGPU/webgpuConstants';
import {RenderToTexture} from './render_to_texture';

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

window['useLayerType'] ??= new Set();
window['disableLayerType'] ??= new Set();

/**
 * @internal
 * Initialize a new painter object.
 */
export class Painter {
    engine: WebGPUEngine;
    transform: Transform;
    renderToTexture: RenderToTexture;
    _tileTextures: {
        // [_: number]: Array<Texture>;
    };
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
    _tileClippingMaskIDs: { [_: string]: number };
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
    cache: {[_: string]: Program};
    crossTileSymbolIndex: CrossTileSymbolIndex;
    symbolFadeChange: number;
    // debugOverlayTexture: Texture;
    debugOverlayCanvas: HTMLCanvasElement;
    // this object stores the current camera-matrix and the last render time
    // of the terrain-facilitators. e.g. depth & coords framebuffers
    // every time the camera-matrix changes the terrain-facilitators will be redrawn.
    terrainFacilitator: { dirty: boolean; matrix: mat4; renderTime: number };
    lastProgram: Program;

    constructor(engine: WebGPUEngine, transform: Transform) {
        this.engine = engine;
        this.transform = transform;
        this._tileTextures = {};
        this.terrainFacilitator = {dirty: true, matrix: mat4.identity(new Float64Array(16) as any), renderTime: 0};

        this.setup();

        // Within each layer there are multiple distinct z-planes that can be drawn to.
        // This is implemented using the WefbGL depth buffer.
        this.numSublayers = SourceCache.maxUnderzooming + SourceCache.maxOverzooming + 1;
        this.depthEpsilon = 1 / Math.pow(2, 16);

        this.crossTileSymbolIndex = new CrossTileSymbolIndex();
    }

    /*
     * Update the GL viewport, projection matrix, and transforms to compensate
     * for a new width and height value.
     */
    resize(width: number, height: number, pixelRatio: number) {
        this.width = Math.floor(width * pixelRatio);
        this.height = Math.floor(height * pixelRatio);
        this.pixelRatio = pixelRatio;
        if (this.engine._viewportCached.z !== this.width || this.engine._viewportCached.w !== this.height) {
            this.engine._viewport(0, 0, this.width, this.height);
            this.engine._hardwareScalingLevel = 1 / pixelRatio;
            this.engine.resize(true);
        }

        if (this.style) {
            for (const layerId of this.style._order) {
                this.style._layers[layerId].resize();
            }
        }
    }

    setup() {
        const tileExtentArray = new PosArray();
        tileExtentArray.emplaceBack(0, 0);
        tileExtentArray.emplaceBack(EXTENT, 0);
        tileExtentArray.emplaceBack(0, EXTENT);
        tileExtentArray.emplaceBack(EXTENT, EXTENT);
        this.tileExtentBuffer = this.engine.createVertexBuffer(tileExtentArray.arrayBuffer);
        this.tileExtentSegments = SegmentVector.simpleSegment(0, 0, 4, 2);

        const debugArray = new PosArray();
        debugArray.emplaceBack(0, 0);
        debugArray.emplaceBack(EXTENT, 0);
        debugArray.emplaceBack(0, EXTENT);
        debugArray.emplaceBack(EXTENT, EXTENT);
        this.debugBuffer = this.engine.createVertexBuffer(debugArray.arrayBuffer);
        this.debugSegments = SegmentVector.simpleSegment(0, 0, 4, 5);

        const rasterBoundsArray = new RasterBoundsArray();
        rasterBoundsArray.emplaceBack(0, 0, 0, 0);
        rasterBoundsArray.emplaceBack(EXTENT, 0, EXTENT, 0);
        rasterBoundsArray.emplaceBack(0, EXTENT, 0, EXTENT);
        rasterBoundsArray.emplaceBack(EXTENT, EXTENT, EXTENT, EXTENT);
        this.rasterBoundsBuffer = this.engine.createVertexBuffer(rasterBoundsArray.arrayBuffer);
        this.rasterBoundsSegments = SegmentVector.simpleSegment(0, 0, 4, 2);

        const viewportArray = new PosArray();
        viewportArray.emplaceBack(0, 0);
        viewportArray.emplaceBack(1, 0);
        viewportArray.emplaceBack(0, 1);
        viewportArray.emplaceBack(1, 1);
        this.viewportBuffer = this.engine.createVertexBuffer(viewportArray.arrayBuffer);
        this.viewportSegments = SegmentVector.simpleSegment(0, 0, 4, 2);

        const tileLineStripIndices = new LineStripIndexArray();
        tileLineStripIndices.emplaceBack(0);
        tileLineStripIndices.emplaceBack(1);
        tileLineStripIndices.emplaceBack(3);
        tileLineStripIndices.emplaceBack(2);
        tileLineStripIndices.emplaceBack(0);
        this.tileBorderIndexBuffer = this.engine.createIndexBuffer(tileLineStripIndices.arrayBuffer);

        const quadTriangleIndices = new TriangleIndexArray();
        quadTriangleIndices.emplaceBack(0, 1, 2);
        quadTriangleIndices.emplaceBack(2, 1, 3);
        this.quadTriangleIndexBuffer = this.engine.createIndexBuffer(quadTriangleIndices.arrayBuffer);
    }

    clearStencil() {
        const engine = this.engine;

        this.nextStencilID = 1;
        this.currentStencilSource = undefined;

        // As a temporary workaround for https://github.com/mapbox/mapbox-gl-js/issues/5490,
        // pending an upstream fix, we draw a fullscreen stencil=0 clipping mask here,
        // effectively clearing the stencil buffer: once an upstream patch lands, remove
        // this function in favor of context.clear({ stencil: 0x0 })

        const matrix = mat4.create();
        mat4.orthoZO(matrix, 0, this.width, this.height, 0, 0, 1);
        mat4.scale(matrix, matrix, [engine._renderingCanvas.width, engine._renderingCanvas.height, 0]);

        const program = this.useProgram('clippingMask');

        engine._cacheRenderPipeline.setWriteMask(0);
        engine._cacheRenderPipeline.setDepthTestEnabled(false);
        engine._cacheRenderPipeline.setDepthWriteEnabled(false);
        engine._cacheRenderPipeline.setStencilState(true, Constants.ALWAYS, Constants.ZERO, Constants.ZERO, Constants.ZERO, 0x0, 0xFF);

        const vertexBufferViewport = new VertexBuffer(engine, this.viewportBuffer, 'a_pos', {
            updatable: true,
            label: 'clipping',
            offset: 0,
            stride: 4,
            size: 1,
            type: VertexBuffer.UNSIGNED_INT,
            useBytes: true
        });

        const vertexBuffers = {
            'a_pos': vertexBufferViewport
        };

        program.draw(engine, 0, clippingMaskUniformValues(matrix), null, '$clipping',
            vertexBuffers, this.quadTriangleIndexBuffer, this.viewportSegments);
    }

    _renderTileClippingMasks(layer: StyleLayer, tileIDs: Array<OverscaledTileID>) {
        if (this.currentStencilSource === layer.source || !layer.isTileClipped() || !tileIDs || !tileIDs.length) return;

        this.currentStencilSource = layer.source;

        const engine = this.engine;

        if (this.nextStencilID + tileIDs.length > 256) {
            // we'll run out of fresh IDs so we need to clear and start from scratch
            this.clearStencil();
        }

        const program = this.useProgram('clippingMask');

        engine._cacheRenderPipeline.setWriteMask(0);
        engine._cacheRenderPipeline.setDepthTestEnabled(false);
        engine._cacheRenderPipeline.setDepthWriteEnabled(false);
        engine._cacheRenderPipeline.setStencilState(true, Constants.ALWAYS, Constants.KEEP, Constants.REPLACE, Constants.KEEP, 0, 0xFF);

        this._tileClippingMaskIDs = {};

        for (const tileID of tileIDs) {
            const id = this._tileClippingMaskIDs[tileID.key] = this.nextStencilID++;
            const terrainData = this.style.map.terrain && this.style.map.terrain.getTerrainData(tileID);

            const vertexBufferTileExtent = new VertexBuffer(engine, this.tileExtentBuffer, 'a_pos', {
                updatable: true,
                label: 'clipping',
                offset: 0,
                stride: 4,
                size: 1,
                type: VertexBuffer.UNSIGNED_INT,
                useBytes: true
            });

            const vertexBuffers = {
                'a_pos': vertexBufferTileExtent
            };

            this.engine._stencilStateComposer.stencilMaterial.enabled = true;
            this.engine._stencilStateComposer.stencilMaterial.funcRef = id;

            program.draw(engine, 0, clippingMaskUniformValues(tileID.posMatrix), terrainData, '$clipping',
                vertexBuffers, this.quadTriangleIndexBuffer, this.tileExtentSegments);
        }
    }

    stencilModeFor3D() {
        this.currentStencilSource = undefined;

        if (this.nextStencilID + 1 > 256) {
            this.clearStencil();
        }

        const id = this.nextStencilID++;
        this.engine._cacheRenderPipeline.setStencilState(true, Constants.NOTEQUAL, Constants.KEEP, Constants.REPLACE, Constants.KEEP, 0xFF, 0xFF);
        this.engine._stencilStateComposer.stencilMaterial.enabled = true;
        this.engine._stencilStateComposer.stencilMaterial.funcRef = id;
    }

    stencilModeForClipping(tileID: OverscaledTileID) {
        this.engine._cacheRenderPipeline.setStencilState(true, Constants.EQUAL, Constants.KEEP, Constants.REPLACE, Constants.KEEP, 0xFF, 0x00);
        this.engine._stencilStateComposer.stencilMaterial.enabled = true;
        this.engine._stencilStateComposer.stencilMaterial.funcRef = this._tileClippingMaskIDs[tileID.key];
    }

    stencilConfigForOverlap(tileIDs: Array<OverscaledTileID>): [{
        [_: number]: number;
    }, Array<OverscaledTileID>] {
        const coords = tileIDs.sort((a, b) => b.overscaledZ - a.overscaledZ);
        const minTileZ = coords[coords.length - 1].overscaledZ;
        const stencilValues = coords[0].overscaledZ - minTileZ + 1;
        if (stencilValues > 1) {
            this.currentStencilSource = undefined;
            if (this.nextStencilID + stencilValues > 256) {
                this.clearStencil();
            }
            const zToStencilMode = {};
            for (let i = 0; i < stencilValues; i++) {
                // this.engine._cacheRenderPipeline.setStencilState(true, Constants.GREATER, Constants.KEEP, Constants.REPLACE, Constants.KEEP, 0xFF, 0xFF);
                // this.engine._stencilStateComposer.stencilMaterial.enabled = true;
                // this.engine._stencilStateComposer.stencilMaterial.funcRef = i + this.nextStencilID;
                zToStencilMode[i + minTileZ] = i + this.nextStencilID;
            }
            this.nextStencilID += stencilValues;
            return [zToStencilMode, coords];
        }
        return [{[minTileZ]: -1}, coords];
    }

    colorModeForRenderPass() {
        const engine = this.engine;
        if (this._showOverdrawInspector) {
            const numOverdrawSteps = 8;
            const a = 1 / numOverdrawSteps;

            engine._cacheRenderPipeline.setAlphaBlendEnabled(true);
            engine.setAlphaEquation(Constants.ALPHA_EQUATION_ADD);
            engine.setAlphaMode(Constants.ALPHA_INTERPOLATE, true);
            engine._alphaState.setAlphaBlendConstants(a, a, a, 0);
        } else if (this.renderPass === 'opaque') {
            engine._cacheRenderPipeline.setAlphaBlendEnabled(false);
        } else {
            engine._cacheRenderPipeline.setAlphaBlendEnabled(true);
            engine.setAlphaEquation(Constants.ALPHA_EQUATION_ADD);
            engine.setAlphaMode(Constants.ALPHA_PREMULTIPLIED_PORTERDUFF, true);
        }
    }

    depthModeForSublayer(n: number, mask: boolean, func?: Nullable<number>) {
        const engine = this.engine;
        if (!this.opaquePassEnabledForLayer()) {
            engine._cacheRenderPipeline.setDepthTestEnabled(false);
            engine._cacheRenderPipeline.setDepthWriteEnabled(false);
            return -1;
        }
        engine._cacheRenderPipeline.setDepthTestEnabled(true);
        const depth = 1 - ((1 + this.currentLayer) * this.numSublayers + n) * this.depthEpsilon;
        engine._cacheRenderPipeline.setDepthCompare(func || Constants.LEQUAL);
        engine._cacheRenderPipeline.setDepthWriteEnabled(mask);
        engine._viewportDepthRange(depth, depth);
    }

    opaquePassEnabledForLayer() {
        return this.currentLayer < this.opaquePassCutoff;
    }

    render(style: Style, options: PainterOptions) {
        this.style = style;
        this.options = options;

        this.lineAtlas = style.lineAtlas;
        this.imageManager = style.imageManager;
        this.glyphManager = style.glyphManager;

        this.symbolFadeChange = style.placement.symbolFadeChange(browser.now());

        this.imageManager.beginFrame();

        const layerIds = this.style._order;
        const sourceCaches = this.style.sourceCaches;

        const coordsAscending: { [_: string]: Array<OverscaledTileID> } = {};
        const coordsDescending: { [_: string]: Array<OverscaledTileID> } = {};
        const coordsDescendingSymbol: { [_: string]: Array<OverscaledTileID> } = {};

        for (const id in sourceCaches) {
            const sourceCache = sourceCaches[id];
            if (sourceCache.used) {
                sourceCache.prepare(this.engine);
            }

            coordsAscending[id] = sourceCache.getVisibleCoordinates();
            coordsDescending[id] = coordsAscending[id].slice().reverse();
            coordsDescendingSymbol[id] = sourceCache.getVisibleCoordinates(true).reverse();
        }

        this.opaquePassCutoff = Infinity;
        for (let i = 0; i < layerIds.length; i++) {
            const layerId = layerIds[i];
            if (this.style._layers[layerId].is3D()) {
                this.opaquePassCutoff = i;
                break;
            }
        }

        this.maybeDrawDepthAndCoords(false);

        if (this.renderToTexture) {
            this.renderToTexture.prepareForRender(this.style, this.transform.zoom);
            // this is disabled, because render-to-texture is rendering all layers from bottom to top.
            this.opaquePassCutoff = 0;
        }

        // Offscreen pass ===============================================
        // We first do all rendering that requires rendering to a separate
        // framebuffer, and then save those for rendering back to the map
        // later: in doing this we avoid doing expensive framebuffer restores.
        this.renderPass = 'offscreen';

        for (const layerId of layerIds) {
            const layer = this.style._layers[layerId];
            if (!layer.hasOffscreenPass() || layer.isHidden(this.transform.zoom)) continue;

            const coords = coordsDescending[layer.source];
            if (layer.type !== 'custom' && !coords.length) continue;

            this.renderLayer(this, sourceCaches[layer.source], layer, coords);
        }

        this.engine._startMainRenderPass(true, options.showOverdrawInspector ? Color.black : Color.transparent, true, true);

        this.resetProgram();

        this.clearStencil();

        this._showOverdrawInspector = options.showOverdrawInspector;
        this.depthRangeFor3D = [0, 1 - ((style._order.length + 2) * this.numSublayers * this.depthEpsilon)];

        // Opaque pass ===============================================
        // Draw opaque layers top-to-bottom first.
        if (!this.renderToTexture) {
            this.renderPass = 'opaque';

            for (this.currentLayer = layerIds.length - 1; this.currentLayer >= 0; this.currentLayer--) {
                const layer = this.style._layers[layerIds[this.currentLayer]];
                const sourceCache = sourceCaches[layer.source];
                const coords = coordsAscending[layer.source];

                this._renderTileClippingMasks(layer, coords);
                this.renderLayer(this, sourceCache, layer, coords);
            }
        }

        this.engine.endFrame();
        this.engine._startMainRenderPass(false, null, false, true);

        this.resetProgram();

        // Translucent pass ===============================================
        // Draw all other layers bottom-to-top.
        this.renderPass = 'translucent';

        for (this.currentLayer = 0; this.currentLayer < layerIds.length; this.currentLayer++) {
            const layer = this.style._layers[layerIds[this.currentLayer]];
            const sourceCache = sourceCaches[layer.source];

            if (this.renderToTexture && this.renderToTexture.renderLayer(layer)) continue;

            // For symbol layers in the translucent pass, we add extra tiles to the renderable set
            // for cross-tile symbol fading. Symbol layers don't use tile clipping, so no need to render
            // separate clipping masks
            const coords = (layer.type === 'symbol' ? coordsDescendingSymbol : coordsDescending)[layer.source];

            this._renderTileClippingMasks(layer, coordsAscending[layer.source]);
            this.renderLayer(this, sourceCache, layer, coords);
        }

        this.engine.endFrame();
        this.engine._viewportDepthRange(0, 1);

        this.engine._startMainRenderPass(false, null, false, true);
        // drawTest(this);
        // drawSweep(this);
        this.engine.endFrame();
    }

    maybeDrawDepthAndCoords(requireExact: boolean) {
        if (!this.style || !this.style.map || !this.style.map.terrain) {
            return;
        }
        const prevMatrix = this.terrainFacilitator.matrix;
        const currMatrix = this.transform.projMatrix;

        // Update coords/depth-framebuffer on camera movement, or tile reloading
        let doUpdate = this.terrainFacilitator.dirty;
        doUpdate ||= requireExact ? !mat4.exactEquals(prevMatrix, currMatrix) : !mat4.equals(prevMatrix, currMatrix);
        doUpdate ||= this.style.map.terrain.sourceCache.tilesAfterTime(this.terrainFacilitator.renderTime).length > 0;

        if (!doUpdate) {
            return;
        }

        mat4.copy(prevMatrix, currMatrix);
        this.terrainFacilitator.renderTime = Date.now();
        this.terrainFacilitator.dirty = false;
        // drawDepth(this, this.style.map.terrain);
        // drawCoords(this, this.style.map.terrain);
    }

    renderLayer(painter: Painter, sourceCache: SourceCache, layer: StyleLayer, coords: Array<OverscaledTileID>) {
        if (layer.isHidden(this.transform.zoom)) return;
        if (layer.type !== 'background' && layer.type !== 'custom' && !(coords || []).length) return;
        this.id = layer.id;

        window['useLayerType'].add(layer.type);
        if (window['disableLayerType'].has(layer.type)) return;

        switch (layer.type) {
            case 'symbol':
                drawSymbols(painter, sourceCache, layer as any, coords, this.style.placement.variableOffsets);
                break;
            case 'circle':
                drawCircles(painter, sourceCache, layer as any, coords);
                break;
            case 'heatmap':
                drawHeatmap(painter, sourceCache, layer as any, coords);
                break;
            case 'line':
                drawLine(painter, sourceCache, layer as any, coords);
                break;
            case 'fill':
                drawFill(painter, sourceCache, layer as any, coords);
                break;
            case 'fill-extrusion':
                drawFillExtrusion(painter, sourceCache, layer as any, coords);
                break;
            case 'hillshade':
                drawHillshade(painter, sourceCache, layer as any, coords);
                break;
            case 'raster':
                drawRaster(painter, sourceCache, layer as any, coords);
                break;
            case 'background':
                drawBackground(painter, sourceCache, layer as any, coords);
                break;
            case 'custom':
                drawCustom(painter, sourceCache, layer as any);
                break;
        }
    }

    /**
     * Transform a matrix to incorporate the *-translate and *-translate-anchor properties into it.
     * @param inViewportPixelUnitsUnits - True when the units accepted by the matrix are in viewport pixels instead of tile units.
     * @returns matrix
     */
    translatePosMatrix(matrix: mat4, tile: Tile, translate: [number, number], translateAnchor: 'map' | 'viewport', inViewportPixelUnitsUnits?: boolean): mat4 {
        if (!translate[0] && !translate[1]) return matrix;

        const angle = inViewportPixelUnitsUnits ?
            (translateAnchor === 'map' ? this.transform.angle : 0) :
            (translateAnchor === 'viewport' ? -this.transform.angle : 0);

        if (angle) {
            const sinA = Math.sin(angle);
            const cosA = Math.cos(angle);
            translate = [
                translate[0] * cosA - translate[1] * sinA,
                translate[0] * sinA + translate[1] * cosA
            ];
        }

        const translation = [
            inViewportPixelUnitsUnits ? translate[0] : pixelsToTileUnits(tile, translate[0], this.transform.zoom),
            inViewportPixelUnitsUnits ? translate[1] : pixelsToTileUnits(tile, translate[1], this.transform.zoom),
            0
        ] as vec3;

        const translatedMatrix = new Float32Array(16);
        mat4.translate(translatedMatrix, matrix, translation);
        return translatedMatrix;
    }

    saveTileTexture(texture: Texture) {
        const size = texture.getSize();
        const textures = this._tileTextures[size.width];
        if (!textures) {
            this._tileTextures[size.width] = [texture];
        } else {
            textures.push(texture);
        }
    }

    getTileTexture(size: number) {
        const textures = this._tileTextures[size];
        return textures && textures.length > 0 ? textures.pop() : null;
    }

    isPatternMissing(image?: CrossFaded<ResolvedImage> | null): boolean {
        if (!image) return false;
        if (!image.from || !image.to) return true;
        const imagePosA = this.imageManager.getPattern(image.from.toString());
        const imagePosB = this.imageManager.getPattern(image.to.toString());
        return !imagePosA || !imagePosB;
    }

    useProgram(name: string, programConfiguration?: ProgramConfiguration | null): Program {
        this.cache = this.cache || {};
        const key = name +
            (programConfiguration ? programConfiguration.cacheKey : '') +
            (this._showOverdrawInspector ? '/overdraw' : '') +
            (this.style.map.terrain ? '/terrain' : '');
        if (!this.cache[key]) {
            this.cache[key] = new Program(
                this.engine,
                key,
                name,
                programConfiguration,
                programUniforms[name],
                this._showOverdrawInspector,
                this.style.map.terrain
            );
        }
        if (this.cache[key] !== this.lastProgram) {
            this.cache[key].use(this.engine);
        }
        this.lastProgram = this.cache[key];
        return this.cache[key];
    }

    setCustomLayerDefaults() {
        this.engine._cacheRenderPipeline.resetDepthCullingState();
        this.engine._alphaState.reset();
        this.engine._alphaState.setAlphaEquationParameters(Constants.GL_ALPHA_EQUATION_ADD, Constants.GL_ALPHA_EQUATION_ADD);
        this.engine._cacheRenderPipeline.setAlphaBlendEnabled(false);
        this.engine._cacheRenderPipeline.setAlphaBlendFactors([null, null, null, null], [null, null]);
        this.engine._cacheRenderPipeline.setWriteMask(0xf);
        this.engine._cacheRenderPipeline.resetStencilState();
        this.engine._cacheRenderPipeline.setDepthStencilFormat(WebGPUConstants.TextureFormat.Depth24PlusStencil8);
        if (this.engine._stencilStateComposer.stencilMaterial) {
            this.engine._stencilStateComposer.stencilMaterial.enabled = false;
            this.engine._stencilStateComposer.stencilMaterial.funcRef = 0;
        }

        this.lastProgram = null;
    }

    destroy() {
        for (const key in this.cache) {
            this.cache[key].destroy();
        }
    }

    resetProgram() {
        for (const key in this.cache) {
            this.cache[key].resetUniformBuffers();
        }
    }
}
