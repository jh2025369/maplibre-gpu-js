export type AudioAnalyzerFFTSizeType = 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768;
export declare const _AudioAnalyzerDefaults: {
    readonly fftSize: AudioAnalyzerFFTSizeType;
    readonly minDecibels: number;
    readonly maxDecibels: number;
    readonly smoothing: number;
};
/**
 * Options for the AudioAnalyzer
 */
export interface IAudioAnalyzerOptions {
    /**
     * Enable the audio analyzer. Defaults to false.
     */
    analyzerEnabled: boolean;
    /**
     * The size of the FFT (fast fourier transform) to use when converting time-domain data to frequency-domain data. Default is 2048.
     */
    analyzerFFTSize: AudioAnalyzerFFTSizeType;
    /**
     * The minimum decibel value for the range of the analyzer. Default is -100.
     */
    analyzerMinDecibels: number;
    /**
     * The maximum decibel value for the range of the analyzer. Default is -30.
     */
    analyzerMaxDecibels: number;
    /**
     * A number between 0 and 1 that determines how quickly the analyzer's value changes. Default is 0.8.
     */
    analyzerSmoothing: number;
}
/**
 * @param options The audio analyzer options to check.
 * @returns `true` if audio analyzer options are defined, otherwise `false`.
 */
export declare function _HasAudioAnalyzerOptions(options: Partial<IAudioAnalyzerOptions>): boolean;
/**
 * An AudioAnalyzer converts time-domain audio data into the frequency-domain.
 */
export declare abstract class AbstractAudioAnalyzer {
    /**
     * The size of the FFT (fast fourier transform) to use when converting time-domain data to frequency-domain data. Default is 2048.
     */
    abstract fftSize: AudioAnalyzerFFTSizeType;
    /**
     * The number of data values that will be returned when calling getByteFrequencyData() or getFloatFrequencyData(). This is always half the `fftSize`.
     */
    get frequencyBinCount(): number;
    /**
     * Whether the analyzer is enabled or not.
     * - The `getByteFrequencyData` and `getFloatFrequencyData` functions return `null` if the analyzer is not enabled.
     * @see {@link enableAsync}
     */
    abstract isEnabled: boolean;
    /**
     * The minimum decibel value for the range of the analyzer. Default is -100.
     */
    abstract minDecibels: number;
    /**
     * The maximum decibel value for the range of the analyzer. Default is -30.
     */
    abstract maxDecibels: number;
    /**
     * A number between 0 and 1 that determines how quickly the analyzer's value changes. Default is 0.8.
     */
    abstract smoothing: number;
    /**
     * Releases associated resources.
     */
    abstract dispose(): void;
    /**
     * Enables the analyzer
     */
    abstract enableAsync(): Promise<void>;
    /**
     * Gets the current frequency data as a byte array
     * @returns a Uint8Array if the analyzer is enabled, otherwise `null`
     */
    abstract getByteFrequencyData(): Uint8Array;
    /**
     * Gets the current frequency data as a float array
     * @returns a Float32Array if the analyzer is enabled, otherwise `null`
     */
    abstract getFloatFrequencyData(): Float32Array;
}
