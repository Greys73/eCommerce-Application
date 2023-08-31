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
};

export type AddressType = 'billing' | 'shipping';

export type NavObjType = {
  [key: string]: { text: string; routing: string; obj?: HTMLElement };
};

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

type Brand = 'honda' | 'yamaha' | 'suzuki' | 'kawasaki';
type Color = 'black' | 'blue' | 'red' | 'yellow' | 'green' | 'white';
type Brake = 'disc' | 'drum' | 'combi';
type Drive = 'chain' | 'belt' | 'shaft';
type Type = 'standard' | 'sport' | 'cruiser' | 'tour';
