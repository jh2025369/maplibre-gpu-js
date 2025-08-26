import type { IAbstractSoundInstanceOptions } from "./abstractSoundInstance";
import { _AbstractSoundInstance } from "./abstractSoundInstance";
import type { IStaticSoundOptionsBase, IStaticSoundPlayOptions, IStaticSoundStopOptions } from "./staticSound";
/**
 * Options for creating a static sound instance.
 * @internal
 */
export interface IStaticSoundInstanceOptions extends IAbstractSoundInstanceOptions, IStaticSoundOptionsBase {
}
/** @internal */
export declare abstract class _StaticSoundInstance extends _AbstractSoundInstance {
    protected abstract readonly _options: IStaticSoundInstanceOptions;
    abstract pitch: number;
    abstract playbackRate: number;
    abstract play(options: Partial<IStaticSoundPlayOptions>): void;
    abstract stop(options?: Partial<IStaticSoundStopOptions>): void;
}
