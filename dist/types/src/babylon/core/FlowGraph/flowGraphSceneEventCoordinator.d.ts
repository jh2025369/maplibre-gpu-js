import { Observable } from "core/Misc/observable";
import type { Scene } from "core/scene";
import { FlowGraphEventType } from "./flowGraphEventType";
/**
 * the interface of the object the scene event coordinator will trigger.
 */
export interface IFlowGraphEventTrigger {
    /**
     * The type of the event
     */
    type: FlowGraphEventType;
    /**
     * The data of the event
     */
    payload?: any;
}
/**
 * This class is responsible for coordinating the events that are triggered in the scene.
 * It registers all observers needed to track certain events and triggers the blocks that are listening to them.
 * Abstracting the events from the class will allow us to easily change the events that are being listened to, and trigger them in any order.
 */
export declare class FlowGraphSceneEventCoordinator {
    /**
     * @internal
     */
    readonly _scene: Scene;
    /**
     * register to this observable to get flow graph event notifications.
     */
    onEventTriggeredObservable: Observable<IFlowGraphEventTrigger>;
    /**
     * Was scene-ready already triggered?
     */
    sceneReadyTriggered: boolean;
    private _sceneDisposeObserver;
    private _sceneReadyObserver;
    private _sceneOnBeforeRenderObserver;
    private _meshPickedObserver;
    private _meshUnderPointerObserver;
    private _pointerUnderMeshState;
    private _startingTime;
    constructor(scene: Scene);
    private _initialize;
    dispose(): void;
}
