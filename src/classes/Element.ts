import type {
  CreateElementOptions,
  ParallaxElementConfig,
  ParallaxStartEndEffects,
  // ScrollAxis,
  ValidScrollAxis,
} from '../types';
import { createId } from '../utils/createId';
import { Rect } from './Rect';
import { View } from './View';
import { Limits } from './Limits';
import { parseTranslationProps } from '../helpers/parseElementTransitionEffects';
import { createLimitsWithTranslationsForRelativeElements } from '../helpers/createLimitsWithTranslationsForRelativeElements';
import { scaleTranslateEffectsForSlowerScroll } from '../helpers/scaleTranslateEffectsForSlowerScroll';
import { getShouldScaleTranslateEffects } from '../helpers/getShouldScaleTranslateEffects';
import { CSSVariables } from '../constants';

type ParallaxControllerConstructorOptions = {
  scrollAxis: ValidScrollAxis;
  disabledParallaxController?: boolean;
};
type ElementConstructorOptions = CreateElementOptions &
  ParallaxControllerConstructorOptions & {
    view: View;
  };

export class Element {
  el: HTMLElement;
  props: ParallaxElementConfig;
  scrollAxis: ValidScrollAxis;
  disabled: boolean;
  id: number;
  translations: ParallaxStartEndEffects;
  // isInView: boolean | null;
  // progress: number;
  view: View;
  /* Optionally set if translate effect must be scaled */
  rect!: Rect;
  limits!: Limits;
  scaledEffects!: ParallaxStartEndEffects;

  constructor(options: ElementConstructorOptions) {
    this.el = options.el;
    this.view = options.view;
    this.props = options.props;
    this.scrollAxis = options.scrollAxis;
    this.disabled = options.disabledParallaxController || false;
    this.id = createId();
    this.translations = parseTranslationProps(this.props, this.scrollAxis);
    // this.isInView = null;
    // this.progress = 0;
    this.setupTranslateEffects();
    this.setElementStyles();
    this.addAnimationEventListeners();
  }

  private setupTranslateEffects() {
    this.rect = new Rect({
      el: this.props.targetElement || this.el,
      rootMargin: this.props.rootMargin,
      view: this.view,
    });

    this.limits = createLimitsWithTranslationsForRelativeElements(
      this.rect,
      this.view,
      this.translations,
      this.scrollAxis,
      this.props.shouldAlwaysCompleteAnimation
    );

    this.scaledEffects = scaleTranslateEffectsForSlowerScroll(
      this.translations,
      this.limits
    );
  }

  private addAnimationEventListeners() {
    if (this.props.onEnter) {
      this.el.addEventListener('animationstart', () => {
        this.props.onEnter?.(this);
      });
    }

    if (this.props.onExit) {
      this.el.addEventListener('animationend', () => {
        this.props.onExit?.(this);
      });
    }
    if (this.props.onChange) {
      // todo: how to track progress of a CSS animation?
    }
  }

  private setAnimationName() {
    this.el.style.animationName = 'parallaxEffects';
    this.el.style.animationTimingFunction = 'linear';
    this.el.style.animationFillMode = 'both';
  }

  private unsetAnimationName() {
    this.el.style.animationName = '';
    this.el.style.animationTimingFunction = '';
    this.el.style.animationFillMode = '';
  }

  private setAnimationRange() {
    // animation-range: entry 0% exit 100%;
    // element.style.animationRangeStart = '0%';

    if (this.props.shouldAlwaysCompleteAnimation) {
      const topBeginsInView = this.rect.offsetTop < this.view.height;
      // const leftBeginsInView = this.rect.offsetLeft < this.view.width;
      const bottomEndsInView =
        this.rect.offsetBottom > this.view.scrollHeight - this.view.height;
      // const rightEndsInView =
      //   this.rect.right > this.view.scrollWidth - this.view.height;

      const top =
        ((this.view.height - this.rect.offsetTop) / this.view.height) * 100;
      const bottom =
        ((this.view.scrollHeight - this.rect.offsetBottom) / this.view.height) *
        100;

      if (topBeginsInView) {
        this.el.style.setProperty('animation-range-start', `entry ${top}%`);
        this.el.style.setProperty('animation-range-end', `exit 100%`);
      } else if (bottomEndsInView) {
        this.el.style.setProperty('animation-range-start', `entry 0%`);
        this.el.style.setProperty('animation-range-end', `exit ${bottom}%`);
      }
    } else {
      this.el.style.setProperty('animation-range', 'entry 0% exit 100%');
    }

    // set range based on shouldAlwaysCompleteAnimation
    // element.style.setProperty('animation-range', 'entry 0% exit 100%');
  }

