import { EasingFunction } from 'bezier-easing';

export type ParallaxStartEndEffects = {
  translateX?: ParsedValueEffect;
  translateY?: ParsedValueEffect;
  rotate?: ParsedValueEffect;
  rotateX?: ParsedValueEffect;
  rotateY?: ParsedValueEffect;
  rotateZ?: ParsedValueEffect;
  scale?: ParsedValueEffect;
  scaleX?: ParsedValueEffect;
  scaleY?: ParsedValueEffect;
  scaleZ?: ParsedValueEffect;
  opacity?: ParsedValueEffect;
};

export enum ValidCSSEffects {
  'translateX' = 'translateX',
  'translateY' = 'translateY',
  'rotate' = 'rotate',
  'rotateX' = 'rotateX',
  'rotateY' = 'rotateY',
  'rotateZ' = 'rotateZ',
  'scale' = 'scale',
  'scaleX' = 'scaleX',
  'scaleY' = 'scaleY',
  'scaleZ' = 'scaleZ',
  'opacity' = 'opacity',
}

export enum Units {
  'px' = 'px',
  '%' = '%',
}
export type ValidUnits = keyof typeof Units;

export enum RotationUnits {
  'deg' = 'deg',
  'turn' = 'turn',
  'rad' = 'rad',
}

export enum ScaleUnits {
  '' = '',
}

export type ValidScaleUnits = keyof typeof ScaleUnits;

export type ValidRotationUnits = keyof typeof RotationUnits;

export type AllValidUnits = ValidUnits | ValidRotationUnits | ValidScaleUnits;

export enum ScrollAxis {
  'vertical' = 'vertical',
  'horizontal' = 'horizontal',
}

export type ValidScrollAxis = keyof typeof ScrollAxis;

export type ParsedValueShape = {
  value: number;
  unit: AllValidUnits;
};

export type ParsedValueEffect = {
  start: number;
  end: number;
  unit: AllValidUnits;
  easing?: EasingFunction;
};

export type ViewElement = HTMLElement | Window;
export type ParallaxControllerOptions = {
  scrollAxis?: ValidScrollAxis;
  scrollContainer?: HTMLElement;
};

export type EasingParam = ValidEasingPresets | EasingParams;
export type CSSEffect = [string | number, string | number, EasingParam?];
export type ScaleOpacityEffect = [number, number, EasingParam?];

export type ParallaxElementEffectProperties = {
  disabled?: boolean;
  translateX?: CSSEffect;
  translateY?: CSSEffect;
  rotate?: CSSEffect;
  rotateX?: CSSEffect;
  rotateY?: CSSEffect;
  rotateZ?: CSSEffect;
  scale?: ScaleOpacityEffect;
  scaleX?: ScaleOpacityEffect;
  scaleY?: ScaleOpacityEffect;
  scaleZ?: ScaleOpacityEffect;
  opacity?: ScaleOpacityEffect;
  easing?: EasingParams | ValidEasingPresets;
  rootMargin?: RootMarginShape;
  /* Start animation at initial position if the element is positioned inside the view when scroll is at zero */
  shouldStartAnimationInitialInView?: boolean;

  onEnter?: () => void;
  onExit?: () => void;
  onProgressChange?: (progress: number) => any;
};

export type CreateElementOptions = {
  elInner: HTMLElement;
  elOuter: HTMLElement;
  props: ParallaxElementEffectProperties;
};

export type EasingParams = [number, number, number, number];
export type ValidEasingPresets =
  | 'ease'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'easeInQuad'
  | 'easeInCubic'
  | 'easeInQuart'
  | 'easeInQuint'
  | 'easeInSine'
  | 'easeInExpo'
  | 'easeInCirc'
  | 'easeOutQuad'
  | 'easeOutCubic'
  | 'easeOutQuart'
  | 'easeOutQuint'
  | 'easeOutSine'
  | 'easeOutExpo'
  | 'easeOutCirc'
  | 'easeInOutQuad'
  | 'easeInOutCubic'
  | 'easeInOutQuart'
  | 'easeInOutQuint'
  | 'easeInOutSine'
  | 'easeInOutExpo'
  | 'easeInOutCirc'
  | 'easeInBack'
  | 'easeOutBack'
  | 'easeInOutBack';

export type RootMarginShape = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
