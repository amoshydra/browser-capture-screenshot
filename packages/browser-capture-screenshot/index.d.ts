export function captureScreenshot(element: HTMLElement): Promise<string>;
export function setup(): Promise<[MediaStream, MediaStreamTrack]>;
export function focus(element: HTMLElement | false, stream: MediaStream): Promise<void>;
export function rasterize(element: HTMLElement, stream: MediaStream): Promise<string>;
