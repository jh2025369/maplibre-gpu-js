import type { Nullable, NodeRenderGraphConnectionPoint, Observable } from "core/index";
/**
 * Class used to store node based render graph build state
 */
export declare class NodeRenderGraphBuildState {
    /** Gets or sets the build identifier */
    buildId: number;
    /** Gets or sets a boolean indicating that verbose mode is on */
    verbose: boolean;
    /**
     * Gets or sets the list of non connected mandatory inputs
     * @internal
     */
    _notConnectedNonOptionalInputs: NodeRenderGraphConnectionPoint[];
    /**
     * Emits console errors and exceptions if there is a failing check
     * @param errorObservable defines an Observable to send the error message
     * @returns true if all checks pass
     */
    emitErrors(errorObservable?: Nullable<Observable<string>>): boolean;
}
