const weather = document.querySelector(".js-weahter");
const COORDS = "coords";
const city = "Seoul"

function getWeather(city) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}`
    )
    .then(function(response){
        return console.log(response.json());
    })
    .then(function(json){
        const temperture = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperture} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handlesGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {latitude, longitude};
    saveCoords(coordsObj);
    getWeather(city);
}

function handlesGeoError() {
    console.log("Cannot access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handlesGeoSuccess, handlesGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather()
        console.log(city);
    }
}

function init() {
    askForCoords();
}

init();