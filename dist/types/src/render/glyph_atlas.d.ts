import { AlphaImage } from '../util/image';
import type { GlyphMetrics } from '../style/style_glyph';
import type { GetGlyphsResponse } from '../util/actor_messages';
/**
 * A rectangle type with postion, width and height.
 */
export type Rect = {
    x: number;
    y: number;
    w: number;
    h: number;
};
/**
 * The glyph's position
 */
export type GlyphPosition = {
    rect: Rect;
    metrics: GlyphMetrics;
};
/**
 * The glyphs' positions
 */
export type GlyphPositions = {
    [_: string]: {
        [_: number]: GlyphPosition;
    };
};
export declare class GlyphAtlas {
    image: AlphaImage;
    positions: GlyphPositions;
    constructor(stacks: GetGlyphsResponse);
}
