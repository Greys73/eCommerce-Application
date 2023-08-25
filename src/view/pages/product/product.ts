import { showProductPage } from '../../../controller/getProduct';
import { AttrValue, ProductVariant } from '../../../types/type';

const createSliderControls = (): HTMLDivElement => {
  const cont = document.createElement('div');
  cont.className = 'image__controls';
  // create and append arrows or dots
  return cont;
};
const sliderControls = createSliderControls();

const createImageSlider = (
  imageArray: ProductVariant['images'],
): HTMLDivElement => {
  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'image';

  const imgCont = document.createElement('div');
  imgCont.className = 'image__cont';
  for (let i = 0; i < imageArray.length; i += 1) {
    const img = document.createElement('img');
    img.src = imageArray[i].url;
    img.alt = imageArray[i].label;
    // remove here and add in css
    img.width = 600;
    // make the page wait until foto load
    img.onload = () => imgCont.append(img);
  }

  imgWrapper.append(imgCont, sliderControls);
  return imgWrapper;
};

const createFeaturesCont = (
  attr: ProductVariant['attributes'],
): HTMLDivElement => {
  const featureCont = document.createElement('div');
  featureCont.className = 'features';

  const featureHeading = document.createElement('h4');
  featureHeading.textContent = 'Features';
  featureHeading.className = 'feature__heading';
  featureCont.append(featureHeading);

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
    featureCont.append(feature);
  }
  return featureCont;
};

const createProductPage = async (id: string): Promise<HTMLDivElement> => {
  const options = await showProductPage(id);
  const productPage = document.createElement('div');
  productPage.className = 'product__cont';

  const productName = document.createElement('h2');
  productName.textContent = options.name;
  productName.className = 'product__name';

  const productDescription = document.createElement('p');
  productDescription.textContent = options.description || '';
  productDescription.className = 'product__description';

  const productImageSlider = createImageSlider(options.masterVariant.images);
  const featureCont = createFeaturesCont(options.masterVariant.attributes);

  productPage.append(
    productName,
    productImageSlider,
    productDescription,
    featureCont,
  );
  return productPage;
};

export default createProductPage;
