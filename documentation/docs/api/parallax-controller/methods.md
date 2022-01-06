# Public Methods

The following methods are available on a controller instance

## createElement()

Creates and returns a new parallax element with provided [options](#todo) to be managed by the controller.

```ts
const options = {
  elInner: document.querySelector('.el-inner'),
  elOuter: document.querySelector('.el-inner'),
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

Updates an existing parallax element with new [props](#todo).

```ts
const newProps = { translateY: [-200, 200] };
parallaxController.updateElementPropsById(element.id, newProps);
```

## removeElementById()

Removes and element by a given ID

```ts
parallaxController.removeElementById(element.id);
```

## updateScrollContainer()

Updates the scroll container of the parallax controller.

```ts
const el = document.getElementById('your-scroll-container');
parallaxController.updateScrollContainer(el);
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
