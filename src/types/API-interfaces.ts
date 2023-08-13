interface Address {
  country: string;
  city: string;
  streetName: string;
  building?: string;
  additionalAddressInfo?: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
}

export interface CustomerDraft {
  email: string;
  password: string;
  customerNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultBillingAddress: number;
  defaultShippingAddress: number;
}
