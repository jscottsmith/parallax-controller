import type { ParsedValueEffect } from '../types';
import type { AllValidUnits } from '../types';
import { scaleBetween } from '../utils/scaleBetween';
import { createEasingFunction } from '../utils/createEasingFunction';

/**
 * Scales a start and end value of an effect based on percent moved and easing function
 */
export function scaleEffectByProgress(
  effect: ParsedValueEffect,
  progress: number
): {
  value: number;
  unit: AllValidUnits;
} {
  const easingFunction = createEasingFunction(effect.easing);
  const easedProgress = easingFunction ? easingFunction(progress) : progress;

  const value = scaleBetween(
    easedProgress,
    effect?.start || 0,
    effect?.end || 0,
    0,
    1
  );

  return {
    value,
    unit: effect?.unit,
  };
}
