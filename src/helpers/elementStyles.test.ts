import createNodeMock from '../testUtils/createNodeMock';
import { setElementStyles } from './elementStyles';
import { parseElementTransitionEffects } from './parseElementTransitionEffects';

type Offset = string | number;

function createTranslateEffects(
  x0: Offset,
  x1: Offset,
  y0: Offset,
  y1: Offset
) {
  return parseElementTransitionEffects({
    // @ts-expect-error
    translateX: [x0, x1],
    // @ts-expect-error
    translateY: [y0, y1],
  });
}

function createEffect(v1: Offset, v2: Offset, key: string) {
  const effect = parseElementTransitionEffects({
    [key]: [v1, v2],
  });
  return effect;
}

describe.each([
  [
    createNodeMock(),
    {
      ...createEffect(-33, 100, 'translateX'),
    },
    0,
    `translateX(-33%)`,
  ],
  [
    createNodeMock(),
    {
      ...createEffect(-33, 100, 'foo'),
    },
    0,
    ``,
  ],
  [
    createNodeMock(),
    {
      ...createEffect('-33px', '33px', 'translateX'),
      ...createEffect('-0px', '50px', 'translateY'),
      ...createEffect('100deg', '0deg', 'rotateX'),
    },
    50,
    `translateX(0px)translateY(25px)rotateX(50deg)`,
  ],
  [
    createNodeMock(),
    {
      ...createEffect('-33px', '33px', 'translateX'),
      ...createEffect('-0px', '50px', 'translateY'),
      ...createEffect('100deg', '0deg', 'rotateX'),
      ...createEffect('0deg', '180deg', 'rotateY'),
      ...createEffect('0deg', '360deg', 'rotateZ'),
    },
    100,
    `translateX(33px)translateY(50px)rotateX(0deg)rotateY(180deg)rotateZ(360deg)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(0, 100, 0, 0),
    100,
    `translateX(100%)translateY(0%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(0, 100, 0, 0),
    200,
    `translateX(200%)translateY(0%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(0, 100, 0, 0),
    0,
    `translateX(0%)translateY(0%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, 0, 0, 0),
    50,
    `translateX(50%)translateY(0%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, -100, 100, -100),
    0,
    `translateX(100%)translateY(100%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, -100, 100, -100),
    50,
    `translateX(0%)translateY(0%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, -100, 100, -100),
    100,
    `translateX(-100%)translateY(-100%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, -100, 100, -100),
    200,
    `translateX(-300%)translateY(-300%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, -100, 100, -100),
    -100,
    `translateX(300%)translateY(300%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects('0px', '100px', '100%', '50%'),
    0,
    `translateX(0px)translateY(100%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects('0px', '100px', '100%', '50%'),
    50,
    `translateX(50px)translateY(75%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects('-100px', '100px', '100%', '-200%'),
    50,
    `translateX(0px)translateY(-50%)`,
  ],
])('.setElementStyles(%o, %o, %n)', (elInner, offsets, percent, expected) => {
  test(`sets element styles to: ${expected}%`, () => {
    // @ts-expect-error
    setElementStyles(elInner, offsets, percent);
    expect(elInner.style.transform).toBe(expected);
  });
});
