export type ParallaxStartEndEffects = {
  translateX?: OffsetShape[];
  translateY?: OffsetShape[];
  rotate?: RotationShape[];
  rotateX?: RotationShape[];
  rotateY?: RotationShape[];
  rotateZ?: RotationShape[];
  scale?: OffsetShape[];
  opacity?: OffsetShape[];
};

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

export type ValidRotationUnits = keyof typeof Units;

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
  scale?: string[] | number[];
  opacity?: number[];
};

export type CreateElementOptions = {
  elInner?: HTMLElement;
  elOuter?: HTMLElement;
  props: ParallaxElementEffectProperties;
};
