import { Element } from '../classes/Element';
import { ParallaxStartEndEffects, ValidCSSEffects } from '../types';
import { scaleEffectByPercentMoved } from './scaleEffectByPercentMoved';

const PARALLAX_EFFECTS = Object.values(ValidCSSEffects);
/**
 * Takes a parallax element and set the styles based on the
 * offsets and percent the element has moved though the viewport.
 */
// export function setParallaxStyles(
//   elInner: HTMLElement,
//   effects: ParallaxStartEndEffects,
//   percentMoved: number
// ) {
//   const translateX =
//     effects.translateX &&
//     scaleEffectByPercentMoved(effects.translateX, percentMoved);

//   const translateY =
//     effects.translateY &&
//     scaleEffectByPercentMoved(effects.translateY, percentMoved);

//   // Apply styles
//   elInner.style.transform = `translate3d(${translateX?.value}${translateX?.unit}, ${translateY?.value}${translateY?.unit}, 0)`;
// }

export function setElementStyles(
  elInner: HTMLElement,
  effects: ParallaxStartEndEffects,
  percentMoved: number
) {
  const transform = getTransformStyles(effects, percentMoved);
  elInner.style.transform = transform;
}

export function getTransformStyles(
  effects: ParallaxStartEndEffects,
  percentMoved: number
): string {
  const transform: string = PARALLAX_EFFECTS.reduce((acc, key: string) => {
    const scaledEffect =
      // @ts-expect-error
      effects[key] && scaleEffectByPercentMoved(effects[key], percentMoved);

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
