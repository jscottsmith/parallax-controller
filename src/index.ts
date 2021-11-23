import { Bounds } from './classes/Bounds';
import { Element } from './classes/Element';
import { ParallaxController } from './classes/ParallaxController';
import { Rect } from './classes/Rect';
import { Scroll } from './classes/Scroll';
import { View } from './classes/View';

import { setParallaxStyles, resetStyles } from './helpers/elementStyles';
import { getOffsets } from './helpers/getOffsets';
import { getParallaxOffsets } from './helpers/getParallaxOffsets';
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
  setParallaxStyles,
  resetStyles,
  getOffsets,
  getParallaxOffsets,
  isElementInView,
  percentMoved,
  createId,
  parseValueAndUnit,
  scaleBetween,
  testForPassiveScroll,
};
