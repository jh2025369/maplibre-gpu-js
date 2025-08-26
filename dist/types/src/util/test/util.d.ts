/// <reference types="node" />
/// <reference types="node" />
import { Map } from '../../ui/map';
import { Dispatcher } from '../../util/dispatcher';
import { IActor } from '../actor';
import type { Evented } from '../evented';
import { SourceSpecification, StyleSpecification } from '@maplibre/maplibre-gl-style-spec';
export declare function createMap(options?: any, callback?: any): Map;
export declare function equalWithPrecision(test: any, expected: any, actual: any, multiplier: any, message: any, extra: any): any;
export declare function setPerformance(): void;
export declare function setMatchMedia(): void;
export declare function beforeMapTest(): void;
export declare function getWrapDispatcher(): (actor: IActor) => Dispatcher;
export declare function getMockDispatcher(): Dispatcher;
export declare function stubAjaxGetImage(createImageBitmap: any): void;
/**
 * This should be used in test that use nise since the internal buffer returned from a file is not an instance of ArrayBuffer for some reason.
 * @param data - the data read from a file, for example by `fs.readFileSync(...)`
 * @returns a copy of the data in the file in `ArrayBuffer` format
 */
export declare function bufferToArrayBuffer(data: Buffer): ArrayBuffer;
/**
 * This allows test to wait for a certain amount of time before continuing.
 * @param milliseconds - the amount of time to wait in milliseconds
 * @returns - a promise that resolves after the specified amount of time
 */
export declare const sleep: (milliseconds?: number) => Promise<unknown>;
export declare function waitForMetadataEvent(source: Evented): Promise<void>;
export declare function createStyleSource(): SourceSpecification;
export declare function createStyle(): StyleSpecification;
