import { Price } from '@commercetools/platform-sdk';
import { getProductBySKU } from '../model/api/apiRoot';
// import { ProductOptions } from '../types/type';
import * as product from '../view/pages/product/product';
import { AttrValue, ProductVariant } from '../types/type';

const fillPriceCont = (priceOptions: Price) => {
  const centsPerEuro = 100;
  const price = `${+priceOptions.value.centAmount / centsPerEuro} ${
    priceOptions.value.currencyCode
  }`;

  if (priceOptions.discounted) {
    console.log('disc');
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
    product.discount.textContent = `${discountValue}%`;
  } else {
    product.currentPrice.textContent = price;
  }
};

const fillFeatures = (attr: ProductVariant['attributes']) => {
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
        featureValue.textContent += ' pt';
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
  //   for (let i = 0; i < images.length; i += 1) {
  //     const { url } = images[i];
  //  }
};
const fillSliderControls = (images: ProductVariant['images']) => {
  for (let i = 0; i < images.length; i += 1) {
    const dot = document.createElement('div');
    dot.className = 'controls__item';
    // move to css
    dot.style.width = '20px';
    dot.style.height = '20px';
    dot.style.backgroundColor = 'grey';
    dot.style.borderRadius = '50%';
    dot.addEventListener('click', () => {
      product.img.src = images[i].url;
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
  product.mainVariant.style.backgroundColor = colors[0];
  if (colors.length > 1) {
    for (let i = 1; i < colors.length; i += 1) {
      const variant = document.createElement('a');
      variant.className = 'variants__links';
      // css
      variant.style.display = 'block';
      variant.style.width = '40px';
      variant.style.height = '40px';
      variant.style.borderRadius = '50%';
      variant.style.borderColor = 'black';
      variant.style.borderStyle = 'solid';

      variant.style.backgroundColor = colors[i];
      variant.title = variants[i].sku;
      // add correct link
      variant.href = `/product/${variants[i].sku}`;
      product.variants.append(variant);
    }
  }
};

export const fillProductPage = async (SKU: string) => {
  const response = await getProductBySKU(SKU);
  // for id search
  // const product = response.body.masterData.current

  const prodOptions = response.body.results[0];
  const variants = [prodOptions.masterVariant, ...prodOptions.variants];
  const currentVariant = variants.find((prod) => prod.sku === SKU);
  console.log('product');
  console.log(prodOptions);

  product.name.textContent = prodOptions.name.en;
  if (prodOptions.description)
    product.description.textContent = prodOptions.description.en;
  if (currentVariant.prices.length > 0) fillPriceCont(currentVariant.prices[0]);
  fillFeatures(currentVariant.attributes);
  fillImageSlider(currentVariant.images);
  if (currentVariant.images.length > 1)
    fillSliderControls(currentVariant.images);
  fillVariants(variants);
};
