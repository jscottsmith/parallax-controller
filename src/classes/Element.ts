import bezier from 'bezier-easing';
import {
  CreateElementOptions,
  ParallaxElementConfig,
  ParallaxStartEndEffects,
  ScrollAxis,
  ValidScrollAxis,
  EasingParam,
} from '../types';
import { createId } from '../utils/createId';
import { Rect } from './Rect';
import { View } from './View';
import { Scroll } from './Scroll';
import { Limits } from './Limits';
import { parseElementTransitionEffects } from '../helpers/parseElementTransitionEffects';
import { getProgressAmount } from '../helpers/getProgressAmount';
import { isElementInView } from '../helpers/isElementInView';
import {
  resetStyles,
  setElementStyles,
  setWillChangeStyles,
} from '../helpers/elementStyles';
import { createEasingFunction } from '../helpers/createEasingFunction';
import { createLimitsForRelativeElements } from '../helpers/createLimitsForRelativeElements';
import { createLimitsWithTranslationsForRelativeElements } from '../helpers/createLimitsWithTranslationsForRelativeElements';
import { scaleTranslateEffectsForSlowerScroll } from '../helpers/scaleTranslateEffectsForSlowerScroll';
import { getShouldScaleTranslateEffects } from '../helpers/getShouldScaleTranslateEffects';
import { clamp } from '../helpers/clamp';

type ParallaxControllerConstructorOptions = {
  scrollAxis: ValidScrollAxis;
  disabledParallaxController?: boolean;
};
type ElementConstructorOptions = CreateElementOptions &
  ParallaxControllerConstructorOptions;

export class Element {
  el: HTMLElement;
  props: ParallaxElementConfig;
  scrollAxis: ValidScrollAxis;
  disabledParallaxController: boolean;
  id: number;
  effects: ParallaxStartEndEffects;
  isInView: boolean | null;
  progress: number;
  /* Optionally set if translate effect must be scaled */
  scaledEffects?: ParallaxStartEndEffects;
  rect?: Rect;
  limits?: Limits;
  easing?: bezier.EasingFunction;

  constructor(options: ElementConstructorOptions) {
    this.el = options.el;
    this.props = options.props;
    this.scrollAxis = options.scrollAxis;
    this.disabledParallaxController =
      options.disabledParallaxController || false;
    this.id = createId();
    this.effects = parseElementTransitionEffects(this.props, this.scrollAxis);
    this.isInView = null;
    this.progress = 0;

    this._setElementEasing(options.props.easing);

    setWillChangeStyles(options.el, this.effects);
  }

  updateProps(nextProps: ParallaxElementConfig) {
    this.props = { ...this.props, ...nextProps };
    this.effects = parseElementTransitionEffects(nextProps, this.scrollAxis);
    this._setElementEasing(nextProps.easing);

    return this;
  }

  setCachedAttributes(view: View, scroll: Scroll): Element {
    // NOTE: Must reset styles before getting the rect, as it might impact the natural position
    resetStyles(this);

    this.rect = new Rect({
      el: this.props.targetElement || this.el,
      rootMargin: this.props.rootMargin,
      view,
    });

    const shouldScaleTranslateEffects = getShouldScaleTranslateEffects(
      this.props,
      this.effects,
      this.scrollAxis
    );

    if (
      typeof this.props.startScroll === 'number' &&
      typeof this.props.endScroll === 'number'
    ) {
      this.limits = new Limits({
        startX: this.props.startScroll,
        startY: this.props.startScroll,
        endX: this.props.endScroll,
        endY: this.props.endScroll,
      });

      // Undo the reset -- place it back at current position with styles
      this._setElementStyles();

      return this;
    }

    if (shouldScaleTranslateEffects) {
      this.limits = createLimitsWithTranslationsForRelativeElements(
        this.rect,
        view,
        this.effects,
        scroll,
        this.scrollAxis,
        this.props.shouldAlwaysCompleteAnimation
      );

      this.scaledEffects = scaleTranslateEffectsForSlowerScroll(
        this.effects,
        this.limits
      );
    } else {
      this.limits = createLimitsForRelativeElements(
        this.rect,
        view,
        scroll,
        this.props.shouldAlwaysCompleteAnimation
      );
    }

    // Undo the reset -- place it back at current position with styles
    this._setElementStyles();

    return this;
  }

  _updateElementIsInView(nextIsInView: boolean) {
    // NOTE: Check if this is the first change to make sure onExit isn't called
    const isFirstChange = this.isInView === null;
    if (nextIsInView !== this.isInView) {
      if (nextIsInView) {
        this.props.onEnter && this.props.onEnter(this);
      } else if (!isFirstChange) {
        this._setFinalProgress();
        this._setElementStyles();
        this.props.onExit && this.props.onExit(this);
      }
    }
    this.isInView = nextIsInView;
  }

  _setFinalProgress() {
    const finalProgress = clamp(Math.round(this.progress), 0, 1);
    this._updateElementProgress(finalProgress);
  }

  _setElementStyles() {
    if (this.props.disabled || this.disabledParallaxController) return;
    const effects = this.scaledEffects || this.effects;
    setElementStyles(effects, this.progress, this.el);
  }

  _updateElementProgress(nextProgress: number) {
    this.progress = nextProgress;
    this.props.onProgressChange && this.props.onProgressChange(this.progress);
    this.props.onChange && this.props.onChange(this);
  }

  _setElementEasing(easing?: EasingParam): void {
    this.easing = createEasingFunction(easing);
  }

  updateElementOptions(options: ParallaxControllerConstructorOptions) {
    this.scrollAxis = options.scrollAxis;
    this.disabledParallaxController =
      options.disabledParallaxController || false;
  }

  updatePosition(scroll: Scroll): Element {
    if (!this.limits) return this;

    const isVertical = this.scrollAxis === ScrollAxis.vertical;
    const isFirstChange = this.isInView === null;
    // based on scroll axis
    const start = isVertical ? this.limits.startY : this.limits.startX;
    const end = isVertical ? this.limits.endY : this.limits.endX;
    const total = isVertical ? this.limits.totalY : this.limits.totalX;
    const s = isVertical ? scroll.y : scroll.x;

    // check if in view
    const nextIsInView = isElementInView(start, end, s);
    this._updateElementIsInView(nextIsInView);

    // set the progress if in view or this is the first change
    if (nextIsInView) {
      const nextProgress = getProgressAmount(start, total, s, this.easing);
      this._updateElementProgress(nextProgress);
      this._setElementStyles();
    } else if (isFirstChange) {
      // NOTE: this._updateElementProgress -- dont use this because it will trigger onChange
      this.progress = clamp(
        Math.round(getProgressAmount(start, total, s, this.easing)),
        0,
        1
      );
      this._setElementStyles();
    }

    return this;
  }
}
