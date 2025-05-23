import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {LineStyleLayer} from '../style/style_layer/line_style_layer';
import type {OverscaledTileID} from '../source/tile_id';
import {IEffectCreationOptions} from 'core/Materials/effect';
import {VertexBuffer} from 'core/Buffers/buffer';
import {UniformBuffer} from 'core/Materials/uniformBuffer';
import {generateShader} from '../shaders/shaders';
import {Texture} from 'core/Materials/Textures/texture';
import {Constants} from 'core/Engines/constants';
import {lineSDFUniformValues} from './program/line_program';
import {ShaderLanguage} from 'core/Materials/shaderLanguage';
import {WebGPUShaderProcessorCustom} from 'core/Engines/WebGPU/webgpuShaderProcessorsCustom';
import {IShaderProcessor} from 'core/Engines/Processors/iShaderProcessor';

export function drawTest(painter: Painter, sourceCache: SourceCache, layer: LineStyleLayer, coords: Array<OverscaledTileID>) {
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
    generateShader('test', 'test', convertParams);

    const shaderProcessor = new WebGPUShaderProcessorCustom();
    const effect = engine.createEffect(
        'test',
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
        0.5, 0.5,
        -0.5, 0.5,
        -0.5, -0.5,
        0.5, -0.5
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

    // const dasharray = layer.paint.get('line-dasharray');
    // const patternProperty = layer.paint.get('line-pattern');
    // const image = patternProperty.constantOr(1 as any);
    // const crossfade = layer.getCrossfadeParameters();
    // for (const coord of coords) {
    //     const tile = sourceCache.getTile(coord);
    //     if (image && !tile.patternsLoaded()) continue;

    //     const terrainData = painter.style.map.terrain && painter.style.map.terrain.getTerrainData(coord);
    //     const terrainCoord = terrainData ? coord : null;
    //     if (!image && dasharray) {
    //         lineSDFUniformValues(painter, tile, layer, dasharray, crossfade, terrainCoord);
    //     }
    //     painter.lineAtlas.bind(engine);
    // }

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
    const texture = engine.createTextureNoUrl(
        {width, height},
        true,
        false,
        false,
        Texture.NEAREST_SAMPLINGMODE,
        textureData,
        Constants.TEXTUREFORMAT_RGBA
    );
    engine.setTexture2(texture, 'u_image');

    engine._draw(0, 0, 0, 6, 1);
}
