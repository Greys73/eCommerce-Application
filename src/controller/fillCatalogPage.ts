import { Category } from '@commercetools/platform-sdk';
import categoryLogoObj from '../model/data/images-src';
import {
  getCategories,
  getCategoryById,
  getCategoryByKey,
} from '../model/api/apiRoot';
import {
  categoryBlock,
  categoryName,
  subCategoryName,
} from '../view/pages/catalog/items';

const setCategories = async (
  category?: HTMLElement,
  subCategory?: HTMLElement,
): Promise<Category[] | undefined> => {
  const response = await getCategories();
  const categoriesList: Category[] = response.body.results;
  const categoryArr: Category[] = [];

  if (category && category.textContent) {
    if (subCategory && subCategory.textContent) {
      console.log('no subcats!');
    } else {
      await Promise.all(
        categoriesList
          .filter((el) => el.parent)
          .map(async (el) => {
            const parentRequest = await getCategoryById(el.parent!.id);
            const categoryText = category.textContent?.replace('/', '').trim();
            if (parentRequest.body.name.en === categoryText) {
              categoryArr.push(el);
            }

            return categoryArr;
          }),
      );
    }
  } else {
    categoriesList
      .filter((el) => el.ancestors.length === 0)
      .forEach((el) => categoryArr.push(el));
  }

  return categoryArr;
};

function pageLoaded() {
  const location = window.location.pathname;
  if (location === '/catalog') {
    setTimeout(async () => {
      const categoryArr = await setCategories(categoryName, subCategoryName);
      categoryBlock.innerHTML = '';
      if (categoryArr) {
        categoryArr.forEach((el) => {
          const logo = document.createElement('img');
          logo.classList.add('category__logo');
          logo.src = categoryLogoObj[el.name.en];
          logo.alt = `${el.name.en}-logo`;
          logo.addEventListener('click', () => {
            window.routeLocation = `/catalog?category=${el.key}`;
          });
          categoryBlock.append(logo);
        });
      }
    }, 50);
  }
}

export const fillMenu = async (key: string) => {
  categoryName.textContent = '';
  subCategoryName.textContent = '';
  if (!key) {
    pageLoaded();
    return false;
  }
  const category: Category = (await getCategoryByKey(key)).body;
  const parentID = category.parent?.id || category.id;
  const parentCat: Category = (await getCategoryById(parentID)).body;
  if (category.id !== parentCat.id) {
    categoryName.textContent = ` / ${parentCat.name.en}`;
    categoryName.href = `/catalog?category=${parentCat.key}`;
    subCategoryName.textContent = ` / ${category.name.en}`;
    subCategoryName.style.breakBefore = ' / ';
    subCategoryName.href = `/catalog?category=${category.key}`;
  } else {
    categoryName.textContent = ` / ${category.name.en}`;
    categoryName.href = `/catalog?category=${category.key}`;
  }
  pageLoaded();
  return true;
};

window.addEventListener('PageContentLoaded', pageLoaded);
export default setCategories;
