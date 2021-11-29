import bezier from 'bezier-easing';
import { Bounds } from './Bounds';
import { Rect } from './Rect';
import {
  CreateElementOptions,
  ParallaxElementEffectProperties,
  ParallaxStartEndEffects,
  ScrollAxis,
  ValidScrollAxis,
} from '../types';
import { parseElementTransitionEffects } from '../helpers/parseElementTransitionEffects';
import { isElementInView } from '../helpers/isElementInView';
import { percentMoved } from '../helpers/percentMoved';
import { setElementStyles } from '../helpers/elementStyles';
import { createId } from '../utils/createId';
import { View } from './View';
import { Scroll } from './Scroll';
import { ValidEasingPresets } from '..';
import { easingPresets } from '../constants';

type ElementConstructorOptions = CreateElementOptions & {
  scrollAxis: ValidScrollAxis;
};

export class Element {
  elInner?: HTMLElement;
  elOuter?: HTMLElement;
  props: ParallaxElementEffectProperties;
  scrollAxis: ValidScrollAxis;
  id: number;
  effects: ParallaxStartEndEffects;
  isInView: boolean | null;
  percent: number;
  rect?: Rect;
  bounds?: Bounds;
  easing?: bezier.EasingFunction;
  updatePosition: (view: View, scroll: Scroll) => Element;

  constructor(options: ElementConstructorOptions) {
    this.elInner = options.elInner;
    this.elOuter = options.elOuter;
    this.props = options.props;
    this.scrollAxis = options.scrollAxis;
    this.id = createId();
    this.effects = parseElementTransitionEffects(this.props);
    this.isInView = null;
    this.percent = 0;

    this._setElementEasing(options.props.easing);

    this.updatePosition =
      options.scrollAxis === ScrollAxis.vertical
        ? this._updatePositionVertical
        : this._updatePositionHorizontal;
  }

  updateProps(nextProps: ParallaxElementEffectProperties) {
    this.props = { ...this.props, ...nextProps };
    this.effects = parseElementTransitionEffects(nextProps);
    this._setElementEasing(nextProps.easing);
    return this;
  }

  setCachedAttributes(view: View, scroll: Scroll): Element {
    if (!this.elOuter) return this;

    this.rect = new Rect(this.elOuter, view, scroll);

    const translate = {
      translateX: this.effects.translateX,
      translateY: this.effects.translateY,
    };
    this.bounds = new Bounds(this.rect, view, translate);
    return this;
  }

  _setElementEasing(easing?: number[] | ValidEasingPresets): void {
    if (Array.isArray(easing)) {
      this.easing = bezier(easing[0], easing[1], easing[2], easing[3]);
    }
    if (
      typeof easing === 'string' &&
      typeof easingPresets[easing] !== 'undefined'
    ) {
      const params: number[] = easingPresets[easing];
      this.easing = bezier(params[0], params[1], params[2], params[3]);
    }
  }

  _updatePositionHorizontal(view: View, scroll: Scroll): Element {
    if (!this.bounds || !this.rect || !this.elInner) return this;

    this.isInView = isElementInView(
      this.bounds.left,
      this.bounds.right,
      view.width,
      scroll.x
    );

    if (!this.isInView) return this;

    this.percent = percentMoved(
      this.rect.left,
      this.rect.originTotalDistX,
      view.width,
      scroll.x,
      this.easing
    );

    setElementStyles(this.elInner, this.effects, this.percent);

    return this;
  }

  _updatePositionVertical(view: View, scroll: Scroll): Element {
    if (!this.bounds || !this.rect || !this.elInner) return this;

    this.isInView = isElementInView(
      this.bounds.top,
      this.bounds.bottom,
      view.height,
      scroll.y
    );

    if (!this.isInView) return this;

    this.percent = percentMoved(
      this.rect.top,
      this.rect.originTotalDistY,
      view.height,
      scroll.y,
      this.easing
    );

    setElementStyles(this.elInner, this.effects, this.percent);

    return this;
  }
}
