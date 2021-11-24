import { getTranslateEffectsByPercentMoved } from './getTranslateEffectsByPercentMoved';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';
import { scaleBetween } from '../utils/scaleBetween';
import { OffsetShape } from '..';

const offset: { translateX: OffsetShape[]; translateY: OffsetShape[] } = {
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
      unit: 'px',
    },
    translateY: {
      value: scaleBetween(
        percentMoved,
        offset.translateY[0].value,
        offset.translateY[1].value,
        0,
        100
      ),
      unit: '%',
    },
  });
});
