import type { IKHRInteractivity_Declaration, IKHRInteractivity_Graph, IKHRInteractivity_Node } from "babylonjs-gltf2interface";
import { FlowGraphBlockNames } from "core/FlowGraph/Blocks/flowGraphBlockNames";
import type { ISerializedFlowGraphBlock, ISerializedFlowGraphContext } from "core/FlowGraph/typeDefinitions";
import type { InteractivityGraphToFlowGraphParser } from "./interactivityGraphParser";
import type { IGLTF } from "../../glTFLoaderInterfaces";
interface IGLTFToFlowGraphMappingObject<I = any, O = any> {
    /**
     * The name of the property in the FlowGraph block.
     */
    name: string;
    /**
     * The type of the property in the glTF specs.
     * If not provided will be inferred.
     */
    gltfType?: string;
    /**
     * The type of the property in the FlowGraph block.
     * If not defined it equals the glTF type.
     */
    flowGraphType?: string;
    /**
     * A function that transforms the data from the glTF to the FlowGraph block.
     */
    dataTransformer?: (data: I[], parser: InteractivityGraphToFlowGraphParser) => O[];
    /**
     * If the property is in the options passed to the constructor of the block.
     */
    inOptions?: boolean;
    /**
     * If the property is a pointer to a value.
     * This will add an extra JsonPointerParser block to the graph.
     */
    isPointer?: boolean;
    /**
     * If the property is an index to a value.
     * if defined this will be the name of the array to find the object in.
     */
    isVariable?: boolean;
    /**
     * the name of the class type this value will be mapped to.
     * This is used if we generate more than one block for a single glTF node.
     * Defaults to the first block in the mapping.
     */
    toBlock?: FlowGraphBlockNames;
    /**
     * Used in configuration values. If defined, this will be the default value, if no value is provided.
     */
    defaultValue?: O;
}
export interface IGLTFToFlowGraphMapping {
    /**
     * The type of the FlowGraph block(s).
     * Typically will be a single element in an array.
     * When adding blocks defined in this module use the KHR_interactivity prefix.
     */
    blocks: (FlowGraphBlockNames | string)[];
    /**
     * The inputs of the glTF node mapped to the FlowGraph block.
     */
    inputs?: {
        /**
         * The value inputs of the glTF node mapped to the FlowGraph block.
         */
        values?: {
            [originName: string]: IGLTFToFlowGraphMappingObject;
        };
        /**
         * The flow inputs of the glTF node mapped to the FlowGraph block.
         */
        flows?: {
            [originName: string]: IGLTFToFlowGraphMappingObject;
        };
    };
    /**
     * The outputs of the glTF node mapped to the FlowGraph block.
     */
    outputs?: {
        /**
         * The value outputs of the glTF node mapped to the FlowGraph block.
         */
        values?: {
            [originName: string]: IGLTFToFlowGraphMappingObject;
        };
        /**
         * The flow outputs of the glTF node mapped to the FlowGraph block.
         */
        flows?: {
            [originName: string]: IGLTFToFlowGraphMappingObject;
        };
    };
    /**
     * The configuration of the glTF node mapped to the FlowGraph block.
     * This information is usually passed to the constructor of the block.
     */
    configuration?: {
        [originName: string]: IGLTFToFlowGraphMappingObject;
    };
    /**
     * If we generate more than one block for a single glTF node, this mapping will be used to map
     * between the flowGraph classes.
     */
    typeToTypeMapping?: {
        [originName: string]: IGLTFToFlowGraphMappingObject;
    };
    /**
     * The connections between two or more blocks.
     * This is used to connect the blocks in the graph
     */
    interBlockConnectors?: {
        /**
         * The name of the input connection in the first block.
         */
        input: string;
        /**
         * The name of the output connection in the second block.
         */
        output: string;
        /**
         * The index of the block in the array of blocks that corresponds to the input.
         */
        inputBlockIndex: number;
        /**
         * The index of the block in the array of blocks that corresponds to the output.
         */
        outputBlockIndex: number;
        /**
         * If the connection is a variable connection or a flow connection.
         */
        isVariable?: boolean;
    }[];
    /**
     * This optional function will allow to validate the node, according to the glTF specs.
     * For example, if a node has a configuration object, it must be present and correct.
     * This is a basic node-based validation.
     * This function is expected to return false and log the error if the node is not valid.
     * Note that this function can also modify the node, if needed.
     *
     * @param gltfBlock the glTF node to validate
     * @param glTFObject the glTF object
     * @returns true if validated, false if not.
     */
    validation?: (gltfBlock: IKHRInteractivity_Node, interactivityGraph: IKHRInteractivity_Graph, glTFObject?: IGLTF) => {
        valid: boolean;
        error?: string;
    };
    /**
     * This is used if we need extra information for the constructor/options that is not provided directly by the glTF node.
     * This function can return more than one node, if extra nodes are needed for this block to function correctly.
     * Returning more than one block will usually happen when a json pointer was provided.
     *
     * @param gltfBlock the glTF node
     * @param mapping the mapping object
     * @param arrays the arrays of the interactivity object
     * @param serializedObjects the serialized object
     * @returns an array of serialized nodes that will be added to the graph.
     */
    extraProcessor?: (gltfBlock: IKHRInteractivity_Node, declaration: IKHRInteractivity_Declaration, mapping: IGLTFToFlowGraphMapping, parser: InteractivityGraphToFlowGraphParser, serializedObjects: ISerializedFlowGraphBlock[], context: ISerializedFlowGraphContext, globalGLTF?: IGLTF) => ISerializedFlowGraphBlock[];
}
export declare function getMappingForFullOperationName(fullOperationName: string): IGLTFToFlowGraphMapping;
export declare function getMappingForDeclaration(declaration: IKHRInteractivity_Declaration, returnNoOpIfNotAvailable?: boolean): IGLTFToFlowGraphMapping | undefined;
/**
 * This function will add new mapping to glTF interactivity.
 * Other extensions can define new types of blocks, this is the way to let interactivity know how to parse them.
 * @param key the type of node, i.e. "variable/get"
 * @param extension the extension of the interactivity operation, i.e. "KHR_selectability"
 * @param mapping The mapping object. See documentation or examples below.
 */
