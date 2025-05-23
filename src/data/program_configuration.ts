import {packUint8ToFloat} from '../shaders/encode_attribute';
import {Color, supportsPropertyExpression} from '@maplibre/maplibre-gl-style-spec';
import {register} from '../util/web_worker_transfer';
import {PossiblyEvaluatedPropertyValue} from '../style/properties';
import {StructArrayLayout1f4, StructArrayLayout2f8, StructArrayLayout4f16, PatternLayoutArray, StructArrayLayout2ui4} from './array_types.g';
import {clamp} from '../util/util';
import {patternAttributes} from './bucket/pattern_attributes';
import {EvaluationParameters} from '../style/evaluation_parameters';
import {FeaturePositionMap} from './feature_position_map';

import type {CanonicalTileID} from '../source/tile_id';
import type {TypedStyleLayer} from '../style/style_layer/typed_style_layer';
import type {CrossfadeParameters} from '../style/evaluation_parameters';
import type {StructArray, StructArrayMember} from '../util/struct_array';
import type {ImagePosition} from '../render/image_atlas';
import type {
    Feature,
    FeatureState,
    GlobalProperties,
    SourceExpression,
    CompositeExpression,
    FormattedSection
} from '@maplibre/maplibre-gl-style-spec';
import type {FeatureStates} from '../source/source_state';
import type {VectorTileLayer} from '@mapbox/vector-tile';
import {DataBuffer} from 'core/Buffers/dataBuffer';
import {WebGPUEngine} from 'core/Engines/webgpuEngine';
import {UniformBuffer} from 'core/Materials/uniformBuffer';
import {VertexBuffer} from 'core/Buffers/buffer';

export type BinderUniform = {
    name: string;
    property: string;
};

function packColor(color: Color): [number, number] {
    return [
        packUint8ToFloat(255 * color.r, 255 * color.g),
        packUint8ToFloat(255 * color.b, 255 * color.a)
    ];
}

/**
 *  `Binder` is the interface definition for the strategies for constructing,
 *  uploading, and binding paint property data as GLSL attributes. Most style-
 *  spec properties have a 1:1 relationship to shader attribute/uniforms, but
 *  some require multiple values per feature to be passed to the GPU, and in
 *  those cases we bind multiple attributes/uniforms.
 *
 *  It has three implementations, one for each of the three strategies we use:
 *
 *  * For _constant_ properties -- those whose value is a constant, or the constant
 *    result of evaluating a camera expression at a particular camera position -- we
 *    don't need a vertex attribute buffer, and instead use a uniform.
 *  * For data expressions, we use a vertex buffer with a single attribute value,
 *    the evaluated result of the source function for the given feature.
 *  * For composite expressions, we use a vertex buffer with two attributes: min and
 *    max values covering the range of zooms at which we expect the tile to be
 *    displayed. These values are calculated by evaluating the composite expression for
 *    the given feature at strategically chosen zoom levels. In addition to this
 *    attribute data, we also use a uniform value which the shader uses to interpolate
 *    between the min and max value at the final displayed zoom level. The use of a
 *    uniform allows us to cheaply update the value on every frame.
 *
 *  Note that the shader source varies depending on whether we're using a uniform or
 *  attribute. We dynamically compile shaders at runtime to accommodate this.
 */
interface AttributeBinder {
    populatePaintArray(
        length: number,
        feature: Feature,
        imagePositions: {[_: string]: ImagePosition},
        canonical?: CanonicalTileID,
        formattedSection?: FormattedSection
    ): void;
    updatePaintArray(
        start: number,
        length: number,
        feature: Feature,
        featureState: FeatureState,
        imagePositions: {[_: string]: ImagePosition}
    ): void;
    upload(a: WebGPUEngine): void;
    destroy(): void;
}

