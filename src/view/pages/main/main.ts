import setCategories from '../../../controller/fillCatalogPage';
import categoryLogoObj from '../../../model/data/images-src';

const mainPage = document.createElement('div');
mainPage.classList.add('main-page');

const header = document.createElement('h1');
header.classList.add('main-page__header');
header.textContent = 'Welcome to MotoDream!';

const catalogParagraph = document.createElement('p');
catalogParagraph.classList.add('main-page__catalog-paragraph');
catalogParagraph.textContent = 'Looking for the perfect ride? Look no further!';

const catalogButton = document.createElement('a');
catalogButton.className = 'main-page__link';
catalogButton.textContent = 'Choose your bike now!';
catalogButton.href = '/catalog';

mainPage.append(header, catalogParagraph, catalogButton);

const textArr = [
  'At MotoDream we have a wide range of stylish and powerful motorcycles that will make heads turn.',
  'Choose a new bike and experience the thrill of the open road like never before.',
  'Get ready to ride in style and make a statement. Start your adventure today with us!',
];

textArr.forEach((text) => {
  const catalogText = document.createElement('p');
  catalogText.classList.add('main-page__catalog-text');
  catalogText.textContent = text;
  mainPage.append(catalogText);
});

const categorySection = document.createElement('div');
categorySection.classList.add('main-page__brands');

(async () => {
  const categoryArr = await setCategories();

  if (categoryArr) {
    categoryArr!.forEach((el) => {
      const logo = document.createElement('img');
      logo.classList.add('brands__logo');
      logo.src = categoryLogoObj[el.name.en];
      logo.alt = `${el.name.en}-logo`;
      logo.addEventListener('click', () => {
        window.routeLocation = `/catalog?category=${el.key}`;
      });
      categorySection.append(logo);
    });
  }
})();

mainPage.append(categorySection);

export default mainPage;
