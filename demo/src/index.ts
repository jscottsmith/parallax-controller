import { ParallaxController } from './pxc';

const parallaxController = new ParallaxController({ scrollAxis: 'vertical' });

const parallaxElements = document.querySelectorAll('.parallax');

parallaxElements.forEach((element, i) => {
  const speed = 40 - i * 20;
  parallaxController.createElement({
    el: element as HTMLElement,
    props: {
      speed,
    },
  });
});

const topTest = document.querySelector('.top-test');
parallaxController.createElement({
  el: topTest as HTMLElement,
  props: {
    translateX: ['0px', '100px'],
    shouldAlwaysCompleteAnimation: true,
  },
});

const bottomTest = document.querySelector('.bottom-test');
parallaxController.createElement({
  el: bottomTest as HTMLElement,
  props: {
    translateX: ['100px', '0px'],
    shouldAlwaysCompleteAnimation: true,
  },
});
