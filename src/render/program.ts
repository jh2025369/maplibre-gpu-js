import {ProgramConfiguration} from '../data/program_configuration';

import type {SegmentVector} from '../data/segment';
import type {BinderUniform} from '../data/program_configuration';
import {terrainPreludeUniforms} from './program/terrain_program';
import type {TerrainData} from '../render/terrain';
import {Terrain} from '../render/terrain';
import {UniformBuffer} from 'core/Materials/uniformBuffer';
import {WebGPUEngine} from 'core/Engines/webgpuEngine';
import {Effect, IEffectCreationOptions} from 'core/Materials/effect';
import {DataBuffer} from 'core/Buffers/dataBuffer';
import {VertexBuffer} from 'core/Buffers/buffer';
import {Color} from '@maplibre/maplibre-gl-style-spec';
import {WebGPUMaterialContext} from 'core/Engines/WebGPU/webgpuMaterialContext';
import * as WebGPUConstants from 'core/Engines/WebGPU/webgpuConstants';
import {Constants} from 'core/Engines/constants';
import {generateShader} from '../shaders/shaders';
import {WebGPUDrawContext} from 'core/Engines/WebGPU/webgpuDrawContext';
import {ShaderLanguage} from 'core/Materials/shaderLanguage';
import {WebGPUShaderProcessorCustom} from 'core/Engines/WebGPU/webgpuShaderProcessorsCustom';
import {IShaderProcessor} from 'core/Engines/Processors/iShaderProcessor';
import {MaterialStencilState} from 'core/Materials/materialStencilState';

export type DrawMode = WebGLRenderingContextBase['LINES'] | WebGLRenderingContextBase['TRIANGLES'] | WebGL2RenderingContext['LINE_STRIP'];

const floatUniformProperties = new Set([
    'u_ratio',
    'u_device_pixel_ratio',
    'u_opacity',
    'u_mix',
    'u_camera_to_center_distance',
    // raster
    'u_scale_parent',
    'u_buffer_scale',
    'u_fade_t',
    'u_opacity',
    'u_brightness_low',
    'u_brightness_high',
    'u_saturation_factor',
    'u_contrast_factor',
]);

export class Program {
    program: WebGLProgram;
    attributes: {[_: string]: number};
    numAttributes: number;
    fixedUniforms: Function;
    terrainUniforms: UniformBuffer;
    terrainUniformsFuc: {[_: string]: Function};
    binderUniforms: Array<BinderUniform>;
    failedToCreate: boolean;
    uniformBuffer: UniformBuffer;
    fixedUniformBuffer: UniformBuffer;
    customUniformBuffer: UniformBuffer;
    effect: Effect;
    materialContext: WebGPUMaterialContext;
    drawContext: WebGPUDrawContext;
    stencilMaterial: MaterialStencilState;

    constructor(
        engine: WebGPUEngine,
        name: string,
        type: string,
        configuration: ProgramConfiguration,
        fixedUniforms: (a: UniformBuffer) => void,
        showOverdrawInspector: boolean,
        terrain: Terrain) {

        const binderUniformNames = configuration ? configuration.getBinderUniforms() : [];
        const maybeDynamicAttrs = binderUniformNames.map(name => name.replace('u_', 'a_'));
        const maybeVertexOutputs = binderUniformNames.map(name => name.replace('u_', 'v_'));

        const convertParams = {
            vertexParams: {
                name: 'Params'
            },
            vertexInput: {
                name: 'VertexInput',
                convertSymbols: maybeDynamicAttrs
            },
            vertexOutput: {
                name: 'VertexOutput',
                convertSymbols: maybeVertexOutputs
            },
            fragmentParams: {
                name: 'Params'
            },
            fragmentInput: {
                name: 'FragmentInput',
                convertSymbols: maybeVertexOutputs
            }
        };

        const {vertexSource, fragmentSource, paramKeys: uniformNames, vertexInputKeys: attributes} = generateShader(name, type, convertParams);

        const defines = configuration ? configuration.defines() : [];
        if (showOverdrawInspector) {
            defines.push('#define OVERDRAW_INSPECTOR;');
        }
        if (terrain) {
            defines.push('#define TERRAIN3D;');
        }

        const shaderProcessor = new WebGPUShaderProcessorCustom();
        this.effect = engine.createEffect(
            name,
            <IEffectCreationOptions>{
                attributes,
                uniformsNames: [],
                uniformBuffersNames: [],
                samplers: [],
                defines: defines.join('\n'),
                shaderLanguage: ShaderLanguage.WGSL,
                shaderProcessor: shaderProcessor as IShaderProcessor,
            },
            engine
        );
        engine._currentEffect = this.effect;

        this.materialContext = engine.createMaterialContext();
        engine._currentMaterialContext = this.materialContext;

        this.stencilMaterial = new MaterialStencilState();

        this.drawContext = new WebGPUDrawContext(engine._bufferManager);

        this.uniformBuffer = new UniformBuffer(engine, undefined, undefined, `${name}_uniform`);
        this.fixedUniformBuffer = new UniformBuffer(engine, undefined, undefined, `${name}_fixedUniform`);
        this.terrainUniforms = new UniformBuffer(engine, undefined, undefined, `${name}_terrainUniform`);
        fixedUniforms(this.fixedUniformBuffer);
        this.terrainUniformsFuc = terrainPreludeUniforms(this.terrainUniforms);
        this.binderUniforms = configuration ? configuration.getUniforms(this.uniformBuffer, uniformNames) : null;
    }

