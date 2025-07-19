import { Color, StylePropertySpecification, Feature, FeatureState, StylePropertyExpression, SourceExpression, CompositeExpression, TransitionSpecification, PropertyValueSpecification } from '@maplibre/maplibre-gl-style-spec';
import { EvaluationParameters } from './evaluation_parameters';
import { CanonicalTileID } from '../source/tile_id';
type TimePoint = number;
/**
 * A from-to type
 */
export type CrossFaded<T> = {
    to: T;
    from: T;
};
/**
 * @internal
 *  Implementations of the `Property` interface:
 *
 *  * Hold metadata about a property that's independent of any specific value: stuff like the type of the value,
 *    the default value, etc. This comes from the style specification JSON.
 *  * Define behavior that needs to be polymorphic across different properties: "possibly evaluating"
 *    an input value (see below), and interpolating between two possibly-evaluted values.
 *
 *  The type `T` is the fully-evaluated value type (e.g. `number`, `string`, `Color`).
 *  The type `R` is the intermediate "possibly evaluated" value type. See below.
 *
 *  There are two main implementations of the interface -- one for properties that allow data-driven values,
 *  and one for properties that don't. There are a few "special case" implementations as well: one for properties
 *  which cross-fade between two values rather than interpolating, one for `heatmap-color` and `line-gradient`,
 *  and one for `light-position`.
 */
export interface Property<T, R> {
    specification: StylePropertySpecification;
    possiblyEvaluate(value: PropertyValue<T, R>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): R;
    interpolate(a: R, b: R, t: number): R;
}
/**
 * @internal
 *  `PropertyValue` represents the value part of a property key-value unit. It's used to represent both
 *  paint and layout property values, and regardless of whether or not their property supports data-driven
 *  expressions.
 *
 *  `PropertyValue` stores the raw input value as seen in a style or a runtime styling API call, i.e. one of the
 *  following:
 *
 *    * A constant value of the type appropriate for the property
 *    * A function which produces a value of that type (but functions are quasi-deprecated in favor of expressions)
 *    * An expression which produces a value of that type
 *    * "undefined"/"not present", in which case the property is assumed to take on its default value.
 *
 *  In addition to storing the original input value, `PropertyValue` also stores a normalized representation,
 *  effectively treating functions as if they are expressions, and constant or default values as if they are
 *  (constant) expressions.
 */
export declare class PropertyValue<T, R> {
    property: Property<T, R>;
    value: PropertyValueSpecification<T> | void;
    expression: StylePropertyExpression;
    constructor(property: Property<T, R>, value: PropertyValueSpecification<T> | void);
    isDataDriven(): boolean;
    possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): R;
}
export type TransitionParameters = {
    now: TimePoint;
    transition: TransitionSpecification;
};
/**
 * @internal
 * Paint properties are _transitionable_: they can change in a fluid manner, interpolating or cross-fading between
 * old and new value. The duration of the transition, and the delay before it begins, is configurable.
 *
 * `TransitionablePropertyValue` is a compositional class that stores both the property value and that transition
 * configuration.
 *
 * A `TransitionablePropertyValue` can calculate the next step in the evaluation chain for paint property values:
 * `TransitioningPropertyValue`.
 */
declare class TransitionablePropertyValue<T, R> {
    property: Property<T, R>;
    value: PropertyValue<T, R>;
    transition: TransitionSpecification | void;
    constructor(property: Property<T, R>);
    transitioned(parameters: TransitionParameters, prior: TransitioningPropertyValue<T, R>): TransitioningPropertyValue<T, R>;
    untransitioned(): TransitioningPropertyValue<T, R>;
}
/**
 * @internal
 * `Transitionable` stores a map of all (property name, `TransitionablePropertyValue`) pairs for paint properties of a
 * given layer type. It can calculate the `TransitioningPropertyValue`s for all of them at once, producing a
 * `Transitioning` instance for the same set of properties.
 */
export declare class Transitionable<Props> {
    _properties: Properties<Props>;
    _values: {
        [K in keyof Props]: TransitionablePropertyValue<any, unknown>;
    };
    constructor(properties: Properties<Props>);
    getValue<S extends keyof Props, T>(name: S): PropertyValueSpecification<T> | void;
    setValue<S extends keyof Props, T>(name: S, value: PropertyValueSpecification<T> | void): void;
    getTransition<S extends keyof Props>(name: S): TransitionSpecification | void;
    setTransition<S extends keyof Props>(name: S, value: TransitionSpecification | void): void;
    serialize(): any;
    transitioned(parameters: TransitionParameters, prior: Transitioning<Props>): Transitioning<Props>;
    untransitioned(): Transitioning<Props>;
}
/**
 * @internal
 * `TransitioningPropertyValue` implements the first of two intermediate steps in the evaluation chain of a paint
 * property value. In this step, transitions between old and new values are handled: as long as the transition is in
 * progress, `TransitioningPropertyValue` maintains a reference to the prior value, and interpolates between it and
 * the new value based on the current time and the configured transition duration and delay. The product is the next
 * step in the evaluation chain: the "possibly evaluated" result type `R`. See below for more on this concept.
 */
