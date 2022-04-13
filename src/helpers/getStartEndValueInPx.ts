import { ParsedValueEffect } from '..';

/**
 * Return the start and end pixel values for an elements translations
 */
export function getStartEndValueInPx(
  translate: ParsedValueEffect,
  elementSize: number
) {
  let { start, end, unit } = translate;

  if (unit === '%') {
    const scale = elementSize / 100;
    start = start * scale;
    end = end * scale;
  }

  if (unit === 'vw') {
    const startScale = Math.abs(window.innerWidth * (start / 100));
    const endScale = Math.abs(window.innerWidth * (end / 100));
    start = start * startScale;
    end = end * endScale;
  }

  if (unit === 'vh') {
    const startScale = Math.abs(window.innerHeight * (start / 100));
    const endScale = Math.abs(window.innerHeight * (end / 100));
    start = start * startScale;
    end = end * endScale;
  }

  return {
    start,
    end,
  };
}
