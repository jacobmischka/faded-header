faded-header
============

Change the color of an element based on how far the page has scrolled.

Intended to fade in a fixed header as a visitor scrolls down.

Will transform from any (or no) initial colors to any colors parseable by the excelent [color][color] library.

See [index.html][index] for usage example.

## Arguments
```js
fadedHeader(headerSelector, {
	// Default values below
	transformRange: window.innerHeight, // Page window.scrollY at which should be fully transformed
	backgroundColor: null, // Background color to transform to
	textColor: null, // Text color to transform to
	easingFunction: ratio => Math.pow(ratio, 2), // Easing function for the scrolled ratio. Number between 0 and 1 goes in and a number between 0 and 1 should come out
	backgroundEasingFunction: null, // Overrides easingFunction for background if set
	textEasingFunction: null // Overrides easing function for text if set
});
```
If neither `backgroundColor` nor `textColor` are passed, will just log and return without doing anything.

`transformRange`, `backgroundColor`, and `textColor` can be arrays. 

[color]: https://github.com/Qix-/color
[index]: https://github.com/jacobmischka/faded-header/blob/master/index.html
