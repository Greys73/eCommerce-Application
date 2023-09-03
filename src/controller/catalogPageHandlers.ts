import { fillMenu } from './fillCatalogPage';
import { filterSubmit } from './filterSubmitHandler';

/* eslint-disable no-param-reassign */
const hideFilter = (header: HTMLElement, container: HTMLElement): void => {
  const headerText = header?.textContent as string;
  if (headerText?.slice(-1) === '▵') {
    header.textContent = headerText.slice(0, -1).concat('▿');
  } else {
    header.textContent = headerText.slice(0, -1).concat('▵');
  }
  container.classList.toggle('hidden');
};

const showFilters = (filters: HTMLElement): void => {
  filters.classList.toggle('visable');
};

const changeFilterIconStatus = (
  activeFilter: HTMLElement,
  unactiveFilter: HTMLElement,
): void => {
  activeFilter.classList.toggle('hidden');
  unactiveFilter.classList.toggle('hidden');
};

async function pageLoaded(e: Event) {
  const location = window.location.pathname;
  const options = (e as CustomEvent).detail;
  if (location === '/catalog') {
    fillMenu(options.category);
    filterSubmit(options.key);
  }
}

window.addEventListener('PageContentLoaded', pageLoaded);
export { hideFilter, showFilters, changeFilterIconStatus };
