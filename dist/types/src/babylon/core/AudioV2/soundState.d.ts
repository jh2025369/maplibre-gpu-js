/**
 * The state of a sound.
 */
export declare const enum SoundState {
    /**
     * The sound is waiting for its instances to stop.
     */
    Stopping = 0,
    /**
     * The sound is stopped.
     */
    Stopped = 1,
    /**
     * The sound is waiting for its instances to start.
     */
    Starting = 2,
    /**
     * The sound has started playing.
     */
    Started = 3,
    /**
     * The sound failed to start, most likely due to the user not interacting with the page, yet.
     */
    FailedToStart = 4,
    /**
     * The sound is paused.
     */
    Paused = 5
}
