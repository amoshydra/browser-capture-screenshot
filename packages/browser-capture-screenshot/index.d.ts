export interface CaptureOptions {
  /**
   * @default "element"
   */
  api?: "element" | "region"
}

export function capture(element: HTMLElement, options?: CaptureOptions): Promise<string>

export class ScreenshotSession {
  static isSupported(): boolean;
  start(): Promise<void>
  stop()
  capture(element: HTMLElement, options?: CaptureOptions): Promise<string>
}