declare class TransitioningPropertyValue<T, R> {
    property: Property<T, R>;
    value: PropertyValue<T, R>;
    prior: TransitioningPropertyValue<T, R>;
    begin: TimePoint;
    end: TimePoint;
    constructor(property: Property<T, R>, value: PropertyValue<T, R>, prior: TransitioningPropertyValue<T, R>, transition: TransitionSpecification, now: TimePoint);
    possiblyEvaluate(parameters: EvaluationParameters, canonical: CanonicalTileID, availableImages: Array<string>): R;
}
/**
 * @internal
 * `Transitioning` stores a map of all (property name, `TransitioningPropertyValue`) pairs for paint properties of a
 * given layer type. It can calculate the possibly-evaluated values for all of them at once, producing a
 * `PossiblyEvaluated` instance for the same set of properties.
 */
export declare class Transitioning<Props> {
    _properties: Properties<Props>;
    _values: {
        [K in keyof Props]: PossiblyEvaluatedPropertyValue<unknown>;
    };
    constructor(properties: Properties<Props>);
    possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): PossiblyEvaluated<Props, any>;
    hasTransition(): boolean;
}
/**
 * Because layout properties are not transitionable, they have a simpler representation and evaluation chain than
 * paint properties: `PropertyValue`s are possibly evaluated, producing possibly evaluated values, which are then
 * fully evaluated.
 *
 * `Layout` stores a map of all (property name, `PropertyValue`) pairs for layout properties of a
 * given layer type. It can calculate the possibly-evaluated values for all of them at once, producing a
 * `PossiblyEvaluated` instance for the same set of properties.
 */
export declare class Layout<Props> {
    _properties: Properties<Props>;
    _values: {
        [K in keyof Props]: PropertyValue<any, PossiblyEvaluatedPropertyValue<any>>;
    };
    constructor(properties: Properties<Props>);
    hasValue<S extends keyof Props>(name: S): boolean;
    getValue<S extends keyof Props>(name: S): any;
    setValue<S extends keyof Props>(name: S, value: any): void;
    serialize(): any;
    possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): PossiblyEvaluated<Props, any>;
}
/**
 * "Possibly evaluated value" is an intermediate stage in the evaluation chain for both paint and layout property
 * values. The purpose of this stage is to optimize away unnecessary recalculations for data-driven properties. Code
 * which uses data-driven property values must assume that the value is dependent on feature data, and request that it
 * be evaluated for each feature. But when that property value is in fact a constant or camera function, the calculation
 * will not actually depend on the feature, and we can benefit from returning the prior result of having done the
 * evaluation once, ahead of time, in an intermediate step whose inputs are just the value and "global" parameters
 * such as current zoom level.
 *
 * `PossiblyEvaluatedValue` represents the three possible outcomes of this step: if the input value was a constant or
 * camera expression, then the "possibly evaluated" result is a constant value. Otherwise, the input value was either
 * a source or composite expression, and we must defer final evaluation until supplied a feature. We separate
 * the source and composite cases because they are handled differently when generating GL attributes, buffers, and
 * uniforms.
 *
 * Note that `PossiblyEvaluatedValue` (and `PossiblyEvaluatedPropertyValue`, below) are _not_ used for properties that
 * do not allow data-driven values. For such properties, we know that the "possibly evaluated" result is always a constant
 * scalar value. See below.
 */
type PossiblyEvaluatedValue<T> = {
    kind: 'constant';
    value: T;
} | SourceExpression | CompositeExpression;
/**
 * @internal
 * `PossiblyEvaluatedPropertyValue` is used for data-driven paint and layout property values. It holds a
 * `PossiblyEvaluatedValue` and the `GlobalProperties` that were used to generate it. You're not allowed to supply
 * a different set of `GlobalProperties` when performing the final evaluation because they would be ignored in the
 * case where the input value was a constant or camera function.
 */
export declare class PossiblyEvaluatedPropertyValue<T> {
    property: DataDrivenProperty<T>;
    value: PossiblyEvaluatedValue<T>;
    parameters: EvaluationParameters;
    constructor(property: DataDrivenProperty<T>, value: PossiblyEvaluatedValue<T>, parameters: EvaluationParameters);
    isConstant(): boolean;
    constantOr(value: T): T;
    evaluate(feature: Feature, featureState: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>): T;
}
/**
 * @internal
 * `PossiblyEvaluated` stores a map of all (property name, `R`) pairs for paint or layout properties of a
 * given layer type.
 */
export declare class PossiblyEvaluated<Props, PossibleEvaluatedProps> {
    _properties: Properties<Props>;
    _values: PossibleEvaluatedProps;
    constructor(properties: Properties<Props>);
    get<S extends keyof PossibleEvaluatedProps>(name: S): PossibleEvaluatedProps[S];
}
/**
 * @internal
 * An implementation of `Property` for properties that do not permit data-driven (source or composite) expressions.
 * This restriction allows us to declare statically that the result of possibly evaluating this kind of property
 * is in fact always the scalar type `T`, and can be used without further evaluating the value on a per-feature basis.
 */
