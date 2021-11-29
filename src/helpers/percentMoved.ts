import bezier from 'bezier-easing';

/**
 * Returns the percent (0 - 100) moved based on position in the viewport
 */

export function percentMoved(
  /*
   * The start value from cache
   */
  a: number,
  /*
   * total dist the element has to move to be 100% complete (view width/height + element width/height)
   */
  totalDist: number,
  /*
   * The start value from cache
   */
  size: number,
  /*
   * width/height of view
   */
  scroll: number,
  /*
   * an optional easing function to apply
   */
  easing?: bezier.EasingFunction
): number {
  // adjust cached value
  const ax = a - scroll;

  // Percent the element has moved based on current and total distance to move
  let percent = ((ax * -1 + size) / totalDist) * 100;

  // Apply bezier easing if provided
  if (easing) {
    percent = easing(percent);
  }

  return percent;
}
