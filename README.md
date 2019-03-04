# Carousel
A simple carousel to use when your UI framework of choice doesn't provide one.  
Made unprofessionally for unprofessional use (with ❤).

## Installation
Simply include the files `carousel.min.css` and `carousel.min.js` in your HTML document.  
```
<link rel="stylesheet" href="carousel.min.css">
<script src="carousel.min.js"></script>
```

## Usage
Check any example document in the `examples` folder to get an idea on how to structure your carousel. The example are very basic and simple to understand.  
The dimensions of a carousel must be manually defined by using CSS rules, or alternatively by assigning a class with a predefined width and height to its root element. Check the file `examples/assets/style.css` as a reference.  
A single document can contain multiple carousels in it.  
The root element of a carousel supports the following data attributes:
* `data-type`
	
	Determines if a carousel should be detected and started automatically on document load. The only accepted value is `"carousel"`.  
	Example: `<div class="carousel" data-type="carousel">...</div>`  
	If not specified, the carousel must be created manually by using JavaScript. Example on how to do that (assuming that your carousel root has the attribute `id="my-carousel"`):  
	```
	let carousel = new Carousel(document.getElementById('my-carousel'));
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
	
	Determines if a carousel flow should be controlled only via the displayed controls. No value should be assigned to this attribute.  
	Example: `<div class="carousel" data-type="carousel" data-manual>...</div>`  
	If not specified, the carousel will behave normally by flowing automatically. 

* `data-delay`
	
	Used to specify the delay, in milliseconds, between the transition from a slide to the next one. If not specified, a default delay of `3000` milliseconds will be applied.  
	Example: `<div class="carousel" data-type="carousel" data-delay="4000">...</div>`  
	If this attribute has a value assigned and the method `start()` is called with an integer parameter, the value of the parameter will override the value of the attribute.
