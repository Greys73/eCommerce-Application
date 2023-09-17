import { createUserAPIRoot } from './createApiRootUser';

export const getPromoCodes = async () => {
  const response = await createUserAPIRoot().discountCodes().get().execute();
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
