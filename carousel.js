/**
 * @author Alex Massa <alexmassa@outlook.it>
 * @licence MIT
 */

// jshint esversion: 6

const DEFAULT_INTERVAL_DELAY = 3000;

window.onload = function() {
	let carousels = document.querySelectorAll('[data-type="carousel"]');
	if (carousels)
		carousels.forEach(function(carousel) { new Carousel(carousel); });
};

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
		let self = this;
		
		if (this.indicators)
			this.indicators.forEach(function(indicator, slideIndex) {
				indicator.onclick = function() { self.displaySlide(slideIndex); };
			});
		if (prevButton)
			prevButton.onclick = function() { self.plusSlide(-1); };
		if (nextButton)
			nextButton.onclick = function() { self.plusSlide(+1); };
		if ('manual' in carousel.dataset)
			this.displaySlide(this.slideIndex);
		else
			this.start(this.intervalDelay);
	}
	
	displaySlide(slideIndex) {
		clearInterval(this.carouselInterval);
		slideIndex = ((slideIndex % this.slides.length) + this.slides.length) % this.slides.length;
		this.slides[this.slideIndex].classList.remove('display');
		this.slides[slideIndex].classList.add('display');
		if (this.indicators && this.indicators.length !== 0)
			this.indicators[slideIndex].checked = true;
		this.slideIndex = slideIndex;
		if (this.started) {
			let self = this;
			this.carouselInterval = setInterval(function() { self.plusSlide(+1); }, this.intervalDelay);
		}
	}
	
	plusSlide(n) {
		this.displaySlide(this.slideIndex + n);
	}
	
	start(intervalDelay) {
		if (this.started)
			return;
		this.intervalDelay = intervalDelay ? intervalDelay : DEFAULT_INTERVAL_DELAY;
		this.carouselInterval = function(carousel) {
			carousel.plusSlide(1);
			carousel.carouselInterval = setInterval(function() {
				carousel.carouselInterval(carousel);
			}, carousel.intervalDelay);
		};
		this.started = true;
		this.displaySlide(this.slideIndex);
	}
	
	stop() {
		this.started = false;
	}

}