interface UniformBinder {
    uniformNames: Array<string>;
    setUniform(
        uniformBuffer: UniformBuffer,
        uniformName: string,
        globals: GlobalProperties,
        currentValue: PossiblyEvaluatedPropertyValue<any>
    ): void;
    setBinding(uniformBuffer: UniformBuffer, uniformName: string): void;
}

class ConstantBinder implements UniformBinder {
    value: unknown;
    type: string;
    uniformNames: Array<string>;

    constructor(value: unknown, names: Array<string>, type: string) {
        this.value = value;
        this.uniformNames = names.map(name => `u_${name}`);
        this.type = type;
    }

    setUniform(
        uniformBuffer: UniformBuffer,
        uniformName: string,
        globals: GlobalProperties,
        currentValue: PossiblyEvaluatedPropertyValue<unknown>
    ): void {
        this.type === 'color' ?
            uniformBuffer.updateDirectColor4(uniformName, currentValue.constantOr(this.value) as Color) :
            uniformBuffer.updateFloat(uniformName, currentValue.constantOr(this.value) as number);
    }

    setBinding(uniformBuffer: UniformBuffer, uniformName: string): void {
        this.type === 'color' ?
            uniformBuffer.addUniform(uniformName, 4) :
            uniformBuffer.addUniform(uniformName, 1);
    }
}

class CrossFadedConstantBinder implements UniformBinder {
    uniformNames: Array<string>;
    patternFrom: Array<number>;
    patternTo: Array<number>;
    pixelRatioFrom: number;
    pixelRatioTo: number;

    constructor(value: unknown, names: Array<string>) {
        this.uniformNames = names.map(name => `u_${name}`);
        this.patternFrom = null;
        this.patternTo = null;
        this.pixelRatioFrom = 1.0;
        this.pixelRatioTo = 1.0;
    }

    setConstantPatternPositions(posTo: ImagePosition, posFrom: ImagePosition) {
        this.pixelRatioFrom = posFrom.pixelRatio;
        this.pixelRatioTo = posTo.pixelRatio;
        this.patternFrom = posFrom.tlbr;
        this.patternTo = posTo.tlbr;
    }

    setUniform(uniformBuffer: UniformBuffer, uniformName: string, globals: GlobalProperties, currentValue: PossiblyEvaluatedPropertyValue<unknown>) {
        const pos =
            uniformName === 'u_pattern_to' ? this.patternTo :
                uniformName === 'u_pattern_from' ? this.patternFrom :
                    uniformName === 'u_pixel_ratio_to' ? this.pixelRatioTo :
                        uniformName === 'u_pixel_ratio_from' ? this.pixelRatioFrom : null;
        if (pos) {
            if (uniformName === 'u_pattern_to' || uniformName === 'u_pattern_from') {
                uniformBuffer.updateUniform(uniformName, pos as Array<number>, (pos as Array<number>).length);
            } else {
                uniformBuffer.updateFloat(uniformName, pos as number);
            }
        }
    }

    setBinding(uniformBuffer: UniformBuffer, uniformName: string): void {
        if (uniformName.substring(0, 9) === 'u_pattern') {
            uniformBuffer.addUniform(uniformName, 4);
        } else {
            uniformBuffer.addUniform(uniformName, 1);
        }
    }
}

class SourceExpressionBinder implements AttributeBinder {
    expression: SourceExpression;
    type: string;
    maxValue: number;
    byteStride: number;

    paintVertexArray: StructArray;
    paintVertexAttributes: Array<StructArrayMember>;
    paintVertexBuffer: DataBuffer;

    constructor(expression: SourceExpression, names: Array<string>, type: string, PaintVertexArray: {
        new (...args: any): StructArray;
    }) {
        this.expression = expression;
        this.type = type;
        this.maxValue = 0;
        this.byteStride = 0;
        this.paintVertexAttributes = names.map(name => {
            const components = type === 'color' ? 1 : 1;
            const result: StructArrayMember = {
                name: `a_${name}`,
                type: type === 'color' ? 'Uint32' : 'Float32',
                components,
                offset: this.byteStride
            };
            this.byteStride += components * 4;
            return result;
        });
        this.paintVertexArray = new PaintVertexArray();
    }

