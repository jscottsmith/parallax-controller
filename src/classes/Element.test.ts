import { Element } from './Element';
import { View } from './View';
import { Scroll } from './Scroll';
import { createElementMock } from '../testUtils/createElementMock';
import { ScrollAxis } from '../types';
import { easingPresets } from '../constants';

const DEFAULT_OPTIONS = {
  elInner: createElementMock(
    { offsetWidth: 100, offsetHeight: 100 },
    {
      getBoundingClientRect: () => ({
        top: 500,
        left: 0,
        bottom: 600,
        right: 100,
      }),
    }
  ),
  elOuter: document.createElement('div'),
  scrollAxis: ScrollAxis.vertical,
  props: { translateX: [0, 0], translateY: [0, 0] },
};

describe('Expect the Element class', () => {
  it('to construct', () => {
    const element = new Element(DEFAULT_OPTIONS);
    expect(element).toMatchObject(DEFAULT_OPTIONS);
  });

  it('to update props and return the instance', () => {
    const element = new Element(DEFAULT_OPTIONS);
    const updates = {
      disabled: true,
      translateX: [100, 100],
      translateY: [0, 0],
    };
    const instance = element.updateProps(updates);
    expect(instance.props).toMatchObject(updates);
    expect(instance).toBeInstanceOf(Element);
  });

  it.skip('to conditionally handle updates based on scroll axis', () => {});

  it('calls enter and exit and progress handlers', () => {
    const onEnter = jest.fn();
    const onExit = jest.fn();
    const onProgressChange = jest.fn();

    const element = new Element({
      ...DEFAULT_OPTIONS,
      props: {
        onEnter,
        onExit,
        onProgressChange,
        translateY: [100, -100],
      },
    });
    const view = new View({
      width: 100,
      height: 100,
      scrollContainer: createElementMock(),
    });

    const scroll = new Scroll(0, 0);
    element.setCachedAttributes(view, scroll);
    expect(onProgressChange).toBeCalledTimes(0);

    element.updatePosition(view, scroll);
    expect(onProgressChange).toBeCalledTimes(1);

    scroll.setScroll(0, 500);
    element.updatePosition(view, scroll);
    expect(onEnter).toBeCalledTimes(1);
    // expect(onProgressChange).toBeCalledWith(1);
    // expect(onProgressChange).toBeCalledTimes(2);

    scroll.setScroll(0, 499);
    element.updatePosition(view, scroll);
    expect(onExit).toBeCalledTimes(1);
    // expect(onProgressChange).toBeCalledTimes(3);
  });

  it('to set cache and return the instance', () => {
    const element = new Element(DEFAULT_OPTIONS);
    const view = new View({
      width: 100,
      height: 50,
      scrollContainer: createElementMock(),
    });
    const scroll = new Scroll(0, 40);
    const instance = element.setCachedAttributes(view, scroll);
    expect(instance).toBeInstanceOf(Element);
  });

  it('to update position and return the instance', () => {
    const element = new Element(DEFAULT_OPTIONS);
    const view = new View({
      width: 100,
      height: 50,
      scrollContainer: createElementMock(),
    });
    const scroll = new Scroll(0, 0);
    element.setCachedAttributes(view, scroll);
    scroll.setScroll(0, 100);

    const instance = element.updatePosition(view, scroll);
    expect(instance).toBeInstanceOf(Element);
  });

  it('to create an easing function when arguments are provided', () => {
    const element = new Element({
      elInner: document.createElement('div'),
      elOuter: document.createElement('div'),
      scrollAxis: ScrollAxis.vertical,
      props: {
        easing: [0, 0, 1, 0.5],
      },
    });

    expect(element.easing).toBeInstanceOf(Function);
  });

  describe('to create an easing function with valid preset:', () => {
    Object.keys(easingPresets).forEach(key => {
      test(key, () => {
        const element = new Element({
          elInner: document.createElement('div'),
          elOuter: document.createElement('div'),
          scrollAxis: ScrollAxis.vertical,
          props: {
            easing: [0, 0, 1, 0.5],
          },
        });

        expect(element.easing).toBeInstanceOf(Function);
      });
    });
  });

  it('to NOT create an easing function when arguments are omitted', () => {
    const element = new Element({
      elInner: document.createElement('div'),
      elOuter: document.createElement('div'),
      scrollAxis: ScrollAxis.vertical,
      props: {},
    });

    expect(element.easing).toBeUndefined();
  });

  it('to update easing when element props are updated', () => {
    const element = new Element({
      elInner: document.createElement('div'),
      elOuter: document.createElement('div'),
      scrollAxis: ScrollAxis.vertical,
      props: {},
    });

    expect(element.easing).toBeUndefined();

    element.updateProps({ easing: [0, 0, 1, 0.5] });

    expect(element.easing).toBeInstanceOf(Function);
  });
});
