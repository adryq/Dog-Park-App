//api key storage
var parkAPIKey = "&api_key=ONqCMcecY29RtHlFW2uZcvjwuTM0lsk62DjxmdAs"; //park api key
var parkAPIURL = "https://developer.nps.gov/api/v1/parks?stateCode="; // park url
var apiKey = "755c65e42d689835b8fd27ff1e21603c"; //weather api key

var stateCode;
var fullName;
var parkEl;

var weatherContainerEl = document.querySelector("#current-weather");

//event listener for state button and dropdown
document.addEventListener("DOMContentLoaded", () => {
  const stateBtn = document.querySelector("#state-btn");
  const dropdownState = document.querySelector("#dropdown-state");

  stateBtn.addEventListener("click", () => {
    if (dropdownState.classList.contains("hidden")) {
      dropdownState.classList.remove("hidden");
      dropdownState.classList.add("flex");

      var states = [
        "AL",
        "AK",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "FL",
        "GA",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "OH",
        "OK",
        "OR",
        "PA",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
      ];

      var select = document.querySelector("#select");
      for (let i = 0; i < states.length; i++) {
        var option = document.createElement("option");
        option.textContent = states[i];
        select.appendChild(option);
      }
    } else {
      dropdownState.classList.remove("flex");
      dropdownState.classList.add("hidden");
    }
  });
});



function changeResult() {
  stateCode = document.querySelector("#select").value;
  console.log(stateCode);
  getParkInfo(stateCode);
}


function getParkInfo(stateCode) {
  fetch(
    parkAPIURL + stateCode + parkAPIKey
  ).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      parkEl = document.querySelector("#park-temp");
      while (parkEl.firstChild) {
        parkEl.removeChild(parkEl.firstChild);
      }
      for (i = 0; i < 10; i++) {
        
        console.log(data.data[i].fullName, data.data[i].description)
        var parkName = document.createElement("div");
        var description = document.createElement("div");
        var homePage = document.createElement('a');
        
        parkName.textContent = "" + data.data[i].fullName;
        description.textContent = "" + data.data[i].description;
        homePage.textContent = "" + data.data[i].url;
        homePage.href = data.data[i].url;
      
        parkEl.appendChild(parkName);
        parkEl.appendChild(description);
        parkEl.appendChild(homePage);
        
        //console.log(data.data[i].description);
           //retrieve lat & lon for weather
        var lat = data.data[i].latitude;
        var lon = data.data[i].longitude;
        //push to weather function
       weather(lat, lon, description);
      }

    });
  });
}
   

//retrieving the api with the city that we entered
var weather =  function (lat, lon, description) {
  var apiURL =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=` +
    apiKey;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      console.log("DATA: ", data);
      displayWeather(data, description);
    });
  });
};

//display the api containers and push the lat and lon to the the UV
var displayWeather = function (weather, description) {

  //create a div element for temperature data
  var temperatureEl = document.createElement("div");
  temperatureEl.textContent = "Temperature: " + convertKtoF(weather.current.temp) + " °F";
  temperatureEl.classList = "list-group-item";
  description.appendChild(temperatureEl);

  //create a div element for Humidity data
  var humidityEl = document.createElement("div");
  humidityEl.textContent = "Humidity: " + weather.current.humidity + " %";
  humidityEl.classList = "list-group-item";
  description.appendChild(humidityEl);

  //create a div element for Wind data
  var windSpeedEl = document.createElement("div");
  windSpeedEl.textContent = "Wind Speed: " + weather.current.wind_speed + " MPH";
  windSpeedEl.classList = "list-group-item";
  description.appendChild(windSpeedEl);
   
  description.appendChild(document.createElement("div"));

};

// convert Kelvin to Fahrenheit
var convertKtoF = function(kelvin){
  return Math.round((kelvin - 273.15) * 9/5 + 32);
}

