import { View } from '../classes/View';
import { Rect } from '../classes/Rect';
import { ParsedValueEffect } from '../types';
import { getStartEndValueInPx } from './getStartEndValueInPx';
import { ParallaxStartEndEffects, ScrollAxis, ValidScrollAxis } from '..';

const DEFAULT_VALUE: ParsedValueEffect = {
  start: 0,
  end: 0,
  unit: '',
};

export type TranslateMultiplier = {
  multiplierX: number;
  multiplierY: number;
};

export function getTranslateMultiplier(
  rect: Rect,
  view: View,
  effects: ParallaxStartEndEffects,
  scrollAxis: ValidScrollAxis
): TranslateMultiplier {
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

  const totalAbsOffY = Math.abs(startYPx) + Math.abs(endYPx);
  //   const totalDistY = view.height + rect.height + totalAbsOffY;
  const totalDistTrueY =
    view.height +
    rect.height +
    (endYPx > startYPx ? totalAbsOffY * -1 : totalAbsOffY);

  const totalAbsOffX = Math.abs(startXPx) + Math.abs(endXPx);
  //   const totalDistX = view.width + rect.width + totalAbsOffX;
  const totalDistTrueX =
    view.width +
    rect.width +
    (endXPx > startXPx ? totalAbsOffX * -1 : totalAbsOffX);

  // const speed = totalDistTrueY / originTotalDistY;
  let multiplierY = 1;
  if (scrollAxis === ScrollAxis.vertical) {
    multiplierY = rect.originTotalDistY / totalDistTrueY;
  }
  let multiplierX = 1;
  if (scrollAxis === ScrollAxis.horizontal) {
    multiplierX = rect.originTotalDistX / totalDistTrueX;
  }

  return { multiplierX, multiplierY };
}
