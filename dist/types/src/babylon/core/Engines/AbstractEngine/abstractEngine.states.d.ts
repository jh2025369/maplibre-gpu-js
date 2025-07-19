import type { Nullable } from "../../types";
import "./abstractEngine.alpha";
declare module "../../Engines/abstractEngine" {
    interface AbstractEngine {
        /** @internal */
        _cachedStencilBuffer: boolean;
        /** @internal */
        _cachedStencilFunction: number;
        /** @internal */
        _cachedStencilMask: number;
        /** @internal */
        _cachedStencilOperationPass: number;
        /** @internal */
        _cachedStencilOperationFail: number;
        /** @internal */
        _cachedStencilOperationDepthFail: number;
        /** @internal */
        _cachedStencilReference: number;
        /**
         * Gets the current depth function
         * @returns a number defining the depth function
         */
        getDepthFunction(): Nullable<number>;
        /**
         * Sets the current depth function
         * @param depthFunc defines the function to use
         */
        setDepthFunction(depthFunc: number): void;
        /**
         * Sets the current depth function to GREATER
         */
        setDepthFunctionToGreater(): void;
        /**
         * Sets the current depth function to GEQUAL
         */
        setDepthFunctionToGreaterOrEqual(): void;
        /**
         * Sets the current depth function to LESS
         */
        setDepthFunctionToLess(): void;
        /**
         * Sets the current depth function to LEQUAL
         */
        setDepthFunctionToLessOrEqual(): void;
        /**
         * Gets a boolean indicating if depth writing is enabled
         * @returns the current depth writing state
         */
        getDepthWrite(): boolean;
        /**
         * Enable or disable depth writing
         * @param enable defines the state to set
         */
        setDepthWrite(enable: boolean): void;
        /**
         * Gets the current stencil operation when stencil passes
         * @returns a number defining stencil operation to use when stencil passes
         */
        getStencilOperationPass(): number;
        /**
         * Gets a boolean indicating if stencil buffer is enabled
         * @returns the current stencil buffer state
         */
        getStencilBuffer(): boolean;
        /**
         * Enable or disable the stencil buffer
         * @param enable defines if the stencil buffer must be enabled or disabled
         */
        setStencilBuffer(enable: boolean): void;
        /**
         * Gets the current stencil mask
         * @returns a number defining the new stencil mask to use
         */
        getStencilMask(): number;
        /**
         * Sets the current stencil mask
         * @param mask defines the new stencil mask to use
         */
        setStencilMask(mask: number): void;
        /**
         * Gets the current stencil function
         * @returns a number defining the stencil function to use
         */
        getStencilFunction(): number;
        /**
         * Gets the current stencil reference value
         * @returns a number defining the stencil reference value to use
         */
        getStencilFunctionReference(): number;
        /**
         * Gets the current stencil mask
         * @returns a number defining the stencil mask to use
         */
        getStencilFunctionMask(): number;
        /**
         * Sets the current stencil function
         * @param stencilFunc defines the new stencil function to use
         */
        setStencilFunction(stencilFunc: number): void;
        /**
         * Sets the current stencil reference
         * @param reference defines the new stencil reference to use
         */
        setStencilFunctionReference(reference: number): void;
        /**
         * Sets the current stencil mask
         * @param mask defines the new stencil mask to use
         */
        setStencilFunctionMask(mask: number): void;
        /**
         * Gets the current stencil operation when stencil fails
         * @returns a number defining stencil operation to use when stencil fails
         */
        getStencilOperationFail(): number;
        /**
         * Gets the current stencil operation when depth fails
         * @returns a number defining stencil operation to use when depth fails
         */
        getStencilOperationDepthFail(): number;
        /**
         * Sets the stencil operation to use when stencil fails
         * @param operation defines the stencil operation to use when stencil fails
         */
        setStencilOperationFail(operation: number): void;
        /**
         * Sets the stencil operation to use when depth fails
         * @param operation defines the stencil operation to use when depth fails
         */
        setStencilOperationDepthFail(operation: number): void;
        /**
         * Sets the stencil operation to use when stencil passes
         * @param operation defines the stencil operation to use when stencil passes
         */
        setStencilOperationPass(operation: number): void;
        /**
         * Caches the state of the stencil buffer
         */
        cacheStencilState(): void;
        /**
         * Restores the state of the stencil buffer
         */
        restoreStencilState(): void;
        /**
         * Sets alpha constants used by some alpha blending modes
         * @param r defines the red component
         * @param g defines the green component
         * @param b defines the blue component
         * @param a defines the alpha component
         */
        setAlphaConstants(r: number, g: number, b: number, a: number): void;
        /**
         * Gets the current alpha mode
         * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering
         * @returns the current alpha mode
         */
        getAlphaMode(): number;
        /**
         * Gets the current alpha equation.
         * @returns the current alpha equation
         */
        getAlphaEquation(): number;
    }
}
