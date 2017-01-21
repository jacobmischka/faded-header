'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Color = _interopDefault(require('color'));

function fadedHeader(headerSelector, options) {
	var backgroundColor = options.backgroundColor,
	    textColor = options.textColor;

	var transformRange = options.transformRange || window.innerHeight;
	var easingFunction = function easingFunction(ratio) {
		return Math.pow(ratio, 2) || options.easingFunction;
	};
	var backgroundEasingFunction = options.backgroundEasingFunction || easingFunction;
	var textEasingFunction = options.textEasingFunction || easingFunction;

	if (!backgroundColor && !textColor) {
		console.log('No colors passed to fadedHeader, nothing to do');
		return;
	}

	var header = document.querySelector(headerSelector);

	var collapsedBackgroundColor = new Color(backgroundColor);
	var collapsedTextColor = new Color(textColor);

	var headerBackgroundColor = new Color(window.getComputedStyle(header).getPropertyValue('background-color'));
	if (headerBackgroundColor.valpha === 0) headerBackgroundColor = new Color(backgroundColor).alpha(0);

	var headerTextColor = new Color(window.getComputedStyle(header).getPropertyValue('color'));
	if (headerTextColor.valpha === 0) headerTextColor = new Color(textColor).alpha(0);

	['resize', 'scroll'].map(function (event) {
		window.addEventListener(event, function () {
			window.requestAnimationFrame(step);
		});
	});

	function step() {
		var scrolledValue = window.scrollY / transformRange;
		scrolledValue = scrolledValue > 0 ? scrolledValue : 0;
		scrolledValue = scrolledValue < 1 ? scrolledValue : 1;

		if (backgroundColor) {
			var newBackgroundColor = computeColor(headerBackgroundColor, collapsedBackgroundColor, backgroundEasingFunction(scrolledValue)).rgb().string(0);

			header.style.backgroundColor = newBackgroundColor;
		}

		if (textColor) {
			var newTextColor = computeColor(headerTextColor, collapsedTextColor, textEasingFunction(scrolledValue)).rgb().string(0);
			header.style.color = newTextColor;
		}
	}
}

function computeColor(start, end, transformedValue) {
	return Color().red(start.red() + transformedValue * (end.red() - start.red())).green(start.green() + transformedValue * (end.green() - start.green())).blue(start.blue() + transformedValue * (end.blue() - start.blue())).alpha(start.alpha() + transformedValue * (end.alpha() - start.alpha()));
}

module.exports = fadedHeader;
