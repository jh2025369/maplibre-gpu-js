import type { FlowGraphAssetType } from "core/FlowGraph/flowGraphAssetsContext";
import type { IFlowGraphBlockConfiguration } from "core/FlowGraph/flowGraphBlock";
import type { FlowGraphContext } from "core/FlowGraph/flowGraphContext";
import type { FlowGraphDataConnection } from "core/FlowGraph/flowGraphDataConnection";
import { FlowGraphPathConverterComponent } from "core/FlowGraph/flowGraphPathConverterComponent";
import type { IObjectAccessor } from "core/FlowGraph/typeDefinitions";
import type { IPathToObjectConverter } from "core/ObjectModel/objectModelInterfaces";
import type { Animation } from "core/Animations/animation";
import type { EasingFunction } from "core/Animations/easing";
import { FlowGraphCachedOperationBlock } from "../flowGraphCachedOperationBlock";
/**
 * Configuration for the JSON pointer parser block.
 */
export interface IFlowGraphJsonPointerParserBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The JSON pointer to parse.
     */
    jsonPointer: string;
    /**
     * The path converter to use to convert the path to an object accessor.
     */
    pathConverter: IPathToObjectConverter<IObjectAccessor>;
    /**
     * Whether to output the value of the property.
     */
    outputValue?: boolean;
}
/**
 * This block will take a JSON pointer and parse it to get the value from the JSON object.
 * The output is an object and a property name.
 * Optionally, the block can also output the value of the property. This is configurable.
 */
export declare class FlowGraphJsonPointerParserBlock<P extends any, O extends FlowGraphAssetType> extends FlowGraphCachedOperationBlock<P> {
    /**
     * the configuration of the block
     */
    config: IFlowGraphJsonPointerParserBlockConfiguration;
    /**
     * Output connection: The object that contains the property.
     */
    readonly object: FlowGraphDataConnection<O>;
    /**
     * Output connection: The property name.
     */
    readonly propertyName: FlowGraphDataConnection<string>;
    /**
     * Output connection: A function that can be used to update the value of the property.
     */
    readonly setterFunction: FlowGraphDataConnection<(target: O, propertyName: string, value: P, context: FlowGraphContext) => void>;
    /**
     * Output connection: A function that can be used to get the value of the property.
     */
    readonly getterFunction: FlowGraphDataConnection<(target: O, propertyName: string, context: FlowGraphContext) => P | undefined>;
    /**
     * Output connection: A function that can be used to get the interpolation animation property info.
     */
    readonly generateAnimationsFunction: FlowGraphDataConnection<() => (keys: any[], fps: number, easingFunction?: EasingFunction) => Animation[]>;
    /**
     * The component with the templated inputs for the provided path.
     */
    readonly templateComponent: FlowGraphPathConverterComponent;
    constructor(
    /**
     * the configuration of the block
     */
    config: IFlowGraphJsonPointerParserBlockConfiguration);
    _doOperation(context: FlowGraphContext): P;
    private _setPropertyValue;
    private _getPropertyValue;
    private _getInterpolationAnimationPropertyInfo;
    /**
     * Gets the class name of this block
     * @returns the class name
     */
    getClassName(): string;
}
