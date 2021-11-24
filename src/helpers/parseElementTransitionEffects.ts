import {
  OffsetShape,
  ParallaxElementEffectProperties,
  ParallaxStartEndEffects,
} from '../types';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';

export const PARALLAX_EFFECTS = [
  'translateX',
  'translateY',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'opacity',
];
/**
 * Takes a parallax element effects and parses the properties to get the start and end values and units.
 */
export function parseElementTransitionEffects(
  props: ParallaxElementEffectProperties
): ParallaxStartEndEffects {
  const parsedEffects: { [key: string]: OffsetShape[] } = {};

  PARALLAX_EFFECTS.forEach((key: string) => {
    if (
      // @ts-ignore
      typeof props?.[key]?.[0] !== 'undefined' &&
      // @ts-ignore
      typeof props?.[key]?.[1] !== 'undefined'
    ) {
      parsedEffects[key] = [
        // @ts-ignore
        parseValueAndUnit(props?.[key]?.[0]),
        // @ts-ignore
        parseValueAndUnit(props?.[key]?.[1]),
      ];

      if (parsedEffects[key][0].unit !== parsedEffects[key][1].unit) {
        throw new Error(
          'Must provide matching units for the min and max offset values of each axis.'
        );
      }
    }
  });

  return parsedEffects;
}
