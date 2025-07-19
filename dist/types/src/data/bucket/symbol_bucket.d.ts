import { SymbolLayoutArray, SymbolDynamicLayoutArray, SymbolOpacityArray, CollisionVertexArray, PlacedSymbolArray, SymbolInstanceArray, GlyphOffsetArray, SymbolLineVertexArray, TextAnchorOffsetArray } from '../array_types.g';
import Point from '@mapbox/point-geometry';
import { SegmentVector } from '../segment';
import { ProgramConfigurationSet } from '../program_configuration';
import { TriangleIndexArray, LineIndexArray } from '../index_array_type';
import { WritingMode } from '../../symbol/shaping';
import { Anchor } from '../../symbol/anchor';
import { Formatted, ResolvedImage } from '@maplibre/maplibre-gl-style-spec';
import { mat4 } from 'gl-matrix';
import type { CanonicalTileID } from '../../source/tile_id';
import type { Bucket, BucketParameters, IndexedFeature, PopulateParameters } from '../bucket';
import type { CollisionBoxArray, SymbolInstance } from '../array_types.g';
import type { StructArray, StructArrayMember } from '../../util/struct_array';
import type { SymbolStyleLayer } from '../../style/style_layer/symbol_style_layer';
import type { WebGPUEngine } from 'core/Engines/webgpuEngine';
import type { SymbolQuad } from '../../symbol/quads';
import type { SizeData } from '../../symbol/symbol_size';
import type { FeatureStates } from '../../source/source_state';
import type { ImagePosition } from '../../render/image_atlas';
import type { VectorTileLayer } from '@mapbox/vector-tile';
import { DataBuffer } from 'core/Buffers/dataBuffer';
export type SingleCollisionBox = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    anchorPointX: number;
    anchorPointY: number;
};
export type CollisionArrays = {
    textBox?: SingleCollisionBox;
    verticalTextBox?: SingleCollisionBox;
    iconBox?: SingleCollisionBox;
    verticalIconBox?: SingleCollisionBox;
    textFeatureIndex?: number;
    verticalTextFeatureIndex?: number;
    iconFeatureIndex?: number;
    verticalIconFeatureIndex?: number;
};
export type SymbolFeature = {
    sortKey: number | void;
    text: Formatted | void;
    icon: ResolvedImage;
    index: number;
    sourceLayerIndex: number;
    geometry: Array<Array<Point>>;
    properties: any;
    type: 'Unknown' | 'Point' | 'LineString' | 'Polygon';
    id?: any;
};
export type SortKeyRange = {
    sortKey: number;
    symbolInstanceStart: number;
    symbolInstanceEnd: number;
};
declare function addDynamicAttributes(dynamicLayoutVertexArray: StructArray, p: Point, angle: number): void;
export declare class SymbolBuffers {
    layoutVertexArray: SymbolLayoutArray;
    layoutVertexBuffer: DataBuffer;
    indexArray: TriangleIndexArray;
    indexBuffer: DataBuffer;
    programConfigurations: ProgramConfigurationSet<SymbolStyleLayer>;
    segments: SegmentVector;
    dynamicLayoutVertexArray: SymbolDynamicLayoutArray;
    dynamicLayoutVertexBuffer: DataBuffer;
    opacityVertexArray: SymbolOpacityArray;
    opacityVertexBuffer: DataBuffer;
    hasVisibleVertices: boolean;
    collisionVertexArray: CollisionVertexArray;
    collisionVertexBuffer: DataBuffer;
    placedSymbolArray: PlacedSymbolArray;
    constructor(programConfigurations: ProgramConfigurationSet<SymbolStyleLayer>);
    isEmpty(): boolean;
    upload(engine: WebGPUEngine, dynamicIndexBuffer: boolean, upload?: boolean, update?: boolean): void;
    destroy(): void;
}
declare class CollisionBuffers {
    layoutVertexArray: StructArray;
    layoutAttributes: Array<StructArrayMember>;
    layoutVertexBuffer: DataBuffer;
    indexArray: TriangleIndexArray | LineIndexArray;
    indexBuffer: DataBuffer;
    segments: SegmentVector;
    collisionVertexArray: CollisionVertexArray;
    collisionVertexBuffer: DataBuffer;
    constructor(LayoutArray: {
        new (...args: any): StructArray;
    }, layoutAttributes: Array<StructArrayMember>, IndexArray: {
        new (...args: any): TriangleIndexArray | LineIndexArray;
    });
    upload(engine: WebGPUEngine): void;
    destroy(): void;
}
/**
 * @internal
 * Unlike other buckets, which simply implement #addFeature with type-specific
 * logic for (essentially) triangulating feature geometries, SymbolBucket
 * requires specialized behavior:
 *
 * 1. WorkerTile#parse(), the logical owner of the bucket creation process,
 *    calls SymbolBucket#populate(), which resolves text and icon tokens on
 *    each feature, adds each glyphs and symbols needed to the passed-in
 *    collections options.glyphDependencies and options.iconDependencies, and
 *    stores the feature data for use in subsequent step (this.features).
 *
 * 2. WorkerTile asynchronously requests from the main thread all of the glyphs
 *    and icons needed (by this bucket and any others). When glyphs and icons
 *    have been received, the WorkerTile creates a CollisionIndex and invokes:
 *
 * 3. performSymbolLayout(bucket, stacks, icons) perform texts shaping and
 *    layout on a Symbol Bucket. This step populates:
 *      `this.symbolInstances`: metadata on generated symbols
 *      `this.collisionBoxArray`: collision data for use by foreground
 *      `this.text`: SymbolBuffers for text symbols
 *      `this.icons`: SymbolBuffers for icons
 *      `this.iconCollisionBox`: Debug SymbolBuffers for icon collision boxes
 *      `this.textCollisionBox`: Debug SymbolBuffers for text collision boxes
 *    The results are sent to the foreground for rendering
 *
 * 4. placement.ts is run on the foreground,
 *    and uses the CollisionIndex along with current camera settings to determine
 *    which symbols can actually show on the map. Collided symbols are hidden
 *    using a dynamic "OpacityVertexArray".
 */
