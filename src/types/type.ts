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
};

export type AddressType = 'billing' | 'shipping';

export type NavObjType = {
  [key: string]: { text: string; routing: string; obj?: HTMLElement };
};
