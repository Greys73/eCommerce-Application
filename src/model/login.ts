import { loadFromStorage, saveToStorage } from '../utils/storage';

const item = 'motoDream_customer';

export function setLoacalCustomer(data: object) {
  saveToStorage(item, data);
}

export function getLoacalCustomer() {
  return loadFromStorage(item);
}
