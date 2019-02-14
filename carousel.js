/**
 *
 *
 * @author Alex Massa <alexmassa@outlook.it>
 * @licence MIT
 *
 */

const DEFAULT_INTERVAL_DELAY = 3000;

window.onload = function() {
	let carouselContainers = document.querySelectorAll('[data-type="carousel"]');
	if (carouselContainers === undefined || carouselContainers === null)
		return;
	carouselContainers.forEach(function(carouselContainer) {
		let carousel = new Carousel(
			carouselContainer.querySelectorAll('.slide'),
			carouselContainer.querySelector('.prev'),
			carouselContainer.querySelector('.next'),
			carouselContainer.querySelectorAll('input[type="radio"][name="indicator"]')
		);
		if ('manual' in carouselContainer.dataset)
			carousel.displaySlide(0);
		else
			carousel.start(carouselContainer.dataset.delay);
	});
}

class Carousel {

	constructor(slides, prevButton, nextButton, indicators) {
		this.slides = slides;
		this.indicators = indicators;
		this.slideIndex = 0;
		this.carouselInterval = undefined;
		this.intervalDelay = undefined;
		this.started = false;
		let self = this;
		if (prevButton !== undefined && prevButton !== null)
			prevButton.onclick = function() { self.plusSlide(-1) };
		if (nextButton !== undefined && nextButton !== null)
			nextButton.onclick = function() { self.plusSlide(+1) };
		if (indicators !== undefined && indicators !== null)
			indicators.forEach(function(indicator, slideIndex) {
				indicator.onclick = function() { self.displaySlide(slideIndex) };
			});
	}
	
	displaySlide(slideIndex) {
		clearInterval(this.carouselInterval);
		slideIndex = ((slideIndex % this.slides.length) + this.slides.length) % this.slides.length;
		this.slides[this.slideIndex].classList.remove('display');
		this.slides[slideIndex].classList.add('display');
		if (this.indicators !== undefined && this.indicators !== null && this.indicators.length !== 0)
			this.indicators[slideIndex].checked = true;
		this.slideIndex = slideIndex;
		if (this.started) {
			let self = this;
			this.carouselInterval = setInterval(function() { self.plusSlide(+1) }, this.intervalDelay);
		}
	}
	
	plusSlide(n) {
		this.displaySlide(this.slideIndex + n);
	}
	
	start(intervalDelay) {
		if (this.started)
			return;
		if (intervalDelay !== undefined && intervalDelay !== null)
			this.intervalDelay = intervalDelay;
		else
			this.intervalDelay = DEFAULT_INTERVAL_DELAY;
		this.carouselInterval = function(carousel) {
			carousel.plusSlide(1);
			carousel.carouselInterval = setInterval(function() {
				carousel.carouselInterval(carousel);
			}, carousel.intervalDelay);
		}
		this.started = true;
		this.displaySlide(this.slideIndex);
	}
	
	stop() {
		this.started = false;
	}

}