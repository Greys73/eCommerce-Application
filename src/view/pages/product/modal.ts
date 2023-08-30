import productPage, { img } from './product';
import '../../../assets/styles/elements/modal.scss';

export const closeBtn = document.createElement('div');

const createModal = () => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  productPage.append(modal);

  const back = document.createElement('div');
  back.className = 'modal__background';

  const imgCont = document.createElement('div');
  imgCont.className = 'modal__img';

  const image = img.cloneNode(true);
  imgCont.append(image);

  closeBtn.className = 'modal__close-btn';
  imgCont.append(closeBtn);
  modal.append(back, imgCont);
};

export default createModal;
