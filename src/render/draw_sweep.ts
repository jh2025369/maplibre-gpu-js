import type {Painter} from './painter';
import {IEffectCreationOptions} from 'core/Materials/effect';
import {VertexBuffer} from 'core/Buffers/buffer';
import {UniformBuffer} from 'core/Materials/uniformBuffer';
import {generateShader} from '../shaders/shaders';
import {Texture} from 'core/Materials/Textures/texture';
import {Constants} from 'core/Engines/constants';
import {ShaderLanguage} from 'core/Materials/shaderLanguage';
import {WebGPUShaderProcessorCustom} from 'core/Engines/WebGPU/webgpuShaderProcessorsCustom';
import {IShaderProcessor} from 'core/Engines/Processors/iShaderProcessor';

let time = 0;

export function drawSweep(painter: Painter) {
    if (painter.renderPass !== 'translucent') return;

    const engine = painter.engine;

    const convertParams = {
        vertexParams: {
            name: 'Params'
        },
        vertexInput: {
            name: 'VertexInput',
            convertSymbols: []
        },
        vertexOutput: {
            name: 'VertexOutput',
            convertSymbols: []
        },
        fragmentParams: {
            name: 'Params'
        },
        fragmentInput: {
            name: 'FragmentInput',
            convertSymbols: []
        }
    };
    generateShader('sweep', 'sweep', convertParams);

    const shaderProcessor = new WebGPUShaderProcessorCustom();
    const effect = engine.createEffect(
        'sweep',
        <IEffectCreationOptions>{
            attributes: ['pos', 'uv'],
            uniformsNames: [],
            uniformBuffersNames: [],
            samplers: [],
            defines: '',
            shaderLanguage: ShaderLanguage.WGSL,
            shaderProcessor: shaderProcessor as IShaderProcessor,
        },
        engine
    );
    engine._currentEffect = effect;

    engine._currentMaterialContext = engine.createMaterialContext();

    const vertexData = new Float32Array([
        1, 1,
        -1, 1,
        -1, -1,
        1, -1
    ]);
    const dataBuffer = engine.createVertexBuffer(vertexData);
    const vertexBuffer = new VertexBuffer(engine, dataBuffer, 'pos', {
        updatable: true,
        label: 'Geometry_pos',
        offset: 0,
        stride: 2 * Float32Array.BYTES_PER_ELEMENT,
        size: 2,
        type: VertexBuffer.FLOAT,
        useBytes: true
    });

    const uvData = new Float32Array([
        1, 1,
        0, 1,
        0, 0,
        1, 0
    ]);
    const uvBuffer = engine.createVertexBuffer(uvData);
    const vertexUVBuffer = new VertexBuffer(engine, uvBuffer, 'uv', {
        updatable: true,
        label: 'Geometry_uv',
        offset: 0,
        stride: 2 * Float32Array.BYTES_PER_ELEMENT,
        size: 2,
        type: VertexBuffer.FLOAT,
        useBytes: true
    });

    const indexBuffer = engine.createIndexBuffer([0, 1, 2, 2, 3, 0]);
    const vertexBuffers = {
        pos: vertexBuffer,
        uv: vertexUVBuffer,
    };
    engine.bindBuffers(vertexBuffers, indexBuffer, effect, null);

    const uniformBuffer = new UniformBuffer(engine, undefined, undefined, 'sweep_uniform');
    uniformBuffer.addUniform('u_time', 1);
    uniformBuffer.addUniform('u_pixel', 1);
    uniformBuffer.addUniform('u_ratio', 1);
    uniformBuffer.addUniform('u_outside', 1);
    uniformBuffer.addUniform('u_inside', 1);
    uniformBuffer.updateFloat('u_time', time);
    uniformBuffer.updateFloat('u_pixel', engine._renderingCanvas.width / engine._renderingCanvas.height);
    uniformBuffer.updateFloat('u_ratio', 1);
    uniformBuffer.updateFloat('u_outside', 0.001);
    uniformBuffer.updateFloat('u_inside', 0.05);
    uniformBuffer.update();
    engine.bindUniformBufferBase(uniformBuffer.getBuffer(), 0, 'uniforms');

    const width = 5;
    const height = 7;
    const _ = [255,   0,   0, 255];  // red
    const y = [255, 255,   0, 255];  // yellow
    const b = [0,   0, 255, 255];  // blue
    const textureData = new Uint8Array([
        b, _, _, _, _,
        _, y, y, y, _,
        _, y, _, _, _,
        _, y, y, _, _,
        _, y, _, _, _,
        _, y, _, _, _,
        _, _, _, _, _,
    ].flat());
    // const texture = engine.createTextureNoUrl(
    //     {width, height},
    //     true,
    //     false,
    //     false,
    //     Texture.NEAREST_SAMPLINGMODE,
    //     textureData as any,
    //     Constants.TEXTUREFORMAT_RGBA
    // );
    // engine.setTexture2(texture, 'u_image');

    const texture = new Texture(
        'https://s-cf-tw.shopeesz.com/file/sg-11134201-7rato-mb4py6ikbbdv44',
        engine,
        {
            noMipmap: true,
            invertY: false,
            samplingMode: Texture.NEAREST_SAMPLINGMODE
        }
    );
    engine.setTexture2(texture, 'u_image');

    engine._draw(0, 0, 0, 6, 1);

    time += 2;
}
