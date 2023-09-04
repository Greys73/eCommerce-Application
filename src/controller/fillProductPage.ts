import { Price } from '@commercetools/platform-sdk';
import { getProductBySKU } from '../model/api/apiRoot';
import * as product from '../view/pages/product/product';
import * as er404Page from '../view/pages/404/404';
import { AttrValue, ProductVariant } from '../types/type';
import productImages from '../model/data/productImages';

const fillPriceCont = (priceOptions: Price) => {
  const centsPerEuro = 100;
  const price = `${+priceOptions.value.centAmount / centsPerEuro} ${
    priceOptions.value.currencyCode
  }`;

  if (priceOptions.discounted) {
    product.currentPrice.textContent = `${
      priceOptions.discounted.value.centAmount / centsPerEuro
    } ${priceOptions.discounted.value.currencyCode}`;
    product.basePrice.textContent = price;
    const discountValue = Math.round(
      (1 -
        priceOptions.discounted.value.centAmount /
          priceOptions.value.centAmount) *
        100,
    );
    product.discount.textContent = `-${discountValue}%`;
    product.basePrice.classList.add('price__base_discont');
  } else {
    product.currentPrice.textContent = price;
  }
};

const fillFeatures = (attr: ProductVariant['attributes']) => {
  product.features
    .querySelectorAll('.features__item')
    .forEach((item) => item.remove());
  for (let i = 0; i < attr.length; i += 1) {
    const feature = document.createElement('div');
    feature.className = 'features__item';
    const featureName = document.createElement('span');
    const name = `${attr[i].name.slice(5, 6).toUpperCase()}${attr[i].name.slice(
      6,
    )}: `;
    featureName.textContent = name === 'Dsp: ' ? 'Displacement: ' : name;

    const featureValue = document.createElement('span');
    if (typeof attr[i].value !== 'object') {
      featureValue.textContent = `${attr[i].value}`;
    } else {
      const attrValue = attr[i].value as AttrValue;
      featureValue.textContent = attrValue.label;
    }
    switch (name) {
      case 'Power: ':
        featureValue.textContent += ' hp';
        break;
      case 'Weight: ':
        featureValue.textContent += ' kg';
        break;
      case 'Dsp: ':
        featureValue.textContent += ' cc';
        break;
      default:
        break;
    }
    feature.append(featureName, featureValue);
    product.features.append(feature);
  }
};

const fillImageSlider = (images: ProductVariant['images']) => {
  product.img.src = images[0].url;
  product.img.alt = images[0].label;
  productImages.splice(0, productImages.length);
  for (let i = 0; i < images.length; i += 1) {
    const { url } = images[i];
    productImages.push(url);
  }
};

const fillSliderControls = (images: ProductVariant['images']) => {
  product.sliderControls.innerHTML = '';
  for (let i = 0; i < images.length; i += 1) {
    const dot = document.createElement('div');
    dot.className = 'controls__item';
    if (i === 0) {
      dot.classList.add('controls__item_selected');
    }

    dot.addEventListener('click', () => {
      product.img.src = images[i].url;
      const dotsArr = document.querySelectorAll('.controls__item');
      dotsArr.forEach((el) => el.classList.remove('controls__item_selected'));
      dot.classList.add('controls__item_selected');
    });
    product.sliderControls.append(dot);
  }
};

const fillVariants = (variants: ProductVariant[]) => {
  const colors = variants.map((variant) => {
    const colorAttr = variant.attributes.find(
      (attr) => attr.name === 'attr-colour',
    );
    if (colorAttr) {
      const colorValue = colorAttr.value as AttrValue;
      return colorValue.label;
    }
    return 'default';
  });
  // eslint-disable-next-line prefer-destructuring
  const mainVariantColor = colors[0];
  product.mainVariant.style.backgroundColor = mainVariantColor;
  product.mainVariant.style.borderColor = mainVariantColor;
  if (
    colors.length > 1 &&
    product.variantsBlock.childNodes.length < colors.length
  ) {
    for (let i = 1; i < colors.length; i += 1) {
      const variant = document.createElement('a');
      variant.className = 'variants__links';
      // css

      variant.style.borderColor = 'black';
      variant.style.borderStyle = 'solid';

      variant.style.backgroundColor = colors[i];
      variant.style.borderColor = colors[i];
      variant.title = variants[i].sku;
      // add correct link
      variant.href = `/product?sku=${variants[i].sku}`;
      product.variantsBlock.append(variant);
    }
  }
};

const preloadImages = (variants: ProductVariant[]) => {
  const imagesURL: string[] = [];
  variants.forEach((variant) => {
    variant.images.forEach((element: { url: string }) => {
      imagesURL.push(element.url);
      const img = new Image();
      img.src = element.url;
    });
  });
};

export const fillProductPage = async (SKU: string) => {
  const response = await getProductBySKU(SKU);

  if (response.statusCode !== 200) {
    product.default.parentElement?.append(er404Page.default);
    product.default.parentElement?.removeChild(product.default);
    return false;
  }
  product.features.innerHTML = '';
  product.sliderControls.innerHTML = '';

  const prodOptions = response.body.results[0];
  const variants = [prodOptions.masterVariant, ...prodOptions.variants];
  preloadImages(variants);
  const imagesURL: string[] = [];
  variants.forEach((variant) => {
    variant.images.forEach((element: { url: string }) => {
      imagesURL.push(element.url);
    });
  });

  const currentVariant = variants.find((prod) => prod.sku === SKU);

  product.name.textContent = prodOptions.name.en;
  if (prodOptions.description) {
    const paragraphArr: string[] = prodOptions.description.en.split('\n\n');
    product.description.innerHTML = '';
    paragraphArr.forEach((el) => {
      const paragraph = document.createElement('p');
      paragraph.classList.add('product__description');
      paragraph.textContent = el;
      product.description.append(paragraph);
    });
  }
  if (currentVariant.prices.length > 0) fillPriceCont(currentVariant.prices[0]);
  fillFeatures(currentVariant.attributes);
  fillImageSlider(currentVariant.images);
  if (currentVariant.images.length > 1)
    fillSliderControls(currentVariant.images);
  fillVariants(variants);
  return true;
};
