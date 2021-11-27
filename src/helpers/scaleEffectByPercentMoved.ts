import { ValueShape, AllValidUnits } from '../types';
import { scaleBetween } from '../utils/scaleBetween';

/**
 * Scales a start and end value of an effect based on percent moved
 */
export function scaleEffectByPercentMoved(
  effect: ValueShape[],
  percentMoved: number
): {
  value: number;
  unit: AllValidUnits;
} {
  const value = scaleBetween(
    percentMoved,
    effect?.[0]?.value || 0,
    effect?.[1]?.value || 0,
    0,
    100
  );

  return {
    value,
    unit: effect?.[0]?.unit,
  };
}
