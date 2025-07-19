import { SymbolBucket } from '../data/bucket/symbol_bucket';
import type { CanonicalTileID } from '../source/tile_id';
import type { TextJustify } from './shaping';
import type { StyleImage } from '../style/style_image';
import type { StyleGlyph } from '../style/style_glyph';
import type { ImagePosition } from '../render/image_atlas';
import type { GlyphPosition } from '../render/glyph_atlas';
import { TextAnchor } from '../style/style_layer/variable_text_anchor';
export declare function performSymbolLayout(args: {
    bucket: SymbolBucket;
    glyphMap: {
        [_: string]: {
            [x: number]: StyleGlyph;
        };
    };
    glyphPositions: {
        [_: string]: {
            [x: number]: GlyphPosition;
        };
    };
    imageMap: {
        [_: string]: StyleImage;
    };
    imagePositions: {
        [_: string]: ImagePosition;
    };
    showCollisionBoxes: boolean;
    canonical: CanonicalTileID;
}): void;
export declare function getAnchorJustification(anchor: TextAnchor): TextJustify;
