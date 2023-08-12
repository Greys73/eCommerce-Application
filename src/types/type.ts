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
