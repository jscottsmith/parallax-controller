import { ValidCSSEffects } from '..';
import {
  OffsetShape,
  ParallaxElementEffectProperties,
  ParallaxStartEndEffects,
  AllValidUnits,
} from '../types';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';

export const PARALLAX_EFFECTS = Object.values(ValidCSSEffects);

export const MAP_EFFECT_TO_DEFAULT_VALUE: {
  [key in ValidCSSEffects]: AllValidUnits;
} = {
  translateX: '%',
  translateY: '%',
  rotate: 'deg',
  rotateX: 'deg',
  rotateY: 'deg',
  rotateZ: 'deg',
  scale: '',
  opacity: '',
};
/**
 * Takes a parallax element effects and parses the properties to get the start and end values and units.
 */
export function parseElementTransitionEffects(
  props: ParallaxElementEffectProperties
): ParallaxStartEndEffects {
  const parsedEffects: { [key: string]: OffsetShape[] } = {};

  PARALLAX_EFFECTS.forEach((key: keyof typeof ValidCSSEffects) => {
    if (
      // @ts-ignore
      typeof props?.[key]?.[0] !== 'undefined' &&
      // @ts-ignore
      typeof props?.[key]?.[1] !== 'undefined'
    ) {
      const defaultValue: AllValidUnits = MAP_EFFECT_TO_DEFAULT_VALUE[key];
      parsedEffects[key] = [
        // @ts-ignore
        parseValueAndUnit(props?.[key]?.[0], defaultValue),
        // @ts-ignore
        parseValueAndUnit(props?.[key]?.[1], defaultValue),
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
