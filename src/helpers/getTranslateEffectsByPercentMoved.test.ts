import { getTranslateEffectsByPercentMoved } from './getTranslateEffectsByPercentMoved';
import { ParallaxStartEndEffects } from '../types';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';
import { scaleBetween } from '../utils/scaleBetween';

const offset: ParallaxStartEndEffects = {
  xUnit: 'px',
  yUnit: '%',
  translateX: [parseValueAndUnit('-100px'), parseValueAndUnit('40px')],
  translateY: [parseValueAndUnit('-80%'), parseValueAndUnit('50%')],
};

const percentMoved = 44;

test('Gets offsets based on percent in view', () => {
  expect(getTranslateEffectsByPercentMoved(offset, percentMoved)).toEqual({
    translateX: {
      value: scaleBetween(
        percentMoved,
        offset.translateX[0].value,
        offset.translateX[1].value,
        0,
        100
      ),
      unit: offset.xUnit,
    },
    translateY: {
      value: scaleBetween(
        percentMoved,
        offset.translateY[0].value,
        offset.translateY[1].value,
        0,
        100
      ),
      unit: offset.yUnit,
    },
  });
});
