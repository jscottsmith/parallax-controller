import { ParsedValueEffect } from '..';
import { Rect } from './Rect';
import { View } from './View';

const DEFAULT_VALUE = {
  start: 0,
  end: 0,
  unit: '',
};

export type TranslateEffectsShape = {
  translateY: ParsedValueEffect | undefined;
  translateX: ParsedValueEffect | undefined;
};

export class Bounds {
  totalDistY: number;
  totalDistX: number;
  top: number;
  bottom: number;
  left: number;
  right: number;

  constructor(options: {
    rect: Rect;
    view: View;
    translate: TranslateEffectsShape;
    shouldUpdateBoundsWithTranslate: boolean;
  }) {
    // basic bounds
    this.totalDistY = options.view.height + options.rect.height;
    this.totalDistX = options.view.width + options.rect.width;
    this.top = options.rect.top;
    this.bottom = options.rect.bottom;
    this.left = options.rect.left;
    this.right = options.rect.right;

    if (options.shouldUpdateBoundsWithTranslate) {
      this._setBoundsWithTranslations(
        options.rect,
        options.view,
        options.translate
      );
    }
  }

  /**
   * Sets the bounds based on X/Y translation
   */
  _setBoundsWithTranslations(
    rect: Rect,
    view: View,
    translate: {
      translateY: ParsedValueEffect | undefined;
      translateX: ParsedValueEffect | undefined;
    }
  ) {
    const { start: x0, end: x1, unit: xUnit } =
      translate.translateX || DEFAULT_VALUE;
    const { start: y0, end: y1, unit: yUnit } =
      translate.translateY || DEFAULT_VALUE;

    // Y offsets
    const yPercent = yUnit === '%';
    let y0Px = y0;
    let y1Px = y1;
    if (yPercent) {
      const h100 = rect.height / 100;
      y0Px = y0 * h100;
      y1Px = y1 * h100;
    }

    // X offsets
    const xPercent = xUnit === '%';
    let x0Px = x0;
    let x1Px = x1;
    if (xPercent) {
      const h100 = rect.width / 100;
      x0Px = x0 * h100;
      x1Px = x1 * h100;
    }

    const totalAbsOffY = Math.abs(y0Px) + Math.abs(y1Px);
    this.totalDistY = view.height + rect.height + totalAbsOffY;
    const totalDistTrueY =
      view.height +
      rect.height +
      (y1Px > y0Px ? totalAbsOffY * -1 : totalAbsOffY);

    const totalAbsOffX = Math.abs(x0Px) + Math.abs(x1Px);
    this.totalDistX = view.width + rect.width + totalAbsOffX;
    const totalDistTrueX =
      view.width +
      rect.width +
      (x1Px > x0Px ? totalAbsOffX * -1 : totalAbsOffX);

    // const speed = totalDistTrueY / originTotalDistY;
    const multiplierY = rect.originTotalDistY / totalDistTrueY;
    const multiplierX = rect.originTotalDistX / totalDistTrueX;

    this.top = rect.top;
    this.bottom = rect.bottom;

    if (y0Px < 0) {
      this.top = this.top + y0Px * multiplierY;
    }
    if (y1Px > 0) {
      this.bottom = this.bottom + y1Px * multiplierY;
    }

    this.left = rect.left;
    this.right = rect.right;
    if (x0Px < 0) {
      this.left = this.left + x0Px * multiplierX;
    }
    if (x1Px > 0) {
      this.right = this.right + x1Px * multiplierX;
    }
  }
}
