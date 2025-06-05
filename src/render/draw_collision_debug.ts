import type {Painter} from './painter';
import type {SourceCache} from '../source/source_cache';
import type {StyleLayer} from '../style/style_layer';
import type {OverscaledTileID} from '../source/tile_id';
import type {SymbolBucket} from '../data/bucket/symbol_bucket';
import {collisionUniformValues, collisionCircleUniformValues} from './program/collision_program';

import {QuadTriangleArray, CollisionCircleLayoutArray} from '../data/array_types.g';
import {collisionCircleLayout} from '../data/bucket/symbol_attributes';
import {SegmentVector} from '../data/segment';
import {mat4} from 'gl-matrix';
import {DataBuffer, VertexBuffer} from 'core/Buffers';

type TileBatch = {
    circleArray: Array<number>;
    circleOffset: number;
    transform: mat4;
    invTransform: mat4;
    coord: OverscaledTileID;
};

let quadTriangles: QuadTriangleArray;

export function drawCollisionDebug(painter: Painter, sourceCache: SourceCache, layer: StyleLayer, coords: Array<OverscaledTileID>, translate: [number, number], translateAnchor: 'map' | 'viewport', isText: boolean) {
    const engine = painter.engine;
    const program = painter.useProgram('collisionBox');
    const tileBatches: Array<TileBatch> = [];
    let circleCount = 0;
    let circleOffset = 0;

    painter.colorModeForRenderPass();
    engine._cacheRenderPipeline.setDepthTestEnabled(false);
    engine._cacheRenderPipeline.setDepthWriteEnabled(false);

    for (let i = 0; i < coords.length; i++) {
        const coord = coords[i];
        const tile = sourceCache.getTile(coord);
        const bucket: SymbolBucket = (tile.getBucket(layer) as any);
        if (!bucket) continue;
        let posMatrix = coord.posMatrix;
        if (translate[0] !== 0 || translate[1] !== 0) {
            posMatrix = painter.translatePosMatrix(coord.posMatrix, tile, translate, translateAnchor);
        }
        const buffers = isText ? bucket.textCollisionBox : bucket.iconCollisionBox;
        // Get collision circle data of this bucket
        const circleArray: Array<number> = bucket.collisionCircleArray;
        if (circleArray.length > 0) {
            // We need to know the projection matrix that was used for projecting collision circles to the screen.
            // This might vary between buckets as the symbol placement is a continuous process. This matrix is
            // required for transforming points from previous screen space to the current one
            const invTransform = mat4.create();
            const transform = posMatrix;

            mat4.mul(invTransform, bucket.placementInvProjMatrix, painter.transform.glCoordMatrix);
            mat4.mul(invTransform, invTransform, bucket.placementViewportMatrix);

            tileBatches.push({
                circleArray,
                circleOffset,
                transform,
                invTransform,
                coord
            });

            circleCount += circleArray.length / 4;  // 4 values per circle
            circleOffset = circleCount;
        }
        if (!buffers) continue;
        const layerID = layer.id;
        const vertexBufferPos = new VertexBuffer(engine, buffers.layoutVertexBuffer, 'a_pos', {
            updatable: true,
            label: `Geometry_${layerID}_pos`,
            offset: 0,
            stride: buffers.layoutVertexArray.bytesPerElement,
            size: 2,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });
        const vertexBufferAnchorPos = new VertexBuffer(engine, buffers.layoutVertexBuffer, 'a_anchor_pos', {
            updatable: true,
            label: `Geometry_${layerID}_anchor_pos`,
            offset: 2 * Float32Array.BYTES_PER_ELEMENT,
            stride: buffers.layoutVertexArray.bytesPerElement,
            size: 2,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });
        const vertexBufferExtrude = new VertexBuffer(engine, buffers.layoutVertexBuffer, 'a_extrude', {
            updatable: true,
            label: `Geometry_${layerID}_extrude`,
            offset: 4 * Float32Array.BYTES_PER_ELEMENT,
            stride: buffers.layoutVertexArray.bytesPerElement,
            size: 2,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });
        const vertexBufferPlaced = new VertexBuffer(engine, buffers.collisionVertexBuffer, 'a_placed', {
            updatable: true,
            label: `Geometry_${layerID}_placed`,
            offset: 0,
            stride: buffers.collisionVertexArray.bytesPerElement,
            size: 1,
            type: VertexBuffer.UNSIGNED_INT,
            useBytes: true
        });
        const vertexBufferShift = new VertexBuffer(engine, buffers.collisionVertexBuffer, 'a_shift', {
            updatable: true,
            label: `Geometry_${layerID}_shift`,
            offset: 1 * Float32Array.BYTES_PER_ELEMENT,
            stride: buffers.collisionVertexArray.bytesPerElement,
            size: 2,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });
        const vertexBuffers = {
            'a_pos': vertexBufferPos,
            'a_anchor_pos': vertexBufferAnchorPos,
            'a_extrude': vertexBufferExtrude,
            'a_placed': vertexBufferPlaced,
            'a_shift': vertexBufferShift,
        };
        program.draw(engine, 1,
            collisionUniformValues(
                posMatrix,
                painter.transform,
                tile),
            painter.style.map.terrain && painter.style.map.terrain.getTerrainData(coord),
            layer.id, vertexBuffers, buffers.indexBuffer,
            buffers.segments, null, painter.transform.zoom, null, null);
    }

    if (!isText || !tileBatches.length) {
        return;
    }

    // Render collision circles
    const circleProgram = painter.useProgram('collisionCircle');

    painter.colorModeForRenderPass();
    engine._cacheRenderPipeline.setDepthTestEnabled(false);
    engine._cacheRenderPipeline.setDepthWriteEnabled(false);

    // Construct vertex data
    const vertexData = new CollisionCircleLayoutArray();
    vertexData.resize(circleCount * 4);
    vertexData._trim();

    let vertexOffset = 0;

    for (const batch of tileBatches) {
        for (let i = 0; i < batch.circleArray.length / 4; i++) {
            const circleIdx = i * 4;
            const x = batch.circleArray[circleIdx + 0];
            const y = batch.circleArray[circleIdx + 1];
            const radius = batch.circleArray[circleIdx + 2];
            const collision = batch.circleArray[circleIdx + 3];

            // 4 floats per vertex, 4 vertices per quad
            vertexData.emplace(vertexOffset++, x, y, radius, collision, 0);
            vertexData.emplace(vertexOffset++, x, y, radius, collision, 1);
            vertexData.emplace(vertexOffset++, x, y, radius, collision, 2);
            vertexData.emplace(vertexOffset++, x, y, radius, collision, 3);
        }
    }
    if (!quadTriangles || quadTriangles.length < circleCount * 2) {
        quadTriangles = createQuadTriangles(circleCount);
    }

    const indexBuffer: DataBuffer = engine.createIndexBuffer(quadTriangles.arrayBuffer);
    const vertexBuffer: DataBuffer = engine.createVertexBuffer(vertexData.arrayBuffer);

    // Render batches
    for (const batch of tileBatches) {
        const uniforms = collisionCircleUniformValues(
            batch.transform,
            batch.invTransform,
            painter.transform
        );

        const layerID = layer.id;
        const vertexBufferPos = new VertexBuffer(engine, vertexBuffer, 'a_pos', {
            updatable: true,
            label: `Geometry_${layerID}_pos`,
            offset: 0,
            stride: vertexData.bytesPerElement,
            size: 2,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });
        const vertexBufferRadius = new VertexBuffer(engine, vertexBuffer, 'a_radius', {
            updatable: true,
            label: `Geometry_${layerID}_radius`,
            offset: 2 * Float32Array.BYTES_PER_ELEMENT,
            stride: vertexData.bytesPerElement,
            size: 1,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });
        const vertexBufferFlags = new VertexBuffer(engine, vertexBuffer, 'a_flags', {
            updatable: true,
            label: `Geometry_${layerID}_flags`,
            offset: 3 * Float32Array.BYTES_PER_ELEMENT,
            stride: vertexData.bytesPerElement,
            size: 2,
            type: VertexBuffer.FLOAT,
            useBytes: true
        });
        const vertexBuffers = {
            'a_pos': vertexBufferPos,
            'a_radius': vertexBufferRadius,
            'a_flags': vertexBufferFlags,
        };
        circleProgram.draw(
            engine,
            0,
            uniforms,
            painter.style.map.terrain && painter.style.map.terrain.getTerrainData(batch.coord),
            layer.id,
            vertexBuffers,
            indexBuffer,
            SegmentVector.simpleSegment(0, batch.circleOffset * 2, batch.circleArray.length, batch.circleArray.length / 2),
            null,
            painter.transform.zoom,
            null);
    }

    vertexBuffer.underlyingResource.destroy();
    indexBuffer.underlyingResource.destroy();
}

function createQuadTriangles(quadCount: number): QuadTriangleArray {
    const triCount = quadCount * 2;
    const array = new QuadTriangleArray();

    array.resize(triCount);
    array._trim();

    // Two triangles and 4 vertices per quad.
    for (let i = 0; i < triCount; i++) {
        const idx = i * 6;

        array.uint16[idx + 0] = i * 4 + 0;
        array.uint16[idx + 1] = i * 4 + 1;
        array.uint16[idx + 2] = i * 4 + 2;
        array.uint16[idx + 3] = i * 4 + 2;
        array.uint16[idx + 4] = i * 4 + 3;
        array.uint16[idx + 5] = i * 4 + 0;
    }

    return array;
}
