import { getProductBySKU } from '../model/api/apiRoot';
import { ProductOptions } from '../types/type';

export const showProductPage = async (SKU: string) => {
  const response = await getProductBySKU(SKU);
  // for id search
  // const product = response.body.masterData.current
  const product = response.body.results[0];
  console.log('product');
  console.log(product);
  const prodOptions: ProductOptions = {
    name: product.name.en,
    // description: product.description.en,
    masterVariant: product.masterVariant,
    variants: product.variants,
  };
  if (product.description) prodOptions.description = product.description.en;
  return prodOptions;
};
