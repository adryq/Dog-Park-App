//api key storage
var apiKey = "&appid=755c65e42d689835b8fd27ff1e21603c";

var cities = [];
//using london as example
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather");
var citySearchInputEl = document.querySelector("#searched-city");


document.addEventListener('DOMContentLoaded', ()=> {
    const stateBtn = document.querySelector
    ('#state-btn')
    const dropdownState = document.querySelector
    ('#dropdown-state')

    stateBtn.addEventListener('click', () => {
        if(dropdownState.classList.contains ('hidden')){
            dropdownState.classList.remove ('hidden');
            dropdownState.classList.add('flex');
           
        }
        else{
            dropdownState.classList.remove('flex')
            dropdownState.classList.add('hidden')
            
        }    
    }
    )

})


//retrieving the api with the city that we entered
var CityWeather = function (city) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=london&units=imperial${apiKey}`;

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log("DATA: ",  data);
                console.log("WEATHER DATA: ", data.weather[0])
                displayWeather(data, "london");
            });
        });
};

//display the api containers and push the lat and lon to the the UV
var displayWeather = function (weather, searchCity) {
    //clear old content
    weatherContainerEl.textContent = weather;
    citySearchInputEl.textContent = searchCity;


    //create an image element
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);

    //create a span element for temperature data
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item";

    //create a span element for Humidity data
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item";

    //create a span element for Wind data
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item";

    //append, display the content
    citySearchInputEl.appendChild(weatherIcon);
    weatherContainerEl.appendChild(temperatureEl);
    weatherContainerEl.appendChild(humidityEl);
    weatherContainerEl.appendChild(windSpeedEl);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
}