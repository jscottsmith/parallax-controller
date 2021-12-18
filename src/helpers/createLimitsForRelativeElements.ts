import { Rect, View } from '..';
import { Limits } from '../classes/Limits';

export function createLimitsForRelativeElements(
  rect: Rect,
  view: View
): Limits {
  const startY = rect.top;
  const startX = rect.left;
  const endY = rect.bottom + view.height;
  const endX = rect.right + view.width;

  return new Limits({
    startX,
    startY,
    endX,
    endY,
  });
}
