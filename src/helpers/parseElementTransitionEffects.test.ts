import {
  PARALLAX_EFFECTS,
  parseElementTransitionEffects,
} from './parseElementTransitionEffects';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';
import { ScaleUnits } from '..';

describe('parseElementTransitionEffects', () => {
  it('returns the offset properties to an element with defaults', () => {
    const props: {
      translateY: string[] | number[];
      translateX: string[] | number[];
    } = {
      translateY: [0, 0],
      translateX: [0, 0],
    };
    expect(parseElementTransitionEffects(props)).toEqual({
      translateY: [
        parseValueAndUnit(props.translateY[0]),
        parseValueAndUnit(props.translateY[1]),
      ],
      translateX: [
        parseValueAndUnit(props.translateX[0]),
        parseValueAndUnit(props.translateX[1]),
      ],
    });
  });

  it('adds the offset properties to an element with various units', () => {
    const props: {
      translateY: string[] | number[];
      translateX: string[] | number[];
    } = {
      translateY: ['100px', '-50px'],
      translateX: ['100%', '300%'],
    };
    expect(parseElementTransitionEffects(props)).toEqual({
      translateY: [
        parseValueAndUnit(props.translateY[0]),
        parseValueAndUnit(props.translateY[1]),
      ],
      translateX: [
        parseValueAndUnit(props.translateX[0]),
        parseValueAndUnit(props.translateX[1]),
      ],
    });
  });

  it('parses and returns all parallax effects', () => {
    const effects = PARALLAX_EFFECTS.reduce((acc: any, effect, i) => {
      acc[effect] = [`${i * 1}px`, `${i * -1}px`];
      return acc;
    }, {});

    const expectedParsedEffects = PARALLAX_EFFECTS.reduce(
      (acc: any, effect, i) => {
        acc[effect] = [
          parseValueAndUnit(`${i * 1}px`),
          parseValueAndUnit(`${i * -1}px`),
        ];
        return acc;
      },
      {}
    );

    expect(parseElementTransitionEffects(effects)).toEqual(
      expectedParsedEffects
    );
  });

  it('parses the scale properties for an element', () => {
    const scaleProps: {
      scale: number[];
    } = {
      scale: [1, 2],
    };
    expect(parseElementTransitionEffects(scaleProps)).toEqual({
      scale: [
        parseValueAndUnit(scaleProps.scale[0], ScaleUnits['']),
        parseValueAndUnit(scaleProps.scale[1], ScaleUnits['']),
      ],
    });
    const scaleXProps: {
      scaleX: number[];
    } = {
      scaleX: [1.3, 0],
    };
    expect(parseElementTransitionEffects(scaleXProps)).toEqual({
      scaleX: [
        parseValueAndUnit(scaleXProps.scaleX[0], ScaleUnits['']),
        parseValueAndUnit(scaleXProps.scaleX[1], ScaleUnits['']),
      ],
    });
    const scaleYProps: {
      scaleY: number[];
    } = {
      scaleY: [0, 1],
    };
    expect(parseElementTransitionEffects(scaleYProps)).toEqual({
      scaleY: [
        parseValueAndUnit(scaleYProps.scaleY[0], ScaleUnits['']),
        parseValueAndUnit(scaleYProps.scaleY[1], ScaleUnits['']),
      ],
    });
    const scaleZProps: {
      scaleZ: number[];
    } = {
      scaleZ: [0, 1],
    };
    expect(parseElementTransitionEffects(scaleZProps)).toEqual({
      scaleZ: [
        parseValueAndUnit(scaleZProps.scaleZ[0], ScaleUnits['']),
        parseValueAndUnit(scaleZProps.scaleZ[1], ScaleUnits['']),
      ],
    });
  });

  it('ignores and omits effects if no values are provided', () => {
    expect(parseElementTransitionEffects({})).toEqual({});
  });

  it("to throw if matching units aren't provided", () => {
    const props: {
      translateY: string[] | number[];
      translateX: string[] | number[];
    } = { translateY: ['100px', '-50%'], translateX: ['100px', '300%'] };
    expect(() => parseElementTransitionEffects(props)).toThrow();
  });
});
