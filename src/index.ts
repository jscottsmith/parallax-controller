import { Bounds } from './classes/Bounds';
import { Element } from './classes/Element';
import { ParallaxController } from './classes/ParallaxController';
import { Rect } from './classes/Rect';
import { Scroll } from './classes/Scroll';
import { View } from './classes/View';

import { setElementStyles, resetStyles } from './helpers/elementStyles';
import { parseElementTransitionEffects } from './helpers/parseElementTransitionEffects';
import { scaleEffectByPercentMoved } from './helpers/scaleEffectByPercentMoved';
import { isElementInView } from './helpers/isElementInView';
import { percentMoved } from './helpers/percentMoved';

import { createId } from './utils/createId';
import { parseValueAndUnit } from './utils/parseValueAndUnit';
import { scaleBetween } from './utils/scaleBetween';
import { testForPassiveScroll } from './utils/testForPassiveScroll';

export * from './types';

export {
  Bounds,
  Element,
  ParallaxController,
  Rect,
  Scroll,
  View,
  setElementStyles,
  resetStyles,
  parseElementTransitionEffects,
  scaleEffectByPercentMoved,
  isElementInView,
  percentMoved,
  createId,
  parseValueAndUnit,
  scaleBetween,
  testForPassiveScroll,
};
