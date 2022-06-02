//api key storage
var apiKey = "755c65e42d689835b8fd27ff1e21603c"; //weather api key
var parkKey = ""; //park info key
var stateCode;
var fullName;

var weatherContainerEl = document.querySelector("#current-weather");

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

// In HTML make a select tag and fill the options with State abbreviations
//ON click on state, your store that abbrevation in a variable

function changeResult() {
  stateCode = document.querySelector("#select").value;
  console.log(stateCode);
  getParkInfo(stateCode);
}

// var stateCode = document.querySelector('#select').value
function getParkInfo(stateCode) {
  fetch(
    "https://developer.nps.gov/api/v1/parks?stateCode=" +
      stateCode +
      "&api_key=ONqCMcecY29RtHlFW2uZcvjwuTM0lsk62DjxmdAs"
  ).then(function (response) {
    response.json().then(function (data) {
      // This is whewre you manipulate the data for your code
      console.log(data);
      parkEl = document.querySelector("#park-name");
      while (parkEl.firstChild) {
        parkEl.removeChild(parkEl.firstChild);
      }
      for (i = 0; i < 5; i++) {
        var parkName = data.data[i].fullName;
        console.log(data.data[i].fullName, data.data[i].description);
        var parkButton = document.createElement("button");
        var description = document.createElement("div");
        parkButton.textContent = data.data[i].fullName;
        description.textContent = "Description: " + data.data[i].description;

        //displayWeather(parkName);
        parkEl.appendChild(parkButton);
        parkEl.appendChild(description);

        //retrieve lat & lon for weather
        var lat = data.data[i].latitude;
        var lon = data.data[i].longitude;
        //push to weather function
        weather(lat, lon);
      }
    });
  });
}

//retrieving the api with the city that we entered
var weather = function (lat, lon) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=" +
    apiKey;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      console.log("DATA: ", data);
      displayWeather(data);
    });
  });
};

//display the api containers and push the lat and lon to the the UV
var displayWeather = function (weather) {
  //clear old content
  weatherContainerEl.textContent = weather;

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
  weatherContainerEl.appendChild(temperatureEl);
  weatherContainerEl.appendChild(humidityEl);
  weatherContainerEl.appendChild(windSpeedEl);
};
// on click that targets the select HTML tag  // make another button that function submit
// store the value of the select tags to store the state the user clicked on
//once we retrieved user value and they choose a state code, then you run the fetch

//git pull get latest changes
//git add
//git commit
//git push origin <name of brnach>
//Make a pull request on github (Hey, made changes review it for me)
//Have someone review   it and verify it
//Onced approved, merge it

//you can go back to main and do a git pull and everything will be up to date
