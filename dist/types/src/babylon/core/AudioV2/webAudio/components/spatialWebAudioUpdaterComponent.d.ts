/** @internal */
export declare class _SpatialWebAudioUpdaterComponent {
    private _autoUpdate;
    private _lastUpdateTime;
    /** @internal */
    minUpdateTime: number;
    /** @internal */
    constructor(parent: {
        update: () => void;
    }, autoUpdate: boolean, minUpdateTime: number);
    /** @internal */
    dispose(): void;
}
