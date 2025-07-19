import { Struct, StructArray } from '../util/struct_array';
import Point from '@mapbox/point-geometry';
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Int16[2]
 *
 */
declare class StructArrayLayout2i4 extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number): number;
    emplace(i: number, v0: number, v1: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Float32[3]
 *
 */
declare class StructArrayLayout3f12 extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number): number;
    emplace(i: number, v0: number, v1: number, v2: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Float32[4]
 *
 */
declare class StructArrayLayout4f16 extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number, v3: number): number;
    emplace(i: number, v0: number, v1: number, v2: number, v3: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Float32[2]
 *
 */
declare class StructArrayLayout2f8 extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number): number;
    emplace(i: number, v0: number, v1: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Float32[2]
 * [8]: Float32[4]
 *
 */
declare class StructArrayLayout2f4f24 extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
    emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Float32[2]
 * [8]: Uint8[4]
 *
 */
declare class StructArrayLayout2f4ub12 extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
    emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Uint16[10]
 *
 */
declare class StructArrayLayout10ui20 extends StructArray {
    uint8: Uint8Array;
    uint16: Uint16Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number): number;
    emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Int16[4]
 * [8]: Uint16[4]
 * [16]: Int16[4]
 *
 */
declare class StructArrayLayout4i4ui4i24 extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;
    uint16: Uint16Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number): number;
    emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Uint32[1]
 *
 */
declare class StructArrayLayout1ul4 extends StructArray {
    uint8: Uint8Array;
    uint32: Uint32Array;
    _refreshViews(): void;
    emplaceBack(v0: number): number;
    emplace(i: number, v0: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Int16[6]
 * [12]: Uint32[1]
 * [16]: Uint16[2]
 *
 */
declare class StructArrayLayout6i1ul2ui20 extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;
    uint32: Uint32Array;
    uint16: Uint16Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number): number;
    emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Int16[2]
 * [4]: Int16[2]
 * [8]: Int16[2]
 *
 */
declare class StructArrayLayout2i2i2i12 extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
    emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Float32[2]
 * [8]: Float32[1]
 * [12]: Int16[2]
 *
 */
declare class StructArrayLayout2f1f2i16 extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;
    int16: Int16Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number): number;
    emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Uint8[2]
 * [4]: Float32[2]
 *
 */
declare class StructArrayLayout2ub2f12 extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number, v3: number): number;
    emplace(i: number, v0: number, v1: number, v2: number, v3: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Uint16[3]
 *
 */
declare class StructArrayLayout3ui6 extends StructArray {
    uint8: Uint8Array;
    uint16: Uint16Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number): number;
    emplace(i: number, v0: number, v1: number, v2: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Int16[2]
 * [4]: Uint16[2]
 * [8]: Uint32[3]
 * [20]: Uint16[3]
 * [28]: Float32[2]
 * [36]: Uint8[3]
 * [40]: Uint32[1]
 * [44]: Int16[1]
 *
 */
declare class StructArrayLayout2i2ui3ul3ui2f3ub1ul1i48 extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;
    uint16: Uint16Array;
    uint32: Uint32Array;
    float32: Float32Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number): number;
    emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Int16[8]
 * [16]: Uint16[15]
 * [48]: Uint32[1]
 * [52]: Float32[2]
 * [60]: Uint16[2]
 *
 */
declare class StructArrayLayout8i15ui1ul2f2ui64 extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;
    uint16: Uint16Array;
    uint32: Uint32Array;
    float32: Float32Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number, v18: number, v19: number, v20: number, v21: number, v22: number, v23: number, v24: number, v25: number, v26: number, v27: number): number;
    emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number, v18: number, v19: number, v20: number, v21: number, v22: number, v23: number, v24: number, v25: number, v26: number, v27: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Float32[1]
 *
 */
