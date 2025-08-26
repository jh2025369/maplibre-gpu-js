import { ParticleSystemSet } from "../particleSystemSet";
import { SystemBlock } from "./Blocks/systemBlock";
import type { Scene } from "core/scene";
import type { NodeParticleBlock } from "./nodeParticleBlock";
import { Observable } from "core/Misc/observable";
import { ParticleInputBlock } from "./Blocks/particleInputBlock";
import type { Color4 } from "core/Maths/math.color";
/**
 * Interface used to configure the node particle editor
 */
export interface INodeParticleEditorOptions {
    /** Define the URL to load node editor script from */
    editorURL?: string;
    /** Additional configuration for the NPE */
    nodeEditorConfig?: {
        backgroundColor?: Color4;
    };
}
/**
 * Defines a set of particle systems defined as a node graph.
 * @experimental This API is experimental and may change in future releases.
 * NPE: #K6F1ZB#1
 * PG: #ZT509U#1
 */
export declare class NodeParticleSystemSet {
    private _systemBlocks;
    private _buildId;
    /** Define the Url to load node editor script */
    static EditorURL: string;
    /** Define the Url to load snippets */
    static SnippetUrl: string;
    /**
     * Snippet ID if the material was created from the snippet server
     */
    snippetId: string;
    /**
     * Gets an array of blocks that needs to be serialized even if they are not yet connected
     */
    attachedBlocks: NodeParticleBlock[];
    /**
     * Gets or sets data used by visual editor
     * @see https://npe.babylonjs.com
     */
    editorData: any;
    /**
     * Observable raised when the particle set is built
     */
    onBuildObservable: Observable<NodeParticleSystemSet>;
    /**
     * The name of the set
     */
    name: string;
    /**
     * A free comment about the set
     */
    comment: string;
    /**
     * Gets the system blocks
     */
    get systemBlocks(): SystemBlock[];
    /**
     * Gets the list of input blocks attached to this material
     * @returns an array of InputBlocks
     */
    get inputBlocks(): ParticleInputBlock[];
    /**
     * Creates a new set
     * @param name defines the name of the set
     */
    constructor(name: string);
    /**
     * Gets the current class name of the geometry e.g. "NodeParticleSystemSet"
     * @returns the class name
     */
    getClassName(): string;
    private _initializeBlock;
    private BJSNODEPARTICLEEDITOR;
    /** Get the editor from bundle or global
     * @returns the global NPE
     */
    private _getGlobalNodeParticleEditor;
    /** Creates the node editor window.
     * @param additionalConfig Define the configuration of the editor
     */
    private _createNodeParticleEditor;
    /**
     * Launch the node particle editor
     * @param config Define the configuration of the editor
     * @returns a promise fulfilled when the node editor is visible
     */
    editAsync(config?: INodeParticleEditorOptions): Promise<void>;
    /**
     * Builds the particle system set from the defined blocks.
     * @param scene defines the hosting scene
     * @param verbose defines whether to log detailed information during the build process (false by default)
     * @returns a promise that resolves to the built particle system set
     */
    buildAsync(scene: Scene, verbose?: boolean): Promise<ParticleSystemSet>;
    /**
     * Clear the current geometry
     */
    clear(): void;
    /**
     * Clear the current set and restore it to a default state
     */
    setToDefault(): void;
    /**
     * Remove a block from the current system set
     * @param block defines the block to remove
     */
    removeBlock(block: NodeParticleBlock): void;
    /**
     * Clear the current graph and load a new one from a serialization object
     * @param source defines the JSON representation of the particle set
     * @param merge defines whether or not the source must be merged or replace the current content
     */
    parseSerializedObject(source: any, merge?: boolean): void;
    private _restoreConnections;
    /**
     * Serializes this geometry in a JSON representation
     * @param selectedBlocks defines the list of blocks to save (if null the whole geometry will be saved)
     * @returns the serialized particle system set object
     */
    serialize(selectedBlocks?: NodeParticleBlock[]): any;
    /**
     * Makes a duplicate of the current particle system set.
     * @param name defines the name to use for the new particle system set
     * @returns the cloned particle system set
     */
    clone(name: string): NodeParticleSystemSet;
    /**
     * Disposes the resources
     */
    dispose(): void;
    /**
     * Creates a new node particle set set to default basic configuration
     * @param name defines the name of the particle set
     * @returns a new NodeParticleSystemSet
     */
    static CreateDefault(name: string): NodeParticleSystemSet;
    /**
     * Creates a node particle set from parsed data
     * @param source defines the JSON representation of the particle set
     * @returns a new node particle set
     */
    static Parse(source: any): NodeParticleSystemSet;
    /**
     * Creates a node particle set from a snippet saved by the node geometry editor
     * @param snippetId defines the snippet to load
     * @param nodeParticleSet defines a node particle set to update (instead of creating a new one)
     * @returns a promise that will resolve to the new node geometry
     */
    static ParseFromSnippetAsync(snippetId: string, nodeParticleSet?: NodeParticleSystemSet): Promise<NodeParticleSystemSet>;
}