export declare class SymbolBucket implements Bucket {
    static MAX_GLYPHS: number;
    static addDynamicAttributes: typeof addDynamicAttributes;
    collisionBoxArray: CollisionBoxArray;
    zoom: number;
    overscaling: number;
    layers: Array<SymbolStyleLayer>;
    layerIds: Array<string>;
    stateDependentLayers: Array<SymbolStyleLayer>;
    stateDependentLayerIds: Array<string>;
    index: number;
    sdfIcons: boolean;
    iconsInText: boolean;
    iconsNeedLinear: boolean;
    bucketInstanceId: number;
    justReloaded: boolean;
    hasPattern: boolean;
    textSizeData: SizeData;
    iconSizeData: SizeData;
    glyphOffsetArray: GlyphOffsetArray;
    lineVertexArray: SymbolLineVertexArray;
    features: Array<SymbolFeature>;
    symbolInstances: SymbolInstanceArray;
    textAnchorOffsets: TextAnchorOffsetArray;
    collisionArrays: Array<CollisionArrays>;
    sortKeyRanges: Array<SortKeyRange>;
    pixelRatio: number;
    tilePixelRatio: number;
    compareText: {
        [_: string]: Array<Point>;
    };
    fadeStartTime: number;
    sortFeaturesByKey: boolean;
    sortFeaturesByY: boolean;
    canOverlap: boolean;
    sortedAngle: number;
    featureSortOrder: Array<number>;
    collisionCircleArray: Array<number>;
    placementInvProjMatrix: mat4;
    placementViewportMatrix: mat4;
    text: SymbolBuffers;
    icon: SymbolBuffers;
    textCollisionBox: CollisionBuffers;
    iconCollisionBox: CollisionBuffers;
    uploaded: boolean;
    sourceLayerIndex: number;
    sourceID: string;
    symbolInstanceIndexes: Array<number>;
    writingModes: WritingMode[];
    allowVerticalPlacement: boolean;
    hasRTLText: boolean;
    engine: WebGPUEngine;
    constructor(options: BucketParameters<SymbolStyleLayer>);
    createArrays(): void;
    private calculateGlyphDependencies;
    populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID): void;
    update(states: FeatureStates, vtLayer: VectorTileLayer, imagePositions: {
        [_: string]: ImagePosition;
    }): void;
    isEmpty(): boolean;
    uploadPending(): boolean;
    upload(engine: WebGPUEngine): void;
    destroyDebugData(): void;
    destroy(): void;
    addToLineVertexArray(anchor: Anchor, line: any): {
        lineStartIndex: number;
        lineLength: number;
    };
    addSymbols(arrays: SymbolBuffers, quads: Array<SymbolQuad>, sizeVertex: any, lineOffset: [number, number], alongLine: boolean, feature: SymbolFeature, writingMode: WritingMode, labelAnchor: Anchor, lineStartIndex: number, lineLength: number, associatedIconIndex: number, canonical: CanonicalTileID): void;
    _addCollisionDebugVertex(layoutVertexArray: StructArray, collisionVertexArray: StructArray, point: Point, anchorX: number, anchorY: number, extrude: Point): any;
    addCollisionDebugVertices(x1: number, y1: number, x2: number, y2: number, arrays: CollisionBuffers, boxAnchorPoint: Point, symbolInstance: SymbolInstance): void;
    addDebugCollisionBoxes(startIndex: number, endIndex: number, symbolInstance: SymbolInstance, isText: boolean): void;
    generateCollisionDebugBuffers(): void;
    _deserializeCollisionBoxesForSymbol(collisionBoxArray: CollisionBoxArray, textStartIndex: number, textEndIndex: number, verticalTextStartIndex: number, verticalTextEndIndex: number, iconStartIndex: number, iconEndIndex: number, verticalIconStartIndex: number, verticalIconEndIndex: number): CollisionArrays;
    deserializeCollisionBoxes(collisionBoxArray: CollisionBoxArray): void;
    hasTextData(): boolean;
    hasIconData(): boolean;
    hasDebugData(): CollisionBuffers;
    hasTextCollisionBoxData(): boolean;
    hasIconCollisionBoxData(): boolean;
    addIndicesForPlacedSymbol(iconOrText: SymbolBuffers, placedSymbolIndex: number): void;
    getSortedSymbolIndexes(angle: number): any[];
    addToSortKeyRanges(symbolInstanceIndex: number, sortKey: number): void;
    sortFeatures(angle: number): void;
}
export { addDynamicAttributes };
