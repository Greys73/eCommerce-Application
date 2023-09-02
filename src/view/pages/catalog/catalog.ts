import items from './items';
import filters from './filters';
import filterImg from '../../../assets/images/filter-ico.png';
import activeFilterImg from '../../../assets/images/filter-ico-active.png';
import { showFilters } from '../../../controller/catalogPageHandlers';

const productsPage = document.createElement('div');
productsPage.classList.add('products-page');

const iconBlock = document.createElement('div');
iconBlock.classList.add('filters__icon-block');

const icon = document.createElement('img');
icon.classList.add('icon-block__icon');
icon.src = filterImg;
icon.alt = 'filter-icon';

const activeIcon = document.createElement('img');
activeIcon.classList.add('icon-block__icon', 'hidden');
activeIcon.src = activeFilterImg;
activeIcon.alt = 'active-filter-icon';

[icon, activeIcon].forEach((el) =>
  el.addEventListener('click', () => showFilters(filters)),
);

iconBlock.append(icon, activeIcon);

productsPage.append(filters, items, iconBlock);

export default productsPage;
