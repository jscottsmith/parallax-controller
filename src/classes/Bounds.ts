import { ParsedValueEffect } from '..';
import { getStartEndValueInPx } from '../helpers/getStartEndValueInPx';
import { Rect } from './Rect';
import { View } from './View';

const DEFAULT_VALUE: ParsedValueEffect = {
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
      translateY?: ParsedValueEffect;
      translateX?: ParsedValueEffect;
    }
  ) {
    // get start and end accounting for percent effects
    const translateX: ParsedValueEffect = translate.translateX || DEFAULT_VALUE;
    const { start: startXPx, end: endXPx } = getStartEndValueInPx(
      translateX,
      rect.width
    );

    const translateY: ParsedValueEffect = translate.translateY || DEFAULT_VALUE;
    const { start: startYPx, end: endYPx } = getStartEndValueInPx(
      translateY,
      rect.height
    );

    const totalAbsOffY = Math.abs(startYPx) + Math.abs(endYPx);
    this.totalDistY = view.height + rect.height + totalAbsOffY;
    const totalDistTrueY =
      view.height +
      rect.height +
      (endYPx > startYPx ? totalAbsOffY * -1 : totalAbsOffY);

    const totalAbsOffX = Math.abs(startXPx) + Math.abs(endXPx);
    this.totalDistX = view.width + rect.width + totalAbsOffX;
    const totalDistTrueX =
      view.width +
      rect.width +
      (endXPx > startXPx ? totalAbsOffX * -1 : totalAbsOffX);

    // const speed = totalDistTrueY / originTotalDistY;
    const multiplierY = rect.originTotalDistY / totalDistTrueY;
    const multiplierX = rect.originTotalDistX / totalDistTrueX;

    this.top = rect.top;
    this.bottom = rect.bottom;

    if (startYPx < 0) {
      this.top = this.top + startYPx * multiplierY;
    }
    if (endYPx > 0) {
      this.bottom = this.bottom + endYPx * multiplierY;
    }

    this.left = rect.left;
    this.right = rect.right;
    if (startXPx < 0) {
      this.left = this.left + startXPx * multiplierX;
    }
    if (endXPx > 0) {
      this.right = this.right + endXPx * multiplierX;
    }
  }
}
