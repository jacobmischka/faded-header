import Color from 'color';

export default function fadedHeader(headerSelector, options){
	const { backgroundColor, textColor } = options;
	const transformRange = options.transformRange || window.innerHeight;
	const easingFunction = ratio => Math.pow(ratio, 2) || options.easingFunction;
	const backgroundEasingFunction = options.backgroundEasingFunction || easingFunction;
	const textEasingFunction = options.textEasingFunction || easingFunction;
	
	if(!backgroundColor && !textColor){
		console.log('No colors passed to fadedHeader, nothing to do');
		return;
	}
	
	const header = document.querySelector(headerSelector);

	let collapsedBackgroundColor = new Color(backgroundColor);
	let collapsedTextColor = new Color(textColor);

	let headerBackgroundColor = new Color(window.getComputedStyle(header)
		.getPropertyValue('background-color'));
	if(headerBackgroundColor.valpha === 0)
		headerBackgroundColor = new Color(backgroundColor).alpha(0);
		
	let headerTextColor = new Color(window.getComputedStyle(header)
		.getPropertyValue('color'));
	if(headerTextColor.valpha === 0)
		headerTextColor = new Color(textColor).alpha(0);

	['resize', 'scroll'].map(event => {
		window.addEventListener(event, () => {
			window.requestAnimationFrame(step);
		});
	});

	function step(){
		let scrolledValue = window.scrollY / transformRange;
		scrolledValue = scrolledValue > 0 ? scrolledValue : 0;
		scrolledValue = scrolledValue < 1 ? scrolledValue : 1;

		if(backgroundColor){
			const newBackgroundColor = computeColor(
				headerBackgroundColor,
				collapsedBackgroundColor,
				backgroundEasingFunction(scrolledValue)
			).rgb().string(0);
			
			header.style.backgroundColor = newBackgroundColor;
		}
		
		if(textColor){
			const newTextColor = computeColor(
				headerTextColor,
				collapsedTextColor,
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
