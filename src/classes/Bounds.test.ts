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
  test(`sets bounds based on root margin when provided`, () => {
    const bounds = new Bounds({
      rect: DEFAULT_RECT,
      view: DEFAULT_VIEW,
      translate: {
        translateX: undefined,
        translateY: undefined,
      },
      rootMargin: {
        top: 10,
        left: 20,
        right: 30,
        bottom: 40,
      },
    });

    expect(bounds.top).toBe(490);
    expect(bounds.left).toBe(180);
    expect(bounds.right).toBe(930);
    expect(bounds.bottom).toBe(740);
  });

  test(`does not adjust the bounds if translate values are not provided`, () => {
    const bounds = new Bounds({
      rect: DEFAULT_RECT,
      view: DEFAULT_VIEW,
      translate: {
        translateX: undefined,
        translateY: undefined,
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
      translateY: [
        { value: 0, unit: 'px' },
        { value: 0, unit: 'px' },
      ],
      translateX: [
        { value: 0, unit: 'px' },
        { value: 0, unit: 'px' },
      ],
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
      translateY: [
        { value: -10, unit: '%' },
        { value: 10, unit: '%' },
      ],
      translateX: [
        { value: 10, unit: '%' },
        { value: -10, unit: '%' },
      ],
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
      translateY: [
        { value: 50, unit: '%' },
        { value: -50, unit: '%' },
      ],
      translateX: [
        { value: 0, unit: '%' },
        { value: 0, unit: '%' },
      ],
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
      translateY: [
        { value: 50, unit: '%' },
        { value: -50, unit: '%' },
      ],
      translateX: [
        { value: 0, unit: '%' },
        { value: 0, unit: '%' },
      ],
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
      translateY: [
        { value: 0, unit: '%' },
        { value: 0, unit: '%' },
      ],
      translateX: [
        { value: -50, unit: '%' },
        { value: 50, unit: '%' },
      ],
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
      translateY: [
        { value: 50, unit: '%' },
        { value: -50, unit: '%' },
      ],
      translateX: [
        { value: 50, unit: '%' },
        { value: -50, unit: '%' },
      ],
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
      translateY: [
        { value: -50, unit: '%' },
        { value: 50, unit: '%' },
      ],
      translateX: [
        { value: -50, unit: '%' },
        { value: 50, unit: '%' },
      ],
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
      translateY: [
        { value: 50, unit: '%' },
        { value: -50, unit: '%' },
      ],
      translateX: [
        { value: 50, unit: '%' },
        { value: -50, unit: '%' },
      ],
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
      translateY: [
        { value: 85, unit: 'px' },
        { value: -85, unit: 'px' },
      ],
      translateX: [
        { value: 0, unit: '%' },
        { value: 0, unit: '%' },
      ],
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
      translateY: [
        { value: -200, unit: 'px' },
        { value: 125, unit: 'px' },
      ],
      translateX: [
        { value: 0, unit: '%' },
        { value: 0, unit: '%' },
      ],
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
    expect(new Bounds({ rect, view, translate })).toEqual(
      expect.objectContaining(expected)
    );
  });
});
