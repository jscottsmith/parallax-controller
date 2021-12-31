import {
  ParsedValueEffect,
  ValidCSSEffects,
  ParallaxElementConfig,
  ParallaxStartEndEffects,
  AllValidUnits,
} from '../types';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';
import { createEasingFunction } from './createEasingFunction';

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
  scaleX: '',
  scaleY: '',
  scaleZ: '',
  opacity: '',
};
/**
 * Takes a parallax element effects and parses the properties to get the start and end values and units.
 */
export function parseElementTransitionEffects(
  props: ParallaxElementConfig
): ParallaxStartEndEffects {
  const parsedEffects: { [key: string]: ParsedValueEffect } = {};

  PARALLAX_EFFECTS.forEach((key: keyof typeof ValidCSSEffects) => {
    if (
      typeof props?.[key]?.[0] !== 'undefined' &&
      typeof props?.[key]?.[1] !== 'undefined'
    ) {
      const defaultValue: AllValidUnits = MAP_EFFECT_TO_DEFAULT_VALUE[key];

      const startParsed = parseValueAndUnit(props?.[key]?.[0], defaultValue);
      const endParsed = parseValueAndUnit(props?.[key]?.[1], defaultValue);

      const easing = createEasingFunction(props?.[key]?.[2]);

      parsedEffects[key] = {
        start: startParsed.value,
        end: endParsed.value,
        unit: startParsed.unit,
        easing,
      };

      if (startParsed.unit !== endParsed.unit) {
        throw new Error(
          'Must provide matching units for the min and max offset values of each axis.'
        );
      }
    }
  });

  return parsedEffects;
}
