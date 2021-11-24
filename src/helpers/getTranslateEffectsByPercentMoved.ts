import { OffsetShape, ParallaxStartEndEffects } from '../types';
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
  offsets: ParallaxStartEndEffects,
  percentMoved: number
): TranslateEffectShape {
  const { translateY, translateX } = offsets;

  const x = scaleBetween(
    percentMoved,
    translateX?.[0]?.value || 0,
    translateX?.[1]?.value || 0,
    0,
    100
  );
  const y = scaleBetween(
    percentMoved,
    translateY?.[0]?.value || 0,
    translateY?.[1]?.value || 0,
    0,
    100
  );

  return {
    translateX: {
      value: x,
      unit: translateX?.[0]?.unit || 'px',
    },
    translateY: {
      value: y,
      unit: translateY?.[0]?.unit || 'px',
    },
  };
}
