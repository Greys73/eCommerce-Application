import filters from '../view/pages/catalog/filters';
import * as Page from '../view/pages/catalog/items';

type PaginatorData = {
  total: number;
  offset: number;
  limit: number;
};
let currentPage = 0;
let total = 0;

export const getLimit = (): number => parseInt(Page.paginationBlock.value, 10);
export const getOffset = (): number => currentPage * getLimit();

export function updatePaginator(data: PaginatorData) {
  if (data.total <= 0) {
    Page.deepPrevButton.classList.add('hidden');
    Page.prevButton.classList.add('hidden');
    Page.deepNextButton.classList.add('hidden');
    Page.nextButton.classList.add('hidden');
    Page.currentPage.classList.add('hidden');
  } else {
    Page.deepPrevButton.classList.remove('hidden');
    Page.prevButton.classList.remove('hidden');
    Page.deepNextButton.classList.remove('hidden');
    Page.nextButton.classList.remove('hidden');
    Page.currentPage.classList.remove('hidden');
    currentPage = data.offset / data.limit;
    total = data.total;
    const className = 'page-number__button_unactive';
    Page.currentPage.textContent = (data.offset / data.limit + 1).toString();
    Page.currentPage.textContent += `/${Math.ceil(
      total / parseInt(Page.paginationBlock.value, 10),
    )}`;
    if (data.offset < data.limit) {
      Page.deepPrevButton.classList.add(className);
      Page.prevButton.classList.add(className);
      Page.deepPrevButton.disabled = true;
      Page.prevButton.disabled = true;
    } else {
      Page.deepPrevButton.classList.remove(className);
      Page.prevButton.classList.remove(className);
      Page.deepPrevButton.disabled = false;
      Page.prevButton.disabled = false;
    }
    if (data.offset + data.limit >= data.total) {
      Page.deepNextButton.classList.add(className);
      Page.nextButton.classList.add(className);
      Page.deepNextButton.disabled = true;
      Page.nextButton.disabled = true;
    } else {
      Page.deepNextButton.classList.remove(className);
      Page.nextButton.classList.remove(className);
      Page.deepNextButton.disabled = false;
      Page.nextButton.disabled = false;
    }
    if (data.total <= data.offset)
      Page.deepNextButton.dispatchEvent(new Event('click'));
  }
}

function changePaginator() {
  const event = new Event('submit');
  filters.dispatchEvent(event);
}
Page.deepPrevButton.onclick = () => {
  currentPage = 0;
  changePaginator();
};
Page.prevButton.onclick = () => {
  currentPage -= 1;
  changePaginator();
};
Page.nextButton.onclick = () => {
  currentPage += 1;
  changePaginator();
};

Page.deepNextButton.onclick = () => {
  currentPage = Math.ceil(total / parseInt(Page.paginationBlock.value, 10)) - 1;
  changePaginator();
};
Page.paginationBlock.addEventListener('change', changePaginator);
