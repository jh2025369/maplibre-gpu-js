declare module "../abstractEngine" {
    interface AbstractEngine {
        /**
         * Sets the current alpha equation
         * @param equation defines the equation to use (one of the Engine.ALPHA_EQUATION_XXX)
         */
        setAlphaEquation(equation: number): void;
    }
}
export {};
