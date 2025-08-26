import { CollisionIndex } from './collision_index';
import type { FeatureKey } from './collision_index';
import { mat4 } from 'gl-matrix';
import Point from '@mapbox/point-geometry';
import type { Transform } from '../geo/transform';
import type { StyleLayer } from '../style/style_layer';
import { PossiblyEvaluated } from '../style/properties';
import type { SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated } from '../style/style_layer/symbol_style_layer_properties.g';
import { OverlapMode } from '../style/style_layer/overlap_mode';
import type { Tile } from '../source/tile';
import { SymbolBucket, SingleCollisionBox } from '../data/bucket/symbol_bucket';
import type { CollisionBoxArray, SymbolInstance, TextAnchorOffset } from '../data/array_types.g';
import type { FeatureIndex } from '../data/feature_index';
import type { OverscaledTileID } from '../source/tile_id';
import { Terrain } from '../render/terrain';
import { TextAnchor } from '../style/style_layer/variable_text_anchor';
declare class OpacityState {
    opacity: number;
    placed: boolean;
    constructor(prevState: OpacityState, increment: number, placed: boolean, skipFade?: boolean | null);
    isHidden(): boolean;
}
declare class JointOpacityState {
    text: OpacityState;
    icon: OpacityState;
    constructor(prevState: JointOpacityState, increment: number, placedText: boolean, placedIcon: boolean, skipFade?: boolean | null);
    isHidden(): boolean;
}
declare class JointPlacement {
    text: boolean;
    icon: boolean;
    skipFade: boolean;
    constructor(text: boolean, icon: boolean, skipFade: boolean);
}
declare class CollisionCircleArray {
    invProjMatrix: mat4;
    viewportMatrix: mat4;
    circles: Array<number>;
    constructor();
}
export declare class RetainedQueryData {
    bucketInstanceId: number;
    featureIndex: FeatureIndex;
    sourceLayerIndex: number;
    bucketIndex: number;
    tileID: OverscaledTileID;
    featureSortOrder: Array<number>;
    constructor(bucketInstanceId: number, featureIndex: FeatureIndex, sourceLayerIndex: number, bucketIndex: number, tileID: OverscaledTileID);
}
type CollisionGroup = {
    ID: number;
    predicate?: (key: FeatureKey) => boolean;
};
declare class CollisionGroups {
    collisionGroups: {
        [groupName: string]: CollisionGroup;
    };
    maxGroupID: number;
    crossSourceCollisions: boolean;
    constructor(crossSourceCollisions: boolean);
    get(sourceID: string): CollisionGroup;
}
export type VariableOffset = {
    textOffset: [number, number];
    width: number;
    height: number;
    anchor: TextAnchor;
    textBoxScale: number;
    prevAnchor?: TextAnchor;
};
type TileLayerParameters = {
    bucket: SymbolBucket;
    layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>;
    posMatrix: mat4;
    textLabelPlaneMatrix: mat4;
    labelToScreenMatrix: mat4;
    scale: number;
    textPixelRatio: number;
    holdingForFade: boolean;
    collisionBoxArray: CollisionBoxArray;
    partiallyEvaluatedTextSize: {
        uSize: number;
        uSizeT: number;
    };
    collisionGroup: CollisionGroup;
};
export type BucketPart = {
    sortKey?: number | void;
    symbolInstanceStart: number;
    symbolInstanceEnd: number;
    parameters: TileLayerParameters;
};
export type CrossTileID = string | number;
export declare class Placement {
    transform: Transform;
    terrain: Terrain;
    collisionIndex: CollisionIndex;
    placements: {
        [_ in CrossTileID]: JointPlacement;
    };
    opacities: {
        [_ in CrossTileID]: JointOpacityState;
    };
    variableOffsets: {
        [_ in CrossTileID]: VariableOffset;
    };
    placedOrientations: {
        [_ in CrossTileID]: number;
    };
    commitTime: number;
    prevZoomAdjustment: number;
    lastPlacementChangeTime: number;
    stale: boolean;
    fadeDuration: number;
    retainedQueryData: {
        [_: number]: RetainedQueryData;
    };
    collisionGroups: CollisionGroups;
    prevPlacement: Placement;
    zoomAtLastRecencyCheck: number;
    collisionCircleArrays: {
        [k in any]: CollisionCircleArray;
    };
    constructor(transform: Transform, terrain: Terrain, fadeDuration: number, crossSourceCollisions: boolean, prevPlacement?: Placement);
    getBucketParts(results: Array<BucketPart>, styleLayer: StyleLayer, tile: Tile, sortAcrossTiles: boolean): void;
    attemptAnchorPlacement(textAnchorOffset: TextAnchorOffset, textBox: SingleCollisionBox, width: number, height: number, textBoxScale: number, rotateWithMap: boolean, pitchWithMap: boolean, textPixelRatio: number, posMatrix: mat4, collisionGroup: CollisionGroup, textOverlapMode: OverlapMode, symbolInstance: SymbolInstance, bucket: SymbolBucket, orientation: number, iconBox?: SingleCollisionBox | null, getElevation?: (x: number, y: number) => number): {
        shift: Point;
        placedGlyphBoxes: {
            box: Array<number>;
            offscreen: boolean;
        };
    };
    placeLayerBucketPart(bucketPart: BucketPart, seenCrossTileIDs: {
        [k in string | number]: boolean;
    }, showCollisionBoxes: boolean): void;
    markUsedJustification(bucket: SymbolBucket, placedAnchor: TextAnchor, symbolInstance: SymbolInstance, orientation: number): void;
    markUsedOrientation(bucket: SymbolBucket, orientation: number, symbolInstance: SymbolInstance): void;
    commit(now: number): void;
    updateLayerOpacities(styleLayer: StyleLayer, tiles: Array<Tile>): void;
    updateBucketOpacities(bucket: SymbolBucket, seenCrossTileIDs: {
        [k in string | number]: boolean;
    }, collisionBoxArray?: CollisionBoxArray | null): void;
    symbolFadeChange(now: number): number;
    zoomAdjustment(zoom: number): number;
    hasTransitions(now: number): boolean;
    stillRecent(now: number, zoom: number): boolean;
    setStale(): void;
}
export {};
