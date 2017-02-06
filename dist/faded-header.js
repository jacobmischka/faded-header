import Color from 'color';

function fadedHeader(headerSelector, options) {
	if (!options.backgroundColor && !options.textColor) {
		console.log('No colors passed to fadedHeader, nothing to do');
		return;
	}

	var backgroundColor = Array.isArray(options.backgroundColor) ? options.backgroundColor : [options.backgroundColor];
	var textColor = Array.isArray(options.textColor) ? options.textColor : [options.textColor];
	var transformRange = Array.isArray(options.transformRange) ? options.transformRange : [options.transformRange];
	var easingFunction = options.easingFunction || function (ratio) {
		return Math.pow(ratio, 2);
	};
	var backgroundEasingFunction = options.backgroundEasingFunction || easingFunction;
	var textEasingFunction = options.textEasingFunction || easingFunction;

	var header = document.querySelector(headerSelector);

	var headerBackgroundColor = new Color(window.getComputedStyle(header).getPropertyValue('background-color'));
	if (headerBackgroundColor.valpha === 0) headerBackgroundColor = new Color(backgroundColor).alpha(0);
	backgroundColor.unshift(headerBackgroundColor);

	var headerTextColor = new Color(window.getComputedStyle(header).getPropertyValue('color'));
	if (headerTextColor.valpha === 0) headerTextColor = new Color(textColor).alpha(0);
	textColor.unshift(headerTextColor);

	transformRange.unshift(0);

	backgroundColor = backgroundColor.map(function (color) {
		return new Color(color);
	});
	textColor = textColor.map(function (color) {
		return new Color(color);
	});

	console.log({
		backgroundColor: backgroundColor,
		textColor: textColor,
		transformRange: transformRange
	});

	['resize', 'scroll', 'load'].map(function (event) {
		window.addEventListener(event, function () {
			window.requestAnimationFrame(step);
		});
	});

	function step() {
		var i = transformRange.findIndex(function (y) {
			return window.scrollY < y;
		});
		if (i <= 0) {
			header.style.backgroundColor = backgroundColor[backgroundColor.length - 1];
			header.style.color = textColor[textColor.length - 1];
			return;
		}

		console.log(i);

		var startY = transformRange[i - 1];
		var endY = transformRange[i];

		var backgroundStart = void 0,
		    backgroundEnd = void 0;
		if (i in backgroundColor && i - 1 in backgroundColor) {
			backgroundStart = backgroundColor[i - 1];
			backgroundEnd = backgroundColor[i];
		}

		var textStart = void 0,
		    textEnd = void 0;
		if (i in textColor && i - 1 in textColor) {
			textStart = textColor[i - 1];
			textEnd = textColor[i];
		}

		var scrolledValue = (window.scrollY - startY) / (endY - startY);
		scrolledValue = scrolledValue > 0 ? scrolledValue : 0;
		scrolledValue = scrolledValue < 1 ? scrolledValue : 1;

		if (backgroundStart && backgroundEnd) {
			var newBackgroundColor = computeColor(backgroundStart, backgroundEnd, backgroundEasingFunction(scrolledValue)).rgb().string(0);

			header.style.backgroundColor = newBackgroundColor;
		}

		if (textStart && textEnd) {
			var newTextColor = computeColor(textStart, textEnd, textEasingFunction(scrolledValue)).rgb().string(0);
			header.style.color = newTextColor;
		}
	}
}

function computeColor(start, end, transformedValue) {
	return Color().red(start.red() + transformedValue * (end.red() - start.red())).green(start.green() + transformedValue * (end.green() - start.green())).blue(start.blue() + transformedValue * (end.blue() - start.blue())).alpha(start.alpha() + transformedValue * (end.alpha() - start.alpha()));
}

export default fadedHeader;
