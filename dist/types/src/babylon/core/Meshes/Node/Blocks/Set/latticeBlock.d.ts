import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../../nodeGeometryBuildState";
import type { INodeGeometryExecutionContext } from "../../Interfaces/nodeGeometryExecutionContext";
import { Vector3 } from "../../../../Maths/math.vector";
/**
 * Block used to apply Lattice on geometry
 */
export declare class LatticeBlock extends NodeGeometryBlock implements INodeGeometryExecutionContext {
    private _vertexData;
    private _currentIndexX;
    private _currentIndexY;
    private _currentIndexZ;
    private _lattice;
    private _indexVector3;
    private _currentControl;
    /**
     * Gets or sets a boolean indicating that this block can evaluate context
     * Build performance is improved when this value is set to false as the system will cache values instead of reevaluating everything per context change
     */
    evaluateContext: boolean;
    /**
     * Resolution on x axis
     */
    resolutionX: number;
    /**
     * Resolution on y axis
     */
    resolutionY: number;
    /**
     * Resolution on z axis
     */
    resolutionZ: number;
    /**
     * Create a new LatticeBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current index in the current flow
     * @returns the current index
     */
    getExecutionIndex(): number;
    /**
     * Gets the current loop index in the current flow
     * @returns the current loop index
     */
    getExecutionLoopIndex(): number;
    /**
     * Gets the current face index in the current flow
     * @returns the current face index
     */
    getExecutionFaceIndex(): number;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the geometry input component
     */
    get geometry(): NodeGeometryConnectionPoint;
    /**
     * Gets the controls input component
     */
    get controls(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry output component
     */
    get output(): NodeGeometryConnectionPoint;
    /**
     * Gets the value associated with a contextual positions
     * In this case it will be the current position in the lattice
     * @returns the current position in the lattice
     */
    getOverridePositionsContextualValue(): Vector3;
    /**
     * Gets the value associated with a contextual normals
     * In this case it will be the current control point being processed
     * @returns the current control point being processed
     */
    getOverrideNormalsContextualValue(): Vector3;
    protected _buildBlock(state: NodeGeometryBuildState): void;
    protected _dumpPropertiesCode(): string;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
