import { easingPresets } from '../constants';
import type { ValidEasingPresets, EasingParams } from '../types';

/**
 * Creates an easing function from a string preset or cubic bezier parameters
 */
export function createEasingFunction(
  easing?: string | EasingParams
): ((progress: number) => number) | undefined {
  if (!easing) return undefined;

  // If it's an array, treat as cubic bezier parameters
  if (Array.isArray(easing)) {
    const [p1, p2, p3, p4] = easing as EasingParams;
    return (t: number) => {
      // Cubic bezier implementation
      const t2 = t * t;
      const t3 = t2 * t;
      const mt = 1 - t;
      const mt2 = mt * mt;
      const mt3 = mt2 * mt;

      return mt3 * 0 + 3 * mt2 * t * p1 + 3 * mt * t2 * p3 + t3 * 1;
    };
  }

  // If it's a string, check if it's a valid preset
  if (typeof easing === 'string') {
    const preset = easingPresets[easing as ValidEasingPresets];
    if (preset) {
      const [p1, p2, p3, p4] = preset;
      return (t: number) => {
        // Cubic bezier implementation
        const t2 = t * t;
        const t3 = t2 * t;
        const mt = 1 - t;
        const mt2 = mt * mt;
        const mt3 = mt2 * mt;

        return mt3 * 0 + 3 * mt2 * t * p1 + 3 * mt * t2 * p3 + t3 * 1;
      };
    }
  }

  // Return undefined if easing is not recognized
  return undefined;
}