declare class StructArrayLayout1f4 extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;
    _refreshViews(): void;
    emplaceBack(v0: number): number;
    emplace(i: number, v0: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Int16[3]
 *
 */
declare class StructArrayLayout3i6 extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number): number;
    emplace(i: number, v0: number, v1: number, v2: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Uint16[1]
 * [4]: Float32[2]
 *
 */
declare class StructArrayLayout1ui2f12 extends StructArray {
    uint8: Uint8Array;
    uint16: Uint16Array;
    float32: Float32Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number): number;
    emplace(i: number, v0: number, v1: number, v2: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Uint32[1]
 * [4]: Uint16[2]
 *
 */
declare class StructArrayLayout1ul2ui8 extends StructArray {
    uint8: Uint8Array;
    uint32: Uint32Array;
    uint16: Uint16Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number, v2: number): number;
    emplace(i: number, v0: number, v1: number, v2: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Uint16[2]
 *
 */
declare class StructArrayLayout2ui4 extends StructArray {
    uint8: Uint8Array;
    uint16: Uint16Array;
    _refreshViews(): void;
    emplaceBack(v0: number, v1: number): number;
    emplace(i: number, v0: number, v1: number): number;
}
/**
 * @internal
 * Implementation of the StructArray layout:
 * [0]: Uint16[1]
 *
 */
declare class StructArrayLayout1ui2 extends StructArray {
    uint8: Uint8Array;
    uint16: Uint16Array;
    _refreshViews(): void;
    emplaceBack(v0: number): number;
    emplace(i: number, v0: number): number;
}
/** @internal */
declare class CollisionBoxStruct extends Struct {
    _structArray: CollisionBoxArray;
    get anchorPointX(): number;
    get anchorPointY(): number;
    get x1(): number;
    get y1(): number;
    get x2(): number;
    get y2(): number;
    get featureIndex(): number;
    get sourceLayerIndex(): number;
    get bucketIndex(): number;
    get anchorPoint(): Point;
}
export type CollisionBox = CollisionBoxStruct;
/** @internal */
export declare class CollisionBoxArray extends StructArrayLayout6i1ul2ui20 {
    /**
     * Return the CollisionBoxStruct at the given location in the array.
     * @param index The index of the element.
     */
    get(index: number): CollisionBoxStruct;
}
/** @internal */
declare class PlacedSymbolStruct extends Struct {
    _structArray: PlacedSymbolArray;
    get anchorX(): number;
    get anchorY(): number;
    get glyphStartIndex(): number;
    get numGlyphs(): number;
    get vertexStartIndex(): number;
    get lineStartIndex(): number;
    get lineLength(): number;
    get segment(): number;
    get lowerSize(): number;
    get upperSize(): number;
    get lineOffsetX(): number;
    get lineOffsetY(): number;
    get writingMode(): number;
    get placedOrientation(): number;
    set placedOrientation(x: number);
    get hidden(): number;
    set hidden(x: number);
    get crossTileID(): number;
    set crossTileID(x: number);
    get associatedIconIndex(): number;
}
export type PlacedSymbol = PlacedSymbolStruct;
/** @internal */
export declare class PlacedSymbolArray extends StructArrayLayout2i2ui3ul3ui2f3ub1ul1i48 {
    /**
     * Return the PlacedSymbolStruct at the given location in the array.
     * @param index The index of the element.
     */
    get(index: number): PlacedSymbolStruct;
}
/** @internal */
declare class SymbolInstanceStruct extends Struct {
    _structArray: SymbolInstanceArray;
    get anchorX(): number;
    get anchorY(): number;
    get rightJustifiedTextSymbolIndex(): number;
    get centerJustifiedTextSymbolIndex(): number;
    get leftJustifiedTextSymbolIndex(): number;
    get verticalPlacedTextSymbolIndex(): number;
    get placedIconSymbolIndex(): number;
    get verticalPlacedIconSymbolIndex(): number;
    get key(): number;
    get textBoxStartIndex(): number;
    get textBoxEndIndex(): number;
    get verticalTextBoxStartIndex(): number;
    get verticalTextBoxEndIndex(): number;
    get iconBoxStartIndex(): number;
    get iconBoxEndIndex(): number;
    get verticalIconBoxStartIndex(): number;
    get verticalIconBoxEndIndex(): number;
    get featureIndex(): number;
    get numHorizontalGlyphVertices(): number;
    get numVerticalGlyphVertices(): number;
    get numIconVertices(): number;
    get numVerticalIconVertices(): number;
    get useRuntimeCollisionCircles(): number;
    get crossTileID(): number;
    set crossTileID(x: number);
    get textBoxScale(): number;
    get collisionCircleDiameter(): number;
    get textAnchorOffsetStartIndex(): number;
    get textAnchorOffsetEndIndex(): number;
}
export type SymbolInstance = SymbolInstanceStruct;
/** @internal */
export declare class SymbolInstanceArray extends StructArrayLayout8i15ui1ul2f2ui64 {
    /**
     * Return the SymbolInstanceStruct at the given location in the array.
     * @param index The index of the element.
     */
    get(index: number): SymbolInstanceStruct;
}
/** @internal */
export declare class GlyphOffsetArray extends StructArrayLayout1f4 {
    getoffsetX(index: number): number;
}
/** @internal */
export declare class SymbolLineVertexArray extends StructArrayLayout3i6 {
    getx(index: number): number;
    gety(index: number): number;
    gettileUnitDistanceFromAnchor(index: number): number;
}
/** @internal */
declare class TextAnchorOffsetStruct extends Struct {
    _structArray: TextAnchorOffsetArray;
    get textAnchor(): number;
    get textOffset0(): number;
    get textOffset1(): number;
}
export type TextAnchorOffset = TextAnchorOffsetStruct;
/** @internal */
export declare class TextAnchorOffsetArray extends StructArrayLayout1ui2f12 {
    /**
     * Return the TextAnchorOffsetStruct at the given location in the array.
     * @param index The index of the element.
     */
    get(index: number): TextAnchorOffsetStruct;
}
/** @internal */
declare class FeatureIndexStruct extends Struct {
    _structArray: FeatureIndexArray;
    get featureIndex(): number;
    get sourceLayerIndex(): number;
    get bucketIndex(): number;
}
export type FeatureIndex = FeatureIndexStruct;
/** @internal */
export declare class FeatureIndexArray extends StructArrayLayout1ul2ui8 {
    /**
     * Return the FeatureIndexStruct at the given location in the array.
     * @param index The index of the element.
     */
    get(index: number): FeatureIndexStruct;
}
export declare class PosArray extends StructArrayLayout2i4 {
}
export declare class Pos3dArray extends StructArrayLayout3f12 {
}
export declare class RasterBoundsArray extends StructArrayLayout4f16 {
}
export declare class CircleLayoutArray extends StructArrayLayout2f8 {
}
export declare class FillLayoutArray extends StructArrayLayout2f8 {
}
export declare class FillExtrusionLayoutArray extends StructArrayLayout2f4f24 {
}
export declare class HeatmapLayoutArray extends StructArrayLayout2f8 {
}
export declare class LineLayoutArray extends StructArrayLayout2f4ub12 {
}
export declare class LineExtLayoutArray extends StructArrayLayout2f8 {
}
export declare class PatternLayoutArray extends StructArrayLayout10ui20 {
}
export declare class SymbolLayoutArray extends StructArrayLayout4i4ui4i24 {
}
export declare class SymbolDynamicLayoutArray extends StructArrayLayout3f12 {
}
export declare class SymbolOpacityArray extends StructArrayLayout1ul4 {
}
export declare class CollisionBoxLayoutArray extends StructArrayLayout2i2i2i12 {
}
export declare class CollisionCircleLayoutArray extends StructArrayLayout2f1f2i16 {
}
export declare class CollisionVertexArray extends StructArrayLayout2ub2f12 {
}
export declare class QuadTriangleArray extends StructArrayLayout3ui6 {
}
export declare class TriangleIndexArray extends StructArrayLayout3ui6 {
}
export declare class LineIndexArray extends StructArrayLayout2ui4 {
}
export declare class LineStripIndexArray extends StructArrayLayout1ui2 {
}
export { StructArrayLayout2i4, StructArrayLayout3f12, StructArrayLayout4f16, StructArrayLayout2f8, StructArrayLayout2f4f24, StructArrayLayout2f4ub12, StructArrayLayout10ui20, StructArrayLayout4i4ui4i24, StructArrayLayout1ul4, StructArrayLayout6i1ul2ui20, StructArrayLayout2i2i2i12, StructArrayLayout2f1f2i16, StructArrayLayout2ub2f12, StructArrayLayout3ui6, StructArrayLayout2i2ui3ul3ui2f3ub1ul1i48, StructArrayLayout8i15ui1ul2f2ui64, StructArrayLayout1f4, StructArrayLayout3i6, StructArrayLayout1ui2f12, StructArrayLayout1ul2ui8, StructArrayLayout2ui4, StructArrayLayout1ui2 };
