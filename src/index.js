import Color from 'color';

export default function fadedHeader(headerSelector, options){
	if(!options.backgroundColor && !options.textColor){
		console.log('No colors passed to fadedHeader, nothing to do');
		return;
	}
	
	let backgroundColor = Array.isArray(options.backgroundColor)
		? options.backgroundColor
		: [options.backgroundColor];
	let textColor = Array.isArray(options.textColor)
		? options.textColor
		: [options.textColor];
	let transformRange = Array.isArray(options.transformRange)
		? options.transformRange
		: [options.transformRange];
	const easingFunction =  options.easingFunction || (ratio => Math.pow(ratio, 2));
	const backgroundEasingFunction = options.backgroundEasingFunction || easingFunction;
	const textEasingFunction = options.textEasingFunction || easingFunction;
		
	const header = document.querySelector(headerSelector);

	let headerBackgroundColor = new Color(window.getComputedStyle(header)
		.getPropertyValue('background-color'));
	if(headerBackgroundColor.valpha === 0)
		headerBackgroundColor = new Color(backgroundColor).alpha(0);
	backgroundColor.unshift(headerBackgroundColor);
		
	let headerTextColor = new Color(window.getComputedStyle(header)
		.getPropertyValue('color'));
	if(headerTextColor.valpha === 0)
		headerTextColor = new Color(textColor).alpha(0);
	textColor.unshift(headerTextColor);
	
	transformRange.unshift(0);
	
	backgroundColor = backgroundColor.map(color => new Color(color));
	textColor = textColor.map(color => new Color(color));

	['resize', 'scroll', 'load'].map(event => {
		window.addEventListener(event, () => {
			window.requestAnimationFrame(step);
		});
	});

	function step(){
		let i = transformRange.findIndex(y => window.scrollY < y);
		if(i <= 0){
			header.style.backgroundColor = backgroundColor[backgroundColor.length - 1];
			header.style.color = textColor[textColor.length - 1];
			return;
		}
			
		let startY = transformRange[i - 1];
		let endY = transformRange[i];
		
		let backgroundStart, backgroundEnd;
		if(i in backgroundColor && (i - 1) in backgroundColor){
			backgroundStart = backgroundColor[i - 1];
			backgroundEnd = backgroundColor[i];
		}
		
		let textStart, textEnd;
		if(i in textColor && (i - 1) in textColor){
			textStart = textColor[i - 1];
			textEnd = textColor[i];
		}
		
		let scrolledValue = (window.scrollY - startY) / (endY - startY);
		scrolledValue = scrolledValue > 0 ? scrolledValue : 0;
		scrolledValue = scrolledValue < 1 ? scrolledValue : 1;

		if(backgroundStart && backgroundEnd){
			const newBackgroundColor = computeColor(
				backgroundStart,
				backgroundEnd,
				backgroundEasingFunction(scrolledValue)
			).rgb().string(0);
			
			header.style.backgroundColor = newBackgroundColor;
		}
		
		if(textStart && textEnd){
			const newTextColor = computeColor(
				textStart,
				textEnd,
				textEasingFunction(scrolledValue)
			).rgb().string(0);
			header.style.color = newTextColor;
		}
	}
}

function computeColor(start, end, transformedValue){
	return Color().red(start.red() + (transformedValue * (end.red() - start.red())))
		.green(start.green() + (transformedValue * (end.green() - start.green())))
		.blue(start.blue() + (transformedValue * (end.blue() - start.blue())))
		.alpha(start.alpha() + (transformedValue * (end.alpha() - start.alpha())));
}
