/**
 * @author Alex Massa <alexmassa@outlook.it>
 * @licence MIT
 */

 /*jshint esversion: 6 */

const DEFAULT_INTERVAL_DELAY = 3000;

window.addEventListener('load', () => {
	let carousels = document.querySelectorAll('[data-type="carousel"]');
	if (carousels)
		carousels.forEach(carousel => new Carousel(carousel));
});

class Carousel {

	constructor(carousel) {
		this.slides = carousel.querySelectorAll('.slide');
		this.indicators = carousel.querySelectorAll('input[name="indicator"]');
		this.intervalDelay = carousel.dataset.delay;
		this.slideIndex = 0;
		this.carouselInterval = undefined;
		this.started = false;

		let prevButton = carousel.querySelector('[name="prev"]');
		let nextButton = carousel.querySelector('[name="next"]');
		
		if (this.indicators)
			this.indicators.forEach((indicator, slideIndex) =>
				indicator.onclick = () => this.displaySlide(slideIndex)
			);
		if (prevButton)
			prevButton.onclick = () => this.plusSlide(-1);
		if (nextButton)
			nextButton.onclick = () => this.plusSlide(+1);
		if ('manual' in carousel.dataset)
			this.displaySlide(this.slideIndex);
		else
			this.start(this.intervalDelay);
	}
	
	displaySlide(slideIndex) {
		clearInterval(this.carouselInterval);
		this._displaySlide(slideIndex);
		if (this.started)
			this.carouselInterval = setInterval(() => this.plusSlide(+1), this.intervalDelay);
	}
	
	plusSlide(n) {
		this.displaySlide(this.slideIndex + n);
	}
	
	start(intervalDelay) {
		this.intervalDelay = intervalDelay ? intervalDelay : (this.intervalDelay ? this.intervalDelay : DEFAULT_INTERVAL_DELAY);
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
		if (this.indicators && this.indicators.length !== 0)
			this.indicators[slideIndex].checked = true;
		this.slideIndex = slideIndex;
	}

}