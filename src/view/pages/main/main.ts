// const dummy = document.createElement('div');
// dummy.textContent = 'This is MAIN page';

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

// Cross-Check

const crossCheckContainer = document.createElement('div');
crossCheckContainer.classList.add('login-page__form');

const crossCheckHeader = document.createElement('h3');
crossCheckHeader.classList.add('login-page__header');
crossCheckHeader.textContent = 'Cross-check links:';

crossCheckContainer.append(crossCheckHeader);

const linksArr = [
  ['Registration page', '/registration'],
  ['Log in page', '/login'],
  ['About us page', '/about'],
];

linksArr.forEach(([text, href]) => {
  const link = document.createElement('a');
  link.classList.add('login-page__redirect-link');
  link.textContent = text;
  link.href = href;
  link.style.display = 'block';

  crossCheckContainer.append(link);
});

mainPage.append(crossCheckContainer);

export default mainPage;
