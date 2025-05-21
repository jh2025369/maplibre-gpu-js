import type { Map } from '../map';
import type { IControl } from './control';
import type { TerrainSpecification } from '@maplibre/maplibre-gl-style-spec';
/**
 * A `TerrainControl` control contains a button for turning the terrain on and off.
 *
 * @group Markers and Controls
 *
 * @example
 * ```ts
 * let map = new Map({TerrainControl: false})
 *     .addControl(new TerrainControl({
 *         source: "terrain"
 *     }));
 * ```
 */
export declare class TerrainControl implements IControl {
    options: TerrainSpecification;
    _map: Map;
    _container: HTMLElement;
    _terrainButton: HTMLButtonElement;
    constructor(options: TerrainSpecification);
    /** {@inheritDoc IControl.onAdd} */
    onAdd(map: Map): HTMLElement;
    /** {@inheritDoc IControl.onRemove} */
    onRemove(): void;
    _toggleTerrain: () => void;
    _updateTerrainIcon: () => void;
}
