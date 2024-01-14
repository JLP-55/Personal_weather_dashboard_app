var apiKey = "972fb27dc4cbea1ce58d7935a921ca78";
var city;
var theTime = dayjs().format("H");
var userInput = document.querySelector("textarea");
var searchButton = document.querySelector("#search-button");
var renderCityBtn = document.getElementById("city-btn-section");
var forecastAppend = document.getElementById("forecast-content");
var cityArray = [];

// Display local storage items to the page.
function displayHistory () {
    for (var i = 0; i < cityArray.length; i++) {
        var button = document.createElement("button");
        button.setAttribute("class", "city-btn-items");
        button.textContent = cityArray[i];
        renderCityBtn.appendChild(button);
        button.addEventListener("click", renderClickedCity);
    };
};

function renderClickedCity () {
    var one = JSON.parse(localStorage.getItem("city"));
    console.log("one");
};

// This function is called after hitting "search" on the page.
function searchFunction(event) {
    // Checks to see if the textarea is empty or not.
    if (userInput.value === "") {
        window.alert("please enter a city");
        return;
    };

    // Sets the user input to lower case.
    city = userInput.value.toLowerCase();

    // Resets the value of the forecastAppend variable so that the previously rendered items clear from the page.
    forecastAppend.innerHTML = "";
    
    // Api key variables for calling the current day and five day weather respectively.
    var dailyWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
    var fiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric";

    // Code responsible for the generation of each city button
    var button = document.createElement("button");
    button.setAttribute("class", "city-btn-items");
    button.textContent = city;
    renderCityBtn.appendChild(button);
    cityArray.push(city);
        
    localStorage.setItem("city", JSON.stringify(cityArray));

    fetch(dailyWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        // Generates content for todays weather.
        var divElement = document.createElement("div");
        
        var pElement = document.createElement("p");
        var pElement2 = document.createElement("p");
        var pElement3 = document.createElement("p");
    
        pElement.textContent = "Current temperature: " + data.main.temp + "°C";
        pElement2.textContent = "Humidity: " + data.main.humidity + "%";
        pElement3.textContent = "Windspeed: " + data.wind.speed + " KPH";

        divElement.setAttribute("style", "border:solid var(--main-colour);")
        divElement.appendChild(pElement);
        divElement.appendChild(pElement2);
        divElement.appendChild(pElement3);

        forecastAppend.appendChild(divElement);

        // Generates an image for the current weather
        var fiveDayForecastIcon = document.createElement("img");
        var icon = data.weather[0].icon;
        console.log(icon);
        var IconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        fiveDayForecastIcon.setAttribute("src", IconUrl)
        divElement.appendChild(fiveDayForecastIcon);

    });

    fetch(fiveDayWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < 5; i++) {
            // console.log(data.list[i]);

            // Generates content for the five day weather forecast.
            var forecastAppendDiv = document.createElement("div");
            // forecastAppendDiv.setAttribute("style", "display:flex; flex-direction:column; align-items:center; justify-content:flex-start; height:195px; width:250px; border:solid var(--main-colour); position:relative; left: 235px;")
            forecastAppendDiv.setAttribute("class", "forecast-content");

            var fiveDayForecastTemp = document.createElement("p");
            fiveDayForecastTemp.textContent = "Current temperature: " + data.list[i].main.temp + "°C";
            forecastAppendDiv.appendChild(fiveDayForecastTemp);

            var fiveDayForecastHumidity = document.createElement("p");
            fiveDayForecastHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
            forecastAppendDiv.appendChild(fiveDayForecastHumidity);

            var fiveDayForecastWindSpeed = document.createElement("p");
            fiveDayForecastWindSpeed.textContent = "Wind speed: " + data.list[i].wind.speed + " KPH";
            forecastAppendDiv.appendChild(fiveDayForecastWindSpeed);

            // Generates images for the five day weather forecast.
            var fiveDayForecastIcon = document.createElement("img");
            var icon = data.list[i].weather[0].icon;
            var IconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            fiveDayForecastIcon.setAttribute("src", IconUrl)
            forecastAppendDiv.appendChild(fiveDayForecastIcon);

            forecastAppend.appendChild(forecastAppendDiv);

        };
        
    });

};

function getFromLocalStorage () {
    var localStorageArray = JSON.parse(localStorage.getItem("city"));
    if (localStorageArray !== null) {
        cityArray = cityArray.concat(localStorageArray);
    };
}

getFromLocalStorage();

displayHistory();

searchButton.addEventListener("click", searchFunction);