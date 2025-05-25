export type EffectString = [string, string];

export type CSSEffect = EffectString;

export type ParallaxElementConfig = {
  translateX?: CSSEffect;
  translateY?: CSSEffect;
  rotate?: CSSEffect;
  rotateX?: CSSEffect;
  rotateY?: CSSEffect;
  rotateZ?: CSSEffect;
  scale?: CSSEffect;
  scaleX?: CSSEffect;
  scaleY?: CSSEffect;
  scaleZ?: CSSEffect;
  opacity?: CSSEffect;
};
