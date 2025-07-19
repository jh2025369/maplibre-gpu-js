import type { StyleGlyph } from './style_glyph';
import type { RequestManager } from '../util/request_manager';
export declare function loadGlyphRange(fontstack: string, range: number, urlTemplate: string, requestManager: RequestManager): Promise<{
    [_: number]: StyleGlyph | null;
}>;
