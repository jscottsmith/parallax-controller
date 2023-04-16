import { Element } from '..';
import { Scroll } from '../classes/Scroll';

export function countFrom(
  start: number,
  end: number,
  callback: (i: number) => unknown
) {
  if (start > end) {
    for (let i = start; i > end; i--) {
      callback(i);
    }
  } else {
    for (let i = start; i < end; i++) {
      callback(i);
    }
  }
}

export function simulateScroll(
  startScroll: number,
  endScroll: number,
  scroll: Scroll,
  element: Element
) {
  countFrom(startScroll, endScroll, y => {
    scroll.setScroll(0, y);
    element.updatePosition(scroll);
  });
}
