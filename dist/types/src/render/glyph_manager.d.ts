import { loadGlyphRange } from '../style/load_glyph_range';
import TinySDF from '@mapbox/tiny-sdf';
import type { StyleGlyph } from '../style/style_glyph';
import type { RequestManager } from '../util/request_manager';
import type { GetGlyphsResponse } from '../util/actor_messages';
type Entry = {
    glyphs: {
        [id: number]: StyleGlyph | null;
    };
    requests: {
        [range: number]: Promise<{
            [_: number]: StyleGlyph | null;
        }>;
    };
    ranges: {
        [range: number]: boolean | null;
    };
    tinySDF?: TinySDF;
};
export declare class GlyphManager {
    requestManager: RequestManager;
    localIdeographFontFamily: string | false;
    entries: {
        [stack: string]: Entry;
    };
    url: string;
    static loadGlyphRange: typeof loadGlyphRange;
    static TinySDF: typeof TinySDF;
    constructor(requestManager: RequestManager, localIdeographFontFamily?: string | false);
    setURL(url?: string | null): void;
    getGlyphs(glyphs: {
        [stack: string]: Array<number>;
    }): Promise<GetGlyphsResponse>;
    _getAndCacheGlyphsPromise(stack: string, id: number): Promise<{
        stack: string;
        id: number;
        glyph: StyleGlyph;
    }>;
    _doesCharSupportLocalGlyph(id: number): boolean;
    _tinySDF(entry: Entry, stack: string, id: number): StyleGlyph;
}
export {};
