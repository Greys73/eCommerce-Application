import productPage, { img, sliderControls } from './product';
import '../../../assets/styles/elements/modal.scss';
import productImages from '../../../model/data/productImages';

export const closeBtn = document.createElement('div');

const createModal = () => {
  const modal = document.createElement('div');
  modal.className = 'product__modal-container';

  const image = img.cloneNode(true) as HTMLImageElement;
  image.className = 'modal__image';

  closeBtn.className = 'modal__close-btn';

  const controls = sliderControls.cloneNode(true) as HTMLDivElement;
  controls.className = 'modal__controls';
  const dots = [...controls.children] as HTMLDivElement[];
  dots.forEach((dot, i) => {
    if (dot.classList.contains('controls__item_selected')) {
      dot.classList.remove('controls__item_selected');
      dot.classList.add('controls__item_modal-selected');
    }
    dot.classList.add('controls__item_modal');
    dot.addEventListener('click', () => {
      image.src = productImages[i];
      dots.forEach((el) =>
        el.classList.remove('controls__item_modal-selected'),
      );
      dot.classList.add('controls__item_modal-selected');
    });
  });

  modal.append(closeBtn, image, controls);

  productPage.append(modal);
};

export default createModal;
