import Color from 'color';

export default function fadedHeader(headerSelector, collapseMargin, collapsedColor){
	const header = document.querySelector(headerSelector);

	let collapsedBackgroundColor = new Color(collapsedColor);
	let headerBackgroundColor = new Color(window.getComputedStyle(header)
		.getPropertyValue('background-color'));
		
	if(headerBackgroundColor.valpha === 0)
		headerBackgroundColor = new Color(collapsedColor).alpha(0);
	

	let isCollapsed = header.classList.contains('collapsed');
	if(!isCollapsed)
		header.classList.add('collapsed');
	console.log({headerBackgroundColor, collapsedBackgroundColor});

	if(isCollapsed && header.getBoundingClientRect().bottom > collapseMargin){
		header.classList.add('notransition');
		header.classList.add('collapsed');
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => {
				header.classList.remove('notransition');
			});
		});
	}

	['resize', 'scroll'].map(event => {
		window.addEventListener(event, () => {
			window.requestAnimationFrame(step);
		});
	});

	function step(){
		const headerRect = header.getBoundingClientRect();
		const headerHeight = header.clientHeight;

		if(header.classList.contains('collapsed')){
			if(headerRect.bottom > headerHeight){
				header.classList.remove('collapsed');
			}
		}
		else {
			if(headerRect.bottom < headerHeight){
				header.classList.add('collapsed');
			}
		}

		let scrolledValue = window.scrollY / collapseMargin;
		scrolledValue = scrolledValue > 0 ? scrolledValue : 0;
		scrolledValue = scrolledValue < 1 ? scrolledValue : 1;

		const newHeroColor = Color().red(headerBackgroundColor.red() + (Math.pow(scrolledValue, 2) * (collapsedBackgroundColor.red() - headerBackgroundColor.red())))
			.green(headerBackgroundColor.green() + (Math.pow(scrolledValue, 2) * (collapsedBackgroundColor.green() - headerBackgroundColor.green())))
			.blue(headerBackgroundColor.blue() + (Math.pow(scrolledValue, 2) * (collapsedBackgroundColor.blue() - headerBackgroundColor.blue())))
			.alpha(headerBackgroundColor.alpha() + (Math.pow(scrolledValue, 2) * (collapsedBackgroundColor.alpha() - headerBackgroundColor.alpha()))).rgb().string(0);
			
		console.log(newHeroColor);

		header.style.backgroundColor = newHeroColor;
	}
}
