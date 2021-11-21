const slider = document.querySelector("#productDetail-slider");
let sliderSection = document.querySelectorAll(".productDetail-slider-section");
let sliderSectionLast = sliderSection[sliderSection.length -1];



const btnLeft = document.querySelector("#productDetail-btn-left");
const btnRight = document.querySelector("#productDetail-btn-right");

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function next()
{
    const first = 0;
    let sliderSectionFirst = document.querySelectorAll(".productDetail-slider-section")[first];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition ="none";
        slider.insertAdjacentElement("beforeend",sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 500);
}

function prev()
{
    let sliderSection = document.querySelectorAll(".productDetail-slider-section");
    let sliderSectionLast = sliderSection[sliderSection.length -1];
    slider.style.marginLeft = "0";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition ="none";
        slider.insertAdjacentElement("afterbegin", sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 500);
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



function increment()
{
    document.getElementById('demoInput').stepUp();
}    
function decrement() 
{
    document.getElementById('demoInput').stepDown();
}
    
function increment1()
{
    document.getElementById('demoInput1').stepUp();
}    
function decrement1() 
{
    document.getElementById('demoInput1').stepDown();

}

function increment2()
{
    document.getElementById('demoInput2').stepUp();
}    
function decrement2() 
{
    document.getElementById('demoInput2').stepDown();
}