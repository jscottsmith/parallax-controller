import { Element } from '../classes/Element';
import { ParallaxStartEndEffects } from '../types';
import { scaleEffectByPercentMoved } from './scaleEffectByPercentMoved';

/**
 * Takes a parallax element and set the styles based on the
 * offsets and percent the element has moved though the viewport.
 */
export function setParallaxStyles(
  elInner: HTMLElement,
  effects: ParallaxStartEndEffects,
  percentMoved: number
) {
  const translateX =
    effects.translateX &&
    scaleEffectByPercentMoved(effects.translateX, percentMoved);

  const translateY =
    effects.translateY &&
    scaleEffectByPercentMoved(effects.translateY, percentMoved);

  // Apply styles
  elInner.style.transform = `translate3d(${translateX?.value}${translateX?.unit}, ${translateY?.value}${translateY?.unit}, 0)`;
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
