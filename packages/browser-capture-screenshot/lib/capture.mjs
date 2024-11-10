// @ts-check

/**
 * @param {HTMLElement} element 
 * @returns {Promise<string>}
 */
export async function captureScreenshot(element) {
  const [stream, videoTrack] = await setup();
  try {
    await focus(element, stream);
    const url = await rasterize(element, stream);

    videoTrack?.stop();
    return url;
  } catch (error) {
    videoTrack?.stop();
    throw error;
  } finally {
  }
}

/**
 * @returns {Promise<[MediaStream, MediaStreamTrack]>}
 */
export const setup = async () => {
  /**
   * @type {MediaStreamTrack | null}
   */
  let videoTrack = null; 

  // Obtain permission
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    selfBrowserSurface: 'include',
    preferCurrentTab: true,
  });

  try {
    videoTrack = stream.getVideoTracks()[0];
    return [stream, videoTrack];
  } catch (error) {
    videoTrack?.stop();
    throw error;
  }
};

/**
 * @param {HTMLElement | false} element
 * @param {MediaStream} stream
 * @returns {Promise<void>}
 */
export const focus = async(element, stream) => {
  const [videoTrack] = stream.getTracks();

  if (element === false) {
    await videoTrack.cropTo(null);
    return null;
  }

  // Setup cropping
  const cropTarget = await CropTarget.fromElement(element);
  await videoTrack.cropTo(cropTarget);
  return cropTarget;
};

/**
 * @param {HTMLElement} element 
 * @param {MediaStream} stream 
 * @returns {Promise<string>}
 */
export const rasterize = async(element, stream) => {
  const [videoTrack] = stream.getVideoTracks();
  
  const bb = element.getBoundingClientRect();
  const videoTrackSettings = videoTrack.getSettings();

  const sourceWidth = bb.width * devicePixelRatio;
  const sourceHeight = bb.height * devicePixelRatio;

  const canvas = document.createElement("canvas");
  canvas.width = bb.width * devicePixelRatio;
  canvas.height = bb.height * devicePixelRatio;
  const ctx = canvas.getContext("2d");

  const video = document.createElement("video");
  video.srcObject = stream;
  await video.play();

  ctx.drawImage(
    video,
    0, 0, sourceWidth, sourceHeight,
    0, 0, canvas.width, canvas.height
  );
  return canvas.toDataURL("image/png", 1);
}


/**
 * @returns {Boolean}
 */
const checkCompatibility = () => {
  if ("CropTarget" in self && "fromElement" in CropTarget) {
    return false;
  }
  return true;
}
