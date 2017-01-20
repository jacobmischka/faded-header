import Color from 'color';

export default function fadedHeader(headerSelector, collapseMargin, backgroundColor, textColor){
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
		let scrolledValue = window.scrollY / collapseMargin;
		scrolledValue = scrolledValue > 0 ? scrolledValue : 0;
		scrolledValue = scrolledValue < 1 ? scrolledValue : 1;

		if(backgroundColor){
			const newBackgroundColor = computeColor(headerBackgroundColor,
				collapsedBackgroundColor, scrolledValue).rgb().string(0);
			header.style.backgroundColor = newBackgroundColor;
		}
		
		if(textColor){
			const newTextColor = computeColor(headerTextColor,
				collapsedTextColor, scrolledValue).rgb().string(0);
			header.style.color = newTextColor;
		}
	}
}

function computeColor(start, end, transformedValue){
	return Color().red(start.red() + (Math.pow(transformedValue, 2) * (end.red() - start.red())))
		.green(start.green() + (Math.pow(transformedValue, 2) * (end.green() - start.green())))
		.blue(start.blue() + (Math.pow(transformedValue, 2) * (end.blue() - start.blue())))
		.alpha(start.alpha() + (Math.pow(transformedValue, 2) * (end.alpha() - start.alpha())));
}
