import img from '../../../assets/images/page_not_found404.png';

const container = document.createElement('div');
container.className = 'page-404';

const image = document.createElement('img');
image.className = 'page-404__image';
image.src = img;

export const link = document.createElement('a');
link.className = 'page-404__link';
link.textContent = 'Go back to main page!';
link.href = '/';

container.append(image, link);

export default container;
