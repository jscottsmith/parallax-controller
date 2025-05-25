import { ParallaxController } from '../../src/index';

const parallaxController = new ParallaxController({ scrollAxis: 'vertical' });

console.log(parallaxController);

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
