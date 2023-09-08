function basketPageLoaded() {
  const location = window.location.pathname;
  if (location === '/basket') {
    // do something
  }
}

window.addEventListener('PageContentLoaded', basketPageLoaded);