    populatePaintArray(newLength: number, feature: Feature, imagePositions: {[_: string]: ImagePosition}, canonical?: CanonicalTileID, formattedSection?: FormattedSection) {
        const start = this.paintVertexArray.length;
        const value = this.expression.evaluate(new EvaluationParameters(0), feature, {}, canonical, [], formattedSection);
        this.paintVertexArray.resize(newLength);
        this._setPaintValue(start, newLength, value);
    }

    updatePaintArray(start: number, end: number, feature: Feature, featureState: FeatureState) {
        const value = this.expression.evaluate({zoom: 0}, feature, featureState);
        this._setPaintValue(start, end, value);
    }

    _setPaintValue(start, end, value) {
        if (this.type === 'color') {
            const color = packColor(value);
            for (let i = start; i < end; i++) {
                this.paintVertexArray.emplace(i, color[0], color[1]);
            }
        } else {
            for (let i = start; i < end; i++) {
                this.paintVertexArray.emplace(i, value);
            }
            this.maxValue = Math.max(this.maxValue, Math.abs(value));
        }
    }

    upload(engine: WebGPUEngine) {
        if (this.paintVertexArray && this.paintVertexArray.arrayBuffer) {
            if (this.paintVertexBuffer && this.paintVertexBuffer.underlyingResource) {
                engine.updateDynamicVertexBuffer(this.paintVertexBuffer, this.paintVertexArray.arrayBuffer);
            } else {
                this.paintVertexBuffer = engine.createVertexBuffer(this.paintVertexArray.arrayBuffer);
            }
        }
    }

    destroy() {
        if (this.paintVertexBuffer) {
            this.paintVertexBuffer.underlyingResource.destroy();
        }
    }
}

class CompositeExpressionBinder implements AttributeBinder, UniformBinder {
    expression: CompositeExpression;
    uniformNames: Array<string>;
    type: string;
    useIntegerZoom: boolean;
    zoom: number;
    maxValue: number;
    byteStride: number;

    paintVertexArray: StructArray;
    paintVertexAttributes: Array<StructArrayMember>;
    paintVertexBuffer: DataBuffer;

    constructor(expression: CompositeExpression, names: Array<string>, type: string, useIntegerZoom: boolean, zoom: number, PaintVertexArray: {
        new (...args: any): StructArray;
    }) {
        this.expression = expression;
        this.uniformNames = names.map(name => `u_${name}_t`);
        this.type = type;
        this.useIntegerZoom = useIntegerZoom;
        this.zoom = zoom;
        this.maxValue = 0;
        this.byteStride = 0;
        this.paintVertexAttributes = names.map(name => {
            const components = type === 'color' ? 4 : 2;
            const result: StructArrayMember = {
                name: `a_${name}`,
                type: 'Float32',
                components,
                offset: this.byteStride
            };
            this.byteStride += components * 4;
            return result;
        });
        this.paintVertexArray = new PaintVertexArray();
    }

    populatePaintArray(newLength: number, feature: Feature, imagePositions: {[_: string]: ImagePosition}, canonical?: CanonicalTileID, formattedSection?: FormattedSection) {
        const min = this.expression.evaluate(new EvaluationParameters(this.zoom), feature, {}, canonical, [], formattedSection);
        const max = this.expression.evaluate(new EvaluationParameters(this.zoom + 1), feature, {}, canonical, [], formattedSection);
        const start = this.paintVertexArray.length;
        this.paintVertexArray.resize(newLength);
        this._setPaintValue(start, newLength, min, max);
    }

    updatePaintArray(start: number, end: number, feature: Feature, featureState: FeatureState) {
        const min = this.expression.evaluate({zoom: this.zoom}, feature, featureState);
        const max = this.expression.evaluate({zoom: this.zoom + 1}, feature, featureState);
        this._setPaintValue(start, end, min, max);
    }

