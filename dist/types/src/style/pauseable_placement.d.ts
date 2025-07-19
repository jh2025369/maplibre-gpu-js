import { Placement } from '../symbol/placement';
import type { Transform } from '../geo/transform';
import type { StyleLayer } from './style_layer';
import type { SymbolStyleLayer } from './style_layer/symbol_style_layer';
import type { Tile } from '../source/tile';
import type { BucketPart } from '../symbol/placement';
import { Terrain } from '../render/terrain';
declare class LayerPlacement {
    _sortAcrossTiles: boolean;
    _currentTileIndex: number;
    _currentPartIndex: number;
    _seenCrossTileIDs: {
        [k in string | number]: boolean;
    };
    _bucketParts: Array<BucketPart>;
    constructor(styleLayer: SymbolStyleLayer);
    continuePlacement(tiles: Array<Tile>, placement: Placement, showCollisionBoxes: boolean, styleLayer: StyleLayer, shouldPausePlacement: () => boolean): boolean;
}
export declare class PauseablePlacement {
    placement: Placement;
    _done: boolean;
    _currentPlacementIndex: number;
    _forceFullPlacement: boolean;
    _showCollisionBoxes: boolean;
    _inProgressLayer: LayerPlacement;
    constructor(transform: Transform, terrain: Terrain, order: Array<string>, forceFullPlacement: boolean, showCollisionBoxes: boolean, fadeDuration: number, crossSourceCollisions: boolean, prevPlacement?: Placement);
    isDone(): boolean;
    continuePlacement(order: Array<string>, layers: {
        [_: string]: StyleLayer;
    }, layerTiles: {
        [_: string]: Array<Tile>;
    }): void;
    commit(now: number): Placement;
}
export {};
