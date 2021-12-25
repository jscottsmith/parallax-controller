import { ParsedValueEffect } from '../types';
import { Rect } from '../classes/Rect';
import { View } from '../classes/View';
import { Limits } from '../classes/Limits';
import { Scroll } from '../classes/Scroll';

import { getTranslateScalar } from './getTranslateScalar';
import { getStartEndValueInPx } from './getStartEndValueInPx';
import { ParallaxStartEndEffects } from '../types';

const DEFAULT_VALUE: ParsedValueEffect = {
  start: 0,
  end: 0,
  unit: '',
};

export function createLimitsWithTranslationsForRelativeElements(
  rect: Rect,
  view: View,
  effects: ParallaxStartEndEffects,
  scroll: Scroll,
  shouldStartAnimationInitialInView?: boolean
): Limits {
  // get start and end accounting for percent effects
  const translateX: ParsedValueEffect = effects.translateX || DEFAULT_VALUE;
  const translateY: ParsedValueEffect = effects.translateY || DEFAULT_VALUE;

  const {
    start: startTranslateXPx,
    end: endTranslateXPx,
  } = getStartEndValueInPx(translateX, rect.width);
  const {
    start: startTranslateYPx,
    end: endTranslateYPx,
  } = getStartEndValueInPx(translateY, rect.height);

  // default starting values
  let startY = rect.top - view.height;
  let startX = rect.left - view.width;
  let endY = rect.bottom;
  let endX = rect.right;

  // let multiplierY = 1;
  // if (scrollAxis === ScrollAxis.vertical) {
  let startMultiplierY = getTranslateScalar(
    startTranslateYPx,
    endTranslateYPx,
    view.height + rect.height
  );
  let endMultiplierY = startMultiplierY;
  // }
  // let multiplierX = 1;
  // if (scrollAxis === ScrollAxis.horizontal) {
  let startMultiplierX = getTranslateScalar(
    startTranslateXPx,
    endTranslateXPx,
    view.width + rect.width
  );
  let endMultiplierX = startMultiplierX;
  // }

  // Apply the scale to initial values
  if (startTranslateYPx < 0) {
    startY = startY + startTranslateYPx * startMultiplierY;
  }
  if (endTranslateYPx > 0) {
    endY = endY + endTranslateYPx * endMultiplierY;
  }
  if (startTranslateXPx < 0) {
    startX = startX + startTranslateXPx * startMultiplierX;
  }
  if (endTranslateXPx > 0) {
    endX = endX + endTranslateXPx * endMultiplierX;
  }

  // add scroll
  startX += scroll.x;
  endX += scroll.x;
  startY += scroll.y;
  endY += scroll.y;

  if (shouldStartAnimationInitialInView) {
    if (scroll.y + rect.top < view.height) {
      startY = 0;
      endY = rect.bottom + scroll.y;
      const totalDist = endY - startY;
      // no multiplier for start value since this is initially in view
      startMultiplierY = 1;
      endMultiplierY = getTranslateScalar(
        startTranslateYPx,
        endTranslateYPx,
        totalDist
      );
      // Apply the scale to end initial values
      if (endTranslateYPx > 0) {
        endY = endY + endTranslateYPx * endMultiplierY;
      }
    }
    if (scroll.x + rect.left < view.width) {
      startX = 0;
      endX = rect.right + scroll.x;
      const totalDist = endX - startX;
      // no multiplier for start value since this is initially in view
      startMultiplierX = 1;
      endMultiplierX = getTranslateScalar(
        startTranslateXPx,
        endTranslateXPx,
        totalDist
      );
      // Apply the scale to end initial values
      if (endTranslateXPx > 0) {
        endX = endX + endTranslateXPx * endMultiplierX;
      }
    }
  }

  const limits = new Limits({
    startX,
    startY,
    endX,
    endY,
    startMultiplierX,
    endMultiplierX,
    startMultiplierY,
    endMultiplierY,
  });

  return limits;
}