    _setPaintValue(start, end, min, max) {
        if (this.type === 'color') {
            const minColor = packColor(min);
            const maxColor = packColor(max);
            for (let i = start; i < end; i++) {
                this.paintVertexArray.emplace(i, minColor[0], minColor[1], maxColor[0], maxColor[1]);
            }
        } else {
            for (let i = start; i < end; i++) {
                this.paintVertexArray.emplace(i, min, max);
            }
            this.maxValue = Math.max(this.maxValue, Math.abs(min), Math.abs(max));
        }
    }

    upload(engine: WebGPUEngine) {
        if (this.paintVertexArray && this.paintVertexArray.arrayBuffer) {
            if (this.paintVertexBuffer && this.paintVertexBuffer.underlyingResource) {
                engine.updateDynamicVertexBuffer(this.paintVertexBuffer, this.paintVertexArray.arrayBuffer);
            } else {
                this.paintVertexBuffer = engine.createVertexBuffer(this.paintVertexArray.arrayBuffer);
            }
        }
    }

    destroy() {
        if (this.paintVertexBuffer) {
            this.paintVertexBuffer.underlyingResource.destroy();
        }
    }

    setUniform(uniformBuffer: UniformBuffer, uniformName: string, globals: GlobalProperties): void {
        const currentZoom = this.useIntegerZoom ? Math.floor(globals.zoom) : globals.zoom;
        const factor = clamp(this.expression.interpolationFactor(currentZoom, this.zoom, this.zoom + 1), 0, 1);
        uniformBuffer.updateFloat(uniformName, factor);
    }

    setBinding(uniformBuffer: UniformBuffer, uniformName: string): void {
        uniformBuffer.addUniform(uniformName, 1);
    }
}

class CrossFadedCompositeBinder implements AttributeBinder {
    expression: CompositeExpression;
    type: string;
    useIntegerZoom: boolean;
    zoom: number;
    layerId: string;

    zoomInPaintVertexArray: StructArray;
    zoomOutPaintVertexArray: StructArray;
    zoomInPaintVertexBuffer: DataBuffer;
    zoomOutPaintVertexBuffer: DataBuffer;
    paintVertexAttributes: Array<StructArrayMember>;

    constructor(expression: CompositeExpression, type: string, useIntegerZoom: boolean, zoom: number, PaintVertexArray: {
        new (...args: any): StructArray;
    }, layerId: string) {
        this.expression = expression;
        this.type = type;
        this.useIntegerZoom = useIntegerZoom;
        this.zoom = zoom;
        this.layerId = layerId;

        this.zoomInPaintVertexArray = new PaintVertexArray();
        this.zoomOutPaintVertexArray = new PaintVertexArray();
    }

    populatePaintArray(length: number, feature: Feature, imagePositions: {[_: string]: ImagePosition}) {
        const start = this.zoomInPaintVertexArray.length;
        this.zoomInPaintVertexArray.resize(length);
        this.zoomOutPaintVertexArray.resize(length);
        this._setPaintValues(start, length, feature.patterns && feature.patterns[this.layerId], imagePositions);
    }

    updatePaintArray(start: number, end: number, feature: Feature, featureState: FeatureState, imagePositions: {[_: string]: ImagePosition}) {
        this._setPaintValues(start, end, feature.patterns && feature.patterns[this.layerId], imagePositions);
    }

