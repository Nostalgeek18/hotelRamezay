
//WHYYYYYYYYYYYYYY -> store the function with no dots ? 

// function triggerCarousel() {

// 	if(!document.getElementsByClassName('carousel')[0]) return; //no carousel
// 	const slideIndicator = document.getElementsByClassName('carousel--indicator')[0];
// 	const slides = slideIndicator.closest("[data-carousel").querySelector("[data-slides]")
// 	const dots = document.getElementsByClassName('carousel--indicator')[0];


// 	setInterval(()=>{
// 		const activeSlide = slides.querySelector("[data-active]")
// 		let newIndex = [...slides.children].indexOf(activeSlide) + 1
// 		if(newIndex < 0) newIndex = slides.children.length -1 //go back to last element
// 		if(newIndex >= slides.children.length) newIndex = 0; //go back first index 

// 		slides.children[newIndex].dataset.active = true 
// 		delete activeSlide.dataset.active
// 	},5000)
// }


// $(document).ready(function() {
	
// 	triggerCarousel();

// });
