import productPage, { img, sliderControls } from './product';
import '../../../assets/styles/elements/modal.scss';
import productImages from '../../../model/data/productImages';

export const closeBtn = document.createElement('div');

const createModal = () => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  productPage.append(modal);

  const back = document.createElement('div');
  back.className = 'modal__background';

  const imgCont = document.createElement('div');
  imgCont.className = 'modal__img';

  const image = img.cloneNode(true) as HTMLImageElement;
  imgCont.append(image);

  closeBtn.className = 'modal__close-btn';
  imgCont.append(closeBtn);
  modal.append(back, imgCont);

  const controls = sliderControls.cloneNode(true) as HTMLDivElement;
  controls.className = 'modal__controls';
  const dots = [...controls.children] as HTMLDivElement[];
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      image.src = productImages[i];
      dots.forEach((el) => el.classList.remove('controls__item_selected'));
      dot.classList.add('controls__item_selected');
    });
  });

  imgCont.append(controls);
};

export default createModal;