    _setPaintValues(start, end, patterns, positions) {
        if (!positions || !patterns) return;

        const {min, mid, max} = patterns;
        const imageMin = positions[min];
        const imageMid = positions[mid];
        const imageMax = positions[max];
        if (!imageMin || !imageMid || !imageMax) return;

        // We populate two paint arrays because, for cross-faded properties, we don't know which direction
        // we're cross-fading to at layout time. In order to keep vertex attributes to a minimum and not pass
        // unnecessary vertex data to the shaders, we determine which to upload at draw time.
        for (let i = start; i < end; i++) {
            this.zoomInPaintVertexArray.emplace(i,
                imageMid.tl[0], imageMid.tl[1], imageMid.br[0], imageMid.br[1],
                imageMin.tl[0], imageMin.tl[1], imageMin.br[0], imageMin.br[1],
                imageMid.pixelRatio,
                imageMin.pixelRatio,
            );
            this.zoomOutPaintVertexArray.emplace(i,
                imageMid.tl[0], imageMid.tl[1], imageMid.br[0], imageMid.br[1],
                imageMax.tl[0], imageMax.tl[1], imageMax.br[0], imageMax.br[1],
                imageMid.pixelRatio,
                imageMax.pixelRatio,
            );
        }
    }

    upload(engine: WebGPUEngine) {
        if (this.zoomInPaintVertexArray && this.zoomInPaintVertexArray.arrayBuffer && this.zoomOutPaintVertexArray && this.zoomOutPaintVertexArray.arrayBuffer) {
            this.zoomInPaintVertexBuffer = engine.createVertexBuffer(this.zoomInPaintVertexArray.arrayBuffer);
            this.zoomOutPaintVertexBuffer = engine.createVertexBuffer(this.zoomOutPaintVertexArray.arrayBuffer);
        }
    }

    destroy() {
        if (this.zoomOutPaintVertexBuffer) this.zoomOutPaintVertexBuffer.underlyingResource.destroy();
        if (this.zoomInPaintVertexBuffer) this.zoomInPaintVertexBuffer.underlyingResource.destroy();
    }
}

/**
 * @internal
 * ProgramConfiguration contains the logic for binding style layer properties and tile
 * layer feature data into GL program uniforms and vertex attributes.
 *
 * Non-data-driven property values are bound to shader uniforms. Data-driven property
 * values are bound to vertex attributes. In order to support a uniform GLSL syntax over
 * both, [Mapbox GL Shaders](https://github.com/mapbox/mapbox-gl-shaders) defines a `#pragma`
 * abstraction, which ProgramConfiguration is responsible for implementing. At runtime,
 * it examines the attributes of a particular layer, combines this with fixed knowledge
 * about how layers of the particular type are implemented, and determines which uniforms
 * and vertex attributes will be required. It can then substitute the appropriate text
 * into the shader source code, create and link a program, and bind the uniforms and
 * vertex attributes in preparation for drawing.
 *
 * When a vector tile is parsed, this same configuration information is used to
 * populate the attribute buffers needed for data-driven styling using the zoom
 * level and feature property data.
 */
export class ProgramConfiguration {
    binders: {[_: string]: AttributeBinder | UniformBinder};
    cacheKey: string;

    _buffers: Array<VertexBuffer>;

    constructor(layer: TypedStyleLayer, zoom: number, filterProperties: (_: string) => boolean) {
        this.binders = {};
        this._buffers = [];

        const keys = [];

        for (const property in layer.paint._values) {
            if (!filterProperties(property)) continue;
            const value = (layer.paint as any).get(property);
            if (!(value instanceof PossiblyEvaluatedPropertyValue) || !supportsPropertyExpression(value.property.specification)) {
                continue;
            }
            const names = paintAttributeNames(property, layer.type);
            const expression = value.value;
            const type = value.property.specification.type;
            const useIntegerZoom = (value.property as any).useIntegerZoom;
            const propType = value.property.specification['property-type'];
            const isCrossFaded = propType === 'cross-faded' || propType === 'cross-faded-data-driven';

            if (expression.kind === 'constant') {
                this.binders[property] = isCrossFaded ?
                    new CrossFadedConstantBinder(expression.value, names) :
                    new ConstantBinder(expression.value, names, type);
                keys.push(`/u_${property}`);

            } else if (expression.kind === 'source' || isCrossFaded) {
                const StructArrayLayout = layoutType(property, type, 'source');
                this.binders[property] = isCrossFaded ?
                    new CrossFadedCompositeBinder(expression as CompositeExpression, type, useIntegerZoom, zoom, StructArrayLayout, layer.id) :
                    new SourceExpressionBinder(expression as SourceExpression, names, type, StructArrayLayout);
                keys.push(`/a_${property}`);

            } else {
                const StructArrayLayout = layoutType(property, type, 'composite');
                this.binders[property] = new CompositeExpressionBinder(expression, names, type, useIntegerZoom, zoom, StructArrayLayout);
                keys.push(`/z_${property}`);
            }
        }

        this.cacheKey = keys.sort().join('');
    }

