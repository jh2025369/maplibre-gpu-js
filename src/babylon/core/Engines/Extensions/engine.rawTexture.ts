import type { Nullable } from "../../types";
import { InternalTexture, InternalTextureSource } from "../../Materials/Textures/internalTexture";
import { Logger } from "../../Misc/logger";
import type { Scene } from "../../scene";
import { Constants } from "../constants";
import { ThinEngine } from "../thinEngine";
import type { IWebRequest } from "../../Misc/interfaces/iWebRequest";
import { IsExponentOfTwo } from "../../Misc/tools.functions";

declare module "../abstractEngine" {
    export interface AbstractEngine {
        /**
         * Update a raw texture
         * @param texture defines the texture to update
         * @param data defines the data to store in the texture
         * @param format defines the format of the data
         * @param invertY defines if data must be stored with Y axis inverted
         */
        updateRawTexture(texture: Nullable<InternalTexture>, data: Nullable<ArrayBufferView>, format: number, invertY: boolean): void;

        /**
         * Update a raw texture
         * @param texture defines the texture to update
         * @param data defines the data to store in the texture
         * @param format defines the format of the data
         * @param invertY defines if data must be stored with Y axis inverted
         * @param compression defines the compression used (null by default)
         * @param type defines the type fo the data (Engine.TEXTURETYPE_UNSIGNED_BYTE by default)
         * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
         */
        updateRawTexture(
            texture: Nullable<InternalTexture>,
            data: Nullable<ArrayBufferView>,
            format: number,
            invertY: boolean,
            compression: Nullable<string>,
            type: number,
            useSRGBBuffer: boolean
        ): void;
        /**
         * Update a raw cube texture
         * @param texture defines the texture to update
         * @param data defines the data to store
         * @param format defines the data format
         * @param type defines the type fo the data (Engine.TEXTURETYPE_UNSIGNED_BYTE by default)
         * @param invertY defines if data must be stored with Y axis inverted
         */
        updateRawCubeTexture(texture: InternalTexture, data: ArrayBufferView[], format: number, type: number, invertY: boolean): void;

        /**
         * Update a raw cube texture
         * @param texture defines the texture to update
         * @param data defines the data to store
         * @param format defines the data format
         * @param type defines the type fo the data (Engine.TEXTURETYPE_UNSIGNED_BYTE by default)
         * @param invertY defines if data must be stored with Y axis inverted
         * @param compression defines the compression used (null by default)
         */
        updateRawCubeTexture(texture: InternalTexture, data: ArrayBufferView[], format: number, type: number, invertY: boolean, compression: Nullable<string>): void;

        /**
         * Update a raw cube texture
         * @param texture defines the texture to update
         * @param data defines the data to store
         * @param format defines the data format
         * @param type defines the type fo the data (Engine.TEXTURETYPE_UNSIGNED_BYTE by default)
         * @param invertY defines if data must be stored with Y axis inverted
         * @param compression defines the compression used (null by default)
         * @param level defines which level of the texture to update
         */
        updateRawCubeTexture(texture: InternalTexture, data: ArrayBufferView[], format: number, type: number, invertY: boolean, compression: Nullable<string>, level: number): void;

        /**
         * Creates a new raw cube texture from a specified url
         * @param url defines the url where the data is located
         * @param scene defines the current scene
         * @param size defines the size of the textures
         * @param format defines the format of the data
         * @param type defines the type fo the data (like Engine.TEXTURETYPE_UNSIGNED_BYTE)
         * @param noMipmap defines if the engine should avoid generating the mip levels
         * @param callback defines a callback used to extract texture data from loaded data
         * @param mipmapGenerator defines to provide an optional tool to generate mip levels
         * @param onLoad defines a callback called when texture is loaded
         * @param onError defines a callback called if there is an error
         * @returns the cube texture as an InternalTexture
         */
        createRawCubeTextureFromUrl(
            url: string,
            scene: Nullable<Scene>,
            size: number,
            format: number,
            type: number,
            noMipmap: boolean,
            callback: (ArrayBuffer: ArrayBuffer) => Nullable<ArrayBufferView[]>,
            mipmapGenerator: Nullable<(faces: ArrayBufferView[]) => ArrayBufferView[][]>,
            onLoad: Nullable<() => void>,
            onError: Nullable<(message?: string, exception?: any) => void>
        ): InternalTexture;

