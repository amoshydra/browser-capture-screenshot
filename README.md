# Browser Capture Screenshot

[![Github Repository](https://img.shields.io/badge/amoshydra-browser--capture--screenshot-black?style=flat&logo=github)](https://github.com/amoshydra/browser-capture-screenshot)
[![NPM Version](https://img.shields.io/npm/v/browser-capture-screenshot)](https://www.npmjs.com/package/browser-capture-screenshot)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/browser-capture-screenshot)](https://www.npmjs.com/package/browser-capture-screenshot?activeTab=code)
[![GitHub License](https://img.shields.io/github/license/amoshydra/browser-capture-screenshot)](https://github.com/amoshydra/browser-capture-screenshot/blob/main/LICENSE)


Browser Capture Screenshot utilises the [Region Capture API](https://github.com/w3c/mediacapture-region/#summary) to capture screenshot of a given Element from the page.

```bash
npm install browser-capture-screenshot
```

## Demo
See demo at [https://amoshydra.github.io/browser-capture-screenshot](https://amoshydra.github.io/browser-capture-screenshot)

![preview](https://raw.githubusercontent.com/amoshydra/browser-capture-screenshot/main/readme-preview.gif)

## Usage

```ts
import { captureScreenshot } from "browser-capture-screenshot";

const screenshot = await captureScreenshot(demoElement);
previewElement.src = screenshot;
```

## Compatibility

This implementation requires the browser to support the following experimental API:

- [`getDisplayMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) with [`prefereCurrentTab`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia#prefercurrenttab) options
- [`CropTarget.fromElement()`](https://w3c.github.io/mediacapture-region/#dom-croptarget-fromelement) and [BrowserCaptureMediaStreamTrack.cropTo](https://w3c.github.io/mediacapture-region/#dom-browsercapturemediastreamtrack-cropto)

## Known issues:
- The captured screenshot will also include any element occluding the given element
- The capture region need to be visible in the viewport
- System UI (such as context menu) or User Agent widget (i.e. Date Picker, Select option list) will not be captured

## References

References
- https://stackoverflow.com/a/74597490
- https://developer.chrome.com/docs/web-platform/region-capture

Similar projects
- https://github.com/xataio/screenshot/pull/6

Future Proposals
- https://developer.chrome.com/docs/web-platform/element-capture
