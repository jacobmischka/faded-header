'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const Color = _interopDefault(require('color'));

function fadedHeader(headerSelector, collapseMargin, backgroundColor, textColor) {
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
		var scrolledValue = window.scrollY / collapseMargin;
		scrolledValue = scrolledValue > 0 ? scrolledValue : 0;
		scrolledValue = scrolledValue < 1 ? scrolledValue : 1;

		if (backgroundColor) {
			var newBackgroundColor = computeColor(headerBackgroundColor, collapsedBackgroundColor, scrolledValue).rgb().string(0);
			header.style.backgroundColor = newBackgroundColor;
		}

		if (textColor) {
			var newTextColor = computeColor(headerTextColor, collapsedTextColor, scrolledValue).rgb().string(0);
			header.style.color = newTextColor;
		}
	}
}

function computeColor(start, end, transformedValue) {
	return Color().red(start.red() + Math.pow(transformedValue, 2) * (end.red() - start.red())).green(start.green() + Math.pow(transformedValue, 2) * (end.green() - start.green())).blue(start.blue() + Math.pow(transformedValue, 2) * (end.blue() - start.blue())).alpha(start.alpha() + Math.pow(transformedValue, 2) * (end.alpha() - start.alpha()));
}

module.exports = fadedHeader;
