import { hideFilter } from '../../../controller/catalogPageHandlers';

const filters = document.createElement('div');
filters.classList.add('catalog__filters');

const filtersBlock = document.createElement('div');
filtersBlock.classList.add('filters__filter-block');

// get arrs from API

const companyArr = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki'];

const typesArr = ['Standard', 'Sport', 'Cruiser', 'Touring'];

const colorsArr = ['Black', 'Blue', 'Red', 'Yellow', 'Green'];

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
  // minValueInput.min = minValue.toString();
  // minValueInput.max = maxValue.toString();

  const maxValueInput = document.createElement('input');
  maxValueInput.classList.add('filter__range-input');
  maxValueInput.type = 'number';
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

const price = createRangeFilter('Price', 'filter-price');
const year = createRangeFilter('Year', 'filter-year');
console.log(year);

const displacement = createRangeFilter(
  'Displacement (cc)',
  'filter-displacement',
);
const power = createRangeFilter('Power (hp)', 'filter-power');
const weight = createRangeFilter('Curb weight (kg)', 'filter-weigth');

const company = createCheckboxFilter('Company', 'filter-company', companyArr);
const type = createCheckboxFilter('Type', 'filter-type', typesArr);
const color = createCheckboxFilter('Color', 'filter-color', colorsArr);
const drivetrain = createCheckboxFilter(
  'Drivetrain',
  'filter-drivetrain',
  drivetrainsArr,
);
const brakes = createCheckboxFilter('Brakes type', 'filter-brakes', brakesArr);

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

filters.append(filtersBlock);

export default filters;
