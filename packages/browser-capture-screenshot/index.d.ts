export function capture(element: HTMLElement): Promise<string>

export class ScreenshotSession {
  static isSupported(): boolean;
  start(): Promise<void>
  stop()
  capture(element: HTMLElement): Promise<string>
}
