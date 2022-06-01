var apiKey = "&appid=755c65e42d689835b8fd27ff1e21603c"; //weather api key
var stateCode;

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


            var states  = ['AL', 'AK', 'AZ', 'AR', 
'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 
'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 
'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 
'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 
'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 
'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 
'WA', 'WV', 'WI', 'WY']

var select = document.querySelector('#select')
for (let i = 0; i < states.length; i++) {
    var option = document.createElement('option')
    option.textContent = states[i]
    select.appendChild(option)
}
           
        }
        else{
            dropdownState.classList.remove('flex')
            dropdownState.classList.add('hidden')
            
        }    
    }
    )

})
//states.addEventListener('click', () =>) {
    

//retrieving the api with the city that we entered
// var CityWeather = function (city) {
//     var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=london&units=imperial${apiKey}`;

//     fetch(apiURL)
//         .then(function (response) {
//             response.json().then(function (data) {
//                 console.log("DATA: ",  data);
//                 console.log("WEATHER DATA: ", data.weather[0])
//                 displayWeather(data, "london");
//             });
//         });
// };

//display the api containers and push the lat and lon to the the UV
// var displayWeather = function (weather, searchCity) {
//     //clear old content
//     weatherContainerEl.textContent = weather;
//     citySearchInputEl.textContent = searchCity;


//     //create an image element
//     var weatherIcon = document.createElement("img");
//     weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);

//     //create a span element for temperature data
//     var temperatureEl = document.createElement("span");
//     temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
//     temperatureEl.classList = "list-group-item";

//     //create a span element for Humidity data
//     var humidityEl = document.createElement("span");
//     humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
//     humidityEl.classList = "list-group-item";

//     //create a span element for Wind data
//     var windSpeedEl = document.createElement("span");
//     windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
//     windSpeedEl.classList = "list-group-item";

//     //append, display the content
//     citySearchInputEl.appendChild(weatherIcon);
//     weatherContainerEl.appendChild(temperatureEl);
//     weatherContainerEl.appendChild(humidityEl);
//     weatherContainerEl.appendChild(windSpeedEl);

//     var lat = weather.coord.lat;
//     var lon = weather.coord.lon;
// }

// In HTML make a select tag and fill the options with State abbreviations 
//ON click on state, your store that abbrevation in a variable 
//When you run the park fetch, pass in that variable 

function changeResult () {
    
    console.log(stateCode)
    getParkInfo(stateCode)
    // return stateCode 
}

const stateApiKey = "&api_key=ONqCMcecY29RtHlFW2uZcvjwuTM0lsk62DjxmdAs"
const searchURL = "https://developer.nps.gov/api/v1/parks?stateCode?pa="


//var stateCode = document.querySelector('#select').value
function getParkInfo(stateCode){
    fetch(stateApiKey + stateCode + stateApiKey)
    .then(function (response) {
        response.json().then(function (data) {
        // This is whewre you manipulate the data for your code 
        console.log(data);
        parkEl = document.querySelector('#park-name')
            while(parkEl.firstChild){
                parkEl.removeChild(parkEl.firstChild)
            }
        for (i = 0; i < 5; i++) {
        // Create some kind of HTML element to display nthe information to the user document.createElement("h4")
        // Then change the texdt content to whatever data you want to display document.textcontent(#)
        //Add it to the page using appendChild 
            console.log(data.data[i].fullName);
            var parkButton = document.createElement('button')
            parkButton.textContent = data.data[i].fullName
            parkEl.appendChild(parkButton)

        }

    }) 
})
}


// var show = document.getElementById("park-info");
// var parks = document.getElementById("parks");

// parks.addEventListener('click', function() {
//   parkinfo.innerHTML = "You selected " + data.data[i].fullName;
// });




// on click that targets the select HTML tag  // make another button that function submit
// store the value of the select tags to store the state the user clicked on var userState = document.something
//once we retrieved user value and they choose a state code, then you run the fetch (calling the onlick function)


//git pull get latest changes
//git add
//git commit 
//git push origin <name of brnach>
//Make a pull request on github (Hey, made changes review it for me)
//Have someone review   it and verify it
//Onced approved, merge it

//you can go back to main and do a git pull and everything will be up to data 
