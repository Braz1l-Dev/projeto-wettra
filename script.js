document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  let currentIndex = slides.findIndex((slide) => slide.classList.contains('ativo'));

  if (currentIndex < 0) {
    currentIndex = 0;
  }

  const showSlide = (nextIndex) => {
    slides[currentIndex].classList.remove('ativo');
    currentIndex = (nextIndex + slides.length) % slides.length;
    slides[currentIndex].classList.add('ativo');
  };

  prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
  nextButton.addEventListener('click', () => showSlide(currentIndex + 1));
});

// ============ DROPDOWN NOSSOS PRODUTOS ============
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.nav-item-dropdown');
  const trigger = document.querySelector('.nav-trigger');

  // Abre/fecha ao clicar
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('ativo');
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('ativo');
    }
  });
});
