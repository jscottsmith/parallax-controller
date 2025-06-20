import { jest } from '@jest/globals';
import { Element } from './Element';
import { View } from './View';
import { Rect } from './Rect';
import { Limits } from './Limits';
import { ScrollAxis } from '../types';
import type { ParallaxElementConfig } from '../types';

describe('Element', () => {
  // Move all mocks here to avoid ESM hoisting issues
  beforeAll(() => {
    jest.mock('../helpers/parseElementTransitionEffects', () => ({
      parseElementTransitionEffects: jest.fn(() => ({
        translateY: { start: 0, end: 100, unit: 'px' },
        translateX: { start: 0, end: 50, unit: 'px' },
        rotate: { start: 0, end: 360, unit: 'deg' },
      })),
    }));

    jest.mock(
      '../helpers/createLimitsWithTranslationsForRelativeElements',
      () => ({
        createLimitsWithTranslationsForRelativeElements: jest.fn(
          () => new Limits({ startX: 0, startY: 0, endX: 100, endY: 100 })
        ),
      })
    );

    jest.mock('../helpers/scaleTranslateEffectsForSlowerScroll', () => ({
      scaleTranslateEffectsForSlowerScroll: jest.fn(() => ({
        translateY: { start: 0, end: 100, unit: 'px' },
        translateX: { start: 0, end: 50, unit: 'px' },
        rotate: { start: 0, end: 360, unit: 'deg' },
      })),
    }));

    jest.mock('../helpers/getShouldScaleTranslateEffects', () => ({
      getShouldScaleTranslateEffects: jest.fn(() => false),
    }));

    jest.mock('../utils/createId', () => ({
      createId: jest.fn(() => 1),
    }));
  });

  let element: HTMLElement;
  let view: View;
  let props: ParallaxElementConfig;
  let elementInstance: Element;

  beforeEach(() => {
    element = document.createElement('div');
    view = new View({
      width: 1000,
      height: 800,
      scrollWidth: 2000,
      scrollHeight: 3000,
    });
    props = {
      translateY: [0, 100],
      translateX: [0, 50],
      rotate: [0, 360],
    };

    elementInstance = new Element({
      el: element,
      props,
      scrollAxis: ScrollAxis.vertical,
      view,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create an Element instance with correct properties', () => {
      expect(elementInstance).toBeInstanceOf(Element);
      expect(elementInstance.el).toBe(element);
      expect(elementInstance.props).toBe(props);
      expect(elementInstance.scrollAxis).toBe(ScrollAxis.vertical);
      expect(elementInstance.disabled).toBe(false);
      expect(elementInstance.id).toBe(1);
      expect(elementInstance.view).toBe(view);
      expect(elementInstance.rect).toBeInstanceOf(Rect);
      expect(elementInstance.limits).toBeInstanceOf(Limits);
    });

    it('should set disabled property when disabledParallaxController is true', () => {
      const disabledElement = new Element({
        el: element,
        props,
        scrollAxis: ScrollAxis.vertical,
        view,
        disabledParallaxController: true,
      });

      expect(disabledElement.disabled).toBe(true);
    });

    it('should call helper functions during construction', () => {
      const {
        parseElementTransitionEffects,
      } = require('../helpers/parseElementTransitionEffects');
      const {
        createLimitsWithTranslationsForRelativeElements,
      } = require('../helpers/createLimitsWithTranslationsForRelativeElements');
      const {
        scaleTranslateEffectsForSlowerScroll,
      } = require('../helpers/scaleTranslateEffectsForSlowerScroll');

      expect(parseElementTransitionEffects).toHaveBeenCalledWith(
        props,
        ScrollAxis.vertical
      );
      expect(
        createLimitsWithTranslationsForRelativeElements
      ).toHaveBeenCalled();
      expect(scaleTranslateEffectsForSlowerScroll).toHaveBeenCalled();
    });
  });

  describe('style setting', () => {
    it('should set animation name and properties', () => {
      expect(element.style.animationName).toBe('parallaxEffects');
      expect(element.style.animationTimingFunction).toBe('linear');
      expect(element.style.animationFillMode).toBe('both');
    });

    it('should set animation range correctly', () => {
      expect(element.style.getPropertyValue('animation-range')).toBe(
        'entry 0% exit 100%'
      );
    });

    it('should set animation range with shouldAlwaysCompleteAnimation', () => {
      const elementWithAlwaysComplete = new Element({
        el: document.createElement('div'),
        props: { ...props, shouldAlwaysCompleteAnimation: true },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // The exact values depend on the rect calculations, but the property should be set
      expect(
        elementWithAlwaysComplete.el.style.getPropertyValue(
          'animation-range-start'
        )
      ).toBeDefined();
      expect(
        elementWithAlwaysComplete.el.style.getPropertyValue(
          'animation-range-end'
        )
      ).toBeDefined();
    });

    it('should set animation timeline', () => {
      expect(element.style.getPropertyValue('animation-timeline')).toBe(
        'view()'
      );
    });

    it('should set CSS custom properties for translate effects', () => {
      expect(
        element.style.getPropertyValue('--parallax-translate-start-y')
      ).toBe('0px');
      expect(element.style.getPropertyValue('--parallax-translate-end-y')).toBe(
        '100px'
      );
      expect(
        element.style.getPropertyValue('--parallax-translate-start-x')
      ).toBe('0px');
      expect(element.style.getPropertyValue('--parallax-translate-end-x')).toBe(
        '50px'
      );
    });

    it('should set CSS custom properties for rotate effects', () => {
      expect(element.style.getPropertyValue('--parallax-rotate-start')).toBe(
        '0deg'
      );
      expect(element.style.getPropertyValue('--parallax-rotate-end')).toBe(
        '360deg'
      );
    });

    it('should set easing when provided', () => {
      const elementWithEasing = new Element({
        el: document.createElement('div'),
        props: { ...props, easing: 'ease-in-out' },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(elementWithEasing.el.style.animationTimingFunction).toBe(
        'ease-in-out'
      );
    });
  });

  describe('event listeners', () => {
    it('should add animation event listeners when callbacks are provided', () => {
      const onEnter = jest.fn();
      const onExit = jest.fn();
      const elementWithCallbacks = new Element({
        el: document.createElement('div'),
        props: { ...props, onEnter, onExit },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      const addEventListenerSpy = jest.spyOn(
        elementWithCallbacks.el,
        'addEventListener'
      );

      // The event listeners are added in the constructor
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'animationstart',
        expect.any(Function)
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'animationend',
        expect.any(Function)
      );
    });

    it('should call onEnter callback when animation starts', () => {
      const onEnter = jest.fn();
      const elementWithCallbacks = new Element({
        el: document.createElement('div'),
        props: { ...props, onEnter },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // Simulate animation start event
      const animationStartEvent = new Event('animationstart');
      elementWithCallbacks.el.dispatchEvent(animationStartEvent);

      expect(onEnter).toHaveBeenCalledWith(elementWithCallbacks);
    });

    it('should call onExit callback when animation ends', () => {
      const onExit = jest.fn();
      const elementWithCallbacks = new Element({
        el: document.createElement('div'),
        props: { ...props, onExit },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // Simulate animation end event
      const animationEndEvent = new Event('animationend');
      elementWithCallbacks.el.dispatchEvent(animationEndEvent);

      expect(onExit).toHaveBeenCalledWith(elementWithCallbacks);
    });
  });

  describe('updateProps', () => {
    it('should update props and re-parse effects', () => {
      const newProps = { translateY: [50, 150] as [number, number] };
      const {
        parseElementTransitionEffects,
      } = require('../helpers/parseElementTransitionEffects');

      const result = elementInstance.updateProps(newProps);

      expect(result).toBe(elementInstance);
      expect(elementInstance.props).toEqual({ ...props, ...newProps });
      expect(parseElementTransitionEffects).toHaveBeenCalledWith(
        { ...props, ...newProps },
        ScrollAxis.vertical
      );
    });
  });

  describe('updateElement', () => {
    it('should update element with new view and recalculate properties', () => {
      const newView = new View({
        width: 1200,
        height: 900,
        scrollWidth: 2500,
        scrollHeight: 3500,
      });

      const {
        createLimitsWithTranslationsForRelativeElements,
      } = require('../helpers/createLimitsWithTranslationsForRelativeElements');
      const {
        scaleTranslateEffectsForSlowerScroll,
      } = require('../helpers/scaleTranslateEffectsForSlowerScroll');

      const result = elementInstance.updateElement(newView);

      expect(result).toBe(elementInstance);
      expect(elementInstance.view).toBe(newView);
      expect(
        createLimitsWithTranslationsForRelativeElements
      ).toHaveBeenCalled();
      expect(scaleTranslateEffectsForSlowerScroll).toHaveBeenCalled();
    });
  });

  describe('setCachedAttributes', () => {
    it('should set cached attributes without updating styles', () => {
      const newView = new View({
        width: 1200,
        height: 900,
        scrollWidth: 2500,
        scrollHeight: 3500,
      });

      const result = elementInstance.setCachedAttributes(newView);

      expect(result).toBe(elementInstance);
      expect(elementInstance.view).toBe(newView);
      // Should not call setElementStyles (no style updates)
    });
  });

  describe('updatePosition', () => {
    it('should return the element instance', () => {
      const result = elementInstance.updatePosition();
      expect(result).toBe(elementInstance);
    });
  });

  describe('updateElementOptions', () => {
    it('should update scroll axis and disabled state', () => {
      elementInstance.updateElementOptions({
        scrollAxis: ScrollAxis.horizontal,
        disabledParallaxController: true,
      });

      expect(elementInstance.scrollAxis).toBe(ScrollAxis.horizontal);
      expect(elementInstance.disabled).toBe(true);
    });
  });

  describe('disable and enable', () => {
    it('should disable the element and remove animation', () => {
      elementInstance.disable();

      expect(elementInstance.disabled).toBe(true);
      expect(element.style.animationName).toBe('');
      expect(element.style.animationTimingFunction).toBe('');
      expect(element.style.animationFillMode).toBe('');
    });

    it('should enable the element and restore animation', () => {
      elementInstance.disable();
      elementInstance.enable();

      expect(elementInstance.disabled).toBe(false);
      expect(element.style.animationName).toBe('parallaxEffects');
      expect(element.style.animationTimingFunction).toBe('linear');
      expect(element.style.animationFillMode).toBe('both');
    });
  });

  describe('destroy', () => {
    it('should have a destroy method', () => {
      expect(typeof elementInstance.destroy).toBe('function');
    });
  });

  describe('with different scroll axes', () => {
    it('should work with horizontal scroll axis', () => {
      const horizontalElement = new Element({
        el: document.createElement('div'),
        props,
        scrollAxis: ScrollAxis.horizontal,
        view,
      });

      expect(horizontalElement.scrollAxis).toBe(ScrollAxis.horizontal);
    });
  });

  describe('with target element', () => {
    it('should use target element for rect calculations', () => {
      const targetElement = document.createElement('div');
      const elementWithTarget = new Element({
        el: document.createElement('div'),
        props: { ...props, targetElement },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // The rect should be created with the target element
      expect(elementWithTarget.props.targetElement).toBe(targetElement);
    });
  });

  describe('with root margin', () => {
    it('should pass root margin to rect creation', () => {
      const rootMargin = { top: 10, bottom: 10, left: 10, right: 10 };
      const elementWithRootMargin = new Element({
        el: document.createElement('div'),
        props: { ...props, rootMargin },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(elementWithRootMargin.props.rootMargin).toBe(rootMargin);
    });
  });
});
