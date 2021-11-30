import { Element } from '../classes/Element';
import { ParallaxStartEndEffects, ValidCSSEffects } from '../types';
import { scaleEffectByProgress } from './scaleEffectByProgress';

// Exclude opacity from transforms
const TRANSFORM_EFFECTS = Object.values(ValidCSSEffects).filter(
  v => v !== 'opacity'
);

export function setElementStyles(
  elInner: HTMLElement,
  effects: ParallaxStartEndEffects,
  progress: number
) {
  const transform = getTransformStyles(effects, progress);
  const opacity = getOpacityStyles(effects, progress);
  elInner.style.transform = transform;
  elInner.style.opacity = opacity;
}

export function getOpacityStyles(
  effects: ParallaxStartEndEffects,
  progress: number
): string {
  const scaledOpacity =
    effects['opacity'] && scaleEffectByProgress(effects['opacity'], progress);

  if (
    typeof scaledOpacity === 'undefined' ||
    typeof scaledOpacity.value === 'undefined' ||
    typeof scaledOpacity.unit === 'undefined'
  ) {
    return '';
  }

  const styleStr = `${scaledOpacity.value}`;

  return styleStr;
}

export function getTransformStyles(
  effects: ParallaxStartEndEffects,
  progress: number
): string {
  const transform: string = TRANSFORM_EFFECTS.reduce((acc, key: string) => {
    const scaledEffect =
      // @ts-expect-error
      effects[key] && scaleEffectByProgress(effects[key], progress);

    if (
      typeof scaledEffect === 'undefined' ||
      typeof scaledEffect.value === 'undefined' ||
      typeof scaledEffect.unit === 'undefined'
    ) {
      return acc;
    }

    const styleStr = `${key}(${scaledEffect.value}${scaledEffect.unit})`;

    return acc + styleStr;
  }, '');

  return transform;
}

/**
 * Takes a parallax element and removes parallax offset styles.
 * @param {object} element
 */
export function resetStyles(element: Element) {
  const el = element.elInner;
  if (!el) return;
  el.style.transform = '';
}
