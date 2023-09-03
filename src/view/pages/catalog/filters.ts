import { hideFilter } from '../../../controller/catalogPageHandlers';

const filters = document.createElement('form');
filters.classList.add('catalog__filters');
filters.id = 'filters';

const filtersBlock = document.createElement('div');
filtersBlock.classList.add('filters__filter-block');

// get arrs from API

const companyArr = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki'];

const typesArr = ['Standard', 'Sport', 'Cruiser', 'Touring'];

const colorsArr = ['Black', 'Blue', 'Red', 'Yellow', 'Green', 'White'];

const drivetrainsArr = ['Chain', 'Belt', 'Shaft'];

const brakesArr = ['Disc', 'Drum', 'Disc and drum'];

// finish with API

function createFilter(filterName: string, id: string): HTMLElement {
  const filter = document.createElement('div');
  filter.classList.add('filters__filter');
  filter.id = id;

  const header = document.createElement('h3');
  header.classList.add('filter__header');
  header.textContent = filterName.concat(' ▵'); // ▿
  filter.append(header);

  return filter;
}

function createCheckboxFilter(
  filterName: string,
  filterId: string,
  values: string[],
): HTMLElement {
  const filter = createFilter(filterName, filterId);

  const container = document.createElement('div');
  container.classList.add('filter__checkbox-container');

  values.forEach((el) => {
    const input = document.createElement('input');
    input.classList.add('filter__checkbox-input');
    input.type = 'checkbox';
    input.name = filterId;
    input.value = el;

    const label = document.createElement('label');
    label.classList.add('filter__label');
    label.textContent = el;

    label.prepend(input);

    container.append(label);
  });

  // console.log('filter=', filter.firstElementChild);
  // console.log('filterContainer=', container);
  filter.firstElementChild?.addEventListener('click', () =>
    hideFilter(filter.firstElementChild as HTMLElement, container),
  );

  filter.append(container);

  return filter;
}

function createRangeFilter(
  filterName: string,
  filterId: string /* , maxValue: number, minValue: number */,
): HTMLElement {
  const filter = createFilter(filterName, filterId);

  const container = document.createElement('div');
  container.classList.add('filter__range-container');

  const minValueInput = document.createElement('input');
  minValueInput.classList.add('filter__range-input');
  minValueInput.type = 'number';
  minValueInput.name = `${filterId}From`;
  // minValueInput.min = minValue.toString();
  // minValueInput.max = maxValue.toString();

  const maxValueInput = document.createElement('input');
  maxValueInput.classList.add('filter__range-input');
  maxValueInput.type = 'number';
  maxValueInput.name = `${filterId}To`;
  // maxValueInput.min = minValue.toString();
  // maxValueInput.max = maxValue.toString();

  const minLabel = document.createElement('label');
  minLabel.classList.add('filter__label');
  minLabel.textContent = 'from';
  minLabel.append(minValueInput);

  const maxLabel = document.createElement('label');
  maxLabel.classList.add('filter__label');
  maxLabel.textContent = 'to';
  maxLabel.append(maxValueInput);

  filter.firstElementChild?.addEventListener('click', () =>
    hideFilter(filter.firstElementChild as HTMLElement, container),
  );

  container.append(minLabel, maxLabel);

  filter.append(container);

  return filter;
}

const price = createRangeFilter('Price', 'price');
const year = createRangeFilter('Year', 'attr-year');
// console.log(year);

const displacement = createRangeFilter('Displacement (cc)', 'attr-dsp');
const power = createRangeFilter('Power (hp)', 'attr-power');
const weight = createRangeFilter('Curb weight (kg)', 'attr-weight');

const company = createCheckboxFilter('Company', 'attr-brand', companyArr);
const type = createCheckboxFilter('Type', 'attr-type', typesArr);
const color = createCheckboxFilter('Color', 'attr-colour', colorsArr);
const drivetrain = createCheckboxFilter(
  'Drivetrain',
  'attr-drive',
  drivetrainsArr,
);
const brakes = createCheckboxFilter('Brakes type', 'attr-brake', brakesArr);

filtersBlock.append(
  price,
  company,
  type,
  year,
  displacement,
  power,
  weight,
  color,
  brakes,
  drivetrain,
);

const buttonsBlock = document.createElement('div');
buttonsBlock.className = 'filters__button-block';

const submitBtn = document.createElement('button');
submitBtn.className = 'filters_button';
submitBtn.textContent = 'Filter';
submitBtn.type = 'submit';

const resetBtn = document.createElement('button');
resetBtn.className = 'filters_button';
resetBtn.type = 'reset';
resetBtn.textContent = 'Reset';
buttonsBlock.append(submitBtn, resetBtn);

filters.append(filtersBlock, buttonsBlock);

export default filters;
