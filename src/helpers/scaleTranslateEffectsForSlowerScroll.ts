import { ParsedValueEffect } from '../types';
import { TranslateMultiplier } from './getTranslateMultiplier';
import { ParallaxStartEndEffects } from '..';

export function scaleTranslateEffectsForSlowerScroll(
  effects: ParallaxStartEndEffects,
  multiplier: TranslateMultiplier
): ParallaxStartEndEffects {
  const effectsCopy = {
    ...effects,
  };

  if (effectsCopy.translateX) {
    effectsCopy.translateX = {
      ...effects.translateX,
      start: effectsCopy.translateX.start * multiplier.multiplierX,
      end: effectsCopy.translateX.end * multiplier.multiplierX,
    } as ParsedValueEffect;
  }
  if (effectsCopy.translateY) {
    effectsCopy.translateY = {
      ...effects.translateY,
      start: effectsCopy.translateY.start * multiplier.multiplierY,
      end: effectsCopy.translateY.end * multiplier.multiplierY,
    } as ParsedValueEffect;
  }

  return effectsCopy;
}
