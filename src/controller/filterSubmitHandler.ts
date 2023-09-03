import { Category, ProductDraft } from '@commercetools/platform-sdk';
import { filterByParams, getCategoryByKey } from '../model/api/apiRoot';
import cardsBlock, { createCard } from '../view/pages/catalog/cards';
import filters from '../view/pages/catalog/filters';
import { fillProductPage } from './fillProductPage';

export const getCategory = async (): Promise<string> => {
  const { search } = window.location;
  if (!search) return '';
  const categoryKey = search.slice(search.indexOf('=') + 1);
  let filter: string;
  const categoryID: Category = (await getCategoryByKey(categoryKey)).body.id;
  if (categoryKey.length === 2) {
    filter = `categories.id:"${categoryID}"`;
  } else {
    filter = `categories.id: subtree("${categoryID}")`;
  }
  return filter;
};
const getFilterData = () => {
  const data = new FormData(filters);
  const filterOptions: string[] = [];

  const enumAttributes = [
    'attr-type',
    'attr-brand',
    'attr-colour',
    'attr-drive',
    'attr-brake',
  ];
  enumAttributes.forEach((attr) => {
    const values = data.getAll(attr);
    if (values.length) {
      const attrFilter = `variants.attributes.${attr}.key:${values
        .map((el) => `"${el}"`)
        .join(',')}`;
      filterOptions.push(attrFilter);
    }
  });

  const rangeAttributes = [
    'price',
    'attr-year',
    'attr-power',
    'attr-weight',
    'attr-dsp',
  ];
  rangeAttributes.forEach((attr) => {
    let startValue = data.get(`${attr}From`);
    let endValue = data.get(`${attr}To`);
    if (startValue || endValue) {
      startValue = startValue || '*';
      endValue = endValue || '*';
      let attrFilter: string;
      if (attr !== 'price') {
        attrFilter = `variants.attributes.${attr}:range (${startValue} to ${endValue})`;
      } else {
        const centPerEuro = 100;
        const start = startValue === '*' ? '*' : +startValue * centPerEuro;
        const end = endValue === '*' ? '*' : +endValue * centPerEuro;
        attrFilter = `variants.${attr}.centAmount:range (${start} to ${end})`;
      }
      filterOptions.push(attrFilter);
    }
  });

  getCategory();

  return filterOptions;
};

export const placeCards = (cards: ProductDraft[]) => {
  cardsBlock.innerHTML = '';
  if (cards.length === 0) return;
  cards.forEach((card) => {
    let createdCard;
    const name = card.name.en;

    const attributes = card.masterVariant?.attributes;
    function getAttribute(attribute: string): string | number {
      let attrValue = attributes?.find((el) => el.name === `attr-${attribute}`)
        ?.value;
      if (attribute === 'type') {
        attrValue = attrValue.label;
      }
      if (!attrValue) attrValue = '';
      return attrValue;
    }

    function configureDescription(
      year: string | number,
      type: string | number,
      displacement: string | number,
      power: string | number,
      weight: string | number,
    ): string {
      const descriptionArr: string[] = [];
      descriptionArr[0] = year !== '' ? year.toString() : '{{year}}';
      descriptionArr[1] = type !== '' ? type.toString() : '{{type}}';
      descriptionArr[2] =
        displacement !== '' ? displacement.toString().concat('cc') : '{{cc}}';
      descriptionArr[3] =
        power !== '' ? power.toString().concat('hp') : '{{hp}}';
      descriptionArr[4] =
        weight !== '' ? weight.toString().concat('kg') : '{{kg}}';

      return descriptionArr.join(', ');
    }
    const description = configureDescription(
      getAttribute('year'),
      getAttribute('type'),
      getAttribute('dsp'),
      getAttribute('power'),
      getAttribute('weight'),
    );
    // const description = card.description
    //   ? `${card.description.en.slice(0, 51)}...`
    //   : '{{year}}, {{type}}, {{cc}}, {{power}}, {{weight}}';
    let img = '';
    let price = '000';
    const centPerEuro = 100;
    const sku = card.masterVariant?.sku || '';
    if (card.masterVariant && card.masterVariant.images)
      img = card.masterVariant.images[0].url;
    if (
      card.masterVariant &&
      card.masterVariant.prices &&
      card.masterVariant.prices.length
    ) {
      if (
        card.masterVariant.prices[0].discounted &&
        card.masterVariant.prices[0].discounted.value.centAmount
      ) {
        price = `${
          card.masterVariant.prices[0].discounted.value.centAmount / centPerEuro
        }`;
        const basePrice =
          (card.masterVariant.prices[0].value.centAmount || 1) / centPerEuro;
        const discount = (1 - +price / basePrice).toFixed(2);
        console.log(discount);
        createdCard = createCard(
          name,
          img,
          description,
          `${basePrice}`,
          +discount,
        );
      } else {
        const centPrice = card.masterVariant.prices[0].value.centAmount || 100;
        price = `${centPrice / centPerEuro}`;
        createdCard = createCard(name, img, description, price);
      }
      createdCard.addEventListener('click', () => {
        window.routeLocation = `/product?sku=${sku}`;
        fillProductPage(sku);
      });
    }
  });
};

const filterSubmit = async (e: Event) => {
  e.preventDefault();
  const filterOptions = getFilterData();
  const category = await getCategory();
  if (category) {
    filterOptions.push(category);
  }
  try {
    const resp = await filterByParams(filterOptions);
    const cards = resp.body.results as ProductDraft[];
    placeCards(cards);
  } catch (error) {
    console.log(error);
  }
};

filters.addEventListener('submit', filterSubmit);
