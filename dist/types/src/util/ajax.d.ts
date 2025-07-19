/**
 * This is used to identify the global dispatcher id when sending a message from the worker without a target map id.
 */
export declare const GLOBAL_DISPATCHER_ID = "global-dispatcher";
/**
 * A type used to store the tile's expiration date and cache control definition
 */
export type ExpiryData = {
    cacheControl?: string | null;
    expires?: Date | string | null;
};
/**
 * A `RequestParameters` object to be returned from Map.options.transformRequest callbacks.
 * @example
 * ```ts
 * // use transformRequest to modify requests that begin with `http://myHost`
 * transformRequest: function(url, resourceType) {
 *  if (resourceType === 'Source' && url.indexOf('http://myHost') > -1) {
 *    return {
 *      url: url.replace('http', 'https'),
 *      headers: { 'my-custom-header': true },
 *      credentials: 'include'  // Include cookies for cross-origin requests
 *    }
 *   }
 * }
 * ```
 */
export type RequestParameters = {
    /**
     * The URL to be requested.
     */
    url: string;
    /**
     * The headers to be sent with the request.
     */
    headers?: any;
    /**
     * Request method `'GET' | 'POST' | 'PUT'`.
     */
    method?: 'GET' | 'POST' | 'PUT';
    /**
     * Request body.
     */
    body?: string;
    /**
     * Response body type to be returned.
     */
    type?: 'string' | 'json' | 'arrayBuffer' | 'image';
    /**
     * `'same-origin'|'include'` Use 'include' to send cookies with cross-origin requests.
     */
    credentials?: 'same-origin' | 'include';
    /**
     * If `true`, Resource Timing API information will be collected for these transformed requests and returned in a resourceTiming property of relevant data events.
     */
    collectResourceTiming?: boolean;
    /**
     * Parameters supported only by browser fetch API. Property of the Request interface contains the cache mode of the request. It controls how the request will interact with the browser's HTTP cache. (https://developer.mozilla.org/en-US/docs/Web/API/Request/cache)
     */
    cache?: RequestCache;
};
/**
 * The response object returned from a successful AJAx request
 */
export type GetResourceResponse<T> = ExpiryData & {
    data: T;
};
/**
 * The response callback used in various places
 */
export type ResponseCallback<T> = (error?: Error | null, data?: T | null, cacheControl?: string | null, expires?: string | Date | null) => void;
/**
 * An error thrown when a HTTP request results in an error response.
 */
export declare class AJAXError extends Error {
    /**
     * The response's HTTP status code.
     */
    status: number;
    /**
     * The response's HTTP status text.
     */
    statusText: string;
    /**
     * The request's URL.
     */
    url: string;
    /**
     * The response's body.
     */
    body: Blob;
    /**
     * @param status - The response's HTTP status code.
     * @param statusText - The response's HTTP status text.
     * @param url - The request's URL.
     * @param body - The response's body.
     */
    constructor(status: number, statusText: string, url: string, body: Blob);
}
/**
 * Ensure that we're sending the correct referrer from blob URL worker bundles.
 * For files loaded from the local file system, `location.origin` will be set
 * to the string(!) "null" (Firefox), or "file://" (Chrome, Safari, Edge),
 * and we will set an empty referrer. Otherwise, we're using the document's URL.
 */
export declare const getReferrer: () => string;
/**
 * We're trying to use the Fetch API if possible. However, requests for resources with the file:// URI scheme don't work with the Fetch API.
 * In this case we unconditionally use XHR on the current thread since referrers don't matter.
 * This method can also use the registered method if `addProtocol` was called.
 * @param requestParameters - The request parameters
 * @param abortController - The abort controller allowing to cancel the request
 * @returns a promise resolving to the response, including cache control and expiry data
 */
export declare const makeRequest: (requestParameters: RequestParameters, abortController: AbortController) => Promise<GetResourceResponse<any>>;
export declare const getJSON: <T>(requestParameters: RequestParameters, abortController: AbortController) => Promise<{
    data: T;
} & ExpiryData>;
export declare const getArrayBuffer: (requestParameters: RequestParameters, abortController: AbortController) => Promise<{
    data: ArrayBuffer;
} & ExpiryData>;
export declare function sameOrigin(inComingUrl: string): boolean;
export declare const getVideo: (urls: Array<string>) => Promise<HTMLVideoElement>;
