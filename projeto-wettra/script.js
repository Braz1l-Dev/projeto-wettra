document.addEventListener('DOMContentLoaded', () => {
  const hashCarousels = [];

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');

    if (!slides.length || !prevButton || !nextButton) {
      return;
    }

    let currentIndex = slides.findIndex((slide) => slide.classList.contains('ativo'));

    if (currentIndex < 0) {
      currentIndex = 0;
      slides[currentIndex].classList.add('ativo');
    }

    const showSlide = (nextIndex) => {
      slides[currentIndex].classList.remove('ativo');
      currentIndex = (nextIndex + slides.length) % slides.length;
      slides[currentIndex].classList.add('ativo');
    };

    prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

    window.setInterval(() => showSlide(currentIndex + 1), 5000);

    hashCarousels.push({ carousel, slides, showSlide });
  });

  const activateHashSlide = (shouldScroll = false) => {
    hashCarousels.forEach(({ carousel, slides, showSlide }) => {
      const activeHashSlide = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);

      if (activeHashSlide < 0) {
        return;
      }

      showSlide(activeHashSlide);

      if (shouldScroll) {
        const produto = carousel.closest('.produto') || carousel;
        produto.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  activateHashSlide(Boolean(window.location.hash));
  window.addEventListener('hashchange', () => activateHashSlide(true));

  const dropdown = document.querySelector('.nav-item-dropdown');
  const trigger = document.querySelector('.nav-trigger');

  if (!dropdown || !trigger) {
    return;
  }

  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    dropdown.classList.toggle('ativo');
  });

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('ativo');
    }
  });
});
