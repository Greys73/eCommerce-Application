import yamahaLogo from '../../../assets/images/yamaha-logo.png';
import hondaLogo from '../../../assets/images/honda-logo.png';
import kawasakiLogo from '../../../assets/images/kawasaki-logo.png';
import suzukiLogo from '../../../assets/images/suzuki-logo.png';

const categoryLogoObj: Record<string, string> = {
  Yamaha: yamahaLogo,
  Honda: hondaLogo,
  Kawasaki: kawasakiLogo,
  Suzuki: suzukiLogo,
};

const categoryArr = ['Honda', 'Kawasaki', 'Yamaha', 'Suzuki'];

const productsPage = document.createElement('div');
productsPage.classList.add('products-page');

const categorySection = document.createElement('div');
categorySection.classList.add('products-page__category');

categoryArr.forEach((el) => {
  const logo = document.createElement('img');
  logo.classList.add('category__logo');
  logo.src = categoryLogoObj[el];
  logo.alt = `${el}-logo`;

  categorySection.append(logo);
});

productsPage.append(categorySection);

export default productsPage;
