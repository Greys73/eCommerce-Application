import { loadFromStorage, saveToStorage } from '../utils/storage';

const item = 'motoDream_cart';

export function setLocalCart(data: object) {
  saveToStorage(item, data);
}

export function getLocalCart() {
  return loadFromStorage(item);
}
