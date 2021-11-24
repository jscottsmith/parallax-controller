import { scaleEffectByPercentMoved } from './scaleEffectByPercentMoved';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';
import { scaleBetween } from '../utils/scaleBetween';
import { OffsetShape } from '..';

const translateX: OffsetShape[] = [
  parseValueAndUnit('-100px'),
  parseValueAndUnit('40px'),
];
const translateY: OffsetShape[] = [
  parseValueAndUnit('-80%'),
  parseValueAndUnit('50%'),
];

const percentMoved = 44;

test('Gets offsets based on percent in view', () => {
  expect(scaleEffectByPercentMoved(translateX, percentMoved)).toEqual({
    value: scaleBetween(
      percentMoved,
      translateX[0].value,
      translateX[1].value,
      0,
      100
    ),
    unit: 'px',
  });
  expect(scaleEffectByPercentMoved(translateY, percentMoved)).toEqual({
    value: scaleBetween(
      percentMoved,
      translateY[0].value,
      translateY[1].value,
      0,
      100
    ),
    unit: '%',
  });
});
