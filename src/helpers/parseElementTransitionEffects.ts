import {
  type ParsedValueEffect,
  type ParallaxElementConfig,
  type ParallaxStartEndEffects,
  type AllValidUnits,
  type CSSEffect,
  ScrollAxis,
  type ValidScrollAxis,
} from '../types';
import { ValidCSSEffects } from '../constants';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';

export const PARALLAX_EFFECTS = Object.values(ValidCSSEffects);

export const MAP_EFFECT_TO_DEFAULT_UNIT: {
  [key in ValidCSSEffects]: AllValidUnits;
} = {
  speed: 'px',
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
  props: ParallaxElementConfig,
  scrollAxis: ValidScrollAxis
): ParallaxStartEndEffects {
  const parsedEffects: { [key: string]: ParsedValueEffect } = {};

  PARALLAX_EFFECTS.forEach((key: keyof typeof ValidCSSEffects) => {
    const defaultValue: AllValidUnits = MAP_EFFECT_TO_DEFAULT_UNIT[key];

    // If the provided type is a number, this must be the speed prop
    // in which case we need to construct the proper translate config
    if (typeof props?.[key] === 'number') {
      const value = props?.[key] as number;
      const startSpeed = `${(value || 0) * 10}px`;
      const endSpeed = `${(value || 0) * -10}px`;

      const startParsed = parseValueAndUnit(startSpeed);
      const endParsed = parseValueAndUnit(endSpeed);

      const speedConfig = {
        start: startParsed.value,
        end: endParsed.value,
        unit: startParsed.unit,
      };

      // Manually set translate y value
      if (scrollAxis === ScrollAxis.vertical) {
        parsedEffects.translateY = speedConfig;
      }

      // Manually set translate y value
      if (scrollAxis === ScrollAxis.horizontal) {
        parsedEffects.translateX = speedConfig;
      }
    }

    // The rest are standard effect being parsed
    if (Array.isArray(props?.[key])) {
      const value = props?.[key] as CSSEffect;

      if (typeof value[0] !== 'undefined' && typeof value[1] !== 'undefined') {
        const startParsed = parseValueAndUnit(value?.[0], defaultValue);
        const endParsed = parseValueAndUnit(value?.[1], defaultValue);

        parsedEffects[key] = {
          start: startParsed.value,
          end: endParsed.value,
          unit: startParsed.unit,
          easing: value?.[2],
        };

        if (startParsed.unit !== endParsed.unit) {
          throw new Error(
            'Must provide matching units for the min and max offset values of each axis.'
          );
        }
      }
    }
  });

  return parsedEffects;
}
