(function () {
  var queriedResource = document.querySelectorAll('.mediaQueryDependent'),
    all = queriedResource.length,
    current = null,
    attr = null;
  while (all--) {
    current = queriedResource[all];
    if (current.dataset.media &&
        window.matchMedia(current.dataset.media).matches) {
      for (attr in current.dataset) {
        if (attr !== 'media') {
          current.setAttribute(attr, current.dataset[attr]);
        }
      }
    }
  }
}());