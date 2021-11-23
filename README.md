# Parallax Controller

[![npm version](https://badge.fury.io/js/parallax-controller.svg)](https://badge.fury.io/js/parallax-controller) [![codecov](https://codecov.io/gh/jscottsmith/parallax-controller/branch/master/graph/badge.svg)](https://codecov.io/gh/jscottsmith/parallax-controller)

Core classes and controller for creating parallax scrolling effects.

## Optimizations to Reduce Jank

Parallax Controller uses a single passive scroll listener (dependent on browser support) with the minimal amount of work done on the scroll event to prevent jank (calculations that cause layout, reflow and paint are cached initially and only updated when layout changes). Request animation frame is then used to decouple the scroll handler and further reduce jank. All translations are applied with 3D transforms to utilize the GPU and prevent paints. If you have ideas to further optimize scrolling please PR or post an issue.
