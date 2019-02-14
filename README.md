# Carousel
A simple carousel to use when your UI framework of choice doesn't provide one.  
Made unprofessionally for unprofessional use (but with ❤).

## Installation
Simply include the files `carousel.css` and `carousel.js` in your HTML document.  
```
<link rel="stylesheet" href="carousel.css">
<script src="carousel.js"></script>
```

## Usage
Check any example document in the `examples` folder to get an idea on how to structure your carousel. Those are very basic, I promise.  
You will have to define the size of the carousel yourself. Check the file `examples/assets/style.css` as a reference.  
A single document can support multiple carousels in it.  
The root element of a carousel supports the following data attributes:
* `data-type`
	
	Determines if a carousel should be detected automatically on document load. The only accepted value is `"carousel"`.  
	Example: `<div class="carousel" data-type="carousel">...</div>`  
	If not specified, the carousel will have to be defined manually in a separate JavaScript file. Example on how to do that:  
	```
	let carousel = new Carousel(
		document.getElementsByClassName('slide'),
		document.getElementsByClassName('prev')[0],
		document.getElementsByClassName('next')[0],
		document.getElementsByName('indicator')
	);
	```
	Or, if jQuery is used:  
	```
	let carousel = new Carousel(
		$('.slide').toArray(),
		$('.prev').get(0),
		$('.next').get(0),
		$('input[name="indicator"]').toArray()
	);
	```
	The carousel can then be started by calling `start()` on the carousel object:  
	```
	carousel.start(2500)
	``` 
	Note how `start()` accepts an integer parameter: this specifies the delay, in milliseconds, between the transition from a slide to the next one. When left blank, a default delay of `3000` milliseconds will be applied.  
	Instead of `start()`, `displaySlide()` can be called.
	```
	carousel.displaySlide(0);
	``` 
	This will allow the carousel to display an initial slide at the specified index. The carousel won't flow automatically until `start()` is called, but it will still be controllable via the displayed controls.  
	If `start()` has been called previously, `stop()` can be called at any time to stop the carousel from flowing automatically.  
	```
	carousel.stop();
	``` 

* `data-manual`	
	
	Determines if a carousel flow should be controlled only via the displayed controls. No values should be assigned to this attribute.  
	Example: `<div class="carousel" data-type="carousel" data-manual>...</div>`  
	If not specified, the carousel will behave normally by flowing automatically. 

* `data-delay`
	
	Used to specify the delay, in milliseconds, between the transition from a slide to the next one. If not specified, a default delay of `3000` milliseconds will be applied.  
	Example: `<div class="carousel" data-type="carousel" data-delay="4000">...</div>`  
	This attribute will be ignored if `data-manual` is also specified.
