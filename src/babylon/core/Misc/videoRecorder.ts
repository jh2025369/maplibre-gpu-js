/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
import type { Nullable } from "../types";
import { Tools } from "./tools";
import type { AbstractEngine } from "../Engines/abstractEngine";

interface MediaRecorder {
    /** Starts recording */
    start(timeSlice: number): void;
    /** Stops recording */
    stop(): void;

    /** Event raised when an error arised. */
    onerror: (event: ErrorEvent) => void;
    /** Event raised when the recording stops. */
    onstop: (event: Event) => void;
    /** Event raised when a new chunk of data is available and should be tracked. */
    ondataavailable: (event: Event) => void;
}

interface MediaRecorderOptions {
    /** The mime type you want to use as the recording container for the new MediaRecorder. */
    mimeType?: string;
    /** The chosen bitrate for the audio component of the media. */
    audioBitsPerSecond?: number;
    /** The chosen bitrate for the video component of the media. */
    videoBitsPerSecond?: number;
    /** The chosen bitrate for the audio and video components of the media. This can be specified instead of the above two properties.
     * If this is specified along with one or the other of the above properties, this will be used for the one that isn't specified. */
    bitsPerSecond?: number;
}

interface MediaRecorderConstructor {
    /**
     * A reference to the prototype.
     */
    readonly prototype: MediaRecorder;

    /**
     * Creates a new MediaRecorder.
     * @param stream Defines the stream to record.
     * @param options Defines the options for the recorder available in the type MediaRecorderOptions.
     */
    new (stream: MediaStream, options?: MediaRecorderOptions): MediaRecorder;
}

/**
 * MediaRecorder object available in some browsers.
 */
declare var MediaRecorder: MediaRecorderConstructor;

/**
 * This represents the different options available for the video capture.
 */
export interface VideoRecorderOptions {
    /** The canvas you want to record */
    canvas?: HTMLCanvasElement;
    /** Defines the mime type of the video. */
    mimeType: string;
    /** Defines the FPS the video should be recorded at. */
    fps: number;
    /** Defines the chunk size for the recording data. */
    recordChunckSize: number;
    /** The audio tracks to attach to the recording. */
    audioTracks?: MediaStreamTrack[];
}

/**
 * This can help with recording videos from BabylonJS.
 * This is based on the available WebRTC functionalities of the browser.
 *
 * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/renderToVideo
 */
export class VideoRecorder {
    private static readonly _DefaultOptions = {
        mimeType: "video/webm",
        fps: 25,
        recordChunckSize: 3000,
    };

    /**
     * Returns whether or not the VideoRecorder is available in your browser.
     * @param engine Defines the Babylon Engine.
     * @param canvas Defines the canvas to record. If not provided, the engine canvas will be used.
     * @returns true if supported otherwise false.
     */
    public static IsSupported(engine: AbstractEngine, canvas?: HTMLCanvasElement): boolean {
        const targetCanvas = canvas ?? engine.getRenderingCanvas();
        return !!targetCanvas && typeof (<any>targetCanvas).captureStream === "function";
    }

    private readonly _options: VideoRecorderOptions;
    private _canvas: Nullable<HTMLCanvasElement>;
    private _mediaRecorder: Nullable<MediaRecorder>;

    private _recordedChunks: any[];
    private _fileName: Nullable<string>;
    private _resolve: Nullable<(blob: Blob) => void>;
    private _reject: Nullable<(error: any) => void>;

    private _isRecording: boolean;

    /**
     * True when a recording is already in progress.
     */
    public get isRecording(): boolean {
        return !!this._canvas && this._isRecording;
    }

    /**
     * Create a new VideoCapture object which can help converting what you see in Babylon to a video file.
     * @param engine Defines the BabylonJS Engine you wish to record.
     * @param options Defines options that can be used to customize the capture.
     */
    constructor(engine: AbstractEngine, options: Partial<VideoRecorderOptions> = {}) {
        if (!VideoRecorder.IsSupported(engine, options.canvas)) {
            // eslint-disable-next-line no-throw-literal
            throw "Your browser does not support recording so far.";
        }

        const canvas = options.canvas ?? engine.getRenderingCanvas();
        if (!canvas) {
            // eslint-disable-next-line no-throw-literal
            throw "The babylon engine must have a canvas to be recorded";
        }

        this._canvas = canvas;
        this._isRecording = false;

        this._options = {
            ...VideoRecorder._DefaultOptions,
            ...options,
        };

        const stream = this._canvas.captureStream(this._options.fps);
        if (this._options.audioTracks) {
            for (const track of this._options.audioTracks) {
                stream.addTrack(track);
            }
        }

        this._mediaRecorder = new MediaRecorder(stream, { mimeType: this._options.mimeType });
        this._mediaRecorder.ondataavailable = (evt: Event) => this._handleDataAvailable(evt);
        this._mediaRecorder.onerror = (evt: ErrorEvent) => this._handleError(evt);
        this._mediaRecorder.onstop = () => this._handleStop();
    }

    /**
     * Stops the current recording before the default capture timeout passed in the startRecording function.
     */
    public stopRecording(): void {
        if (!this._canvas || !this._mediaRecorder) {
            return;
        }

        if (!this.isRecording) {
            return;
        }

        this._isRecording = false;
        this._mediaRecorder.stop();
    }

    /**
     * Starts recording the canvas for a max duration specified in parameters.
     * @param fileName Defines the name of the file to be downloaded when the recording stop.
     * If null no automatic download will start and you can rely on the promise to get the data back.
     * @param maxDuration Defines the maximum recording time in seconds.
     * It defaults to 7 seconds. A value of zero will not stop automatically, you would need to call stopRecording manually.
     * @returns A promise callback at the end of the recording with the video data in Blob.
     */
    public startRecording(fileName: Nullable<string> = "babylonjs.webm", maxDuration = 7): Promise<Blob> {
        if (!this._canvas || !this._mediaRecorder) {
            // eslint-disable-next-line no-throw-literal
            throw "Recorder has already been disposed";
        }

        if (this.isRecording) {
            // eslint-disable-next-line no-throw-literal
            throw "Recording already in progress";
        }

        if (maxDuration > 0) {
            setTimeout(() => {
                this.stopRecording();
            }, maxDuration * 1000);
        }

        this._fileName = fileName;
        this._recordedChunks = [];
        this._resolve = null;
        this._reject = null;

        this._isRecording = true;
        this._mediaRecorder.start(this._options.recordChunckSize);

        return new Promise<Blob>((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    /**
     * Releases internal resources used during the recording.
     */
    public dispose() {
        this._canvas = null;
        this._mediaRecorder = null;

        this._recordedChunks = [];
        this._fileName = null;
        this._resolve = null;
        this._reject = null;
    }

    private _handleDataAvailable(event: any): void {
        if (event.data.size > 0) {
            this._recordedChunks.push(event.data);
        }
    }

    private _handleError(event: ErrorEvent): void {
        this.stopRecording();

        if (this._reject) {
            this._reject(event.error);
        } else {
            throw new event.error();
        }
    }

    private _handleStop(): void {
        this.stopRecording();

        const superBuffer = new Blob(this._recordedChunks);
        if (this._resolve) {
            this._resolve(superBuffer);
        }

        window.URL.createObjectURL(superBuffer);

        if (this._fileName) {
            Tools.Download(superBuffer, this._fileName);
        }
    }
}
