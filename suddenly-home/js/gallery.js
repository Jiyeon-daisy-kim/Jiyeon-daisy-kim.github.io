if (typeof Swiper !== 'undefined') {
  new Swiper('.swiper', {
    loop: true,
    speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300,
    keyboard: { enabled: true, onlyInViewport: true },
    navigation: { nextEl: '.gallery-next', prevEl: '.gallery-prev' },
    pagination: { el: '.gallery-count', type: 'fraction' },
    a11y: { enabled: true, prevSlideMessage: 'Previous still', nextSlideMessage: 'Next still', slideLabelMessage: 'Still {{index}} of {{slidesLength}}' }
  });
} else {
  const gallery = document.querySelector('.swiper-wrapper');
  const count = document.querySelector('.gallery-count');
  document.querySelector('.gallery-prev').onclick = () => gallery.scrollBy({ left: -gallery.clientWidth });
  document.querySelector('.gallery-next').onclick = () => gallery.scrollBy({ left: gallery.clientWidth });
  gallery.addEventListener('scroll', () => { count.textContent = `${Math.round(gallery.scrollLeft / gallery.clientWidth) + 1} / 5`; });
}
