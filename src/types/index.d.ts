export {};
declare global {
  interface Window {
    routeLocation: string;
  }
}
window.routeLocation = window.routeLocation || {};
