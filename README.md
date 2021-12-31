# 🕹 Parallax Controller

[![npm version](https://badge.fury.io/js/parallax-controller.svg)](https://badge.fury.io/js/parallax-controller) [![codecov](https://codecov.io/gh/jscottsmith/parallax-controller/branch/master/graph/badge.svg)](https://codecov.io/gh/jscottsmith/parallax-controller)

Core classes and controller for creating parallax scrolling effects.

This package was created for [react-scroll-parallax](https://github.com/jscottsmith/react-scroll-parallax), but can be used as a standalone lib.

## Usage

Create the parallax controller first:

```ts
const controller = ParallaxController.init();
```

Then create an element with animation effects as props:

```ts
controller.createElement({
  elOuter: document.getElementById('outer'),
  elInner: document.getElementById('inner'),
  props: {
    translateY: [-100, 100],
    opacity: [0.4, 1],
  },
});
```

```html
<div id="outer">
  <div id="inner">
    <!-- children  -->
  </div>
</div>
```

## Optimizations to Reduce Jank

A number of techniques are used to keep scrolling optimized:

1. Uses a single passive scroll listener to control all animated elements on the page.
2. A minimal amount of work is done on the scroll event to prevent jank with no calls to methods that cause layout shifts.
3. Calculations that cause layout, reflow ([`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)) are cached and only updated when layout may change.
4. The [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) is used to apply all scroll effects.
5. Only GPU supported CSS effects `transform` and `opacity` are allowed.
6. CSS [`will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) is added to an element based on animation effects to prevent paints.

If you have ideas to further optimize scrolling please PR or post an issue.

## ⚠️ **Scroll Effects May Still Cause Jank and Bad User Experiences!**

It's up to you to make sure you use this package appropriately. Here's some suggestions for usage while maintaining good UX:

1. Keep effects simple -- less is more. Oftentimes the less extreme animations on the page the better the scrolling will be.
2. Minimize the number of scroll effects on elements that are in view at the same time.
3. When using images keep them small and optimized. Hi-resolution images will hurt scroll performance.
4. Disable most (or all) scroll effects on mobile. Mobile devices optimize for best battery life and animation performance will often be degraded.
