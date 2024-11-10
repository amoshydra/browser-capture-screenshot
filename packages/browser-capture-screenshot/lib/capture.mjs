import { ScreenshotSession } from "./ScreenshotSession.mjs";

/**
 * @param {HTMLElement} element
 * @returns {Promise<string>}
 */
export async function capture(element) {
  const session = new ScreenshotSession();
  try {
    await session.start();
    return await session.capture(element);
  } catch (error) {
    throw error;
  } finally {
    session.stop();
  }
}