    getMaxValue(property: string): number {
        const binder = this.binders[property];
        return binder instanceof SourceExpressionBinder || binder instanceof CompositeExpressionBinder ? binder.maxValue : 0;
    }

    populatePaintArrays(newLength: number, feature: Feature, imagePositions: {[_: string]: ImagePosition}, canonical?: CanonicalTileID, formattedSection?: FormattedSection) {
        for (const property in this.binders) {
            const binder = this.binders[property];
            if (binder instanceof SourceExpressionBinder || binder instanceof CompositeExpressionBinder || binder instanceof CrossFadedCompositeBinder)
                (binder as AttributeBinder).populatePaintArray(newLength, feature, imagePositions, canonical, formattedSection);
        }
    }
    setConstantPatternPositions(posTo: ImagePosition, posFrom: ImagePosition) {
        for (const property in this.binders) {
            const binder = this.binders[property];
            if (binder instanceof CrossFadedConstantBinder)
                binder.setConstantPatternPositions(posTo, posFrom);
        }
    }

    updatePaintArrays(
        featureStates: FeatureStates,
        featureMap: FeaturePositionMap,
        vtLayer: VectorTileLayer,
        layer: TypedStyleLayer,
        imagePositions: {[_: string]: ImagePosition}
    ): boolean {
        let dirty: boolean = false;
        for (const id in featureStates) {
            const positions = featureMap.getPositions(id);

            for (const pos of positions) {
                const feature = vtLayer.feature(pos.index);

                for (const property in this.binders) {
                    const binder = this.binders[property];
                    if ((binder instanceof SourceExpressionBinder || binder instanceof CompositeExpressionBinder ||
                         binder instanceof CrossFadedCompositeBinder) && (binder as any).expression.isStateDependent === true) {
                        //AHM: Remove after https://github.com/mapbox/mapbox-gl-js/issues/6255
                        const value = (layer.paint as any).get(property);
                        (binder as any).expression = value.value;
                        (binder as AttributeBinder).updatePaintArray(pos.start, pos.end, feature, featureStates[id], imagePositions);
                        dirty = true;
                    }
                }
            }
        }
        return dirty;
    }

    defines(): Array<string> {
        const result = [];
        for (const property in this.binders) {
            const binder = this.binders[property];
            if (binder instanceof ConstantBinder || binder instanceof CrossFadedConstantBinder) {
                result.push(...binder.uniformNames.map(name => `#define HAS_UNIFORM_${name}`));
            }
        }
        return result;
    }

    getBinderAttributes(): Array<string> {
        const result = [];
        for (const property in this.binders) {
            const binder = this.binders[property];
            if (binder instanceof SourceExpressionBinder || binder instanceof CompositeExpressionBinder) {
                for (let i = 0; i < binder.paintVertexAttributes.length; i++) {
                    result.push(binder.paintVertexAttributes[i].name);
                }
            } else if (binder instanceof CrossFadedCompositeBinder) {
                for (let i = 0; i < patternAttributes.members.length; i++) {
                    result.push(patternAttributes.members[i].name);
                }
            }
        }
        return result;
    }

