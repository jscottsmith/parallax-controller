/**
 * Takes two values (start, end) and returns whether it is within
 * the view size based on the cached position adjusted for current scroll.
 * Only along a single dimension <--- [ --- a --- b --- ] -->
 * @param {number} start - start of scroll (x/y)
 * @param {number} end - end of scroll (x/y)
 * @param {number} viewSize - size of view (width/height)
 * @param {number} scroll - current scroll (x/y)
 * @return {boolean} isInView
 */

export function isElementInView(
  start: number,
  end: number,
  viewSize: number,
  scroll: number
): boolean {
  // adjust for cached scroll
  const startScroll = start - scroll;
  const endScroll = end - scroll;

  const startInView = startScroll <= viewSize && startScroll >= 0;
  const endInView = endScroll >= viewSize && endScroll <= viewSize * 2;
  const covering = startScroll <= 0 && endScroll >= viewSize * 2;

  const isInView = startInView || endInView || covering;

  return isInView;
}
