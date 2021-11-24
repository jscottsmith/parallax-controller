import { OffsetShape, ParallaxStartEndOffsets } from '../types';
import { scaleBetween } from '../utils/scaleBetween';

/**
 * Gets the parallax X and Y offsets to be applied to an element
 * based upon the percent the element has moved in the viewport
 * and the min/max offsets
 */

type TranslateEffectShape = {
  translateX: OffsetShape;
  translateY: OffsetShape;
};

export function getTranslateEffectsByPercentMoved(
  offsets: ParallaxStartEndOffsets,
  percentMoved: number
): TranslateEffectShape {
  const { translateY, translateX, yUnit, xUnit } = offsets;

  const x = scaleBetween(
    percentMoved,
    translateX[0].value,
    translateX[1].value,
    0,
    100
  );
  const y = scaleBetween(
    percentMoved,
    translateY[0].value,
    translateY[1].value,
    0,
    100
  );

  return {
    translateX: {
      value: x,
      unit: xUnit,
    },
    translateY: {
      value: y,
      unit: yUnit,
    },
  };
}
