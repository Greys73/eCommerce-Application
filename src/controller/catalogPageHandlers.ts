import { activeIcon, icon } from '../view/pages/catalog/catalog';
import filters, { filtersBlock } from '../view/pages/catalog/filters';
import { fillMenu } from './fillCatalogPage';
import { filterSubmit } from './filterSubmitHandler';

/* eslint-disable no-param-reassign */
const toggleFilterBlock = (
  header: HTMLElement,
  container: HTMLElement,
): void => {
  const headerText = header?.textContent as string;
  if (container.classList.contains('hidden')) {
    header.textContent = headerText.slice(0, -1).concat('▵');
    container.classList.remove('hidden');
  } else {
    header.textContent = headerText.slice(0, -1).concat('▿');
    container.classList.add('hidden');
  }
};

export const showFilters = (filterBlock: HTMLElement): void => {
  filterBlock.classList.toggle('visable');
};

// const changeFilterIconStatus = (
//   activeFilter: HTMLElement,
//   unactiveFilter: HTMLElement,
// ): void => {
//   activeFilter.classList.toggle('hidden');
//   unactiveFilter.classList.toggle('hidden');
// };

function addFilterBlcokListeners() {
  filtersBlock.childNodes.forEach((el) => {
    const block = el as HTMLElement;
    const header: HTMLElement = block.querySelector('.filter__header')!;
    const container: HTMLElement = block.querySelector('div')!;
    header.onclick = () => toggleFilterBlock(header, container);
  });

  [icon, activeIcon].forEach((el) => {
    el.onclick = () => showFilters(filters);
  });
}

async function pageLoaded(e: Event) {
  const location = window.location.pathname;
  const options = (e as CustomEvent).detail;
  if (location === '/catalog') {
    await fillMenu(options.category);
    await filterSubmit(options.key);
    await addFilterBlcokListeners();
  }
}

window.addEventListener('PageContentLoaded', pageLoaded);