        /**
         * Creates a new raw cube texture from a specified url
         * @param url defines the url where the data is located
         * @param scene defines the current scene
         * @param size defines the size of the textures
         * @param format defines the format of the data
         * @param type defines the type fo the data (like Engine.TEXTURETYPE_UNSIGNED_BYTE)
         * @param noMipmap defines if the engine should avoid generating the mip levels
         * @param callback defines a callback used to extract texture data from loaded data
         * @param mipmapGenerator defines to provide an optional tool to generate mip levels
         * @param onLoad defines a callback called when texture is loaded
         * @param onError defines a callback called if there is an error
         * @param samplingMode defines the required sampling mode (like Texture.NEAREST_SAMPLINGMODE)
         * @param invertY defines if data must be stored with Y axis inverted
         * @returns the cube texture as an InternalTexture
         */
        createRawCubeTextureFromUrl(
            url: string,
            scene: Nullable<Scene>,
            size: number,
            format: number,
            type: number,
            noMipmap: boolean,
            callback: (ArrayBuffer: ArrayBuffer) => Nullable<ArrayBufferView[]>,
            mipmapGenerator: Nullable<(faces: ArrayBufferView[]) => ArrayBufferView[][]>,
            onLoad: Nullable<() => void>,
            onError: Nullable<(message?: string, exception?: any) => void>,
            samplingMode: number,
            invertY: boolean
        ): InternalTexture;

        /**
         * Update a raw 3D texture
         * @param texture defines the texture to update
         * @param data defines the data to store
         * @param format defines the data format
         * @param invertY defines if data must be stored with Y axis inverted
         */
        updateRawTexture3D(texture: InternalTexture, data: Nullable<ArrayBufferView>, format: number, invertY: boolean): void;

        /**
         * Update a raw 3D texture
         * @param texture defines the texture to update
         * @param data defines the data to store
         * @param format defines the data format
         * @param invertY defines if data must be stored with Y axis inverted
         * @param compression defines the used compression (can be null)
         * @param textureType defines the texture Type (Engine.TEXTURETYPE_UNSIGNED_BYTE, Engine.TEXTURETYPE_FLOAT...)
         */
        updateRawTexture3D(texture: InternalTexture, data: Nullable<ArrayBufferView>, format: number, invertY: boolean, compression: Nullable<string>, textureType: number): void;

        /**
         * Update a raw 2D array texture
         * @param texture defines the texture to update
         * @param data defines the data to store
         * @param format defines the data format
         * @param invertY defines if data must be stored with Y axis inverted
         */
        updateRawTexture2DArray(texture: InternalTexture, data: Nullable<ArrayBufferView>, format: number, invertY: boolean): void;

        /**
         * Update a raw 2D array texture
         * @param texture defines the texture to update
         * @param data defines the data to store
         * @param format defines the data format
         * @param invertY defines if data must be stored with Y axis inverted
         * @param compression defines the used compression (can be null)
         * @param textureType defines the texture Type (Engine.TEXTURETYPE_UNSIGNED_BYTE, Engine.TEXTURETYPE_FLOAT...)
         */
        updateRawTexture2DArray(
            texture: InternalTexture,
            data: Nullable<ArrayBufferView>,
            format: number,
            invertY: boolean,
            compression: Nullable<string>,
            textureType: number
        ): void;
    }
}

