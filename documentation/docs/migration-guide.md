---
sidebar_label: Migration Guide (v1 → v2)
sidebar_position: 3
---

# Migration Guide (v1 → v2)

This guide covers breaking changes when upgrading **parallax-controller** from **v1.x** to **v2.x**. v2 replaces scroll-time style updates with scroll-driven Web Animations (`ViewTimeline` / `ScrollTimeline`). If you are already on v2, use the [Usage](./usage/basic-usage) and [API](./api) docs instead.

## Breaking changes at a glance

| Change | v1 | v2 |
| --- | --- | --- |
| Scroll progress | JS updated inline styles on scroll | `ViewTimeline` / `ScrollTimeline` + `element.animate()` |
| **`rootMargin`** | Optional prop on element config | **Removed** — not in `ParallaxElementConfig` |
| Unsupported browsers | Effects could still run via JS | No silent fallback — animations are skipped when scroll-driven APIs are missing |
| Docs: viewport bounds | [Advanced Usage](./usage/advanced) “Increase Scroll Bounds” with `rootMargin` | Section removed; use alternatives below |

## `rootMargin` removed

In **v1**, the `rootMargin` prop let you pass an object such as `{ top: 100, right: 100, bottom: 100, left: 100 }` to shrink or expand the rectangle used to decide when an element was “in view” for scroll progress and enter/exit callbacks. It was listed on [Props](./usage/props) and documented under [Advanced Usage](./usage/advanced).

**v2** no longer supports `rootMargin`. It is not part of `ParallaxElementConfig`, is omitted from the [Props](./usage/props) configuration table, and has no effect on scroll-driven timelines. View progress follows the browser’s view timeline—when the subject **enters**, moves through, and **exits** the scrollport—not a custom inset margin around the viewport.

### v1

```ts
controller.createElement({
  el: document.querySelector('.your-element'),
  props: {
    translateY: [-100, 100],
    rootMargin: { top: 100, right: 100, bottom: 100, left: 100 },
  },
});
```

### v2

Remove `rootMargin` from your element props.

```ts
controller.createElement({
  el: document.querySelector('.your-element'),
  props: {
    translateY: [-100, 100],
  },
});
```

### Alternatives

If you relied on `rootMargin` in v1, choose the v2 approach that matches your goal:

| Goal | Suggested approach |
| --- | --- |
| Animate between fixed document scroll positions | Set **`startScroll`** and **`endScroll`** (absolute `scrollTop` values). See [Advanced Usage](./usage/advanced#setting-scroll-top-values). |
| Tie progress to a different element’s position | Set **`targetElement`** to the element whose layout should drive the timeline. See [Advanced Usage](./usage/advanced#using-a-target-element). |
| Finish the full effect when the element is already in view at page load or at the end of the page | Enable **`shouldAlwaysCompleteAnimation`**. See [Props](./usage/props#configuration-props). |
| Start or end the visual effect earlier/later in the layout | Adjust spacing, size, or placement in CSS, or use **`targetElement`** on a spacer or sentinel node placed where you want progress to begin or end. |

`onEnter` and `onExit` still use [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) against the scrollport (or scroll container root). They no longer accept a custom root margin; intersection follows the same view bounds as the scroll-driven animation.

## Scroll-driven animations

**v1** drove parallax by writing `transform` / `opacity` (and similar) on scroll events.

**v2** installs a scroll-linked [`Animation`](https://developer.mozilla.org/en-US/docs/Web/API/Animation) per element. Progress is advanced by the browser on the compositor. JavaScript still measures layout and rebuilds keyframes on resize, `update()`, and related events—see [Performance](./performance#what-javascript-still-does).

Implications when migrating:

- Visual motion no longer depends on a scroll listener updating styles every frame.
- **`onProgressChange`** / **`onChange`** are sampled from animation progress (passive scroll + one `requestAnimationFrame` per frame), not from manual style interpolation. They require at least one parallax effect (e.g. `translateY` or `speed`).
- Calling **`update()`** or changing the scroll container rebuilds animations; avoid doing that continuously.

## Browser requirements

v2 only installs parallax animations when the environment exposes [`ScrollTimeline`](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline), [`ViewTimeline`](https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline), and `HTMLElement.prototype.animate`. There is **no** fallback to v1-style scroll handlers—unsupported browsers skip scroll-driven setup entirely.

Test on the browsers you ship to. See [Performance](./performance#tips-for-smooth-scrolling) for guidance.

## Controller API notes

These are unchanged for most v1 integrations but are documented explicitly in v2:

- **`ParallaxController.init()`** must run on the client (`window` required). See [Creating an instance](./api/parallax-controller/init).
- Default scroll tracking uses **`window`** (document viewport), not `document.body`. Pass **`scrollContainer`** for a custom scrollport.
- **`disable()`** / **`enable()`** are the primary methods; **`disableParallaxController()`** / **`enableParallaxController()`** remain as aliases. See [ParallaxController](./api/parallax-controller/).

## Further reading

For timelines, layout adjustments, and callback behavior, see [Introduction](./intro), [Performance](./performance), and [Props](./usage/props).
