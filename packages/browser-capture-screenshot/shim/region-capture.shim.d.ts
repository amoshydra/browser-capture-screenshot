declare global {
  interface DisplayMediaStreamOptions {
    preferCurrentTab?: boolean;
    selfBrowserSurface?: "include" | "exclude";
  }

  class BrowserCaptureMediaStreamTrack extends MediaStreamTrack {
    restrictTo: (cropTarget: RestrictionTarget | null) => Promise<void>;
  }

  class RestrictionTarget {
    static fromElement(target: HTMLElement): Promise<RestrictionTarget>;
  }
}

export {};
