const module=document.querySelector(".projectsModule");
const overlay = document.querySelector(".overlay");

//Module open
const openModule =() =>{
    console.log("Module is open");
    module.classList.add("active");
    overlay.classList.add("overlayactive");
}

//module close
const closeModule = () => {
    module.classList.remove("active");
    overlay.classList.remove("overlayactive");
    
}