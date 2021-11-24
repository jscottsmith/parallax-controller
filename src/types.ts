export type ParallaxStartEndEffects = {
  translateX?: OffsetShape[];
  translateY?: OffsetShape[];
  rotate?: OffsetShape[];
  rotateX?: OffsetShape[];
  rotateY?: OffsetShape[];
  rotateZ?: OffsetShape[];
  scale?: OffsetShape[];
  opacity?: OffsetShape[];
};

export enum Units {
  'px' = 'px',
  '%' = '%',
}

export enum ScrollAxis {
  'vertical' = 'vertical',
  'horizontal' = 'horizontal',
}

export type ValidScrollAxis = keyof typeof ScrollAxis;

export type ValidUnits = keyof typeof Units;

export type OffsetShape = {
  value: number;
  unit: ValidUnits;
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
