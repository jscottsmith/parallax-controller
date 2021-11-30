import { getProgressAmount } from './getProgressAmount';

describe.each([
  // element // win height // scroll // percent
  [500, 600, 500, 300, 0.5],
  [500, 600, 500, 600, 1],
  [500, 600, 500, 0, 0],
  [500, 600, 500, 150, 0.25],
  [500, 600, 500, 450, 0.75],
  [500, 600, 500, 1200, 2],
  [500, 600, 500, -600, -1],
])(
  'getProgressAmount(%i, %i, %i, %i)',
  (a, totalDist, size, scroll, expected) => {
    test(`returns ${expected}%`, () => {
      expect(getProgressAmount(a, totalDist, size, scroll)).toBe(expected);
    });
  }
);
