---
sidebar_label: Performance
sidebar_position: 2
---

# Performance

Parallax still costs GPU and main-thread work, but this library no longer drives motion from a scroll handler that writes styles every frame. Visual progress is handled by **scroll-driven Web Animations** (`ScrollTimeline` / `ViewTimeline` + `element.animate()`), so the browser advances keyframes with scroll on the compositor.

## How motion is applied

1. **Scroll-linked WAAPI** — Each parallax element gets a scroll-driven animation. `transform` (translate, rotate, scale) and `opacity` are the animated properties, which map well to compositor-friendly updates.
2. **No per-scroll style writes** — Scrolling does not loop elements to set inline `transform` / `opacity`. The animation timeline carries progress; JavaScript is not on the hot path for rendering each frame.
3. **View timelines by default** — Unless you set explicit `startScroll` / `endScroll`, progress follows when the subject enters, crosses, and leaves the scrollport. Layout-derived `animation-range` adjustments align that progress with your configured effects.
4. **Explicit scroll timelines** — When you pass numeric `startScroll` / `endScroll`, a `ScrollTimeline` ties progress to scroll offsets on the window or scroll container.

Animations are only installed when the browser exposes [`ScrollTimeline`](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline), [`ViewTimeline`](https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline), and `HTMLElement.prototype.animate`. Unsupported environments skip scroll-driven setup (no silent fallback to manual scrolling).

## What JavaScript still does

Work is kept off the scroll path except when you opt into callbacks:

| When | Work |
| --- | --- |
| Element add, resize, focus/blur, load, `update()` | Measure layout ([`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)), recompute keyframes and timeline options, (re)attach animations |
| `ResizeObserver` on the scrollport | Same as above when the view or container size changes |
| `onEnter` / `onExit` | [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) only when those callbacks are set |
| `onProgressChange` / `onChange` | One **passive** scroll listener on the window or scroll container, coalesced with a single [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) per frame — reads animation progress only; does not drive visuals |

Avoid `onProgressChange` / `onChange` on large numbers of elements unless you need them; they are the main reason scroll events touch your code.

## Tips for smooth scrolling

1. **Prefer fewer, simpler effects** — Many simultaneous scroll-driven animations still increase compositor and paint cost.
2. **Limit concurrent in-view effects** — Elements visible together each hold an active animation.
3. **Optimize media** — Large images and heavy DOM under animated nodes still hurt scroll feel.
4. **Respect `prefers-reduced-motion`** — Disable or simplify parallax when users request reduced motion (your app or wrapper can set `disabled` on the controller).
5. **Test target browsers** — Scroll-driven animations need current Chromium, Safari, and Firefox versions; verify on devices you ship to.

If you have ideas to further improve performance, [please open a PR or issue](https://github.com/jscottsmith/parallax-controller).

## Scroll effects can still hurt UX

**You are responsible for using the library appropriately.**

1. Keep motion subtle — extreme translate/scale on many layers reads as janky even when technically smooth.
2. Do not rely on progress callbacks for core UI; use them for analytics or secondary UI, not layout.
3. Rebuild cost: calling `update()` or resizing the scroll container rebuilds animations; avoid doing that continuously.
