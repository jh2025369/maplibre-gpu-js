import type { Evented } from '../util/evented';
type ValidationError = {
    message: string;
    line: number;
    identifier?: string;
};
export type Validator = (a: any) => ReadonlyArray<ValidationError>;
type ValidateStyle = {
    source: Validator;
    sprite: Validator;
    glyphs: Validator;
    layer: Validator;
    light: Validator;
    terrain: Validator;
    filter: Validator;
    paintProperty: Validator;
    layoutProperty: Validator;
    (b: any, a?: any | null): ReadonlyArray<ValidationError>;
};
export declare const validateStyle: ValidateStyle;
export declare const validateSource: Validator;
export declare const validateLight: Validator;
export declare const validateTerrain: Validator;
export declare const validateFilter: Validator;
export declare const validatePaintProperty: Validator;
export declare const validateLayoutProperty: Validator;
export declare function emitValidationErrors(emitter: Evented, errors?: ReadonlyArray<{
    message: string;
    identifier?: string;
}> | null): boolean;
export {};
