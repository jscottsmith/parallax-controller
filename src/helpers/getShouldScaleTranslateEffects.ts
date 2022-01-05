import { ParallaxElementConfig, ParallaxStartEndEffects } from '../types';

export function getShouldScaleTranslateEffects(
  props: ParallaxElementConfig,
  effects: ParallaxStartEndEffects
): boolean {
  if (props.rootMargin || props.targetElement) {
    return false;
  }

  if (!!effects.translateX || !!effects.translateY) {
    return true;
  }

  return false;
}
