import type { Painter } from './painter';
import type { Tile } from '../source/tile';
import { Terrain } from './terrain';
/**
 * Redraw the Depth Framebuffer
 * @param painter - the painter
 * @param terrain - the terrain
 */
declare function drawDepth(painter: Painter, terrain: Terrain): void;
/**
 * Redraw the Coords Framebuffers
 * @param painter - the painter
 * @param terrain - the terrain
 */
declare function drawCoords(painter: Painter, terrain: Terrain): void;
declare function drawTerrain(painter: Painter, terrain: Terrain, tiles: Array<Tile>): void;
export { drawTerrain, drawDepth, drawCoords };
