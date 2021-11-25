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

    this.updatePosition =
      options.scrollAxis === ScrollAxis.vertical
        ? this._updatePositionVertical
        : this._updatePositionHorizontal;
  }

  updateProps(nextProps: ParallaxElementEffectProperties) {
    this.props = { ...this.props, ...nextProps };
    this.effects = parseElementTransitionEffects(nextProps);
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
      scroll.x
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
      scroll.y
    );

    setElementStyles(this.elInner, this.effects, this.percent);

    return this;
  }
}
