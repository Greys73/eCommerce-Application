function aboutPageLoaded() {
  const location = window.location.pathname;
  if (location === '/about') {
    // do something
  }
}

window.addEventListener('PageContentLoaded', aboutPageLoaded);
