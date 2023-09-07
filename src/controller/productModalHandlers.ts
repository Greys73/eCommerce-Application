import createModal, { closeBtn } from '../view/pages/product/modal';
import { img } from '../view/pages/product/product';

img.addEventListener('click', () => {
  createModal();
  document.body.classList.add('no-scroll');
});

closeBtn.addEventListener('click', () => {
  const modal = document.querySelectorAll('.product__modal-container');
  modal?.forEach((el) => el.remove());
  document.body.classList.remove('no-scroll');
});
