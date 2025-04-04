import { Vector2 } from "../Maths/math.vector";
import type { Camera } from "../Cameras/camera";
import type { VRCameraMetrics } from "../Cameras/VR/vrCameraMetrics";
import type { Effect } from "../Materials/effect";
import { Texture } from "../Materials/Textures/texture";
import { PostProcess } from "./postProcess";

import type { Nullable } from "../types";

/**
 * VRDistortionCorrectionPostProcess used for mobile VR
 */
export class VRDistortionCorrectionPostProcess extends PostProcess {
    private _isRightEye: boolean;
    private _distortionFactors: number[];
    private _postProcessScaleFactor: number;
    private _lensCenterOffset: number;
    private _scaleIn: Vector2;
    private _scaleFactor: Vector2;
    private _lensCenter: Vector2;

    /**
     * Gets a string identifying the name of the class
     * @returns "VRDistortionCorrectionPostProcess" string
     */
    public override getClassName(): string {
        return "VRDistortionCorrectionPostProcess";
    }

    /**
     * Initializes the VRDistortionCorrectionPostProcess
     * @param name The name of the effect.
     * @param camera The camera to apply the render pass to.
     * @param isRightEye If this is for the right eye distortion
     * @param vrMetrics All the required metrics for the VR camera
     */
    constructor(name: string, camera: Nullable<Camera>, isRightEye: boolean, vrMetrics: VRCameraMetrics) {
        super(name, "vrDistortionCorrection", ["LensCenter", "Scale", "ScaleIn", "HmdWarpParam"], null, vrMetrics.postProcessScaleFactor, camera, Texture.BILINEAR_SAMPLINGMODE);

        this._isRightEye = isRightEye;
        this._distortionFactors = vrMetrics.distortionK;
        this._postProcessScaleFactor = vrMetrics.postProcessScaleFactor;
        this._lensCenterOffset = vrMetrics.lensCenterOffset;
        this.adaptScaleToCurrentViewport = true;

        this.onSizeChangedObservable.add(() => {
            this._scaleIn = new Vector2(2, 2 / this.aspectRatio);
            this._scaleFactor = new Vector2(0.5 * (1 / this._postProcessScaleFactor), 0.5 * (1 / this._postProcessScaleFactor) * this.aspectRatio);
            this._lensCenter = new Vector2(this._isRightEye ? 0.5 - this._lensCenterOffset * 0.5 : 0.5 + this._lensCenterOffset * 0.5, 0.5);
        });
        this.onApplyObservable.add((effect: Effect) => {
            effect.setFloat2("LensCenter", this._lensCenter.x, this._lensCenter.y);
            effect.setFloat2("Scale", this._scaleFactor.x, this._scaleFactor.y);
            effect.setFloat2("ScaleIn", this._scaleIn.x, this._scaleIn.y);
            effect.setFloat4("HmdWarpParam", this._distortionFactors[0], this._distortionFactors[1], this._distortionFactors[2], this._distortionFactors[3]);
        });
    }

    protected override _gatherImports(useWebGPU: boolean, list: Promise<any>[]) {
        if (useWebGPU) {
            this._webGPUReady = true;
            list.push(import("../ShadersWGSL/vrDistortionCorrection.fragment"));
        } else {
            list.push(import("../Shaders/vrDistortionCorrection.fragment"));
        }

        super._gatherImports(useWebGPU, list);
    }
}
