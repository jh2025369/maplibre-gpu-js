/**
 * This file is only for internal use only and should not be used in your code
 */
/**
 * Load an asynchronous script (identified by an url) in a module way. When the url returns, the
 * content of this file is added into a new script element, attached to the DOM (body element)
 * @param scriptUrl defines the url of the script to load
 * @param scriptId defines the id of the script element
 * @returns a promise request object
 * It is up to the caller to provide a script that will do the import and prepare a "returnedValue" variable
 * @internal DO NOT USE outside of Babylon.js core
 */
export declare function _LoadScriptModuleAsync(scriptUrl: string, scriptId?: string): Promise<any>;