ThinEngine.prototype.updateRawTexture = function (
    texture: Nullable<InternalTexture>,
    data: Nullable<ArrayBufferView>,
    format: number,
    invertY: boolean,
    compression: Nullable<string> = null,
    type: number = Constants.TEXTURETYPE_UNSIGNED_BYTE,
    useSRGBBuffer: boolean = false
): void {
    if (!texture) {
        return;
    }
    // Babylon's internalSizedFomat but gl's texImage2D internalFormat
    const internalSizedFomat = this._getRGBABufferInternalSizedFormat(type, format, useSRGBBuffer);

    // Babylon's internalFormat but gl's texImage2D format
    const internalFormat = this._getInternalFormat(format);
    const textureType = this._getWebGLTextureType(type);
    this._bindTextureDirectly(this._gl.TEXTURE_2D, texture, true);
    this._unpackFlipY(invertY === undefined ? true : invertY ? true : false);

    if (!this._doNotHandleContextLost) {
        texture._bufferView = data;
        texture.format = format;
        texture.type = type;
        texture.invertY = invertY;
        texture._compression = compression;
    }

    if (texture.width % 4 !== 0) {
        this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, 1);
    }

    if (compression && data) {
        this._gl.compressedTexImage2D(this._gl.TEXTURE_2D, 0, (<any>this.getCaps().s3tc)[compression], texture.width, texture.height, 0, <DataView>data);
    } else {
        this._gl.texImage2D(this._gl.TEXTURE_2D, 0, internalSizedFomat, texture.width, texture.height, 0, internalFormat, textureType, data);
    }

    if (texture.generateMipMaps) {
        this._gl.generateMipmap(this._gl.TEXTURE_2D);
    }
    this._bindTextureDirectly(this._gl.TEXTURE_2D, null);
    //  this.resetTextureCache();
    texture.isReady = true;
};

ThinEngine.prototype.createRawTexture = function (
    data: Nullable<ArrayBufferView>,
    width: number,
    height: number,
    format: number,
    generateMipMaps: boolean,
    invertY: boolean,
    samplingMode: number,
    compression: Nullable<string> = null,
    type: number = Constants.TEXTURETYPE_UNSIGNED_BYTE,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    creationFlags = 0,
    useSRGBBuffer = false
): InternalTexture {
    const texture = new InternalTexture(this, InternalTextureSource.Raw);
    texture.baseWidth = width;
    texture.baseHeight = height;
    texture.width = width;
    texture.height = height;
    texture.format = format;
    texture.generateMipMaps = generateMipMaps;
    texture.samplingMode = samplingMode;
    texture.invertY = invertY;
    texture._compression = compression;
    texture.type = type;
    texture._useSRGBBuffer = this._getUseSRGBBuffer(useSRGBBuffer, !generateMipMaps);

    if (!this._doNotHandleContextLost) {
        texture._bufferView = data;
    }

    this.updateRawTexture(texture, data, format, invertY, compression, type, texture._useSRGBBuffer);
    this._bindTextureDirectly(this._gl.TEXTURE_2D, texture, true);

    // Filters
    const filters = this._getSamplingParameters(samplingMode, generateMipMaps);

    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, filters.mag);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, filters.min);

    if (generateMipMaps) {
        this._gl.generateMipmap(this._gl.TEXTURE_2D);
    }

    this._bindTextureDirectly(this._gl.TEXTURE_2D, null);

    this._internalTexturesCache.push(texture);

    return texture;
};

