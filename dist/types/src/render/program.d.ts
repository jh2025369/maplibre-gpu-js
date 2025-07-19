import { ProgramConfiguration } from '../data/program_configuration';
import type { SegmentVector } from '../data/segment';
import type { BinderUniform } from '../data/program_configuration';
import type { TerrainData } from '../render/terrain';
import { Terrain } from '../render/terrain';
import { UniformBuffer } from 'core/Materials/uniformBuffer';
import { WebGPUEngine } from 'core/Engines/webgpuEngine';
import { Effect } from 'core/Materials/effect';
import { DataBuffer } from 'core/Buffers/dataBuffer';
import { VertexBuffer } from 'core/Buffers/buffer';
import { WebGPUMaterialContext } from 'core/Engines/WebGPU/webgpuMaterialContext';
import { WebGPUDrawContext } from 'core/Engines/WebGPU/webgpuDrawContext';
import { MaterialStencilState } from 'core/Materials/materialStencilState';
export type DrawMode = WebGLRenderingContextBase['LINES'] | WebGLRenderingContextBase['TRIANGLES'] | WebGL2RenderingContext['LINE_STRIP'];
export declare class Program {
    program: WebGLProgram;
    attributes: {
        [_: string]: number;
    };
    numAttributes: number;
    fixedUniforms: Function;
    terrainUniforms: UniformBuffer;
    terrainUniformsFuc: {
        [_: string]: Function;
    };
    binderUniforms: Array<BinderUniform>;
    failedToCreate: boolean;
    uniformBuffer: UniformBuffer;
    fixedUniformBuffer: UniformBuffer;
    customUniformBuffer: UniformBuffer;
    effect: Effect;
    materialContext: WebGPUMaterialContext;
    drawContext: WebGPUDrawContext;
    stencilMaterial: MaterialStencilState;
    constructor(engine: WebGPUEngine, name: string, type: string, configuration: ProgramConfiguration, fixedUniforms: (a: UniformBuffer) => void, showOverdrawInspector: boolean, terrain: Terrain);
    updateUniform(uniformBuffer: UniformBuffer, name: string, uniform: {
        [_: string]: any;
    }): void;
    draw(engine: WebGPUEngine, fillMode: number, uniformValues: {
        [_: string]: any;
    }, terrain: TerrainData, layerID: string, vertexBuffers: {
        [_: string]: VertexBuffer;
    }, indexBuffer: DataBuffer, segments: SegmentVector, currentProperties?: any, zoom?: number | null, configuration?: ProgramConfiguration | null, instancesCount?: number): void;
    use(engine: WebGPUEngine): void;
    destroy(): void;
    resetUniformBuffers(): void;
}
