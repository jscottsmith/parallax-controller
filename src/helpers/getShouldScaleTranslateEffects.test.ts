import { getShouldScaleTranslateEffects } from './getShouldScaleTranslateEffects';

describe('getShouldScaleTranslateEffects', () => {
  test(`returns false when root margin is provided`, () => {
    expect(
      getShouldScaleTranslateEffects(
        {
          rootMargin: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          },
        },
        {}
      )
    ).toEqual(false);
  });

  test(`returns true when translate x is provided`, () => {
    expect(
      getShouldScaleTranslateEffects(
        {},
        {
          translateX: {
            start: 10,
            end: 100,
            unit: 'px',
          },
        }
      )
    ).toEqual(true);
  });

  test(`returns true when translate y is provided`, () => {
    expect(
      getShouldScaleTranslateEffects(
        {},
        {
          translateY: {
            start: 10,
            end: 100,
            unit: 'px',
          },
        }
      )
    ).toEqual(true);
  });

  test(`returns true when translate x and y is provided`, () => {
    expect(
      getShouldScaleTranslateEffects(
        {},
        {
          translateX: {
            start: 10,
            end: 100,
            unit: 'px',
          },
          translateY: {
            start: 10,
            end: 100,
            unit: 'px',
          },
        }
      )
    ).toEqual(true);
  });

  test(`returns false when a target element is provided`, () => {
    expect(
      getShouldScaleTranslateEffects(
        { targetElement: document.createElement('div') },
        {}
      )
    ).toEqual(false);
  });

  test(`returns false for other effects`, () => {
    expect(
      getShouldScaleTranslateEffects(
        {},
        {
          scale: {
            start: 10,
            end: 100,
            unit: 'px',
          },
        }
      )
    ).toEqual(false);
  });
});
