import { View } from './View';
import { Bounds } from './Bounds';

const DEFAULT_RECT = {
  top: 500,
  left: 200,
  bottom: 700,
  right: 900,
  width: 700,
  height: 200,
  originTotalDistY: 300,
  originTotalDistX: 1700,
};

const DEFAULT_VIEW = new View({ width: 1000, height: 1000 });

describe('Bounds', () => {
  test(`does not adjust the bounds if shouldUpdateBoundsWithTranslate`, () => {
    const bounds = new Bounds({
      // @ts-expect-error
      rect: DEFAULT_RECT,
      view: DEFAULT_VIEW,
      shouldUpdateBoundsWithTranslate: false,
      translate: {
        translateX: {
          start: 100,
          end: -100,
          unit: 'px',
          easing: undefined,
        },
        translateY: {
          start: -100,
          end: 100,
          unit: 'px',
          easing: undefined,
        },
      },
    });

    expect(bounds.top).toBe(DEFAULT_RECT.top);
    expect(bounds.left).toBe(DEFAULT_RECT.left);
    expect(bounds.right).toBe(DEFAULT_RECT.right);
    expect(bounds.bottom).toBe(DEFAULT_RECT.bottom);
  });
});

describe.each([
  [
    {
      top: 500,
      left: 200,
      bottom: 700,
      right: 900,
      width: 700,
      height: 200,
      originTotalDistY: 300,
      originTotalDistX: 1700,
    },
    { width: 1000, height: 100 },
    {
      translateY: { start: 0, end: 0, unit: 'px', easing: undefined },
      translateX: { start: 0, end: 0, unit: 'px', easing: undefined },
    },
    {
      totalDistX: 1700,
      totalDistY: 300,
      top: 500,
      left: 200,
      bottom: 700,
      right: 900,
    },
  ],
  [
    {
      top: 0,
      left: 0,
      bottom: 200,
      right: 200,
      width: 200,
      height: 200,
      originTotalDistY: 700,
      originTotalDistX: 700,
    },
    { width: 500, height: 500 },
    {
      translateY: { start: -10, end: 10, unit: '%', easing: undefined },
      translateX: { start: 10, end: -10, unit: '%', easing: undefined },
    },
    {
      totalDistX: 740,
      totalDistY: 740,
      top: -21.21212121212121,
      left: 0,
      bottom: 221.21212121212122,
      right: 200,
    },
  ],
  [
    {
      height: 200,
      width: 200,
      left: 503.75,
      right: 703.75,
      top: 912.5,
      bottom: 1112.5,
      originTotalDistY: 875,
      originTotalDistX: 1005,
    },
    { width: 805, height: 675 },
    {
      translateY: { start: 50, end: -50, unit: '%', easing: undefined },
      translateX: { start: 0, end: 0, unit: '%', easing: undefined },
    },
    {
      totalDistX: 1005,
      totalDistY: 1075,
      top: 912.5,
      left: 503.75,
      bottom: 1112.5,
      right: 703.75,
    },
  ],
  [
    {
      height: 200,
      width: 200,
      left: 668,
      right: 868,
      top: 912.5,
      bottom: 1112.5,
      originTotalDistY: 875,
      originTotalDistX: 1224,
    },
    { width: 1024, height: 675 },
    {
      translateY: { start: 50, end: -50, unit: '%', easing: undefined },
      translateX: { start: 0, end: 0, unit: '%', easing: undefined },
    },
    {
      totalDistX: 1224,
      totalDistY: 1075,
      top: 912.5,
      left: 668,
      bottom: 1112.5,
      right: 868,
    },
  ],
  [
    {
      height: 200,
      width: 200,
      left: 156,
      right: 356,
      top: 912.5,
      bottom: 1112.5,
      originTotalDistY: 875,
      originTotalDistX: 1224,
    },
    { width: 1024, height: 675 },
    {
      translateY: { start: 0, end: 0, unit: '%', easing: undefined },
      translateX: { start: -50, end: 50, unit: '%', easing: undefined },
    },
    {
      totalDistX: 1424,
      totalDistY: 875,
      top: 912.5,
      left: 36.46875,
      bottom: 1112.5,
      right: 475.53125,
    },
  ],
  [
    {
      height: 102,
      width: 103,
      left: 802.125,
      right: 904.515625,
      top: 9516.5,
      bottom: 9618.890625,
      originTotalDistY: 915,
      originTotalDistX: 1127,
    },
    { width: 1024, height: 813 },
    {
      translateY: { start: 50, end: -50, unit: '%', easing: undefined },
      translateX: { start: 50, end: -50, unit: '%', easing: undefined },
    },
    {
      totalDistX: 1230,
      totalDistY: 1017,
      top: 9516.5,
      left: 802.125,
      bottom: 9618.890625,
      right: 904.515625,
    },
  ],
  [
    {
      height: 102,
      width: 102,
      left: 460.796875,
      right: 563.1875,
      top: 9810.890625,
      bottom: 9913.28125,
      originTotalDistY: 915,
      originTotalDistX: 1126,
    },
    { width: 1024, height: 813 },
    {
      translateY: { start: -50, end: 50, unit: '%', easing: undefined },
      translateX: { start: -50, end: 50, unit: '%', easing: undefined },
    },
    {
      totalDistX: 1228,
      totalDistY: 1017,
      top: 9753.492101014761,
      left: 404.716796875,
      bottom: 9970.679773985239,
      right: 619.267578125,
    },
  ],
  [
    {
      height: 102,
      width: 103,
      left: 802.125,
      right: 904.515625,
      top: 9516.5,
      bottom: 9618.890625,
      originTotalDistY: 915,
      originTotalDistX: 1127,
    },
    { width: 1024, height: 813 },
    {
      translateY: { start: 50, end: -50, unit: '%', easing: undefined },
      translateX: { start: 50, end: -50, unit: '%', easing: undefined },
    },
    {
      totalDistX: 1230,
      totalDistY: 1017,
      top: 9516.5,
      left: 802.125,
      bottom: 9618.890625,
      right: 904.515625,
    },
  ],
  [
    {
      height: 200,
      width: 200,
      left: 634.25,
      right: 834.25,
      top: 864.5,
      bottom: 1064.5,
      originTotalDistY: 843,
      originTotalDistX: 1179,
    },
    { width: 979, height: 643 },
    {
      translateY: { start: 85, end: -85, unit: 'px', easing: undefined },
      translateX: { start: 0, end: 0, unit: '%', easing: undefined },
    },
    {
      totalDistX: 1179,
      totalDistY: 1013,
      top: 864.5,
      left: 634.25,
      bottom: 1064.5,
      right: 834.25,
    },
  ],
  [
    {
      height: 75,
      width: 75,
      left: 813.1875,
      right: 887.8125,
      top: 927.1875,
      bottom: 1001.8125,
      originTotalDistY: 718,
      originTotalDistX: 966,
    },
    { width: 891, height: 643 },
    {
      translateY: { start: -200, end: 125, unit: 'px', easing: undefined },
      translateX: { start: 0, end: 0, unit: '%', easing: undefined },
    },
    {
      totalDistX: 966,
      totalDistY: 1043,
      top: 561.7930979643766,
      left: 813.1875,
      bottom: 1230.1840012722646,
      right: 887.8125,
    },
  ],
])('Bounds()', (rect: any, view: any, translate: any, expected) => {
  test(`returns expected bounds based on rect, offsets, and view`, () => {
    expect(
      new Bounds({
        rect,
        view,
        translate,
        shouldUpdateBoundsWithTranslate: true,
      })
    ).toEqual(expect.objectContaining(expected));
  });
});
