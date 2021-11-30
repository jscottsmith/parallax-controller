import { View } from './View';
import { Scroll } from './Scroll';
import { RootMarginShape } from '../types';

export class Rect {
  height: number;
  width: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  originTotalDistY: number;
  originTotalDistX: number;

  constructor(options: {
    el: HTMLElement;
    view: View;
    scroll: Scroll;
    rootMargin?: RootMarginShape;
  }) {
    let rect = options.el.getBoundingClientRect();

    // rect is based on viewport -- must adjust for relative scroll container
    if (options.view.scrollContainer) {
      const scrollRect = options.view.scrollContainer.getBoundingClientRect();
      rect = {
        ...rect,
        top: rect.top - scrollRect.top,
        right: rect.right - scrollRect.left,
        bottom: rect.bottom - scrollRect.top,
        left: rect.left - scrollRect.left,
      };
    }

    this.height = options.el.offsetHeight;
    this.width = options.el.offsetWidth;
    this.left = rect.left + options.scroll.x;
    this.right = rect.right + options.scroll.x;
    this.top = rect.top + options.scroll.y;
    this.bottom = rect.bottom + options.scroll.y;
    this.originTotalDistY = options.view.height + this.height;
    this.originTotalDistX = options.view.width + this.width;

    if (options.rootMargin) {
      this._setRectWithRootMargin(options.rootMargin);
    }
  }

  /**
   * Apply root margin to all properties
   */
  _setRectWithRootMargin(rootMargin: RootMarginShape) {
    let totalRootY = rootMargin.top + rootMargin.bottom;
    let totalRootX = rootMargin.left + rootMargin.right;
    this.top -= rootMargin.top;
    this.right += rootMargin.right;
    this.bottom += rootMargin.bottom;
    this.left -= rootMargin.left;
    this.height += totalRootY;
    this.width += totalRootX;
    this.originTotalDistY += totalRootY;
    this.originTotalDistX += totalRootX;
  }
}