    getBinderUniforms(): Array<string> {
        const uniforms = [];
        for (const property in this.binders) {
            const binder = this.binders[property];
            if (binder instanceof ConstantBinder || binder instanceof CrossFadedConstantBinder || binder instanceof CompositeExpressionBinder) {
                for (const uniformName of binder.uniformNames) {
                    uniforms.push(uniformName);
                }
            }
        }
        return uniforms;
    }

    getPaintVertexBuffers(): Array<VertexBuffer> {
        return this._buffers;
    }

    getUniforms(uniformBuffer: UniformBuffer, uniformNames: string[]): Array<BinderUniform> {
        const uniforms = [];
        for (const name of uniformNames) {
            for (const property in this.binders) {
                const binder = this.binders[property];
                if (binder instanceof ConstantBinder || binder instanceof CrossFadedConstantBinder || binder instanceof CompositeExpressionBinder) {
                    if (binder.uniformNames.includes(name)) {
                        binder.setBinding(uniformBuffer, name);
                        uniforms.push({name, property});
                    }
                }
            }
        }
        return uniforms;
    }

    setUniforms(
        uniformBuffer: UniformBuffer,
        binderUniforms: Array<BinderUniform>,
        properties: any,
        globals: GlobalProperties
    ) {
        // Uniform state bindings are owned by the Program, but we set them
        // from within the ProgramConfiguraton's binder members.
        for (const {name, property} of binderUniforms) {
            (this.binders[property] as any).setUniform(uniformBuffer, name, globals, properties.get(property));
        }
    }

    updatePaintBuffers(engine: WebGPUEngine, crossfade?: CrossfadeParameters) {
        this._buffers = [];

        for (const property in this.binders) {
            const binder = this.binders[property];
            if (crossfade && binder instanceof CrossFadedCompositeBinder) {
                const patternVertexBuffer = crossfade.fromScale === 2 ? binder.zoomInPaintVertexBuffer : binder.zoomOutPaintVertexBuffer;
                // if (patternVertexBuffer) this._buffers.push(patternVertexBuffer);

            } else if ((binder instanceof SourceExpressionBinder || binder instanceof CompositeExpressionBinder) && binder.paintVertexBuffer) {
                for (const attr of binder.paintVertexAttributes) {
                    const vertexBuffer = new VertexBuffer(engine, binder.paintVertexBuffer, attr.name, {
                        updatable: true,
                        label: `Geometry_${attr.name}`,
                        offset: attr.offset,
                        stride: binder.byteStride,
                        size: attr.components,
                        type: attr.type === 'Float32' ? VertexBuffer.FLOAT : VertexBuffer.UNSIGNED_INT,
                        useBytes: true
                    });
                    this._buffers.push(vertexBuffer);
                }
            }
        }
    }

    upload(engine: WebGPUEngine) {
        for (const property in this.binders) {
            const binder = this.binders[property];
            if (binder instanceof SourceExpressionBinder || binder instanceof CompositeExpressionBinder || binder instanceof CrossFadedCompositeBinder)
                binder.upload(engine);
        }
        this.updatePaintBuffers(engine);
    }

    destroy() {
        for (const property in this.binders) {
            const binder = this.binders[property];
            if (binder instanceof SourceExpressionBinder || binder instanceof CompositeExpressionBinder || binder instanceof CrossFadedCompositeBinder)
                binder.destroy();
        }
    }
}

export class ProgramConfigurationSet<Layer extends TypedStyleLayer> {
    programConfigurations: {[_: string]: ProgramConfiguration};
    needsUpload: boolean;
    _featureMap: FeaturePositionMap;
    _bufferOffset: number;

    constructor(layers: ReadonlyArray<Layer>, zoom: number, filterProperties: (_: string) => boolean = () => true) {
        this.programConfigurations = {};
        for (const layer of layers) {
            this.programConfigurations[layer.id] = new ProgramConfiguration(layer, zoom, filterProperties);
        }
        this.needsUpload = false;
        this._featureMap = new FeaturePositionMap();
        this._bufferOffset = 0;
    }