  private setAnimationTimeline() {
    const shouldScaleTranslateEffects = getShouldScaleTranslateEffects(
      this.props,
      this.translations,
      this.scrollAxis
    );

    if (
      typeof this.props.startScroll === 'number' &&
      typeof this.props.endScroll === 'number'
    ) {
      // TODO: Implement timeline for start and end scroll
      // this.limits = new Limits({
      //   startX: this.props.startScroll,
      //   startY: this.props.startScroll,
      //   endX: this.props.endScroll,
      //   endY: this.props.endScroll,
      // });
      // Undo the reset -- place it back at current position with styles
      // this._setElementStyles();
    } else if (shouldScaleTranslateEffects && this.rect) {
      const yStart = Math.max(this.scaledEffects?.translateY?.end || 0, 0) * -1;
      const yEnd = Math.min(this.scaledEffects?.translateY?.start || 0, 0);
      const yUnit = this.scaledEffects?.translateY?.unit;

      this.el.style.setProperty(
        'animation-timeline',
        `view(block ${yStart}${yUnit} ${yEnd}${yUnit})`
      );
    } else {
      this.el.style.setProperty('animation-timeline', 'view()');
    }
  }

  private setTranslateY() {
    if (this.scaledEffects.translateY) {
      this.el.style.setProperty(
        CSSVariables.translateStartY,
        `${this.scaledEffects.translateY.start}${this.scaledEffects.translateY.unit}`
      );
      this.el.style.setProperty(
        CSSVariables.translateEndY,
        `${this.scaledEffects.translateY.end}${this.scaledEffects.translateY.unit}`
      );
    }
  }

  private setTranslateX() {
    if (this.translations.translateX) {
      this.el.style.setProperty(
        CSSVariables.translateStartX,
        `${this.translations.translateX.start}${this.translations.translateX.unit}`
      );
      this.el.style.setProperty(
        CSSVariables.translateEndX,
        `${this.translations.translateX.end}${this.translations.translateX.unit}`
      );
    }
  }

  private setRotate() {
    if (this.props.rotate?.length === 2) {
      this.el.style.setProperty(
        CSSVariables.rotateStart,
        `${this.props.rotate[0]}`
      );
      this.el.style.setProperty(
        CSSVariables.rotateEnd,
        `${this.props.rotate[1]}`
      );
    }
  }

  private unsetRotate() {
    this.el.style.removeProperty(CSSVariables.rotateStart);
    this.el.style.removeProperty(CSSVariables.rotateEnd);
  }

  private setEasing() {
    if (this.props.easing) {
      this.el.style.setProperty('animation-timing-function', this.props.easing);
    }
  }

  private setElementStyles() {
    this.setAnimationRange();
    this.setAnimationName();
    this.setAnimationTimeline();
    this.setTranslateY();
    this.setTranslateX();
    this.setRotate();
    this.setEasing();
  }

  private unsetElementStyles() {
    // this.unsetAnimationRange();
    this.unsetAnimationName();
    // this.unsetTranslateY();
    // this.unsetTranslateX();
    this.unsetRotate();
  }

  updateProps(nextProps: ParallaxElementConfig) {
    this.props = { ...this.props, ...nextProps };
    this.translations = parseTranslationProps(nextProps, this.scrollAxis);

    return this;
  }

  // update view?
  updateElement(view: View): Element {
    // NOTE: Must reset styles before getting the rect, as it might impact the natural position
    // resetStyles(this);
    this.view = view;

    this.setupTranslateEffects();
    this.setElementStyles();

    return this;
  }

  updateElementOptions(options: ParallaxControllerConstructorOptions) {
    this.scrollAxis = options.scrollAxis;
    this.disabled = options.disabledParallaxController || false;
  }

  disable = () => {
    this.disabled = true;
    this.unsetAnimationName();
  };

  enable = () => {
    this.disabled = false;
    this.setAnimationName();
  };

  destroy() {
    this.unsetElementStyles();
    // TODO: Implement element destruction
  }
}
