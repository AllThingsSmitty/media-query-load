function mediaQueryLoad() {
  var queriedresource = document.querySelectorAll('.mediaQueryDependent'),
    all = queriedresource.length,
    current = null,
    attr = null;
  while (all--) {
    current = queriedresource[all];
    if (current.dataset.media &&
        window.matchMedia(current.dataset.media).matches) {
      for (attr in current.dataset) {
        if (attr !== 'media') {
          current.setAttribute(attr, current.dataset[attr]);
        }
      }
    }
  }
}
mediaQueryLoad();