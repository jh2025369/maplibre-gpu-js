import type { AbstractMesh } from "../../../Meshes/abstractMesh";
import { FlowGraphEventBlock } from "../../flowGraphEventBlock";
import type { PointerInfo } from "../../../Events/pointerEvents";
import { PointerEventTypes } from "../../../Events/pointerEvents";
import type { FlowGraphContext } from "../../flowGraphContext";
import type { IFlowGraphBlockConfiguration } from "../../flowGraphBlock";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import type { Vector3 } from "core/Maths/math.vector";
import { FlowGraphEventType } from "core/FlowGraph/flowGraphEventType";
/**
 * Configuration for the mesh pick event block.
 */
export interface IFlowGraphMeshPickEventBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * Should this mesh block propagation of the event.
     */
    stopPropagation?: boolean;
    /**
     * The mesh to listen to. Can also be set by the asset input.
     */
    targetMesh?: AbstractMesh;
}
/**
 * A block that activates when a mesh is picked.
 */
export declare class FlowGraphMeshPickEventBlock extends FlowGraphEventBlock {
    /**
     * the configuration of the block
     */
    config?: IFlowGraphMeshPickEventBlockConfiguration;
    /**
     * Input connection: The mesh to listen to.
     */
    readonly asset: FlowGraphDataConnection<AbstractMesh>;
    /**
     * Output connection: The picked point.
     */
    readonly pickedPoint: FlowGraphDataConnection<Vector3>;
    /**
     * Output connection: The picked origin.
     */
    readonly pickOrigin: FlowGraphDataConnection<Vector3>;
    /**
     * Output connection: The pointer id.
     */
    readonly pointerId: FlowGraphDataConnection<number>;
    /**
     * Output connection: The picked mesh. Possibly NOT the same as the asset (could be a descendant).
     */
    readonly pickedMesh: FlowGraphDataConnection<AbstractMesh>;
    /**
     * Input connection: The type of the pointer event.
     */
    readonly pointerType: FlowGraphDataConnection<PointerEventTypes>;
    /**
     * the type of the event this block reacts to
     */
    readonly type: FlowGraphEventType;
    constructor(
    /**
     * the configuration of the block
     */
    config?: IFlowGraphMeshPickEventBlockConfiguration);
    _getReferencedMesh(context: FlowGraphContext): AbstractMesh;
    _executeEvent(context: FlowGraphContext, pickedInfo: PointerInfo): boolean;
    /**
     * @internal
     */
    _preparePendingTasks(_context: FlowGraphContext): void;
    /**
     * @internal
     */
    _cancelPendingTasks(_context: FlowGraphContext): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
}
