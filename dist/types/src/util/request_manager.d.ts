import type { RequestParameters } from './ajax';
/**
 * A type of MapLibre resource.
 */
export declare const enum ResourceType {
    Glyphs = "Glyphs",
    Image = "Image",
    Source = "Source",
    SpriteImage = "SpriteImage",
    SpriteJSON = "SpriteJSON",
    Style = "Style",
    Tile = "Tile",
    Unknown = "Unknown"
}
/**
 * This function is used to tranform a request.
 * It is used just before executing the relevant request.
 */
export type RequestTransformFunction = (url: string, resourceType?: ResourceType) => RequestParameters | undefined;
export declare class RequestManager {
    _transformRequestFn: RequestTransformFunction;
    constructor(transformRequestFn?: RequestTransformFunction);
    transformRequest(url: string, type: ResourceType): RequestParameters;
    normalizeSpriteURL(url: string, format: string, extension: string): string;
    setTransformRequest(transformRequest: RequestTransformFunction): void;
}
