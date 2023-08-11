import img from '../../../assets/images/page_not_found404.png';

const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.justifyContent = 'center';
container.style.alignItems = 'center';

const image = document.createElement('img');
image.src = img;
image.style.height = '30rem';

const link = document.createElement('a');
link.textContent = 'Go back to main page!';
link.href = '/';

container.append(image, link);

export default container;
