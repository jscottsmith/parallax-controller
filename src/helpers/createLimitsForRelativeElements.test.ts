import { Scroll, View } from '..';
import { Rect } from '../classes/Rect';
import { createElementMock } from '../testUtils/createElementMock';
import { createLimitsForRelativeElements } from './createLimitsForRelativeElements';

createElementMock(
  { offsetWidth: 100, offsetHeight: 100 },
  {
    getBoundingClientRect: () => ({
      top: 500,
      left: 200,
      bottom: 700,
      right: 900,
      width: 100,
      height: 100,
    }),
  }
);

const DEFAULT_VIEW = new View({ width: 768, height: 1024 });

const DEFAULT_RECT = new Rect({
  el: createElementMock(),
  view: new View({ width: 768, height: 1024 }),
  scroll: new Scroll(0, 0),
});

describe('createLimitsForRelativeElements', () => {
  test(`returns expected Limits based on a relative element Rect within a View`, () => {
    const rect = DEFAULT_RECT;
    const view = DEFAULT_VIEW;
    const limit = createLimitsForRelativeElements(rect, view);
    expect(limit.startX).toEqual(rect.right);
    expect(limit.startY).toEqual(rect.top);
    expect(limit.endX).toEqual(rect.right + view.width);
    expect(limit.endY).toEqual(rect.bottom + view.height);
  });
});
