# Browser Capture Screenshot

![NPM Version](https://img.shields.io/npm/v/browser-capture-screenshot) 
![npm bundle size](https://img.shields.io/bundlephobia/minzip/browser-capture-screenshot)

Browser Capture Screen utilises browser’s [getDisplayMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) API to capture screenshot from the page.

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
