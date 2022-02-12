let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
let slideIndex = -1;
let repeater;

function carousel() {

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  } // cycle through and hide all the images

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  } else if (slideIndex <= 0) {
    slideIndex = slides.length;
  } // what to do if slideIndex is too high or too low

  slides[slideIndex - 1].style.display = "block";
  // show the relevant slide
}

function cycle(r) {

  if (r) { // if r is true then clear and restart the timer
    clearInterval(repeater); // clear the timer
    repeater = setInterval(function() { // start the timer
      carousel();
    }, 5000);
  } else {
    clearInterval(repeater); // clear and stop the timer if r isn't true
  }
}

window.onload = function() {
  carousel();
}; // show the start image on load

carousel();
cycle(true);


function plusDivs(n) {
  cycle(true);
  slideIndex += n - 1;
  carousel();
}

function currentDiv(n) {
  cycle(true);
  slideIndex = n - 1;
  carousel();
}