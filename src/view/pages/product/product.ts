// heading
const name = document.createElement('h2');
name.className = 'product__name';

// price
const priceCont = document.createElement('div');
priceCont.className = 'price';

const discountCont = document.createElement('div');
discountCont.className = 'price__discount';

const basePrice = document.createElement('div');
basePrice.className = 'price__base';

const discount = document.createElement('div');
discount.className = 'price__disc';

const currentPrice = document.createElement('div');
currentPrice.className = 'price__cur';

discountCont.append(basePrice, discount);
priceCont.append(discountCont, currentPrice);

// image
const imgSlider = document.createElement('div');
imgSlider.className = 'image';

const imgCont = document.createElement('div');
imgCont.className = 'image__cont';

const img = document.createElement('img');
// remove here and add in css
img.width = 600;
imgCont.append(img);

const sliderControls = document.createElement('div');
sliderControls.className = 'image__controls';

imgSlider.append(imgCont, sliderControls);

// variants
const variants = document.createElement('div');
variants.className = 'variants';
variants.textContent = 'Choose color';
const mainVariant = document.createElement('div');
mainVariant.className = 'variants__main';
variants.append(mainVariant);
// css
mainVariant.style.width = '40px';
mainVariant.style.height = '40px';
mainVariant.style.borderRadius = '50%';
mainVariant.style.borderColor = 'black';
mainVariant.style.borderStyle = 'solid';

// description
const description = document.createElement('p');
description.className = 'product__description';

// features
const features = document.createElement('div');
features.className = 'features';

const featureHeading = document.createElement('h4');
featureHeading.textContent = 'Features';
featureHeading.className = 'feature__heading';
features.append(featureHeading);

const productPage = document.createElement('div');
productPage.className = 'product__cont';
productPage.append(name, priceCont, imgSlider, variants, description, features);

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
  variants,
  mainVariant,
  description,
  features,
};
