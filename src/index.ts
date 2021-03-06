import { Limits } from './classes/Limits';
import { Element } from './classes/Element';
import { ParallaxController } from './classes/ParallaxController';
import { Rect } from './classes/Rect';
import { Scroll } from './classes/Scroll';
import { View } from './classes/View';

import { setElementStyles, resetStyles } from './helpers/elementStyles';
import { parseElementTransitionEffects } from './helpers/parseElementTransitionEffects';
import { scaleEffectByProgress } from './helpers/scaleEffectByProgress';
import { isElementInView } from './helpers/isElementInView';
import { getProgressAmount } from './helpers/getProgressAmount';

import { createId } from './utils/createId';
import { parseValueAndUnit } from './utils/parseValueAndUnit';
import { scaleBetween } from './utils/scaleBetween';
import { testForPassiveScroll } from './utils/testForPassiveScroll';

export * from './types';

export {
  Limits,
  Element,
  ParallaxController,
  Rect,
  Scroll,
  View,
  setElementStyles,
  resetStyles,
  parseElementTransitionEffects,
  scaleEffectByProgress,
  isElementInView,
  getProgressAmount,
  createId,
  parseValueAndUnit,
  scaleBetween,
  testForPassiveScroll,
};
