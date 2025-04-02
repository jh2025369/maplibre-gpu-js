import { PossiblyEvaluatedPropertyValue } from '../style/properties';
import { FeaturePositionMap } from './feature_position_map';
import type { CanonicalTileID } from '../source/tile_id';
import type { TypedStyleLayer } from '../style/style_layer/typed_style_layer';
import type { CrossfadeParameters } from '../style/evaluation_parameters';
import type { ImagePosition } from '../render/image_atlas';
import type { Feature, FeatureState, GlobalProperties, FormattedSection } from '@maplibre/maplibre-gl-style-spec';
import type { FeatureStates } from '../source/source_state';
import type { VectorTileLayer } from '@mapbox/vector-tile';
import { WebGPUEngine } from 'core/Engines/webgpuEngine';
import { UniformBuffer } from 'core/Materials/uniformBuffer';
import { VertexBuffer } from 'core/Buffers/buffer';
export type BinderUniform = {
    name: string;
    property: string;
};
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
    populatePaintArray(length: number, feature: Feature, imagePositions: {
        [_: string]: ImagePosition;
    }, canonical?: CanonicalTileID, formattedSection?: FormattedSection): void;
    updatePaintArray(start: number, length: number, feature: Feature, featureState: FeatureState, imagePositions: {
        [_: string]: ImagePosition;
    }): void;
    upload(a: WebGPUEngine): void;
    destroy(): void;
}
interface UniformBinder {
    uniformNames: Array<string>;
    setUniform(uniformBuffer: UniformBuffer, uniformName: string, globals: GlobalProperties, currentValue: PossiblyEvaluatedPropertyValue<any>): void;
    setBinding(uniformBuffer: UniformBuffer, uniformName: string): void;
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
export declare class ProgramConfiguration {
    binders: {
        [_: string]: AttributeBinder | UniformBinder;
    };
    cacheKey: string;
    _buffers: Array<VertexBuffer>;
    constructor(layer: TypedStyleLayer, zoom: number, filterProperties: (_: string) => boolean);
    getMaxValue(property: string): number;
    populatePaintArrays(newLength: number, feature: Feature, imagePositions: {
        [_: string]: ImagePosition;
    }, canonical?: CanonicalTileID, formattedSection?: FormattedSection): void;
    setConstantPatternPositions(posTo: ImagePosition, posFrom: ImagePosition): void;
    updatePaintArrays(featureStates: FeatureStates, featureMap: FeaturePositionMap, vtLayer: VectorTileLayer, layer: TypedStyleLayer, imagePositions: {
        [_: string]: ImagePosition;
    }): boolean;
    defines(): Array<string>;
    getBinderAttributes(): Array<string>;
    getBinderUniforms(): Array<string>;
    getPaintVertexBuffers(): Array<VertexBuffer>;
    getUniforms(uniformBuffer: UniformBuffer, uniformNames: string[]): Array<BinderUniform>;
    setUniforms(uniformBuffer: UniformBuffer, binderUniforms: Array<BinderUniform>, properties: any, globals: GlobalProperties): void;
    updatePaintBuffers(engine: WebGPUEngine, crossfade?: CrossfadeParameters): void;
    upload(engine: WebGPUEngine): void;
    destroy(): void;
}
export declare class ProgramConfigurationSet<Layer extends TypedStyleLayer> {
    programConfigurations: {
        [_: string]: ProgramConfiguration;
    };
    needsUpload: boolean;
    _featureMap: FeaturePositionMap;
    _bufferOffset: number;
    constructor(layers: ReadonlyArray<Layer>, zoom: number, filterProperties?: (_: string) => boolean);
    populatePaintArrays(length: number, feature: Feature, index: number, imagePositions: {
        [_: string]: ImagePosition;
    }, canonical: CanonicalTileID, formattedSection?: FormattedSection): void;
    updatePaintArrays(featureStates: FeatureStates, vtLayer: VectorTileLayer, layers: ReadonlyArray<TypedStyleLayer>, imagePositions: {
        [_: string]: ImagePosition;
    }): void;
    get(layerId: string): ProgramConfiguration;
    upload(engine: WebGPUEngine): void;
    destroy(): void;
}
export {};
