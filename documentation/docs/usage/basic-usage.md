---
sidebar_position: 1
---

# Basic Usage

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