export declare class DataConstantProperty<T> implements Property<T, T> {
    specification: StylePropertySpecification;
    constructor(specification: StylePropertySpecification);
    possiblyEvaluate(value: PropertyValue<T, T>, parameters: EvaluationParameters): T;
    interpolate(a: T, b: T, t: number): T;
}
/**
 * @internal
 * An implementation of `Property` for properties that permit data-driven (source or composite) expressions.
 * The result of possibly evaluating this kind of property is `PossiblyEvaluatedPropertyValue<T>`; obtaining
 * a scalar value `T` requires further evaluation on a per-feature basis.
 */
export declare class DataDrivenProperty<T> implements Property<T, PossiblyEvaluatedPropertyValue<T>> {
    specification: StylePropertySpecification;
    overrides: any;
    constructor(specification: StylePropertySpecification, overrides?: any);
    possiblyEvaluate(value: PropertyValue<T, PossiblyEvaluatedPropertyValue<T>>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): PossiblyEvaluatedPropertyValue<T>;
    interpolate(a: PossiblyEvaluatedPropertyValue<T>, b: PossiblyEvaluatedPropertyValue<T>, t: number): PossiblyEvaluatedPropertyValue<T>;
    evaluate(value: PossiblyEvaluatedValue<T>, parameters: EvaluationParameters, feature: Feature, featureState: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>): T;
}
/**
 * @internal
 * An implementation of `Property` for  data driven `line-pattern` which are transitioned by cross-fading
 * rather than interpolation.
 */
export declare class CrossFadedDataDrivenProperty<T> extends DataDrivenProperty<CrossFaded<T>> {
    possiblyEvaluate(value: PropertyValue<CrossFaded<T>, PossiblyEvaluatedPropertyValue<CrossFaded<T>>>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): PossiblyEvaluatedPropertyValue<CrossFaded<T>>;
    evaluate(value: PossiblyEvaluatedValue<CrossFaded<T>>, globals: EvaluationParameters, feature: Feature, featureState: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>): CrossFaded<T>;
    _calculate(min: T, mid: T, max: T, parameters: EvaluationParameters): CrossFaded<T>;
    interpolate(a: PossiblyEvaluatedPropertyValue<CrossFaded<T>>): PossiblyEvaluatedPropertyValue<CrossFaded<T>>;
}
/**
 * @internal
 * An implementation of `Property` for `*-pattern` and `line-dasharray`, which are transitioned by cross-fading
 * rather than interpolation.
 */
export declare class CrossFadedProperty<T> implements Property<T, CrossFaded<T>> {
    specification: StylePropertySpecification;
    constructor(specification: StylePropertySpecification);
    possiblyEvaluate(value: PropertyValue<T, CrossFaded<T>>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): CrossFaded<T>;
    _calculate(min: T, mid: T, max: T, parameters: EvaluationParameters): CrossFaded<T>;
    interpolate(a?: CrossFaded<T> | null): CrossFaded<T>;
}
/**
 * @internal
 * An implementation of `Property` for `heatmap-color` and `line-gradient`. Interpolation is a no-op, and
 * evaluation returns a boolean value in order to indicate its presence, but the real
 * evaluation happens in StyleLayer classes.
 */
export declare class ColorRampProperty implements Property<Color, boolean> {
    specification: StylePropertySpecification;
    constructor(specification: StylePropertySpecification);
    possiblyEvaluate(value: PropertyValue<Color, boolean>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): boolean;
    interpolate(): boolean;
}
/**
 * @internal
 * `Properties` holds objects containing default values for the layout or paint property set of a given
 * layer type. These objects are immutable, and they are used as the prototypes for the `_values` members of
 * `Transitionable`, `Transitioning`, `Layout`, and `PossiblyEvaluated`. This allows these classes to avoid
 * doing work in the common case where a property has no explicit value set and should be considered to take
 * on the default value: using `for (const property of Object.keys(this._values))`, they can iterate over
 * only the _own_ properties of `_values`, skipping repeated calculation of transitions and possible/final
 * evaluations for defaults, the result of which will always be the same.
 */
export declare class Properties<Props> {
    properties: Props;
    defaultPropertyValues: {
        [K in keyof Props]: PropertyValue<unknown, any>;
    };
    defaultTransitionablePropertyValues: {
        [K in keyof Props]: TransitionablePropertyValue<unknown, unknown>;
    };
    defaultTransitioningPropertyValues: {
        [K in keyof Props]: TransitioningPropertyValue<unknown, unknown>;
    };
    defaultPossiblyEvaluatedValues: {
        [K in keyof Props]: PossiblyEvaluatedPropertyValue<unknown>;
    };
    overridableProperties: Array<string>;
    constructor(properties: Props);
}
export {};
