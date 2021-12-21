import { ParsedValueEffect } from '../types';
import { Rect } from '../classes/Rect';
import { View } from '../classes/View';
import { Limits } from '../classes/Limits';
import { getStartEndValueInPx } from './getStartEndValueInPx';
import { TranslateMultiplier } from './getTranslateMultiplier';
import { ParallaxStartEndEffects } from '..';

const DEFAULT_VALUE: ParsedValueEffect = {
  start: 0,
  end: 0,
  unit: '',
};

export function createLimitsWithTranslationsForRelativeElements(
  rect: Rect,
  view: View,
  effects: ParallaxStartEndEffects,
  multiplier: TranslateMultiplier
): Limits {
  // get start and end accounting for percent effects
  const translateX: ParsedValueEffect = effects.translateX || DEFAULT_VALUE;
  const { start: startXPx, end: endXPx } = getStartEndValueInPx(
    translateX,
    rect.width
  );

  const translateY: ParsedValueEffect = effects.translateY || DEFAULT_VALUE;
  const { start: startYPx, end: endYPx } = getStartEndValueInPx(
    translateY,
    rect.height
  );

  let startY = rect.top;
  let endY = rect.bottom + view.height;

  if (startYPx < 0) {
    startY = startY + startYPx * multiplier.multiplierY;
  }
  if (endYPx > 0) {
    endY = endY + endYPx * multiplier.multiplierY;
  }

  let startX = rect.left;
  let endX = rect.right + view.width;
  if (startXPx < 0) {
    startX = startX + startXPx * multiplier.multiplierX;
  }
  if (endXPx > 0) {
    endX = endX + endXPx * multiplier.multiplierX;
  }

  return new Limits({ startX, startY, endX, endY });
}
