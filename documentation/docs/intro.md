---
sidebar_label: Introduction
sidebar_position: 1
---

# Parallax Controller: Introduction

[![NPM Version Latest](https://img.shields.io/npm/v/parallax-controller/latest)](https://www.npmjs.com/package/parallax-controller)
[![NPM Downloads](https://img.shields.io/npm/dm/parallax-controller)](https://www.npmjs.com/package/parallax-controller)
[![Codecov](https://codecov.io/gh/jscottsmith/parallax-controller/branch/master/graph/badge.svg)](https://codecov.io/gh/jscottsmith/parallax-controller)

[![Test and Lint](https://github.com/jscottsmith/parallax-controller/actions/workflows/main.yml/badge.svg)](https://github.com/jscottsmith/parallax-controller/actions/workflows/main.yml)
[![Size](https://github.com/jscottsmith/parallax-controller/actions/workflows/size.yml/badge.svg)](https://github.com/jscottsmith/parallax-controller/actions/workflows/size.yml)
[![Coverage](https://github.com/jscottsmith/parallax-controller/actions/workflows/coverage.yml/badge.svg)](https://github.com/jscottsmith/parallax-controller/actions/workflows/coverage.yml)

Core classes and controller for scroll-driven parallax effects powered by the Web Animations API. Each element is driven by a `ScrollTimeline` or `ViewTimeline`—translate, rotate, scale, and opacity keyframes advance with scroll progress on the compositor, without per-frame style writes. Use explicit scroll offsets when you need a fixed window, or let view timelines tie motion to when elements enter, cross, and leave the scrollport, with layout-aware `animation-range` tuning so effects finish at the right moment.

## NPM Package

```bash
npm install parallax-controller@beta
```

## React Integration

If you're building with React use `react-scroll-parallax`, a set of hooks and components to easily create effects and interact with the `parallax-controller`.

```bash
npm install react-scroll-parallax
```

See the [React Scroll Parallax documentation](https://react-scroll-parallax.damnthat.tv/) for usage and demos.

## Demos

This package was created for [react-scroll-parallax](https://github.com/jscottsmith/react-scroll-parallax), but can be used as a standalone lib. Most demos were built with `react-scroll-parallax`.

- [React Scroll Parallax V3 Doc Site](https://react-scroll-parallax-docs.netlify.app/)
- [React Scroll Parallax V3 Storybook](https://react-scroll-parallax-v3.surge.sh/)