ThinEngine.prototype.createRawCubeTexture = function (
    data: Nullable<ArrayBufferView[]>,
    size: number,
    format: number,
    type: number,
    generateMipMaps: boolean,
    invertY: boolean,
    samplingMode: number,
    compression: Nullable<string> = null
): InternalTexture {
    const gl = this._gl;
    const texture = new InternalTexture(this, InternalTextureSource.CubeRaw);
    texture.isCube = true;
    texture.format = format;
    texture.type = type;
    if (!this._doNotHandleContextLost) {
        texture._bufferViewArray = data;
    }

    const textureType = this._getWebGLTextureType(type);
    let internalFormat = this._getInternalFormat(format);

    if (internalFormat === gl.RGB) {
        internalFormat = gl.RGBA;
    }

    // Mipmap generation needs a sized internal format that is both color-renderable and texture-filterable
    if (textureType === gl.FLOAT && !this._caps.textureFloatLinearFiltering) {
        generateMipMaps = false;
        samplingMode = Constants.TEXTURE_NEAREST_SAMPLINGMODE;
        Logger.Warn("Float texture filtering is not supported. Mipmap generation and sampling mode are forced to false and TEXTURE_NEAREST_SAMPLINGMODE, respectively.");
    } else if (textureType === this._gl.HALF_FLOAT_OES && !this._caps.textureHalfFloatLinearFiltering) {
        generateMipMaps = false;
        samplingMode = Constants.TEXTURE_NEAREST_SAMPLINGMODE;
        Logger.Warn("Half float texture filtering is not supported. Mipmap generation and sampling mode are forced to false and TEXTURE_NEAREST_SAMPLINGMODE, respectively.");
    } else if (textureType === gl.FLOAT && !this._caps.textureFloatRender) {
        generateMipMaps = false;
        Logger.Warn("Render to float textures is not supported. Mipmap generation forced to false.");
    } else if (textureType === gl.HALF_FLOAT && !this._caps.colorBufferFloat) {
        generateMipMaps = false;
        Logger.Warn("Render to half float textures is not supported. Mipmap generation forced to false.");
    }

    const width = size;
    const height = width;

    texture.width = width;
    texture.height = height;
    texture.invertY = invertY;
    texture._compression = compression;

    // Double check on POT to generate Mips.
    const isPot = !this.needPOTTextures || (IsExponentOfTwo(texture.width) && IsExponentOfTwo(texture.height));
    if (!isPot) {
        generateMipMaps = false;
    }

    // Upload data if needed. The texture won't be ready until then.
    if (data) {
        this.updateRawCubeTexture(texture, data, format, type, invertY, compression);
    } else {
        const internalSizedFomat = this._getRGBABufferInternalSizedFormat(type);
        const level = 0;

        this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, texture, true);

        for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
            if (compression) {
                gl.compressedTexImage2D(
                    gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex,
                    level,
                    (<any>this.getCaps().s3tc)[compression],
                    texture.width,
                    texture.height,
                    0,
                    undefined as any
                );
            } else {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, level, internalSizedFomat, texture.width, texture.height, 0, internalFormat, textureType, null);
            }
        }

        this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, null);
    }

    this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, texture, true);

    // Filters
    if (data && generateMipMaps) {
        this._gl.generateMipmap(this._gl.TEXTURE_CUBE_MAP);
    }

    const filters = this._getSamplingParameters(samplingMode, generateMipMaps);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, filters.mag);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, filters.min);

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, null);

    texture.generateMipMaps = generateMipMaps;
    texture.samplingMode = samplingMode;
    texture.isReady = true;

    return texture;
};

ThinEngine.prototype.updateRawCubeTexture = function (
    texture: InternalTexture,
    data: ArrayBufferView[],
    format: number,
    type: number,
    invertY: boolean,
    compression: Nullable<string> = null,
    level: number = 0
): void {
    texture._bufferViewArray = data;
    texture.format = format;
    texture.type = type;
    texture.invertY = invertY;
    texture._compression = compression;

    const gl = this._gl;
    const textureType = this._getWebGLTextureType(type);
    let internalFormat = this._getInternalFormat(format);
    const internalSizedFomat = this._getRGBABufferInternalSizedFormat(type);

    let needConversion = false;
    if (internalFormat === gl.RGB) {
        internalFormat = gl.RGBA;
        needConversion = true;
    }

    this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, texture, true);
    this._unpackFlipY(invertY === undefined ? true : invertY ? true : false);

    if (texture.width % 4 !== 0) {
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    }

    // Data are known to be in +X +Y +Z -X -Y -Z
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
        let faceData = data[faceIndex];

        if (compression) {
            gl.compressedTexImage2D(
                gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex,
                level,
                (<any>this.getCaps().s3tc)[compression],
                texture.width,
                texture.height,
                0,
                <DataView>faceData
            );
        } else {
            if (needConversion) {
                faceData = _convertRGBtoRGBATextureData(faceData, texture.width, texture.height, type);
            }
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, level, internalSizedFomat, texture.width, texture.height, 0, internalFormat, textureType, faceData);
        }
    }

    const isPot = !this.needPOTTextures || (IsExponentOfTwo(texture.width) && IsExponentOfTwo(texture.height));
    if (isPot && texture.generateMipMaps && level === 0) {
        this._gl.generateMipmap(this._gl.TEXTURE_CUBE_MAP);
    }
    this._bindTextureDirectly(this._gl.TEXTURE_CUBE_MAP, null);

    // this.resetTextureCache();
    texture.isReady = true;
};

