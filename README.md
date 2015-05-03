# Media Query Load

Here is a quick idea about making media queries not only apply styles according to certain criteria being met, but also loading the resources needed on demand.

### Using `matchMedia()`

Using `matchMedia` lets you execute blocks of JavaScript only when a certain media query condition is met. This means you could just write out the CSS when and if the query is true:

```javascript
if (window.matchMedia('screen and (min-width: 600px)')) {
  document.write('<link rel="stylesheet" href="css/small.css">');
}
```

However, nstead of applying the CSS with a `<link>` element with a `href` which causes the undesired loading we'll use `data-*` attributes instead. Anything we want dependent on the query will get a `data-` prefix:

```html
<link rel="stylesheet" class="mediaQueryDependent" 
  data-media="screen and (min-width: 600px)" 
  data-href="css/green.css">
<link rel="stylesheet" class="mediaQueryDependent" 
  data-media="screen and (min-width: 4000px)" 
  data-href="css/blue.css">
```

The `mediaQueryLoad()` function will loop through all the elements we want to change, evaluate their media queries, and change the `data-` prefixed attributes back to real ones:

```javascript
function mediaQueryLoad() {
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
}
mediaQueryLoad();
```

* We use `querySelectorAll` to get all the elements that need the media query checks and loop over them (using a reverse while loop).
* We test if the element has a `data-media` property and if the query defined in it is true.
* We then loop through all `data-*` prefixed attributes and add a non-prefixed attribute with its value (omitting the media one).


### `matchMedia()` support

Current versions Chrome, Firefox, and Safari and IE10+ support [`matchMedia`](http://caniuse.com/#search=matchmed).
