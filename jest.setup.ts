import { TextEncoder, TextDecoder } from "util";

Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
  scrollTo: () => {},
});

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = (target: Element) => {
    const entry = {
      isIntersecting: true,
      target,
      time: 0,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 1,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: {} as DOMRectReadOnly,
    } as IntersectionObserverEntry;
    this.callback([entry], this as unknown as IntersectionObserver);
  };
  unobserve = () => {};
  disconnect = () => {};
}

Object.assign(globalThis, {
  IntersectionObserver: MockIntersectionObserver,
});

class MockImage {
  onload?: () => void;
  onerror?: () => void;
  _src = "";
  set src(value: string) {
    this._src = value;
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 0);
  }
  get src() {
    return this._src;
  }
}

Object.assign(globalThis, {
  Image: MockImage,
});
import "@testing-library/jest-dom";
