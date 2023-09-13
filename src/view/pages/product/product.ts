import {
  addToCart,
  createCart,
  getActiveCart,
  queryCarts,
} from '../../../model/api/cartApiRoot';

// heading
const name = document.createElement('h2');
name.className = 'product__name';

// price
const priceCont = document.createElement('div');
priceCont.className = 'product__price';

const discountCont = document.createElement('div');
discountCont.className = 'price__base-block';

const basePrice = document.createElement('div');
basePrice.classList.add('price__base');

const discount = document.createElement('div');
discount.classList.add('price__discont');

const currentPrice = document.createElement('div');
currentPrice.className = 'price__curent';

discountCont.append(basePrice, discount);
priceCont.append(currentPrice, discountCont);

// image
const imgSlider = document.createElement('div');
imgSlider.className = 'product__image';

const imgCont = document.createElement('div');
imgCont.className = 'image__image-block';

const img = document.createElement('img');
img.className = 'image-block__picture';
imgCont.append(img);

const sliderControls = document.createElement('div');
sliderControls.className = 'image__controls';

imgSlider.append(imgCont, sliderControls);

// variants
const variants = document.createElement('div');
variants.className = 'product__variants';
variants.textContent = 'Variants:';

const variantsBlock = document.createElement('div');
variantsBlock.className = 'variants__variants-block';

variants.append(variantsBlock);

// basket button

const buttonBlock = document.createElement('div');
buttonBlock.classList.add('product__buttons');

const addBasketButton = document.createElement('button');
addBasketButton.classList.add('buttons__add-button');
addBasketButton.textContent = 'Add to basket';

const removeBasketButton = document.createElement('button');
removeBasketButton.classList.add('buttons__remove-button');
removeBasketButton.textContent = 'console carts';

buttonBlock.append(addBasketButton, removeBasketButton);

// description
const description = document.createElement('div');
description.className = 'product__description-block';

// features
const features = document.createElement('div');
features.className = 'product__features';

const featureHeading = document.createElement('h4');
featureHeading.textContent = 'Features:';
featureHeading.className = 'features__header';
features.append(featureHeading);

const productPage = document.createElement('div');
productPage.className = 'product-page';
productPage.append(
  name,
  priceCont,
  imgSlider,
  variants,
  buttonBlock,
  description,
  features,
);

const addToBasket = async () => {
  let activeCart;
  try {
    activeCart = await getActiveCart();
  } catch {
    activeCart = await createCart();
  }
  const { id, version } = activeCart.body;
  console.log('before adding', version);
  const sku = window.location.search.slice(5);
  const cart = await addToCart(id, version, sku);
  console.log(cart);
  console.log('after adding', cart.body.version);
};

addBasketButton.addEventListener('click', addToBasket);

const removeButtonHandler = async () => {
  const carts = await queryCarts();
  console.log('queryCarts Request ===>', carts);
};
removeBasketButton.addEventListener('click', removeButtonHandler);
export default productPage;

export {
  name,
  priceCont,
  currentPrice,
  basePrice,
  discount,
  imgSlider,
  imgCont,
  img,
  sliderControls,
  variantsBlock,
  description,
  features,
  addBasketButton,
  removeBasketButton,
};
