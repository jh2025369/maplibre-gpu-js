import { ShaderDefineExpression } from "../shaderDefineExpression";

/** @internal */
export class ShaderDefineIsDefinedOperator extends ShaderDefineExpression {
    public constructor(
        public define: string,
        public not: boolean = false
    ) {
        super();
    }

    public override isTrue(preprocessors: { [key: string]: string }) {
        let condition = preprocessors[this.define] !== undefined;

        if (this.not) {
            condition = !condition;
        }

        return condition;
    }
}
