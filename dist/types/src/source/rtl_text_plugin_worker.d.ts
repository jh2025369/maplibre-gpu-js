import { PluginState, RTLPluginStatus } from './rtl_text_plugin_status';
export interface RTLTextPlugin {
    applyArabicShaping: (a: string) => string;
    processBidirectionalText: ((b: string, a: Array<number>) => Array<string>);
    processStyledBidirectionalText: ((c: string, b: Array<number>, a: Array<number>) => Array<[string, Array<number>]>);
}
declare class RTLWorkerPlugin implements RTLTextPlugin {
    applyArabicShaping: (a: string) => string;
    processBidirectionalText: ((b: string, a: Array<number>) => Array<string>);
    processStyledBidirectionalText: ((c: string, b: Array<number>, a: Array<number>) => Array<[string, Array<number>]>);
    pluginStatus: RTLPluginStatus;
    pluginURL: string;
    setState(state: PluginState): void;
    getState(): PluginState;
    setMethods(rtlTextPlugin: RTLTextPlugin): void;
    isParsed(): boolean;
    getPluginURL(): string;
    getRTLTextPluginStatus(): RTLPluginStatus;
}
export declare const rtlWorkerPlugin: RTLWorkerPlugin;
export {};
