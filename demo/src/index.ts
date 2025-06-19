import { ParallaxController } from './pxc';

const parallaxController = new ParallaxController({ scrollAxis: 'vertical' });

const parallaxElements = document.querySelectorAll('.parallax');

parallaxElements.forEach((element, i) => {
  const speed = (40 / (parallaxElements.length - 1)) * i - 20;
  parallaxController.createElement({
    el: element as HTMLElement,
    props: {
      speed,
      onEnter: (element) => {
        element.el.classList.add('active');
      },
      onExit: (element) => {
        element.el.classList.remove('active');
      },
      // rotate: ['0deg', '180deg'],
      // easing: 'cubic-bezier(1.000, -0.005, 1.000, 0.035)',
    },
  });
});

const disableButton = document.querySelector('#disable');
disableButton?.addEventListener('click', () => {
  if (parallaxController.disabled) {
    parallaxController.enable();
    disableButton.textContent = 'Disable';
  } else {
    parallaxController.disable();
    disableButton.textContent = 'Enable';
  }
});

// const topTest = document.querySelector('.top-test');
// parallaxController.createElement({
//   el: topTest as HTMLElement,
//   props: {
//     translateX: ['0px', '100px'],
//     shouldAlwaysCompleteAnimation: true,
//   },
// });

// const bottomTest = document.querySelector('.bottom-test');
// parallaxController.createElement({
//   el: bottomTest as HTMLElement,
//   props: {
//     translateX: ['100px', '0px'],
//     shouldAlwaysCompleteAnimation: true,
//   },
// });
