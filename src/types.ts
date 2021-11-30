export type ParallaxStartEndEffects = {
  translateX?: OffsetShape[];
  translateY?: OffsetShape[];
  rotate?: RotationShape[];
  rotateX?: RotationShape[];
  rotateY?: RotationShape[];
  rotateZ?: RotationShape[];
  scale?: ScaleShape[];
  scaleX?: ScaleShape[];
  scaleY?: ScaleShape[];
  scaleZ?: ScaleShape[];
  opacity?: OffsetShape[];
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

export type OffsetShape = {
  value: number;
  unit: ValidUnits;
};

export type RotationShape = {
  value: number;
  unit: RotationUnits;
};
export type ScaleShape = {
  value: number;
  unit: ScaleUnits;
};

export type ValueShape = {
  value: number;
  unit: AllValidUnits;
};

export type ViewElement = HTMLElement | Window;
export type ParallaxControllerOptions = {
  scrollAxis?: ValidScrollAxis;
  scrollContainer?: HTMLElement;
};

export type ParallaxElementEffectProperties = {
  disabled?: boolean;
  translateX?: string[] | number[];
  translateY?: string[] | number[];
  rotate?: string[] | number[];
  rotateX?: string[] | number[];
  rotateY?: string[] | number[];
  rotateZ?: string[] | number[];
  scale?: number[];
  scaleX?: number[];
  scaleY?: number[];
  scaleZ?: number[];
  opacity?: number[];
  easing?: number[] | ValidEasingPresets;
  rootMargin?: RootMarginShape;
};

export type CreateElementOptions = {
  elInner?: HTMLElement;
  elOuter?: HTMLElement;
  props: ParallaxElementEffectProperties;
};

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
