import { getProductBySKU } from '../model/api/apiRoot';
import { ProductOptions } from '../types/type';

export const showProductPage = async (SKU: string) => {
  const response = await getProductBySKU(SKU);
  // for id search
  // const product = response.body.masterData.current

  const product = response.body.results[0];
  const variants = [
    response.body.results[0].masterVariant,
    ...response.body.results[0].variants,
  ];
  const currentVariant = variants.find((prod) => prod.sku === SKU);
  console.log('product');
  console.log(product);
  const prodOptions: ProductOptions = {
    name: product.name.en,
    currentVariant,
  };

  if (product.description) prodOptions.description = product.description.en;
  return prodOptions;
};
