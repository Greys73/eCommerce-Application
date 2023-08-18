export function saveToStorage(item: string, data: object) {
  localStorage.setItem(item, JSON.stringify(data));
}

export function loadFromStorage(item: string) {
  try {
    return JSON.parse(localStorage.getItem(item) || '');
  } catch {
    return {};
  }
}
