export declare const GLTFMagicBase64Encoded = "Z2xURg";
export declare const GLTFFileLoaderMetadata: {
    readonly name: "gltf";
    readonly extensions: {
        readonly ".gltf": {
            readonly isBinary: false;
            readonly mimeType: "model/gltf+json";
        };
        readonly ".glb": {
            readonly isBinary: true;
            readonly mimeType: "model/gltf-binary";
        };
    };
    readonly canDirectLoad: (data: string) => boolean;
};