export declare function addNewInteractivityFlowGraphMapping(key: string, extension: string, mapping: IGLTFToFlowGraphMapping): void;
export declare function getAllSupportedNativeNodeTypes(): string[];
export {};
/**
 *
 * These are the nodes from the specs:

### Math Nodes
1. **Constants**
   - E (`math/e`) FlowGraphBlockNames.E
   - Pi (`math/pi`) FlowGraphBlockNames.PI
   - Infinity (`math/inf`) FlowGraphBlockNames.Inf
   - Not a Number (`math/nan`) FlowGraphBlockNames.NaN
2. **Arithmetic Nodes**
   - Absolute Value (`math/abs`) FlowGraphBlockNames.Abs
   - Sign (`math/sign`) FlowGraphBlockNames.Sign
   - Truncate (`math/trunc`) FlowGraphBlockNames.Trunc
   - Floor (`math/floor`) FlowGraphBlockNames.Floor
   - Ceil (`math/ceil`) FlowGraphBlockNames.Ceil
   - Round (`math/round`)  FlowGraphBlockNames.Round
   - Fraction (`math/fract`) FlowGraphBlockNames.Fract
   - Negation (`math/neg`) FlowGraphBlockNames.Negation
   - Addition (`math/add`) FlowGraphBlockNames.Add
   - Subtraction (`math/sub`) FlowGraphBlockNames.Subtract
   - Multiplication (`math/mul`) FlowGraphBlockNames.Multiply
   - Division (`math/div`) FlowGraphBlockNames.Divide
   - Remainder (`math/rem`) FlowGraphBlockNames.Modulo
   - Minimum (`math/min`) FlowGraphBlockNames.Min
   - Maximum (`math/max`) FlowGraphBlockNames.Max
   - Clamp (`math/clamp`) FlowGraphBlockNames.Clamp
   - Saturate (`math/saturate`) FlowGraphBlockNames.Saturate
   - Interpolate (`math/mix`) FlowGraphBlockNames.MathInterpolation
3. **Comparison Nodes**
   - Equality (`math/eq`) FlowGraphBlockNames.Equality
   - Less Than (`math/lt`) FlowGraphBlockNames.LessThan
   - Less Than Or Equal To (`math/le`) FlowGraphBlockNames.LessThanOrEqual
   - Greater Than (`math/gt`) FlowGraphBlockNames.GreaterThan
   - Greater Than Or Equal To (`math/ge`) FlowGraphBlockNames.GreaterThanOrEqual
4. **Special Nodes**
   - Is Not a Number (`math/isnan`) FlowGraphBlockNames.IsNaN
   - Is Infinity (`math/isinf`) FlowGraphBlockNames.IsInfinity
   - Select (`math/select`) FlowGraphBlockNames.Conditional
   - Switch (`math/switch`) FlowGraphBlockNames.DataSwitch
   - Random (`math/random`) FlowGraphBlockNames.Random
5. **Angle and Trigonometry Nodes**
   - Degrees-To-Radians (`math/rad`) FlowGraphBlockNames.DegToRad
   - Radians-To-Degrees (`math/deg`) FlowGraphBlockNames.RadToDeg
   - Sine (`math/sin`)  FlowGraphBlockNames.Sin
   - Cosine (`math/cos`) FlowGraphBlockNames.Cos
   - Tangent (`math/tan`) FlowGraphBlockNames.Tan
   - Arcsine (`math/asin`) FlowGraphBlockNames.Asin
   - Arccosine (`math/acos`) FlowGraphBlockNames.Acos
   - Arctangent (`math/atan`) FlowGraphBlockNames.Atan
   - Arctangent 2 (`math/atan2`) FlowGraphBlockNames.Atan2
6. **Hyperbolic Nodes**
   - Hyperbolic Sine (`math/sinh`) FlowGraphBlockNames.Sinh
   - Hyperbolic Cosine (`math/cosh`) FlowGraphBlockNames.Cosh
   - Hyperbolic Tangent (`math/tanh`) FlowGraphBlockNames.Tanh
   - Inverse Hyperbolic Sine (`math/asinh`) FlowGraphBlockNames.Asinh
   - Inverse Hyperbolic Cosine (`math/acosh`) FlowGraphBlockNames.Acosh
   - Inverse Hyperbolic Tangent (`math/atanh`) FlowGraphBlockNames.Atanh
7. **Exponential Nodes**
   - Exponent (`math/exp`) FlowGraphBlockNames.Exponential
   - Natural Logarithm (`math/log`) FlowGraphBlockNames.Log
   - Base-2 Logarithm (`math/log2`) FlowGraphBlockNames.Log2
   - Base-10 Logarithm (`math/log10`) FlowGraphBlockNames.Log10
   - Square Root (`math/sqrt`) FlowGraphBlockNames.SquareRoot
   - Cube Root (`math/cbrt`) FlowGraphBlockNames.CubeRoot
   - Power (`math/pow`) FlowGraphBlockNames.Power
8. **Vector Nodes**
   - Length (`math/length`) FlowGraphBlockNames.Length
   - Normalize (`math/normalize`) FlowGraphBlockNames.Normalize
   - Dot Product (`math/dot`) FlowGraphBlockNames.Dot
   - Cross Product (`math/cross`) FlowGraphBlockNames.Cross
   - Rotate 2D (`math/rotate2D`) FlowGraphBlockNames.Rotate2D
   - Rotate 3D (`math/rotate3D`) FlowGraphBlockNames.Rotate3D
   - Transform (`math/transform`) FlowGraphBlockNames.TransformVector
9. **Matrix Nodes**
   - Transpose (`math/transpose`) FlowGraphBlockNames.Transpose
   - Determinant (`math/determinant`) FlowGraphBlockNames.Determinant
   - Inverse (`math/inverse`) FlowGraphBlockNames.InvertMatrix
   - Multiplication (`math/matmul`) FlowGraphBlockNames.MatrixMultiplication
   - Compose (`math/matCompose`) FlowGraphBlockNames.MatrixCompose
   - Decompose (`math/matDecompose`) FlowGraphBlockNames.MatrixDecompose
10. **Quaternion Nodes**
    - Conjugate (`math/quatConjugate`) FlowGraphBlockNames.Conjugate
    - Multiplication (`math/quatMul`) FlowGraphBlockNames.Multiply
    - Angle Between Quaternions (`math/quatAngleBetween`) FlowGraphBlockNames.AngleBetween
    - Quaternion From Axis Angle (`math/quatFromAxisAngle`) FlowGraphBlockNames.QuaternionFromAxisAngle
    - Quaternion To Axis Angle (`math/quatToAxisAngle`) FlowGraphBlockNames.QuaternionToAxisAngle
    - Quaternion From Two Directional Vectors (`math/quatFromDirections`) FlowGraphBlockNames.QuaternionFromDirections
11. **Swizzle Nodes**
    - Combine (`math/combine2`, `math/combine3`, `math/combine4`, `math/combine2x2`, `math/combine3x3`, `math/combine4x4`)
        FlowGraphBlockNames.CombineVector2, FlowGraphBlockNames.CombineVector3, FlowGraphBlockNames.CombineVector4
        FlowGraphBlockNames.CombineMatrix2D, FlowGraphBlockNames.CombineMatrix3D, FlowGraphBlockNames.CombineMatrix
    - Extract (`math/extract2`, `math/extract3`, `math/extract4`, `math/extract2x2`, `math/extract3x3`, `math/extract4x4`)
        FlowGraphBlockNames.ExtractVector2, FlowGraphBlockNames.ExtractVector3, FlowGraphBlockNames.ExtractVector4
        FlowGraphBlockNames.ExtractMatrix2D, FlowGraphBlockNames.ExtractMatrix3D, FlowGraphBlockNames.ExtractMatrix
12. **Integer Arithmetic Nodes**
    - Absolute Value (`math/abs`) FlowGraphBlockNames.Abs
    - Sign (`math/sign`) FlowGraphBlockNames.Sign
    - Negation (`math/neg`) FlowGraphBlockNames.Negation
    - Addition (`math/add`) FlowGraphBlockNames.Add
    - Subtraction (`math/sub`) FlowGraphBlockNames.Subtract
    - Multiplication (`math/mul`) FlowGraphBlockNames.Multiply
    - Division (`math/div`) FlowGraphBlockNames.Divide
    - Remainder (`math/rem`) FlowGraphBlockNames.Modulo
    - Minimum (`math/min`) FlowGraphBlockNames.Min
    - Maximum (`math/max`) FlowGraphBlockNames.Max
    - Clamp (`math/clamp`) FlowGraphBlockNames.Clamp
13. **Integer Comparison Nodes**
    - Equality (`math/eq`) FlowGraphBlockNames.Equality
    - Less Than (`math/lt`) FlowGraphBlockNames.LessThan
    - Less Than Or Equal To (`math/le`) FlowGraphBlockNames.LessThanOrEqual
    - Greater Than (`math/gt`) FlowGraphBlockNames.GreaterThan
    - Greater Than Or Equal To (`math/ge`) FlowGraphBlockNames.GreaterThanOrEqual
14. **Integer Bitwise Nodes**
    - Bitwise NOT (`math/not`) FlowGraphBlockNames.BitwiseNot
    - Bitwise AND (`math/and`) FlowGraphBlockNames.BitwiseAnd
    - Bitwise OR (`math/or`) FlowGraphBlockNames.BitwiseOr
    - Bitwise XOR (`math/xor`) FlowGraphBlockNames.BitwiseXor
    - Right Shift (`math/asr`) FlowGraphBlockNames.BitwiseRightShift
    - Left Shift (`math/lsl`) FlowGraphBlockNames.BitwiseLeftShift
    - Count Leading Zeros (`math/clz`) FlowGraphBlockNames.LeadingZeros
    - Count Trailing Zeros (`math/ctz`) FlowGraphBlockNames.TrailingZeros
    - Count One Bits (`math/popcnt`) FlowGraphBlockNames.OneBitsCounter
15. **Boolean Arithmetic Nodes**
    - Equality (`math/eq`) FlowGraphBlockNames.Equality
    - Boolean NOT (`math/not`) FlowGraphBlockNames.BitwiseNot
    - Boolean AND (`math/and`) FlowGraphBlockNames.BitwiseAnd
    - Boolean OR (`math/or`) FlowGraphBlockNames.BitwiseOr
    - Boolean XOR (`math/xor`) FlowGraphBlockNames.BitwiseXor

### Type Conversion Nodes
1. **Boolean Conversion Nodes**
   - Boolean to Integer (`type/boolToInt`) FlowGraphBlockNames.BooleanToInt
   - Boolean to Float (`type/boolToFloat`) FlowGraphBlockNames.BooleanToFloat
2. **Integer Conversion Nodes**
   - Integer to Boolean (`type/intToBool`) FlowGraphBlockNames.IntToBoolean
   - Integer to Float (`type/intToFloat`) FlowGraphBlockNames.IntToFloat
3. **Float Conversion Nodes**
   - Float to Boolean (`type/floatToBool`) FlowGraphBlockNames.FloatToBoolean
   - Float to Integer (`type/floatToInt`) FlowGraphBlockNames.FloatToInt

### Control Flow Nodes
1. **Sync Nodes**
   - Sequence (`flow/sequence`) FlowGraphBlockNames.Sequence
   - Branch (`flow/branch`) FlowGraphBlockNames.Branch
   - Switch (`flow/switch`) FlowGraphBlockNames.Switch
   - While Loop (`flow/while`) FlowGraphBlockNames.WhileLoop
   - For Loop (`flow/for`) FlowGraphBlockNames.ForLoop
   - Do N (`flow/doN`) FlowGraphBlockNames.DoN
   - Multi Gate (`flow/multiGate`) FlowGraphBlockNames.MultiGate
   - Wait All (`flow/waitAll`) FlowGraphBlockNames.WaitAll
   - Throttle (`flow/throttle`) FlowGraphBlockNames.Throttle
2. **Delay Nodes**
   - Set Delay (`flow/setDelay`) FlowGraphBlockNames.SetDelay
   - Cancel Delay (`flow/cancelDelay`) FlowGraphBlockNames.CancelDelay

### State Manipulation Nodes
1. **Custom Variable Access**
   - Variable Get (`variable/get`) FlowGraphBlockNames.GetVariable
   - Variable Set (`variable/set`) FlowGraphBlockNames.SetVariable
   - Variable Interpolate (`variable/interpolate`)
2. **Object Model Access** // TODO fully test this!!!
   - JSON Pointer Template Parsing (`pointer/get`) [FlowGraphBlockNames.GetProperty, FlowGraphBlockNames.JsonPointerParser]
   - Effective JSON Pointer Generation (`pointer/set`) [FlowGraphBlockNames.SetProperty, FlowGraphBlockNames.JsonPointerParser]
   - Pointer Get (`pointer/get`) [FlowGraphBlockNames.GetProperty, FlowGraphBlockNames.JsonPointerParser]
   - Pointer Set (`pointer/set`) [FlowGraphBlockNames.SetProperty, FlowGraphBlockNames.JsonPointerParser]
   - Pointer Interpolate (`pointer/interpolate`) [FlowGraphBlockNames.ValueInterpolation, FlowGraphBlockNames.JsonPointerParser, FlowGraphBlockNames.PlayAnimation, FlowGraphBlockNames.Easing]

### Animation Control Nodes
1. **Animation Play** (`animation/start`) FlowGraphBlockNames.PlayAnimation
2. **Animation Stop** (`animation/stop`) FlowGraphBlockNames.StopAnimation
3. **Animation Stop At** (`animation/stopAt`) FlowGraphBlockNames.StopAnimation

### Event Nodes
1. **Lifecycle Event Nodes**
   - On Start (`event/onStart`) FlowGraphBlockNames.SceneReadyEvent
   - On Tick (`event/onTick`) FlowGraphBlockNames.SceneTickEvent
2. **Custom Event Nodes**
   - Receive (`event/receive`) FlowGraphBlockNames.ReceiveCustomEvent
   - Send (`event/send`) FlowGraphBlockNames.SendCustomEvent

 */