ThinEngine.prototype.createRawCubeTextureFromUrl = function (
    url: string,
    scene: Nullable<Scene>,
    size: number,
    format: number,
    type: number,
    noMipmap: boolean,
    callback: (ArrayBuffer: ArrayBuffer) => Nullable<ArrayBufferView[]>,
    mipmapGenerator: Nullable<(faces: ArrayBufferView[]) => ArrayBufferView[][]>,
    onLoad: Nullable<() => void> = null,
    onError: Nullable<(message?: string, exception?: any) => void> = null,
    samplingMode: number = Constants.TEXTURE_TRILINEAR_SAMPLINGMODE,
    invertY: boolean = false
): InternalTexture {
    const gl = this._gl;
    const texture = this.createRawCubeTexture(null, size, format, type, !noMipmap, invertY, samplingMode, null);
    scene?.addPendingData(texture);
    texture.url = url;
    texture.isReady = false;
    this._internalTexturesCache.push(texture);

    const onerror = (request?: IWebRequest, exception?: any) => {
        scene?.removePendingData(texture);
        if (onError && request) {
            onError(request.status + " " + request.statusText, exception);
        }
    };

    const internalCallback = (data: any) => {
        const width = texture.width;
        const faceDataArrays = callback(data);

        if (!faceDataArrays) {
            return;
        }

        if (mipmapGenerator) {
            const textureType = this._getWebGLTextureType(type);
            let internalFormat = this._getInternalFormat(format);
            const internalSizedFomat = this._getRGBABufferInternalSizedFormat(type);

            let needConversion = false;
            if (internalFormat === gl.RGB) {
                internalFormat = gl.RGBA;
                needConversion = true;
            }

            this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, texture, true);
            this._unpackFlipY(false);

            const mipData = mipmapGenerator(faceDataArrays);
            for (let level = 0; level < mipData.length; level++) {
                const mipSize = width >> level;

                for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
                    let mipFaceData = mipData[level][faceIndex];
                    if (needConversion) {
                        mipFaceData = _convertRGBtoRGBATextureData(mipFaceData, mipSize, mipSize, type);
                    }
                    gl.texImage2D(faceIndex, level, internalSizedFomat, mipSize, mipSize, 0, internalFormat, textureType, mipFaceData);
                }
            }

            this._bindTextureDirectly(gl.TEXTURE_CUBE_MAP, null);
        } else {
            this.updateRawCubeTexture(texture, faceDataArrays, format, type, invertY);
        }

        texture.isReady = true;
        // this.resetTextureCache();
        scene?.removePendingData(texture);

        texture.onLoadedObservable.notifyObservers(texture);
        texture.onLoadedObservable.clear();

        if (onLoad) {
            onLoad();
        }
    };

    this._loadFile(
        url,
        (data) => {
            internalCallback(data);
        },
        undefined,
        scene?.offlineProvider,
        true,
        onerror
    );

    return texture;
};

/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function _convertRGBtoRGBATextureData(rgbData: any, width: number, height: number, textureType: number): ArrayBufferView {
    // Create new RGBA data container.
    let rgbaData: any;
    let val1 = 1;
    if (textureType === Constants.TEXTURETYPE_FLOAT) {
        rgbaData = new Float32Array(width * height * 4);
    } else if (textureType === Constants.TEXTURETYPE_HALF_FLOAT) {
        rgbaData = new Uint16Array(width * height * 4);
        val1 = 15360; // 15360 is the encoding of 1 in half float
    } else if (textureType === Constants.TEXTURETYPE_UNSIGNED_INTEGER) {
        rgbaData = new Uint32Array(width * height * 4);
    } else {
        rgbaData = new Uint8Array(width * height * 4);
    }

    // Convert each pixel.
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const index = (y * width + x) * 3;
            const newIndex = (y * width + x) * 4;

            // Map Old Value to new value.
            rgbaData[newIndex + 0] = rgbData[index + 0];
            rgbaData[newIndex + 1] = rgbData[index + 1];
            rgbaData[newIndex + 2] = rgbData[index + 2];

            // Add fully opaque alpha channel.
            rgbaData[newIndex + 3] = val1;
        }
    }

    return rgbaData;
}

