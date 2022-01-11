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


/*--------------------------menu hamburguesa*/
const btnMenu = document.querySelector(".hamburgermenu")
const menu = document.querySelector(".opc")
const btnSubmenu = document.querySelectorAll(".submenu-btn")
const submenu = document.querySelector(".submenu-opc")

btnMenu.addEventListener("click",function(){
    menu.classList.toggle("show")})


btnSubmenu.addEventListener("click",function(){
    submenu.classList.toggle("desplegar")})

/*for (let i=0; i < btnSubmenu.length; i++){
    console.log("hola")
    btnSubmenu[i].addEventListener("click", function(){
        if(window.innerWidth < 1024){
            const subMenu = this.nextElementSibling;
            const height = subMenu.scrollHeight;

            if (subMenu.classList.contains("desplegar")){
                subMenu.classList.remove("desplegar");
                subMenu.removeAttribute("style");
            }else{
                subMenu.classList.add("desplegar");
                subMenu.style.height = height + "px";
            }
        }
    })
}*/



