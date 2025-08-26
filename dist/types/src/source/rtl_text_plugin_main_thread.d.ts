import { Evented } from '../util/evented';
import { RTLPluginStatus, PluginState } from './rtl_text_plugin_status';
import { Dispatcher } from '../util/dispatcher';
declare class RTLMainThreadPlugin extends Evented {
    status: RTLPluginStatus;
    url: string;
    dispatcher: Dispatcher;
    /** Sync RTL plugin state by broadcasting a message to the worker */
    _syncState(statusToSend: RTLPluginStatus): Promise<PluginState[]>;
    /** This one is exposed to outside */
    getRTLTextPluginStatus(): RTLPluginStatus;
    clearRTLTextPlugin(): void;
    setRTLTextPlugin(url: string, deferred?: boolean): Promise<void>;
    /** Send a message to worker which will import the RTL plugin script */
    _requestImport(): Promise<void>;
    /** Start a lazy loading process of RTL plugin */
    lazyLoad(): void;
}
export declare function rtlMainThreadPluginFactory(): RTLMainThreadPlugin;
export {};
