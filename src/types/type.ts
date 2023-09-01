import { Price } from '@commercetools/platform-sdk';

export type FormBlock = {
  type: string;
  placeholder?: string;
  name: string;
  text: string;
  required: boolean;
  pattern?: RegExp;
  max?: string;
  title?: string;
  display?: string;
  selectOptions?: string[];
};

export type AddressType = 'billing' | 'shipping';

export interface AddressVariant {
  billing: boolean;
  shipping: boolean;
  defbilling: boolean;
  defShipping: boolean;
}

export type NavObjType = {
  [key: string]: { text: string; routing: string; obj?: HTMLElement };
};

export interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  phone: HTMLInputElement;
  dateOfBirth: HTMLInputElement;

  defaultShippingAddress: HTMLInputElement;
  defaultBillingAddress: HTMLInputElement;
  Street: HTMLInputElement;
  City: HTMLInputElement;
  PostCode: HTMLInputElement;
  Country: HTMLInputElement;
  addressType: HTMLSelectElement;
  deleteBtn: HTMLButtonElement;
}

export type ProductOptions = {
  name: string;
  description?: string;
  currentVariant: ProductVariant;
};

export type ProductVariant = {
  id: number;
  attributes: Attribute[];
  images: Images[];
  prices: Price[];
  sku: string;
};

type Attribute = {
  name: string;
  value: number | AttrValue | string;
};

export type AttrValue = {
  key: string;
  label: string;
};
type Images = {
  dimensions: object;
  label: string;
  url: string;
};
