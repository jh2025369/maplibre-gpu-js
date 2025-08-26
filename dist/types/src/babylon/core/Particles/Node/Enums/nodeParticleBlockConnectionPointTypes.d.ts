/**
 * Defines the kind of connection point for node geometry
 */
export declare enum NodeParticleBlockConnectionPointTypes {
    /** Int */
    Int = 1,
    /** Float */
    Float = 2,
    /** Vector2 */
    Vector2 = 4,
    /** Vector3 */
    Vector3 = 8,
    /** Matrix */
    Matrix = 16,
    /** Particle */
    Particle = 32,
    /** Texture */
    Texture = 64,
    /** Color4 */
    Color4 = 128,
    /** FloatGradient */
    FloatGradient = 256,
    /** Vector2Gradient */
    Vector2Gradient = 512,
    /** Vector3Gradient */
    Vector3Gradient = 1024,
    /** Color4Gradient */
    Color4Gradient = 2048,
    /** System */
    System = 4096,
    /** Detect type based on connection */
    AutoDetect = 8192,
    /** Output type that will be defined by input type */
    BasedOnInput = 16384,
    /** Undefined */
    Undefined = 32768,
    /** Bitmask of all types */
    All = 65535
}
