import { WebGPUEngine } from 'core/Engines/webgpuEngine';
import { Texture } from 'core/Materials/Textures/texture';
/**
 * A dash entry
 */
type DashEntry = {
    y: number;
    height: number;
    width: number;
};
/**
 * @internal
 * A LineAtlas lets us reuse rendered dashed lines
 * by writing many of them to a texture and then fetching their positions
 * using {@link LineAtlas#getDash}.
 *
 * @param width - the width
 * @param height - the height
 */
export declare class LineAtlas {
    width: number;
    height: number;
    nextRow: number;
    bytes: number;
    data: Uint8Array;
    dashEntry: {
        [_: string]: DashEntry;
    };
    dirty: boolean;
    texture: Texture;
    constructor(width: number, height: number);
    /**
     * Get or create a dash line pattern.
     *
     * @param dasharray - the key (represented by numbers) to get the dash texture
     * @param round - whether to add circle caps in between dash segments
     * @returns position of dash texture in {@link DashEntry}
     */
    getDash(dasharray: Array<number>, round: boolean): DashEntry;
    getDashRanges(dasharray: Array<number>, lineAtlasWidth: number, stretch: number): any[];
    addRoundDash(ranges: any, stretch: number, n: number): void;
    addRegularDash(ranges: any): void;
    addDash(dasharray: Array<number>, round: boolean): DashEntry;
    bind(engine: WebGPUEngine): void;
}
export {};
