/**
* @author Alex Massa <alexmassa@outlook.it>
* @licence MIT
*/

/*jshint esversion: 6 */

const DEFAULT_DELAY = 3000;

window.addEventListener('load', _ => {
	let carousels = document.querySelectorAll('[data-type="carousel"]');
	if (carousels)
		carousels.forEach(carousel => new Carousel(carousel));
});

class Carousel {
	
	constructor(carousel) {
		this.slides = carousel.querySelectorAll('.slide');
		this.indicators = carousel.querySelectorAll('input[name="indicator"]');
		this.delay = carousel.dataset.delay;
		this.slideIndex = 0;
		this.timeout = undefined;
		this.started = false;
		
		let prevButton = carousel.querySelector('[name="prev"]');
		let nextButton = carousel.querySelector('[name="next"]');
		
		if (this.indicators)
			this.indicators.forEach((indicator, slideIndex) =>
			indicator.onclick = _ => this.displaySlide(slideIndex)
		);
		if (prevButton)
			prevButton.onclick = _ => this.plusSlide(-1);
		if (nextButton)
			nextButton.onclick = _ => this.plusSlide(+1);
		if ('manual' in carousel.dataset)
			this.displaySlide(this.slideIndex);
		else
			this.start(this.delay);
	}
	
	displaySlide(slideIndex) {
		clearTimeout(this.timeout);
		this._displaySlide(slideIndex);
		if (this.started)
			this.timeout = setTimeout(_ => this.plusSlide(+1), this.delay);
	}
	
	plusSlide(n) {
		this.displaySlide(this.slideIndex + n);
	}
	
	start(delay) {
		this.delay = delay || this.delay || DEFAULT_DELAY;
		this.started = true;
		this.displaySlide(this.slideIndex);
	}
	
	stop() {
		this.started = false;
	}
	
	_displaySlide(slideIndex) {
		slideIndex = ((slideIndex % this.slides.length) + this.slides.length) % this.slides.length;
		this.slides[this.slideIndex].classList.remove('display');
		this.slides[slideIndex].classList.add('display');
		if (this.indicators && slideIndex < this.indicators.length)
			this.indicators[slideIndex].checked = true;
		this.slideIndex = slideIndex;
	}
	
}