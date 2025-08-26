import type { Effect } from "./effect";
import type { IClipPlanesHolder } from "../Misc/interfaces/iClipPlanesHolder";
/** @internal */
export declare function AddClipPlaneUniforms(uniforms: string[]): void;
/** @internal */
export declare function PrepareStringDefinesForClipPlanes(primaryHolder: IClipPlanesHolder, secondaryHolder: IClipPlanesHolder, defines: string[]): void;
/** @internal */
export declare function PrepareDefinesForClipPlanes(primaryHolder: IClipPlanesHolder, secondaryHolder: IClipPlanesHolder, defines: Record<string, any>): boolean;
/** @internal */
export declare function BindClipPlane(effect: Effect, primaryHolder: IClipPlanesHolder, secondaryHolder: IClipPlanesHolder): void;
