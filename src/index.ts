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

export type ParallaxStartEndOffsets = {
  xUnit: ValidUnits;
  yUnit: ValidUnits;
  translateX: OffsetShape[];
  translateY: OffsetShape[];
};

export enum Units {
  'px' = 'px',
  '%' = '%',
}

export enum ScrollAxis {
  'vertical' = 'vertical',
  'horizontal' = 'horizontal',
}

export type ValidScrollAxis = keyof typeof ScrollAxis;

export type ValidUnits = keyof typeof Units;

export type OffsetShape = {
  value: number;
  unit: ValidUnits;
};

export type ViewElement = HTMLElement | Window;
export type ParallaxControllerOptions = {
  scrollAxis?: ValidScrollAxis;
  scrollContainer?: HTMLElement;
};

export type ParallaxElementProperties = {
  disabled?: boolean;
  translateX: string[] | number[];
  translateY: string[] | number[];
};

export type CreateElementOptions = {
  elInner?: HTMLElement;
  elOuter?: HTMLElement;
  props: ParallaxElementProperties;
};