    draw(engine: WebGPUEngine,
        fillMode: number,
        uniformValues: {[_: string]: any},
        terrain: TerrainData,
        layerID: string,
        vertexBuffers: {[_: string]: VertexBuffer},
        indexBuffer: DataBuffer,
        segments: SegmentVector,
        currentProperties?: any,
        zoom?: number | null,
        configuration?: ProgramConfiguration | null,
        dynamicLayoutBuffer?: {[_: string]: VertexBuffer}) {

        if (configuration) {
            if (this.binderUniforms.length !== 0) {
                this.uniformBuffer._createNewBuffer();
                configuration.setUniforms(this.uniformBuffer, this.binderUniforms, currentProperties, {zoom});
                // if (!this.uniformBuffer.isSync && this.uniformBuffer._numBuffers > 1) {
                //     engine._releaseBuffer(this.uniformBuffer._buffers[this.uniformBuffer._indexBuffer - 1][0]);
                // }
                this.uniformBuffer.update();
                engine.bindUniformBufferBase(this.uniformBuffer.getBuffer(), 0, 'params');
            }

            configuration.getPaintVertexBuffers().forEach((paintVertexBuffer) => {
                vertexBuffers[paintVertexBuffer.getKind()] = paintVertexBuffer;
            });
        }

        this.fixedUniformBuffer._createNewBuffer();
        for (const name in uniformValues) {
            const uniformValue = uniformValues[name];
            if (uniformValue instanceof Float32Array || uniformValue instanceof Float64Array) {
                this.fixedUniformBuffer.updateMatrices(name, uniformValue as Float32Array);
            } else if (uniformValue instanceof Array) {
                this.fixedUniformBuffer.updateUniform(name, uniformValue, uniformValue.length);
            } else if (typeof uniformValue === 'number') {
                if (Number.isInteger(uniformValue) && !floatUniformProperties.has(name)) {
                    this.fixedUniformBuffer.updateInt(name, uniformValue);
                } else {
                    this.fixedUniformBuffer.updateFloat(name, uniformValue);
                }
            } else if (uniformValue instanceof Color) {
                this.fixedUniformBuffer.updateUniform(name, uniformValue.rgb, 4);
            }
        }
        this.fixedUniformBuffer.update();
        engine.bindUniformBufferBase(this.fixedUniformBuffer.getBuffer(), 0, 'uniforms');

        if (terrain) {
            this.terrainUniforms._createNewBuffer();
            engine.setTexture2(terrain.depthTexture, 'u_depth');
            engine.setTexture2(terrain.texture, 'u_terrain');
            for (const name in this.terrainUniformsFuc) {
                this.terrainUniformsFuc[name](terrain[name]);
            }
            this.terrainUniforms.update();
            engine.bindUniformBufferBase(this.terrainUniforms.getBuffer(), 0, 'terrain');
        }

        let primitiveSize = 0;
        switch (fillMode) {
            case 0:
                primitiveSize = 3;
                break;
            case 1:
                primitiveSize = 2;
                break;
        }

        for (const segment of segments.get()) {
            // const dataBuffer = engine.createVertexBuffer(
            //     vertexArray.arrayBuffer.slice(segment.vertexOffset * vertexArray.bytesPerElement, (segment.vertexOffset + segment.vertexLength) * vertexArray.bytesPerElement)
            // );
            for (const vertexBuffer of Object.values(vertexBuffers)) {
                vertexBuffer.globalOffset = segment.vertexOffset * vertexBuffer.byteStride;
            }

            engine.bindBuffers(vertexBuffers, indexBuffer, this.effect, null);

            engine._draw(0, fillMode, segment.primitiveOffset * primitiveSize, segment.primitiveLength * primitiveSize, 1);
        }
    }

    use(engine: WebGPUEngine) {
        engine._currentEffect = this.effect;
        engine._currentMaterialContext = this.materialContext;
        engine._currentDrawContext = this.drawContext;

        engine._cacheRenderPipeline.resetDepthCullingState();
        engine._alphaState.reset();
        engine._alphaState.setAlphaEquationParameters(Constants.GL_ALPHA_EQUATION_ADD, Constants.GL_ALPHA_EQUATION_ADD);
        engine._cacheRenderPipeline.setAlphaBlendEnabled(false);
        engine._cacheRenderPipeline.setAlphaBlendFactors([null, null, null, null], [null, null]);
        engine._cacheRenderPipeline.setWriteMask(0xf);
        engine._cacheRenderPipeline.resetStencilState();
        engine._cacheRenderPipeline.setDepthStencilFormat(WebGPUConstants.TextureFormat.Depth24PlusStencil8);

        this.stencilMaterial.enabled = false;
        this.stencilMaterial.funcRef = 0;
        engine._stencilStateComposer.stencilMaterial = this.stencilMaterial;
    }

    destroy() {
        // this.uniformBuffer._buffers[this.uniformBuffer._indexBuffer]?.[0].underlyingResource.destroy();
        // this.fixedUniformBuffer._buffers[this.fixedUniformBuffer._indexBuffer]?.[0].underlyingResource.destroy();
        // this.customUniformBuffer._buffers[this.customUniformBuffer._indexBuffer]?.[0].underlyingResource.destroy();
        this.uniformBuffer.dispose();
        this.fixedUniformBuffer.dispose();
    }

    resetUniformBuffers() {
        this.uniformBuffer._bufferIndex = -1;
        this.uniformBuffer._buffer = this.uniformBuffer._buffers[0]?.[0];
        this.uniformBuffer._bufferData = new Float32Array(this.uniformBuffer._data);

        this.fixedUniformBuffer._bufferIndex = -1;
        this.fixedUniformBuffer._buffer = this.fixedUniformBuffer._buffers[0]?.[0];
        this.fixedUniformBuffer._bufferData = new Float32Array(this.fixedUniformBuffer._data);
    }
}
