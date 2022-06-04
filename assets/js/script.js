//api key storage
var parkAPIKey = "&api_key=ONqCMcecY29RtHlFW2uZcvjwuTM0lsk62DjxmdAs"; //park api key
var parkAPIURL = "https://developer.nps.gov/api/v1/parks?stateCode="; // park url
var apiKey = "755c65e42d689835b8fd27ff1e21603c"; //weather api key

//saving variables
var pastSearchButtonEl = document.querySelector("#searched-states");
var Abreviation = [];

var stateCode;
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
  getParkInfo(stateCode);

  //checking local storage if there same state has been selected
  // var copy = localStorage.getItem(JSON.stringify(Abreviation));
  // console.log(copy);
  // if (stateCode === copy) {
  //   window.alert(
  //     "You have already selected this state.  Please review the bookmarks or select another state.  Thank you."
  //   );
  //   return changeResult();
  // }

  Abreviation.unshift({ stateCode });
  saveSearch();
  pastSearch(stateCode);
}

//save to local storage
var saveSearch = function () {
  localStorage.setItem("State selected:", JSON.stringify(Abreviation));
};

function getParkInfo(stateCode) {
  fetch(parkAPIURL + stateCode + parkAPIKey).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      parkEl = document.querySelector("#park-temp");
      while (parkEl.firstChild) {
        parkEl.removeChild(parkEl.firstChild);
      }
      for (i = 0; i < 10; i++) {
        console.log(data.data[i].fullName, data.data[i].description);
        var parkName = document.createElement("div");
        var description = document.createElement("div");
        var homePage = document.createElement("a");

        parkName.textContent = "" + data.data[i].fullName;
        description.textContent = "" + data.data[i].description;
        homePage.textContent = "" + data.data[i].url;
        homePage.href = data.data[i].url;
        homePage.setAttribute('style', 'color: blue')

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

//retrieving the api with the park that we entered
var weather = function (lat, lon, description) {
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

//display the api containers and push the lat, lon, and park
var displayWeather = function (weather, description) {
  //create a div element for temperature data
  var temperatureEl = document.createElement("div");
  temperatureEl.textContent =
    "Temperature: " + convertKtoF(weather.current.temp) + " °F";
  temperatureEl.classList = "list-group-item";
  description.appendChild(temperatureEl);

  //create a div element for Humidity data
  var humidityEl = document.createElement("div");
  humidityEl.textContent = "Humidity: " + weather.current.humidity + " %";
  humidityEl.classList = "list-group-item";
  description.appendChild(humidityEl);

  //create a div element for Wind data
  var windSpeedEl = document.createElement("div");
  windSpeedEl.textContent =
    "Wind Speed: " + weather.current.wind_speed + " MPH";
  windSpeedEl.classList = "list-group-item";
  description.appendChild(windSpeedEl);

  description.appendChild(document.createElement("div"));
};

// convert Kelvin to Fahrenheit
var convertKtoF = function (kelvin) {
  return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
};

//pulling local storage of past searched states and displaying on bar
var pastSearch = function (pastSearch) {
  pastEl = document.createElement("button");
  pastEl.textContent = pastSearch;
  pastEl.classList =
    "bg-green-100 flex:row flex-col rounded mt-1 ml-10 p-2 w-32 text-sm";
  pastEl.setAttribute("data-state", pastSearch);
  pastEl.setAttribute("type", "submit");

  pastSearchButtonEl.prepend(pastEl);
};

var pastSearchHandler = function (event) {
  var stateCode = event.target.getAttribute("data-state");
  if (stateCode) {
    getParkInfo(stateCode);
    //Retrieve local storage using for loop localstorage.getItem(key)
/** If the state the user clicks on is the same as one of the states in local storage don't run the api again  */
  }else if(condition){
    return 
  }
};

pastSearchButtonEl.addEventListener("click", pastSearchHandler);
showLocal()
function showLocal(){
  var localPast = localStorage.getItem('State selected:')
  console.log(localPast)
}

//Make h1 tag showing the states you choose