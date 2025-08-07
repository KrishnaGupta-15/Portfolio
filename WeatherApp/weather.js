const userTab = document.querySelector("#yourWeatherTab");
const searchTab = document.querySelector("#searchWeatherTab");
const userContainer = document.querySelector(".mainContent");
const grantAccessContainer = document.querySelector(".grantLocationContainer");
const searchForm = document.querySelector(".searchForm");
const loadingScreen = document.querySelector(".loadingScreen");
const userInfoContainer = document.querySelector(".user-info-container");
const grantAccessButton = document.querySelector(".grantLocationButton");

const apiKey="7a7e4cfdc340c8e7f2164a8b0480cda5";

let currentTab = userTab;
currentTab.classList.add("current-tab");

getfromSessionStorage();
// To switch between tabs
function switchTab(clickedTab) {
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;   
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    switchTab(userTab);
});
searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

grantAccessButton.addEventListener("click", getLocation);

function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    } else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    // userInfoContainer.classList.remove("active");

   try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
   }
    catch (error) {
          loadingScreen.classList.remove("active");
          userInfoContainer.classList.remove("active");
          alert("Unable to fetch weather data. Please try again later.");
     }
}

function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector(".cityName");
    const weatherDesc = document.querySelector(".weatherDescription");
    const temperature = document.querySelector(".temperature");
    const humidity = document.querySelector("#humidityValue");
    const windSpeed = document.querySelector("#windValue");
    const weatherIcon = document.querySelector("#weatherIcon");
    const countryFlag = document.querySelector(".countryFlag");
    const cloud = document.querySelector("#cloudsValue");

    //Fetch values from the weatherInfo object
    cityName.innerText = weatherInfo?.name
        ? weatherInfo.name
        : "Unknown Location";
    countryFlag.src = `https://flagcdn.com/w320/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    weatherDesc.innerText = weatherInfo?.weather[0]?.description;
    temperature.innerText = weatherInfo?.main?.temp
        ? `${Math.round(weatherInfo.main.temp)}°C`
        : "N/A";
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather[0]?.icon}.png`;
    humidity.innerText = weatherInfo?.main?.humidity
        ? `${weatherInfo.main.humidity}%`
        : "N/A";
    windSpeed.innerText = weatherInfo?.wind?.speed
        ? `${Math.round(weatherInfo.wind.speed)} m/s`
        : "N/A";
    cloud.innerText = weatherInfo?.clouds?.all
        ? `${weatherInfo.clouds.all}%`
        : "N/A";    
}

const searchInput = document.querySelector("#searchInput");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value.trim();
    if(cityName.length > 0){
        fetchSearchWeatherInfo(cityName);
    }
});

async function fetchSearchWeatherInfo(cityName) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await res.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchInput.value = "";
        alert("Unable to fetch weather data. Please check the city name and try again.");
    }
}