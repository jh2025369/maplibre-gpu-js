import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import { FlowGraphEventBlock } from "core/FlowGraph/flowGraphEventBlock";
import { FlowGraphEventType } from "core/FlowGraph/flowGraphEventType";
import { FlowGraphBlockNames } from "../flowGraphBlockNames";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
/**
 * Configuration for the pointer out event block.
 */
export interface IFlowGraphPointerOutEventBlockConfiguration extends IFlowGraphBlockConfiguration {
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
 * Payload for the pointer out event.
 */
export interface IFlowGraphPointerOutEventPayload {
    /**
     * The pointer id.
     */
    pointerId: number;
    /**
     * The mesh that was picked.
     */
    mesh: AbstractMesh;
    /**
     * If populated, the hover event moved to this mesh from the `mesh` variable
     */
    over?: AbstractMesh;
}
/**
 * A pointe out event block.
 * This block can be used as an entry pointer to when a pointer is out of a specific target mesh.
 */
export declare class FlowGraphPointerOutEventBlock extends FlowGraphEventBlock {
    /**
     * Output connection: The pointer id.
     */
    readonly pointerId: FlowGraphDataConnection<number>;
    /**
     * Input connection: The mesh to listen to.
     */
    readonly targetMesh: FlowGraphDataConnection<AbstractMesh>;
    /**
     * Output connection: The mesh that the pointer is out of.
     */
    readonly meshOutOfPointer: FlowGraphDataConnection<AbstractMesh>;
    readonly type: FlowGraphEventType;
    constructor(config?: IFlowGraphPointerOutEventBlockConfiguration);
    _executeEvent(context: FlowGraphContext, payload: IFlowGraphPointerOutEventPayload): boolean;
    _preparePendingTasks(_context: FlowGraphContext): void;
    _cancelPendingTasks(_context: FlowGraphContext): void;
    getClassName(): FlowGraphBlockNames;
}
