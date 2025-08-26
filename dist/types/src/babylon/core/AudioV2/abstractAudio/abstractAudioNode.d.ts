import { Observable } from "../../Misc/observable";
import type { AudioEngineV2 } from "./audioEngineV2";
export declare const enum AudioNodeType {
    HAS_INPUTS = 1,
    HAS_OUTPUTS = 2,
    HAS_INPUTS_AND_OUTPUTS = 3
}
/**
 * Abstract class for an audio node.
 *
 * An audio node is a processing unit that can receive audio data from an upstream node and/or send audio data to a
 * downstream node.
 *
 * Nodes can be connected to other nodes to create an audio graph. The audio graph represents the flow of audio data.
 *
 * There are 3 types of audio nodes:
 * 1. Input: Receives audio data from upstream nodes.
 * 2. Output: Sends audio data to downstream nodes.
 * 3. Input/Output: Receives audio data from upstream nodes and sends audio data to downstream nodes.
 */
export declare abstract class AbstractAudioNode {
    /**
     * The connected downstream audio nodes.
     * - Undefined for input nodes.
     */
    protected readonly _downstreamNodes?: Set<AbstractAudioNode>;
    /**
     * The connected upstream audio nodes.
     * - Undefined for output nodes.
     */
    protected readonly _upstreamNodes?: Set<AbstractAudioNode>;
    /**
     * The audio engine this node belongs to.
     */
    readonly engine: AudioEngineV2;
    /**
     * Observable for when the audio node is disposed.
     */
    readonly onDisposeObservable: Observable<AbstractAudioNode>;
    protected constructor(engine: AudioEngineV2, nodeType: AudioNodeType);
    /**
     * Releases associated resources.
     * - Triggers `onDisposeObservable`.
     * @see {@link onDisposeObservable}
     */
    dispose(): void;
    /**
     * Gets a string identifying the name of the class
     * @returns the class's name as a string
     */
    abstract getClassName(): string;
    /**
     * Connect to a downstream audio input node.
     * @param node - The downstream audio input node to connect
     * @returns `true` if the node is successfully connected; otherwise `false`
     */
    protected _connect(node: AbstractAudioNode): boolean;
    /**
     * Disconnects a downstream audio input node.
     * @param node - The downstream audio input node to disconnect
     * @returns `true` if the node is successfully disconnected; otherwise `false`
     */
    protected _disconnect(node: AbstractAudioNode): boolean;
    /**
     * Called when an upstream audio output node is connecting.
     * @param node - The connecting upstream audio node
     * @returns `true` if the node is successfully connected; otherwise `false`
     */
    private _onConnect;
    /**
     * Called when an upstream audio output node disconnects.
     * @param node - The disconnecting upstream audio node
     * @returns `true` if node is sucessfully disconnected; otherwise `false`
     */
    private _onDisconnect;
}
/**
 * Abstract class for a named audio node.
 */
export declare abstract class AbstractNamedAudioNode extends AbstractAudioNode {
    private _name;
    /**
     * Observable for when the audio node is renamed.
     */
    readonly onNameChangedObservable: Observable<{
        newName: string;
        oldName: string;
        node: AbstractNamedAudioNode;
    }>;
    protected constructor(name: string, engine: AudioEngineV2, nodeType: AudioNodeType);
    /**
     * The name of the audio node.
     * - Triggers `onNameChangedObservable` when changed.
     * @see {@link onNameChangedObservable}
     */
    get name(): string;
    set name(newName: string);
    dispose(): void;
}
