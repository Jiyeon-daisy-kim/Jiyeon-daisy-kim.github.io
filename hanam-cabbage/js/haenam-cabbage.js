if (typeof Swiper !== 'undefined') {
  new Swiper('.swiper', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: { enabled: true }
  });
}
const posterDialog = document.querySelector('#poster-dialog');
document.querySelector('.poster-button').addEventListener('click', () => posterDialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => posterDialog.close());
posterDialog.addEventListener('click', (event) => {
  if (event.target === posterDialog) posterDialog.close();
});
