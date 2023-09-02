import { Category } from '@commercetools/platform-sdk';
import { getCategories, getCategoryById } from '../model/api/apiRoot';

const setCategories = async (
  category?: HTMLElement,
  subCategory?: HTMLElement,
): Promise<string[] | undefined> => {
  const response = await getCategories();
  const categoriesList: Category[] = response.body.results;
  const categoryArr: string[] = [];

  if (category && category.textContent) {
    if (subCategory && subCategory.textContent) {
      console.log('no subcats!');
    } else {
      await Promise.all(
        categoriesList
          .filter((el) => el.parent)
          .map(async (el) => {
            const parentRequest = await getCategoryById(el.parent!.id);
            if (parentRequest.body.name.en === category.textContent) {
              categoryArr.push(el.name.en);
            }

            return categoryArr;
          }),
      );
    }
  } else {
    categoriesList
      .filter((el) => el.ancestors.length === 0)
      .forEach((el) => categoryArr.push(el.name.en));
  }

  return categoryArr;
};

export default setCategories;
