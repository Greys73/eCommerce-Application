import { filterByParams } from '../model/api/apiRoot';
import filters from '../view/pages/catalog/filters';

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
        attrFilter = `variants.${attr}.centAmount:range (${
          +startValue * centPerEuro
        } to ${+endValue * centPerEuro})`;
      }
      filterOptions.push(attrFilter);
    }
  });

  return filterOptions;
};

const filterSubmit = async (e: Event) => {
  e.preventDefault();
  const filterOptions = getFilterData();
  try {
    const resp = await filterByParams(filterOptions);
    console.log(resp);
    // place cards in catalog
  } catch {
    console.log('smth wrong');
  }
};

filters.addEventListener('submit', filterSubmit);
