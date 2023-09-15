import { getActiveCart } from './cartApiRoot';
import { createUserAPIRoot } from './createApiRootUser';

export const getPromo = async () => {
  const response = await createUserAPIRoot().discountCodes().get().execute();
  console.log(response.body);
  return response;
};

export const setPromoToCart = async (
  ID: string,
  version: number,
  code: string,
) => {
  const response = await createUserAPIRoot()
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);
  return response;
};

document.body.addEventListener('dblclick', () => {
  getPromo();
  setPromoToCart('454c2626-2164-4b3b-a68b-aab84818d0e4', 4, 'SUPERSPORT');
  setTimeout(() => {
    getActiveCart().then((e) => console.log(e.body));
  }, 2000);
});
