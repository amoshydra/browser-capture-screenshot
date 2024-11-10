declare global {
  interface DisplayMediaStreamOptions {
    preferCurrentTab?: boolean;
    selfBrowserSurface?: 'include' | 'exclude';
  }

  class BrowserCaptureMediaStreamTrack extends MediaStreamTrack {
    cropTo: (cropTarget: CropTarget | null) => Promise<void>;
  }

  class CropTarget {
    static fromElement(target: HTMLElement): Promise<CropTarget>;
  }
}

export {};
