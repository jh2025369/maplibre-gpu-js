/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Checks for a matching suffix at the end of a string (for ES5 and lower)
 * @param str Source string
 * @param suffix Suffix to search for in the source string
 * @returns Boolean indicating whether the suffix was found (true) or not (false)
 * @deprecated Please use native string function instead
 */
export const EndsWith = (str: string, suffix: string): boolean => {
    return str.endsWith(suffix);
};

/**
 * Checks for a matching suffix at the beginning of a string (for ES5 and lower)
 * @param str Source string
 * @param suffix Suffix to search for in the source string
 * @returns Boolean indicating whether the suffix was found (true) or not (false)
 * @deprecated Please use native string function instead
 */
export const StartsWith = (str: string, suffix: string): boolean => {
    if (!str) {
        return false;
    }
    return str.startsWith(suffix);
};

/**
 * Decodes a buffer into a string
 * @param buffer The buffer to decode
 * @returns The decoded string
 */
export const Decode = (buffer: Uint8Array | Uint16Array): string => {
    if (typeof TextDecoder !== "undefined") {
        return new TextDecoder().decode(buffer);
    }

    let result = "";
    for (let i = 0; i < buffer.byteLength; i++) {
        result += String.fromCharCode(buffer[i]);
    }

    return result;
};

/**
 * Encode a buffer to a base64 string
 * @param buffer defines the buffer to encode
 * @returns the encoded string
 */
export const EncodeArrayBufferToBase64 = (buffer: ArrayBuffer | ArrayBufferView): string => {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    const bytes = ArrayBuffer.isView(buffer) ? new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) : new Uint8Array(buffer);

    while (i < bytes.length) {
        chr1 = bytes[i++];
        chr2 = i < bytes.length ? bytes[i++] : Number.NaN;
        chr3 = i < bytes.length ? bytes[i++] : Number.NaN;

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }

    return output;
};

/**
 * Converts a given base64 string as an ASCII encoded stream of data
 * @param base64Data The base64 encoded string to decode
 * @returns Decoded ASCII string
 */
export const DecodeBase64ToString = (base64Data: string): string => {
    return atob(base64Data);
};

/**
 * Converts a given base64 string into an ArrayBuffer of raw byte data
 * @param base64Data The base64 encoded string to decode
 * @returns ArrayBuffer of byte data
 */
export const DecodeBase64ToBinary = (base64Data: string): ArrayBuffer => {
    const decodedString = DecodeBase64ToString(base64Data);
    const bufferLength = decodedString.length;
    const bufferView = new Uint8Array(new ArrayBuffer(bufferLength));

    for (let i = 0; i < bufferLength; i++) {
        bufferView[i] = decodedString.charCodeAt(i);
    }

    return bufferView.buffer;
};

/**
 * Converts a number to string and pads with preceding zeroes until it is of specified length.
 * @param num the number to convert and pad
 * @param length the expected length of the string
 * @returns the padded string
 */
export const PadNumber = (num: number, length: number): string => {
    let str = String(num);
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
};
/**
 * Helper to manipulate strings
 */
export const StringTools = {
    EndsWith,
    StartsWith,
    Decode,
    EncodeArrayBufferToBase64,
    DecodeBase64ToString,
    DecodeBase64ToBinary,
    PadNumber,
};
