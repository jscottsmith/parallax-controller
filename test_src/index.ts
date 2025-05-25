import { ParallaxElementConfig } from './types';

/**
 * Detects if the browser supports CSS scroll timeline animations
 * @returns {boolean} True if the browser supports CSS scroll timeline animations
 */
export function supportsScrollTimeline(): boolean {
  // Check if the browser supports the animation-timeline property
  return (
    CSS.supports('animation-timeline: scroll()') ||
    CSS.supports('animation-timeline: scroll(nearest)') ||
    CSS.supports('animation-timeline: scroll(self)') ||
    CSS.supports('animation-timeline: scroll(block)') ||
    CSS.supports('animation-timeline: scroll(inline)')
  );
}

/**
 * Tests whether a CSS keyframe animation with the given name exists
 * @param {string} name - The name of the keyframe animation to test for
 * @returns {boolean} True if the keyframe animation exists
 */
export function hasKeyframeAnimation(name: string): boolean {
  // Get all stylesheets
  const styleSheets = Array.from(document.styleSheets);

  // Check each stylesheet for the keyframe animation
  return styleSheets.some(sheet => {
    try {
      // Convert rules to array and check each rule
      const rules = Array.from(sheet.cssRules);
      return rules.some(rule => {
        // Check if the rule is a keyframe rule and matches the name
        return rule instanceof CSSKeyframesRule && rule.name === name;
      });
    } catch (e) {
      // Skip stylesheets that we can't access (e.g., cross-origin)
      return false;
    }
  });
}

export class ParallaxController {
  supportsScrollTimeline: boolean;

  constructor() {
    this.supportsScrollTimeline = supportsScrollTimeline();
    // Example usage:
    if (this.supportsScrollTimeline) {
      console.log('Scroll timeline animations are supported');
    } else {
      console.warn('Browser does not support scroll timeline animations');
    }

    if (!hasKeyframeAnimation('parallaxEffects')) {
      console.warn('Keyframe animation "parallaxEffects" does not exist');
    }
  }

  private setAnimationName(element: HTMLElement) {
    element.style.animationName = 'parallaxEffects';
    element.style.animationTimingFunction = 'linear';
    element.style.animationFillMode = 'both';
  }

  private setAnimationRange(element: HTMLElement) {
    // animation-range: entry 0% exit 100%;
    // element.style.animationRangeStart = '0%';
    element.style.setProperty('animation-range', 'entry 0% exit 100%');
  }

  private setAnimationTimeline(
    element: HTMLElement,
    config: ParallaxElementConfig
  ) {
    // if (config.translateY) {
    //   const yStart = Math.max(parseInt(config.translateY[1]), 0) * -1;
    //   const yEnd = Math.min(parseInt(config.translateY[0]), 0);
    //   element.style.setProperty(
    //     'animation-timeline',
    //     `view(block ${yStart}px ${yEnd}px)`
    //   );
    // } else {
    element.style.setProperty('animation-timeline', 'view()');
    // }
  }

  private setTranslateY(element: HTMLElement, config: ParallaxElementConfig) {
    if (config.translateY) {
      element.style.setProperty(
        '--parallax-translate-start-y',
        config.translateY[0]
      );
      element.style.setProperty(
        '--parallax-translate-end-y',
        config.translateY[1]
      );
    }
  }

  private setTranslateX(element: HTMLElement, config: ParallaxElementConfig) {
    if (config.translateX) {
      element.style.setProperty(
        '--parallax-translate-start-x',
        config.translateX[0]
      );
      element.style.setProperty(
        '--parallax-translate-end-x',
        config.translateX[1]
      );
    }
  }

  createElement(element: HTMLElement, config: ParallaxElementConfig) {
    element.classList.add('pc__el');

    this.setAnimationRange(element);
    this.setAnimationName(element);
    this.setAnimationTimeline(element, config);
    this.setTranslateY(element, config);
    this.setTranslateX(element, config);

    console.log('Element created', element, config);
  }
}
