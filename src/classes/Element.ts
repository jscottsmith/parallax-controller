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
  setElementStyles,
  setWillChangeStyles,
} from '../helpers/elementStyles';
import { createEasingFunction } from '../helpers/createEasingFunction';
import { createLimitsForRelativeElements } from '../helpers/createLimitsForRelativeElements';
import { createLimitsWithTranslationsForRelativeElements } from '../helpers/createLimitsWithTranslationsForRelativeElements';
import { scaleTranslateEffectsForSlowerScroll } from '../helpers/scaleTranslateEffectsForSlowerScroll';
import { getShouldScaleTranslateEffects } from '../helpers/getShouldScaleTranslateEffects';

type ElementConstructorOptions = CreateElementOptions & {
  scrollAxis: ValidScrollAxis;
};

export class Element {
  elInner: HTMLElement;
  elOuter: HTMLElement;
  props: ParallaxElementConfig;
  scrollAxis: ValidScrollAxis;
  id: number;
  effects: ParallaxStartEndEffects;
  isInView: boolean | null;
  progress: number;
  /* Optionally set if translate effect must be scaled */
  scaledEffects?: ParallaxStartEndEffects;
  rect?: Rect;
  limits?: Limits;
  easing?: bezier.EasingFunction;

  updatePosition: (scroll: Scroll) => Element;

  constructor(options: ElementConstructorOptions) {
    this.elInner = options.elInner;
    this.elOuter = options.elOuter;
    this.props = options.props;
    this.scrollAxis = options.scrollAxis;
    this.id = createId();
    this.effects = parseElementTransitionEffects(this.props);
    this.isInView = null;
    this.progress = 0;

    this._setElementEasing(options.props.easing);

    setWillChangeStyles(options.elInner, this.effects);

    this.updatePosition =
      options.scrollAxis === ScrollAxis.vertical
        ? this._updatePositionVertical
        : this._updatePositionHorizontal;
  }

  updateProps(nextProps: ParallaxElementConfig) {
    this.props = { ...this.props, ...nextProps };
    this.effects = parseElementTransitionEffects(nextProps);
    this._setElementEasing(nextProps.easing);

    return this;
  }

  setCachedAttributes(view: View, scroll: Scroll): Element {
    this.rect = new Rect({
      el: this.props.targetElement || this.elOuter,
      rootMargin: this.props.rootMargin,
      view,
    });

    const shouldScaleTranslateEffects = getShouldScaleTranslateEffects(
      this.props,
      this.effects
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
      return this;
    }

    if (shouldScaleTranslateEffects) {
      this.limits = createLimitsWithTranslationsForRelativeElements(
        this.rect,
        view,
        this.effects,
        scroll,
        this.props.shouldStartAnimationInitialInView
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
        this.props.shouldStartAnimationInitialInView
      );
    }

    return this;
  }

  _updateElementIsInView(nextIsInView: boolean) {
    if (nextIsInView !== this.isInView) {
      if (nextIsInView) {
        this.props.onEnter && this.props.onEnter();
      } else {
        this._setFinalStylesAndProgress();
        this.props.onExit && this.props.onExit();
      }
    }
    this.isInView = nextIsInView;
  }

  _setFinalStylesAndProgress() {
    const finalProgress = Math.round(this.progress);
    this._updateElementProgress(finalProgress);
  }

  _updateElementProgress(nextProgress: number) {
    this.progress = nextProgress;
    this.props.onProgressChange && this.props.onProgressChange(this.progress);
    this.props.onChange && this.props.onChange(this);
    const effects = this.scaledEffects || this.effects;
    setElementStyles(effects, this.progress, this.elInner);
  }

  _setElementEasing(easing?: EasingParam): void {
    this.easing = createEasingFunction(easing);
  }

  _updatePositionHorizontal(scroll: Scroll): Element {
    if (!this.limits) return this;

    const nextIsInView = isElementInView(
      this.limits.startX,
      this.limits.endX,
      scroll.x
    );
    this._updateElementIsInView(nextIsInView);

    if (!nextIsInView) return this;

    const nextProgress = getProgressAmount(
      this.limits.startX,
      this.limits.totalX,
      scroll.x,
      this.easing
    );

    this._updateElementProgress(nextProgress);

    return this;
  }

  _updatePositionVertical(scroll: Scroll): Element {
    if (!this.limits) return this;

    const nextIsInView = isElementInView(
      this.limits.startY,
      this.limits.endY,
      scroll.y
    );

    this._updateElementIsInView(nextIsInView);

    if (!this.isInView) return this;

    const nextProgress = getProgressAmount(
      this.limits.startY,
      this.limits.totalY,
      scroll.y,
      this.easing
    );

    this._updateElementProgress(nextProgress);

    return this;
  }
}
