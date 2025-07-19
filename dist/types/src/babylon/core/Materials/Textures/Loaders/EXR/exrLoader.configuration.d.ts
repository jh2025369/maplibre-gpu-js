export declare enum EXROutputType {
    Float = 0,
    HalfFloat = 1
}
/**
 * Class used to store configuration of the exr loader
 */
export declare class ExrLoaderGlobalConfiguration {
    /**
     * Defines the default output type to use (Half float by default)
     */
    static DefaultOutputType: EXROutputType;
    /**
     * Url to use to load the fflate library (for zip decompression)
     */
    static FFLATEUrl: string;
}