    populatePaintArrays(length: number, feature: Feature, index: number, imagePositions: {[_: string]: ImagePosition}, canonical: CanonicalTileID, formattedSection?: FormattedSection) {
        for (const key in this.programConfigurations) {
            this.programConfigurations[key].populatePaintArrays(length, feature, imagePositions, canonical, formattedSection);
        }

        if (feature.id !== undefined) {
            this._featureMap.add(feature.id, index, this._bufferOffset, length);
        }
        this._bufferOffset = length;

        this.needsUpload = true;
    }

    updatePaintArrays(featureStates: FeatureStates, vtLayer: VectorTileLayer, layers: ReadonlyArray<TypedStyleLayer>, imagePositions: {[_: string]: ImagePosition}) {
        for (const layer of layers) {
            this.needsUpload = this.programConfigurations[layer.id].updatePaintArrays(featureStates, this._featureMap, vtLayer, layer, imagePositions) || this.needsUpload;
        }
    }

    get(layerId: string) {
        return this.programConfigurations[layerId];
    }

    upload(engine: WebGPUEngine) {
        if (!this.needsUpload) return;
        for (const layerId in this.programConfigurations) {
            this.programConfigurations[layerId].upload(engine);
        }
        this.needsUpload = false;
    }

    destroy() {
        for (const layerId in this.programConfigurations) {
            this.programConfigurations[layerId].destroy();
        }
    }
}

function paintAttributeNames(property, type) {
    const attributeNameExceptions = {
        'text-opacity': ['opacity'],
        'icon-opacity': ['opacity'],
        'text-color': ['fill_color'],
        'icon-color': ['fill_color'],
        'text-halo-color': ['halo_color'],
        'icon-halo-color': ['halo_color'],
        'text-halo-blur': ['halo_blur'],
        'icon-halo-blur': ['halo_blur'],
        'text-halo-width': ['halo_width'],
        'icon-halo-width': ['halo_width'],
        'line-gap-width': ['gapwidth'],
        'line-pattern': ['pattern_to', 'pattern_from', 'pixel_ratio_to', 'pixel_ratio_from'],
        'fill-pattern': ['pattern_to', 'pattern_from', 'pixel_ratio_to', 'pixel_ratio_from'],
        'fill-extrusion-pattern': ['pattern_to', 'pattern_from', 'pixel_ratio_to', 'pixel_ratio_from'],
    };

    return attributeNameExceptions[property] || [property.replace(`${type}-`, '').replace(/-/g, '_')];
}

function getLayoutException(property) {
    const propertyExceptions = {
        'line-pattern': {
            'source': PatternLayoutArray,
            'composite': PatternLayoutArray
        },
        'fill-pattern': {
            'source': PatternLayoutArray,
            'composite': PatternLayoutArray
        },
        'fill-extrusion-pattern': {
            'source': PatternLayoutArray,
            'composite': PatternLayoutArray
        }
    };

    return propertyExceptions[property];
}

function layoutType(property, type, binderType) {
    const defaultLayouts = {
        'color': {
            'source': StructArrayLayout2ui4,
            'composite': StructArrayLayout4f16
        },
        'number': {
            'source': StructArrayLayout1f4,
            'composite': StructArrayLayout2f8
        }
    };

    const layoutException = getLayoutException(property);
    return  layoutException && layoutException[binderType] || defaultLayouts[type][binderType];
}

register('ConstantBinder', ConstantBinder);
register('CrossFadedConstantBinder', CrossFadedConstantBinder);
register('SourceExpressionBinder', SourceExpressionBinder);
register('CrossFadedCompositeBinder', CrossFadedCompositeBinder);
register('CompositeExpressionBinder', CompositeExpressionBinder);
register('ProgramConfiguration', ProgramConfiguration, {omit: ['_buffers']});
register('ProgramConfigurationSet', ProgramConfigurationSet);
