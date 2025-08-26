import { Painter } from './painter';
import { Tile } from '../source/tile';
import { OverscaledTileID } from '../source/tile_id';
import { Style } from '../style/style';
import { Terrain } from './terrain';
import { RenderPool } from './render_pool';
import type { StyleLayer } from '../style/style_layer';
import { InternalTexture } from 'core/index';
/**
 * @internal
 * A helper class to help define what should be rendered to texture and how
 */
export declare class RenderToTexture {
    painter: Painter;
    terrain: Terrain;
    pool: RenderPool;
    /**
     * coordsDescendingInv contains a list of all tiles which should be rendered for one render-to-texture tile
     * e.g. render 4 raster-tiles with size 256px to the 512px render-to-texture tile
     */
    _coordsDescendingInv: {
        [_: string]: {
            [_: string]: Array<OverscaledTileID>;
        };
    };
    /**
     * create a string representation of all to tiles rendered to render-to-texture tiles
     * this string representation is used to check if tile should be re-rendered.
     */
    _coordsDescendingInvStr: {
        [_: string]: {
            [_: string]: string;
        };
    };
    /**
     * store for render-stacks
     * a render stack is a set of layers which should be rendered into one texture
     * every stylesheet can have multiple stacks. A new stack is created if layers which should
     * not rendered to texture sit inbetween layers which should rendered to texture. e.g. hillshading or symbols
     */
    _stacks: Array<Array<string>>;
    /**
     * remember the previous processed layer to check if a new stack is needed
     */
    _prevType: string;
    /**
     * a list of tiles that can potentially rendered
     */
    _renderableTiles: Array<Tile>;
    /**
     * a list of tiles that should be rendered to screen in the next render-call
     */
    _rttTiles: Array<Tile>;
    /**
     * a list of all layer-ids which should be rendered
     */
    _renderableLayerIds: Array<string>;
    constructor(painter: Painter, terrain: Terrain);
    destruct(): void;
    getTexture(tile: Tile): InternalTexture;
    prepareForRender(style: Style, zoom: number): void;
    /**
     * due that switching textures is relatively slow, the render
     * layer-by-layer context is not practicable. To bypass this problem
     * this lines of code stack all layers and later render all at once.
     * Because of the stylesheet possibility to mixing render-to-texture layers
     * and 'live'-layers (f.e. symbols) it is necessary to create more stacks. For example
     * a symbol-layer is in between of fill-layers.
     * @param layer - the layer to render
     * @returns if true layer is rendered to texture, otherwise false
     */
    renderLayer(layer: StyleLayer): boolean;
}
