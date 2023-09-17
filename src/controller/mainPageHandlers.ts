import { getPromoCodes } from '../model/api/promoApi';
import { fillPromoSection } from '../view/pages/main/main';

async function mainPageLoaded() {
  const location = window.location.pathname;
  console.log(location);
  if (location === '/') {
    const response = await getPromoCodes();
    fillPromoSection(response.body.results);
  }
}

window.addEventListener('PageContentLoaded', mainPageLoaded);
