declare global {
  interface DisplayMediaStreamOptions {
    preferCurrentTab?: boolean;
    selfBrowserSurface?: "include" | "exclude";
  }

  class BrowserCaptureMediaStreamTrack extends MediaStreamTrack {
    restrictTo: (cropTarget: RestrictionTarget | null) => Promise<void>;
    cropTo: (cropTarget: CropTarget | null) => Promise<void>;
  }

  class RestrictionTarget {
    static fromElement(target: HTMLElement): Promise<RestrictionTarget>;
  }

  class CropTarget {
    static fromElement(target: HTMLElement): Promise<CropTarget>;
  }
}

export { };

