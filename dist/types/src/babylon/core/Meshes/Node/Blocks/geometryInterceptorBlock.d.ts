import { Observable } from "core/Misc/observable";
import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../nodeGeometryBuildState";
/**
 * Block used to trigger an observable when traversed
 * It can also be used to execute a function when traversed
 */
export declare class GeometryInterceptorBlock extends NodeGeometryBlock {
    /**
     * Observable triggered when the block is traversed
     */
    onInterceptionObservable: Observable<any>;
    /**
     * Custom function to execute when traversed
     */
    customFunction?: (value: any, state: NodeGeometryBuildState) => any;
    /**
     * Creates a new GeometryInterceptorBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the time spent to build this block (in ms)
     */
    get buildExecutionTime(): number;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the input component
     */
    get input(): NodeGeometryConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeGeometryConnectionPoint;
    protected _buildBlock(state: NodeGeometryBuildState): void;
}
