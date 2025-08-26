/** @internal */
export interface IStencilState {
    enabled: boolean;
    mask: number;
    funcMask: number;
    funcRef: number;
    func: number;
    opStencilDepthPass: number;
    opStencilFail: number;
    opDepthFail: number;
    backFunc: number;
    backOpStencilDepthPass: number;
    backOpStencilFail: number;
    backOpDepthFail: number;
    reset(): void;
}
