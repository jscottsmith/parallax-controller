# Public Methods

The following methods are available on a controller instance

## createElement()

Creates and returns a new parallax element with provided config including [props](/docs/usage/props) to be managed by the controller.

```ts
const options = {
  el: document.querySelector('.your-element'),
  props: { translateY: [-100, 100] },
};
const element = parallaxController.createElement(options);
```

## getElements()

Returns all the parallax elements in the controller.

```ts
const elements = parallaxController.getElements();
```

## updateElementPropsById()

Updates an existing parallax element with new [props](/docs/usage/props).

```ts
const newProps = { translateY: [-200, 200] };
parallaxController.updateElementPropsById(element.id, newProps);
```

## removeElementById()

Removes an element from the controller by ID (does not call `destroy()` on the element).

```ts
parallaxController.removeElementById(element.id);
```

## resetElementStyles()

Resets parallax styles on a managed element (the `Element` instance returned from `createElement()`, not a raw DOM node).

```ts
parallaxController.resetElementStyles(element);
```

## updateScrollContainer()

Updates the scroll container of the parallax controller. Rebuilds the internal view, reattaches window listeners, and re-creates the `ResizeObserver` on the new container (when the controller is not disabled).

```ts
const el = document.getElementById('your-scroll-container');
parallaxController.updateScrollContainer(el);
```

## disable()

Disables the controller: removes window listeners and the resize observer, and disables all managed elements.

```ts
parallaxController.disable();
```

`disableParallaxController()` is an alias for `disable()`.

## enable()

Re-enables the controller: restores listeners, the resize observer, view size, and all managed elements.

```ts
parallaxController.enable();
```

`enableParallaxController()` is an alias for `enable()`.

## disableParallaxController()

Alias for [`disable()`](#disable).

```ts
parallaxController.disableParallaxController();
```

## enableParallaxController()

Alias for [`enable()`](#enable).

```ts
parallaxController.enableParallaxController();
```

## update()

Updates all cached attributes on parallax elements.

```ts
parallaxController.update();
```

## destroy()

Removes all listeners and resets all styles on managed elements.

```ts
parallaxController.destroy();
```
