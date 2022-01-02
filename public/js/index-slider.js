const slider = document.querySelector("#index-slider");
let sliderSection = document.querySelectorAll(".index-slider-section");
let sliderSectionLast = sliderSection[sliderSection.length -1];


const btnLeft = document.querySelector("#index-btn-left");
const btnRight = document.querySelector("#index-btn-right");

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function next()
{
    const first = 0;
    let sliderSectionFirst = document.querySelectorAll(".index-slider-section")[first];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 1s";
    setTimeout(function(){
        slider.style.transition ="none";
        slider.insertAdjacentElement("beforeend",sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 1000);
}

function prev()
{
    let sliderSection = document.querySelectorAll(".index-slider-section");
    let sliderSectionLast = sliderSection[sliderSection.length -1];
    slider.style.marginLeft = "0";
    slider.style.transition = "all 1s";
    setTimeout(function(){
        slider.style.transition ="none";
        slider.insertAdjacentElement("afterbegin", sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 1000);
}

btnRight.addEventListener('click', function(){
    next();
    clearInterval(intervalo);
});

btnLeft.addEventListener('click', function(){
    prev();
    clearInterval(intervalo);
});

const intervalo = setInterval(() => {
    next();
}, 5000);




