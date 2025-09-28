import { ParallaxController } from '../../src';

const parallaxController = new ParallaxController({
  scrollAxis: 'vertical',
});

const parallaxElements = document.querySelectorAll('.parallax');

parallaxElements.forEach((element, i) => {
  const h = Math.floor(parallaxElements.length / 2);
  const n = i - h;

  parallaxController.createElement({
    el: element as HTMLElement,
    props: {
      translateX: [n * -100, n * 100],
      onEnter: (element) => {
        element.el.classList.add('active');
      },
      onExit: (element) => {
        element.el.classList.remove('active');
      },
    },
  });
});
