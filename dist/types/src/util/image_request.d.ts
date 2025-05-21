import { RequestParameters, GetResourceResponse } from './ajax';
type ImageQueueThrottleControlCallback = () => boolean;
export type ImageRequestQueueItem = {
    requestParameters: RequestParameters;
    supportImageRefresh: boolean;
    state: 'queued' | 'running' | 'completed';
    abortController: AbortController;
    onError: (error: Error) => void;
    onSuccess: (response: GetResourceResponse<HTMLImageElement | ImageBitmap | null>) => void;
};
/**
 * By default, the image queue is self driven, meaning as soon as one requested item is processed,
 * it will move on to next one as quickly as it can while limiting
 * the number of concurrent requests to MAX_PARALLEL_IMAGE_REQUESTS. The default behavior
 * ensures that static views of the map can be rendered with minimal delay.
 *
 * However, the default behavior can prevent dynamic views of the map from rendering
 * smoothly in that many requests can finish in one render frame, putting too much pressure on GPU.
 *
 * When the view of the map is moving dynamically, smoother frame rates can be achieved
 * by throttling the number of items processed by the queue per frame. This can be
 * accomplished by using {@link addThrottleControl} to allow the caller to
 * use a lambda function to determine when the queue should be throttled (e.g. when isMoving())
 * and manually calling {@link processQueue} in the render loop.
 */
export declare namespace ImageRequest {
    /**
     * Reset the image request queue, removing all pending requests.
     */
    const resetRequestQueue: () => void;
    /**
     * Install a callback to control when image queue throttling is desired.
     * (e.g. when the map view is moving)
     * @param callback - The callback function to install
     * @returns handle that identifies the installed callback.
     */
    const addThrottleControl: (callback: ImageQueueThrottleControlCallback) => number;
    /**
     * Remove a previously installed callback by passing in the handle returned
     * by {@link addThrottleControl}.
     * @param callbackHandle - The handle for the callback to remove.
     */
    const removeThrottleControl: (callbackHandle: number) => void;
    /**
     * Request to load an image.
     * @param requestParameters - Request parameters.
     * @param abortController - allows to abort the request.
     * @param supportImageRefresh - `true`, if the image request need to support refresh based on cache headers.
     * @returns - A promise resolved when the image is loaded.
     */
    const getImage: (requestParameters: RequestParameters, abortController: AbortController, supportImageRefresh?: boolean) => Promise<GetResourceResponse<HTMLImageElement | ImageBitmap | null>>;
}
export {};
