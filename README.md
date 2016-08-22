# Media Query Load

Media queries apply CSS rules when certain conditions are met in the browser. However, even when media queries are defined for specific CSS resources, e.g., `media="screen and (min-width: 600px)" href="css/small.css"`, the browser will load _all_ CSS resources regardless if they apply or not. That's unnecessary and results in poor performance.

What's needed is to make media queries not only apply styles according to certain criteria being met but also load the CSS resources needed on-demand.

### `matchMedia()`

Using `matchMedia` lets you execute blocks of JavaScript only when a certain media query condition is met. This means you can just write out the CSS when and if the query is true:

```javascript
if (window.matchMedia('screen and (min-width: 600px)')) {
  document.write('<link rel="stylesheet" href="css/small.css">');
}
```

However, instead of applying the CSS with a `<link>` element with a `href` which causes the undesired loading we'll use [`data-*`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) attributes instead. Anything we want dependent on the query will get a `data-` prefix:

```html
<link rel="stylesheet" class="mediaQueryDependent" 
  data-media="screen and (min-width: 600px)" 
  data-href="css/green.css">
<link rel="stylesheet" class="mediaQueryDependent" 
  data-media="screen and (min-width: 4000px)" 
  data-href="css/blue.css">
```

The function will loop through all the elements we want to change, evaluate their media queries, and change the `data-` prefixed attributes back to real ones:

```javascript
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
```

Here's what this function is doing:

* First, it uses `querySelectorAll` to get all the elements that need media query checks and loops over them (using a reverse `while` loop).
* Second, it tests if the element has a `data-media` property and if the query defined in it is true.
* Lastly, it loops through all `data-*` prefixed attributes and adds a non-prefixed attribute with its value (omitting the `media` one).


### Support

Current versions of Chrome, Firefox, and Safari, and IE10+ support `matchMedia`. [Read more](http://caniuse.com/#search=matchmed).
