const box = document.getElementById("box");
const sun = document.getElementById("sun");
const toggleBox = document.getElementById("toggleBox");
const modeText = document.getElementById("modeText");
const returnButton = document.getElementById("returnButton");
let isDay = true;
box.addEventListener("click",  () => {
    if(isDay){
        night();
    }
    else{
        day();
    }
    isDay = !isDay;
});


function day(){
    toggleBox.classList.remove("nightMode");
    box.classList.remove("animateNight");
    sun.classList.remove("animateMoon");
    toggleBox.classList.add("dayMode");
    box.classList.add("animate");
    sun.classList.add("animateSun");
    modeText.textContent = "Day Mode";
    // modeText.style.color = "black";
    modeText.classList.remove("nightModeText");
    modeText.classList.add("dayModeText");
    document.body.style.backgroundColor = "rgb(174, 151, 81)";
    returnButton.style.backgroundColor = "rgb(209, 209, 117)";
   
    

}
function night(){
    toggleBox.classList.remove("dayMode");
    toggleBox.classList.add("nightMode");
    box.classList.remove("animate");
    sun.classList.remove("animateSun");
    box.classList.add("animateNight");
    sun.classList.add("animateMoon");
    modeText.textContent = "Night Mode";
    // modeText.style.color = "white";
    modeText.classList.remove("dayModeText");
    modeText.classList.add("nightModeText");
    document.body.style.backgroundColor = "black";
    returnButton.style.backgroundColor = "#d3d3d3";
    
}

console.log("gsap");