import { ParallaxController } from './pxc';

const parallaxController = new ParallaxController({ scrollAxis: 'vertical' });

const parallaxElements = document.querySelectorAll('.parallax');

parallaxElements.forEach((element, i) => {
  const y = 200 - i * 100;
  parallaxController.createElement({
    el: element as HTMLElement,
    props: {
      translateY: [`${y * -1}px`, `${y}px`],
    },
  });
});
