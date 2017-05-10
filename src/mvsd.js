function MVSD(slides) {

	var currentIndex; // It's 1..indexed
	var currentSlide;
	
	if(slides === undefined) {
		slides = Array.from(document.querySelectorAll('section'));
	}

	currentIndex = 0;
	currentSlide = slides[currentIndex - 1];

	slides.forEach((s, i) => s.setAttribute('id', i + 1));
	preloadBackgroundImages(slides);

	document.addEventListener('keydown', function (e) {
		if (!(e.metaKey || e.shiftKey || e.ctrlKey || e.altKey)) {
			switch (e.which) {
				case 37: // left
					prevSlide();
					e.preventDefault();
					break;
				
				case 32: // space
				case 39: // right
					nextSlide();
					e.preventDefault();
					break;

				case 38: // up
					hideOneFragment();
					e.preventDefault();
					break;

				case 40: // down
					showOneFragment();
					e.preventDefault();
					break;
			}
		}
	});
	
	var onSlideChange = this.onSlideChange = function() {};

	gotoSlide(readHash() || 1);


	// SLIDE NAVIGATION

	function prevSlide() {
		gotoSlide(currentIndex - 1);
	}

	function nextSlide() {
		gotoSlide(currentIndex + 1);
	}

	function gotoSlide(n) {
		// clamp value to slide range
		n = Math.max(1, Math.min(slides.length, n));

		// are we actually changing slides?
		if (n === currentIndex) {
			return;
		}
		currentIndex = n;
		currentSlide = slides[currentIndex - 1];

		window.location.hash = "#" + n;

		slides.forEach(function (slide) {
			if (slide === currentSlide) {
				slide.classList.add('active');
			} else {
				slide.classList.remove('active');
			}
		});

		disableAllIframes(slides);
		enableIframesAtSlide(currentSlide);

		onSlideChange(currentIndex);
	}

	// FRAGMENTS

	function hideOneFragment() {
		var visibleFragments = Array.from(currentSlide.querySelectorAll('.fragment.visible'));
		var lastVisible = visibleFragments.pop();
		if(lastVisible) {
			hideFragment(lastVisible);
		}
	}

	function showOneFragment() {
		var fragments = getFragmentsAtSlide(currentIndex - 1);
		var nextFragment;
		
		for(var i = 0; i < fragments.length; i++) {
			var f = fragments[i];
			if(!f.classList.contains('visible')) {
				nextFragment = f;
				break;
			}
		}
		
		if(nextFragment) {
			showFragment(nextFragment);
		}
	}
	
	function getFragmentsAtSlide(index) {
		var slide = slides[index];
		var fragments = Array.from(slide.querySelectorAll('.fragment'));
		return fragments;
	}


	function hideFragment(f) {
		f.classList.remove('visible');
	}

	function showFragment(f) {
		f.classList.add('visible');
	}

	// URLs

	window.addEventListener('hashchange', function(e) {
		e.preventDefault();
		var newSlide = readHash();
		gotoSlide(newSlide);
	});

	function readHash() {
		return parseInt(window.location.hash.substr(1), 10);
	}

	// FULL BACKGROUND IMAGES
	
	function preloadBackgroundImages(slides) {
		// data-background to section style background value
		slides.forEach((s) => {
			var bg = s.dataset['background'];
			if(bg !== undefined) {
				s.style.backgroundImage = `url(${bg})`;
				preloadImage(bg);
			}
		});
	}

	var preloadContainer;
	function preloadImage(url) {
		if(!preloadContainer) {
			preloadContainer = document.createElement('div');
			preloadContainer.style.visibility = 'hidden';
			document.body.appendChild(preloadContainer);
		}

		var img = document.createElement('img');
		img.src = url;
		preloadContainer.appendChild(img);
	}


	// IFRAME HANDLING
	function disableAllIframes(slides) {
		slides.forEach((slide) => {
			getSlideIframes(slide).forEach(disableIframe);
		});
	}

	function disableIframe(iframe) {
		var dataSrc = iframe.dataset.src;
			var src = iframe.src;
			iframe.removeAttribute('src');
			iframe.src = '';
	}

	function getSlideIframes(slide) {
		return Array.from(slide.querySelectorAll('iframe'));
	}

	function enableIframesAtSlide(slide) {
		var iframes = getSlideIframes(slide); 
		iframes.forEach(iframe => {
			var dataSrc = iframe.dataset.src;
			if(dataSrc) {
				iframe.src = dataSrc;
			}
		});
	}
}

