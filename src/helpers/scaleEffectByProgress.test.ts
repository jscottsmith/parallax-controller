import { scaleEffectByProgress } from './scaleEffectByProgress';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';
import { scaleBetween } from '../utils/scaleBetween';
import { ValueShape } from '..';

const translateX: ValueShape[] = [
  parseValueAndUnit('-100px'),
  parseValueAndUnit('40px'),
];
const translateY: ValueShape[] = [
  parseValueAndUnit('-80%'),
  parseValueAndUnit('50%'),
];
const scale: ValueShape[] = [
  parseValueAndUnit(0, ''),
  parseValueAndUnit(1, ''),
];

const progress = 0.44;

test('Gets offsets based on percent in view', () => {
  expect(scaleEffectByProgress(translateX, progress)).toEqual({
    value: scaleBetween(
      progress,
      translateX[0].value,
      translateX[1].value,
      0,
      1
    ),
    unit: 'px',
  });
  expect(scaleEffectByProgress(translateY, progress)).toEqual({
    value: scaleBetween(
      progress,
      translateY[0].value,
      translateY[1].value,
      0,
      1
    ),
    unit: '%',
  });
  expect(scaleEffectByProgress(scale, progress)).toEqual({
    value: scaleBetween(progress, scale[0].value, scale[1].value, 0, 1),
    unit: '',
  });
});
