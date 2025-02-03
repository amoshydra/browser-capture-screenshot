const isSupported = (
  typeof BrowserCaptureMediaStreamTrack === "function" &&
  typeof CropTarget == "function" &&
  typeof RestrictionTarget == "function"
);

export class ScreenshotSession {
  static isSupported() {
    return isSupported;
  }

  constructor() {
    /**
     * @type {BrowserCaptureMediaStreamTrack | null}
     */
    this._track = null;

    /**
     * @type {MediaStream | null}
     */
    this._stream = null;
  }

  /**
   * Prompt user to grant permission to capture the current tab.
   */
  async start() {
    if (this._track) return;

    try {
      // Obtain permission
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        selfBrowserSurface: 'include',
        preferCurrentTab: true,
      });
      this._stream = stream;
      this.track = /** @type {BrowserCaptureMediaStreamTrack} */ (stream.getTracks()[0]);
    } catch (error) {
      this.stop();
      throw error;
    }
  }

  /**
   * @return {MediaStream}
   */
  get stream() {
    if (!this._stream) {
      throw new Error("stream is not started yet");
    }
    return this._stream;
  }
  /**
   * @return {BrowserCaptureMediaStreamTrack}
   */
  get track() {
    if (!this._track) {
      throw new Error("track is not started yet");
    }
    return this._track;
  }
  /**
   * @param {BrowserCaptureMediaStreamTrack | null} track
   */
  set track(track) {
    if (track && this._track) {
      throw new Error("track already exist");
    }
    this._track = track;
  }

  /**
   * Revoke permission to capture current tab. Remove existing capture stream.
   */
  stop() {
    const track = this._track;
    if (track) {
      track.stop();
      this.stream?.removeTrack(track)
    }
    this._track = null;
    this._stream = null;
  }

  /**
   * Capture screenshot of the given element and return a base64 string representation of the screenshot.
   * 
   * @param {HTMLElement} element
   * @param {import("../index").CaptureOptions=} options
   * @return {Promise<string>}
   */
  async capture(element, options) {
    switch (options?.api) {
      case "element":
      case undefined: {
        const restrictionTarget = await RestrictionTarget.fromElement(element);
        await this.track.restrictTo(restrictionTarget);
        break;
      }
      case "region": {
        const cropTarget = await CropTarget.fromElement(element);
        await this.track.cropTo(cropTarget);
        break;
      }
      default: {
        throw new Error(`invalid option passed to api. Valid options are one of: "element", "region"`)
      }
    }

    return await drawStreamToImageDataUrl(element, this.stream);
  }
}

/**
 * @param {HTMLElement} element 
 * @param {MediaStream} stream 
 * @returns {Promise<string>}
 */
const drawStreamToImageDataUrl = async(element, stream) => {
  let canvas = null;
  let video = null;

  try {
    const { width, height } = element.getBoundingClientRect();
  
    const sourceWidth = width * devicePixelRatio;
    const sourceHeight = height * devicePixelRatio;
  
    video = document.createElement("video");
    video.srcObject = stream;

    const playbackPromise = video.play();

    await withTimeout(
      () => playbackPromise,
      1000,
      () => new Error("Unable to capture. Element may not be eligible for restriction.")
    );

    canvas = document.createElement("canvas");
    canvas.width = sourceWidth;
    canvas.height = sourceHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("unable to get 2D context from canvas");
    }
    ctx.drawImage(
      video,
      0, 0, sourceWidth, sourceHeight,
      0, 0, sourceWidth, sourceHeight
    );
    return canvas.toDataURL("image/png", 1);
  } finally {
    canvas?.remove();
    video?.remove();
  }
}

/**
 * @template T
 * @param {() => Promise<T>} fn 
 * @param {number} timeout 
 * @param {() => Error} errorFn 
 */
const withTimeout = (fn, timeout, errorFn) => {
  let timeoutId = 0;

  return Promise.race([
    new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => reject(errorFn()), timeout)
    }),
    fn()
      .then(() => {
        clearTimeout(timeoutId)
      }),
  ]);
}


