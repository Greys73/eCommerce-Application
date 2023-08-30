import createModal, { closeBtn } from '../view/pages/product/modal';
import { img } from '../view/pages/product/product';

img.addEventListener('click', () => {
  createModal();
  document.body.classList.add('no-scroll');
});

closeBtn.addEventListener('click', () => {
  const modal = closeBtn.closest('.modal');
  modal?.remove();
  document.body.classList.remove('no-scroll');
});
