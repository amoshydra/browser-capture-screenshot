import { ScreenshotSession } from "./ScreenshotSession.mjs";

/**
 * @param {HTMLElement} element
 * @param {import("../index").CaptureOptions=} options
 * @returns {Promise<string>}
 */
export async function capture(element, options) {
  const session = new ScreenshotSession();
  try {
    await session.start();
    return await session.capture(element, options);
  } catch (error) {
    throw error;
  } finally {
    session.stop();
  }
}
