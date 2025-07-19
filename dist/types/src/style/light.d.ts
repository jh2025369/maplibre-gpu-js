import { Color } from '@maplibre/maplibre-gl-style-spec';
import { Evented } from '../util/evented';
import type { StylePropertySpecification, LightSpecification } from '@maplibre/maplibre-gl-style-spec';
import type { EvaluationParameters } from './evaluation_parameters';
import type { StyleSetterOptions } from '../style/style';
import { Transitionable, Transitioning, PossiblyEvaluated, DataConstantProperty } from './properties';
import type { Property, PropertyValue, TransitionParameters } from './properties';
type LightPosition = {
    x: number;
    y: number;
    z: number;
};
declare class LightPositionProperty implements Property<[number, number, number], LightPosition> {
    specification: StylePropertySpecification;
    constructor();
    possiblyEvaluate(value: PropertyValue<[number, number, number], LightPosition>, parameters: EvaluationParameters): LightPosition;
    interpolate(a: LightPosition, b: LightPosition, t: number): LightPosition;
}
type Props = {
    'anchor': DataConstantProperty<'map' | 'viewport'>;
    'position': LightPositionProperty;
    'color': DataConstantProperty<Color>;
    'intensity': DataConstantProperty<number>;
};
type PropsPossiblyEvaluated = {
    'anchor': 'map' | 'viewport';
    'position': LightPosition;
    'color': Color;
    'intensity': number;
};
export declare class Light extends Evented {
    _transitionable: Transitionable<Props>;
    _transitioning: Transitioning<Props>;
    properties: PossiblyEvaluated<Props, PropsPossiblyEvaluated>;
    constructor(lightOptions?: LightSpecification);
    getLight(): LightSpecification;
    setLight(light?: LightSpecification, options?: StyleSetterOptions): void;
    updateTransitions(parameters: TransitionParameters): void;
    hasTransition(): boolean;
    recalculate(parameters: EvaluationParameters): void;
    _validate(validate: Function, value: unknown, options?: {
        validate?: boolean;
    }): boolean;
}
export {};
