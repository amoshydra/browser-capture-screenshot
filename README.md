# Browser Capture Screenshot

[![Github Repository](https://img.shields.io/badge/amoshydra-browser--capture--screenshot-black?style=flat&logo=github)](https://github.com/amoshydra/browser-capture-screenshot)
[![NPM Version](https://img.shields.io/npm/v/browser-capture-screenshot)](https://www.npmjs.com/package/browser-capture-screenshot)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/browser-capture-screenshot)](https://www.npmjs.com/package/browser-capture-screenshot?activeTab=code)
[![GitHub License](https://img.shields.io/github/license/amoshydra/browser-capture-screenshot)](https://github.com/amoshydra/browser-capture-screenshot/blob/main/LICENSE)

Browser Capture Screenshot utilises [Element Capture API](https://screen-share.github.io/element-capture) or [Region Capture API](https://github.com/w3c/mediacapture-region/#summary) to capture screenshot of a given Element from the page.

```bash
npm install browser-capture-screenshot
```

## Demo
See demo at [https://amoshydra.github.io/browser-capture-screenshot](https://amoshydra.github.io/browser-capture-screenshot)

![preview](https://raw.githubusercontent.com/amoshydra/browser-capture-screenshot/main/readme-preview.gif)

## Usage

```ts
import { capture } from "browser-capture-screenshot";

const screenshot = await capture(demoElement);
previewElement.src = screenshot;
```

`ScreenshotSession` provides more granular controls:

```ts
import { ScreenshotSession } from "browser-capture-screenshot";

const session = new ScreenshotSession();

await session.start();

// capture screenshot 1 second later
setTimeout(async () => {
  const screenshot = await session.capture(demoElement);
  previewElement.src = screenshot;

  await session.stop();
}, 1000);
```

## API

### `capture`

A simplified API for capturing screenshot. This method uses `ScreenshotSession` internally.

```ts
export function capture(element: HTMLElement, options?: CaptureOptions): Promise<string>
```

#### return

A base64 encoded string representing the captured image wrapped in a Promise. e.g.: `data:image/png;base64,iVBORw0K...`.

#### param `element`

The element `HTMLElement` to take screenshot of.

#### param `options`

optional.

##### param `options.api`

optional. Specify how the screenshot should be captured.

- `{ api: "element" }` - uses Element Capture API
- `{ api: "region" }` - uses Region Capture API

Default to using Element Capture API when not specified.

### `ScreenshotSession`

```ts
export class ScreenshotSession {
  static isSupported(): boolean;
  start(): Promise<void>
  stop()
  capture(element: HTMLElement, options?: CaptureOptions): Promise<string>
}
```

## Compatibility

This implementation requires the browser to support the following experimental API:

- [`getDisplayMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) with [`prefereCurrentTab`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia#prefercurrenttab) options
- [`CropTarget.fromElement()`](https://w3c.github.io/mediacapture-region/#dom-croptarget-fromelement) and [BrowserCaptureMediaStreamTrack.cropTo](https://w3c.github.io/mediacapture-region/#dom-browsercapturemediastreamtrack-cropto)
- [`RestrictionTarget.fromElement()`](https://screen-share.github.io/element-capture/#dom-restrictiontarget-fromelement) and [BrowserCaptureMediaStreamTrack.restrictTo](https://screen-share.github.io/element-capture/#dom-browsercapturemediastreamtrack-restrictto)

## Notes:
- When using Element Capture API:
  - requires >= Chrome 132
  - the target element need to be [eligible for restriction](https://screen-share.github.io/element-capture/#elements-eligible-for-restriction)
  - the target element by default has a black background. If your element is tranparent, it will blend with a black background.
  - The following style can be used with Element Capture API:
      ```css
      .target {
        background-color: white; /* provide a background */
        isolation: isolate; /* make target eligible for restriction */
      }
      ``` 
- The capture region need to be visible in the viewport
- System UI (such as context menu) or User Agent widget (i.e. Date Picker, Select option list) will not be captured

## References

References
- https://stackoverflow.com/a/74597490
- https://developer.chrome.com/docs/web-platform/region-capture
- https://developer.chrome.com/docs/web-platform/element-capture

Similar projects
- https://github.com/xataio/screenshot/pull/6
