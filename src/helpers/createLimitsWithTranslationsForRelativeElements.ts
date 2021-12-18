import { ParsedValueEffect } from '../types';
import { Rect } from '../classes/Rect';
import { View } from '../classes/View';
import { getStartEndValueInPx } from './getStartEndValueInPx';
import { Limits } from '../classes/Limits';

const DEFAULT_VALUE: ParsedValueEffect = {
  start: 0,
  end: 0,
  unit: '',
};

export function createLimitsWithTranslationsForRelativeElements(
  rect: Rect,
  view: View,
  translate: {
    translateY?: ParsedValueEffect;
    translateX?: ParsedValueEffect;
  }
): Limits {
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
  const multiplierY = rect.originTotalDistY / totalDistTrueY;
  const multiplierX = rect.originTotalDistX / totalDistTrueX;

  let startY = rect.top;
  let endY = rect.bottom;

  if (startYPx < 0) {
    startY = startY + startYPx * multiplierY;
  }
  if (endYPx > 0) {
    endY = endY + endYPx * multiplierY;
  }

  let startX = rect.left;
  let endX = rect.right;
  if (startXPx < 0) {
    startX = startX + startXPx * multiplierX;
  }
  if (endXPx > 0) {
    endX = endX + endXPx * multiplierX;
  }

  return new Limits({ startX, startY, endX, endY });
}