/**
 * Create a function for createRawTexture3D/createRawTexture2DArray
 * @param is3D true for TEXTURE_3D and false for TEXTURE_2D_ARRAY
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function _makeCreateRawTextureFunction(is3D: boolean) {
    return function (
        this: ThinEngine,
        data: Nullable<ArrayBufferView>,
        width: number,
        height: number,
        depth: number,
        format: number,
        generateMipMaps: boolean,
        invertY: boolean,
        samplingMode: number,
        compression: Nullable<string> = null,
        textureType: number = Constants.TEXTURETYPE_UNSIGNED_BYTE
    ): InternalTexture {
        const target = is3D ? this._gl.TEXTURE_3D : this._gl.TEXTURE_2D_ARRAY;
        const source = is3D ? InternalTextureSource.Raw3D : InternalTextureSource.Raw2DArray;
        const texture = new InternalTexture(this, source);
        texture.baseWidth = width;
        texture.baseHeight = height;
        texture.baseDepth = depth;
        texture.width = width;
        texture.height = height;
        texture.depth = depth;
        texture.format = format;
        texture.type = textureType;
        texture.generateMipMaps = generateMipMaps;
        texture.samplingMode = samplingMode;
        if (is3D) {
            texture.is3D = true;
        } else {
            texture.is2DArray = true;
        }

        if (!this._doNotHandleContextLost) {
            texture._bufferView = data;
        }

        if (is3D) {
            this.updateRawTexture3D(texture, data, format, invertY, compression, textureType);
        } else {
            this.updateRawTexture2DArray(texture, data, format, invertY, compression, textureType);
        }
        this._bindTextureDirectly(target, texture, true);

        // Filters
        const filters = this._getSamplingParameters(samplingMode, generateMipMaps);

        this._gl.texParameteri(target, this._gl.TEXTURE_MAG_FILTER, filters.mag);
        this._gl.texParameteri(target, this._gl.TEXTURE_MIN_FILTER, filters.min);

        if (generateMipMaps) {
            this._gl.generateMipmap(target);
        }

        this._bindTextureDirectly(target, null);

        this._internalTexturesCache.push(texture);

        return texture;
    };
}

ThinEngine.prototype.createRawTexture2DArray = _makeCreateRawTextureFunction(false);
ThinEngine.prototype.createRawTexture3D = _makeCreateRawTextureFunction(true);

/**
 * Create a function for updateRawTexture3D/updateRawTexture2DArray
 * @param is3D true for TEXTURE_3D and false for TEXTURE_2D_ARRAY
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function _makeUpdateRawTextureFunction(is3D: boolean) {
    return function (
        this: ThinEngine,
        texture: InternalTexture,
        data: Nullable<ArrayBufferView>,
        format: number,
        invertY: boolean,
        compression: Nullable<string> = null,
        textureType: number = Constants.TEXTURETYPE_UNSIGNED_BYTE
    ): void {
        const target = is3D ? this._gl.TEXTURE_3D : this._gl.TEXTURE_2D_ARRAY;
        const internalType = this._getWebGLTextureType(textureType);
        const internalFormat = this._getInternalFormat(format);
        const internalSizedFomat = this._getRGBABufferInternalSizedFormat(textureType, format);

        this._bindTextureDirectly(target, texture, true);
        this._unpackFlipY(invertY === undefined ? true : invertY ? true : false);

        if (!this._doNotHandleContextLost) {
            texture._bufferView = data;
            texture.format = format;
            texture.invertY = invertY;
            texture._compression = compression;
        }

        if (texture.width % 4 !== 0) {
            this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, 1);
        }

        if (compression && data) {
            this._gl.compressedTexImage3D(target, 0, (<any>this.getCaps().s3tc)[compression], texture.width, texture.height, texture.depth, 0, data);
        } else {
            this._gl.texImage3D(target, 0, internalSizedFomat, texture.width, texture.height, texture.depth, 0, internalFormat, internalType, data);
        }

        if (texture.generateMipMaps) {
            this._gl.generateMipmap(target);
        }
        this._bindTextureDirectly(target, null);
        // this.resetTextureCache();
        texture.isReady = true;
    };
}

ThinEngine.prototype.updateRawTexture2DArray = _makeUpdateRawTextureFunction(false);
ThinEngine.prototype.updateRawTexture3D = _makeUpdateRawTextureFunction(true);
