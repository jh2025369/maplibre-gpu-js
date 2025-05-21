import type { SpriteSpecification } from '@maplibre/maplibre-gl-style-spec';
/**
 * Takes a SpriteSpecification value and returns it in its array form. If `undefined` is passed as an input value, an
 * empty array is returned.
 * duplicated entries with identical id/url will be removed in returned array
 * @param sprite - optional sprite to coerce
 * @returns an empty array in case `undefined` is passed; id-url pairs otherwise
 */
export declare function coerceSpriteToArray(sprite?: SpriteSpecification): {
    id: string;
    url: string;
}[];
