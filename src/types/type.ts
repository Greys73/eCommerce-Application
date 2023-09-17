import { Price } from '@commercetools/platform-sdk';

export type PromiseResponse = {
  statusCode: number;
  body: object;
  message: string | null;
};

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
  [key: string]: {
    text: string;
    routing: string;
    src: string;
    obj?: HTMLElement;
  };
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

  password: HTMLInputElement;
  newPassword: HTMLInputElement;
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

export interface FilterOptions {
  price: {
    from: number;
    to: number;
  };
  brand: Brand;
  type: Type;
  year: {
    from: number;
    to: number;
  };
  dsp: {
    from: number;
    to: number;
  };
  power: {
    from: number;
    to: number;
  };
  weight: {
    from: number;
    to: number;
  };
  color: Color;
  brake: Brake;
  drive: Drive;
}

export type URLOptions = {
  sku?: string;
  category?: string;
};

type Brand = 'honda' | 'yamaha' | 'suzuki' | 'kawasaki';
type Color = 'black' | 'blue' | 'red' | 'yellow' | 'green' | 'white';
type Brake = 'disc' | 'drum' | 'combi';
type Drive = 'chain' | 'belt' | 'shaft';
type Type = 'standard' | 'sport' | 'cruiser' | 'tour';

export type MemberObj = {
  name: string;
  surname: string;
  age: number;
  photo: string;
  city: string;
  role: string;
  skill: string;
  contribution: string;
  gitHub: string;
  telegram: string;
};

export type ItemToBasket = {
  name: string;
  price: number;
  priceDiscount?: number;
  totalPrice: number;
  img: string;
  year: number;
  type: string;
  dsp: number;
  power: number;
  weight: number;
  amount: number;
  sku: string;
  lineItemId: string;
};
