import { Tile } from './tile';
import type { FeatureState } from '@maplibre/maplibre-gl-style-spec';
export type FeatureStates = {
    [featureId: string]: FeatureState;
};
export type LayerFeatureStates = {
    [layer: string]: FeatureStates;
};
/**
 * @internal
 * SourceFeatureState manages the state and pending changes
 * to features in a source, separated by source layer.
 * stateChanges and deletedStates batch all changes to the tile (updates and removes, respectively)
 * between coalesce() events. addFeatureState() and removeFeatureState() also update their counterpart's
 * list of changes, such that coalesce() can apply the proper state changes while agnostic to the order of operations.
 * In deletedStates, all null's denote complete removal of state at that scope
*/
export declare class SourceFeatureState {
    state: LayerFeatureStates;
    stateChanges: LayerFeatureStates;
    deletedStates: {};
    constructor();
    updateState(sourceLayer: string, featureId: number | string, newState: any): void;
    removeFeatureState(sourceLayer: string, featureId?: number | string, key?: string): void;
    getState(sourceLayer: string, featureId: number | string): FeatureState;
    initializeTileState(tile: Tile, painter: any): void;
    coalesceChanges(tiles: {
        [_ in any]: Tile;
    }, painter: any): void;
}
