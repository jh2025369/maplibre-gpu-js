/**
 * Fetches a resource from the network
 * @param url defines the url to fetch the resource from
 * @param options defines the options to use when fetching the resource
 * @returns a promise that resolves when the resource is fetched
 * @internal
 */
export declare function _FetchAsync(url: string, options: Partial<{
    method: string;
    responseHeaders?: string[];
}>): Promise<{
    response: Response;
    headerValues: {
        [key: string]: string;
    };
}>;
