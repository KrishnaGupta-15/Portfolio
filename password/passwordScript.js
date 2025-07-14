// fetching data from html
const inputSlider =document.querySelector(".slider");
const lengthDisplay = document.querySelector(".lengthValue");
const passwordDisplay = document.querySelector(".display");
const copyBtn = document.querySelector("#copyButton");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#upper");
const lowercaseCheck = document.querySelector("#lower");
const symbolsCheck = document.querySelector("#symbols");
const numbersCheck = document.querySelector("#numbers");
const indicator = document.querySelector(".light");
const generateBtn = document.querySelector(".generate");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = `~!@#$%^&*()_+<>>?:"{},./;'[]=-|`

let password="";
let passwordLength = 10;
let checkCount=0;
handleSlider();

// set passwordLength
function handleSlider(){
    inputSlider.value= passwordLength;
    lengthDisplay.innerText=passwordLength;
}

//set indicator
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 10px ${color}`;


}
//Random Generator
function getRndInteger(min,max){
    
    return Math.floor(Math.random() * ( max - min) ) + min;
}

function generateRandomNumber(){

    return getRndInteger(0,9).toString();
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
    //97-lowercase a ki sky value and 123- lowercase z ki
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
    
}
function generateSymbol(){
    const randNumber = getRndInteger(0,symbols.length);
    return symbols.charAt(randNumber);

}

//password strength
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower =true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum|| hasSym) && passwordLength >=8){
        setIndicator("#0f0");
    }
    else if((hasUpper|| hasLower)&& (hasNum|| hasSym) && passwordLength >=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

// Copy Content
async function copyContent(){
    try{
       await navigator.clipboard.writeText(passwordDisplay.value);
       copyMsg.innerText="Copied";

    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    copyMsg.classList.add("active");
    setTimeout( ()=> {
        copyMsg.classList.remove("active");

    },2000);
}

//Handling Checkbox
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    })
    //specical condition
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

//Shuffle function
function shufflePassword(array){
    //Fisher Yates Method
    for( let i=array.length-1; i>0; i--){
        const j= Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
        }
        let str="";
        array.forEach((el)=> (str+=el));
        return str;

}
        

//Event-Listeners
inputSlider.addEventListener('input',(e) => {
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value)
        copyContent();
})

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})

//Generate Button
generateBtn.addEventListener('click', ()=>{
    //none of the checkbox selected
    if(checkCount==0)
         return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    };

    //new password
    //remove old password
    password=""

    
    let funArr=[];
    if(uppercaseCheck.checked)
        funArr.push(generateUpperCase);
    if(lowercaseCheck.checked)
        funArr.push(generateLowerCase);
    if(numbersCheck.checked)
        funArr.push(generateRandomNumber);
    if(symbolsCheck.checked)
        funArr.push(generateSymbol);
    
    //Compulsory Additions
    for(let i=0; i<funArr.length;i++){
        password+=funArr[i]();
    }
    //Remaining Additions
    for(i=0; i<passwordLength-funArr.length;i++){
        let randIndex= getRndInteger(0,funArr.length);
        password+= funArr[randIndex]();
    }

    //shuffle the password
    password = shufflePassword(Array.from(password));

    //show in UI
    passwordDisplay.value=password;
    calcStrength();



})
