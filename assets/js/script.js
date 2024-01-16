var apiKey = "972fb27dc4cbea1ce58d7935a921ca78";
var city;
var theDate = dayjs().format("DD[-]MM[-]YYYY");
var userInput = document.querySelector("textarea");
var searchButton = document.querySelector("#search-button");
var renderCityBtn = document.getElementById("city-btn-section");
var forecastAppend = document.getElementById("forecast-content");
var cityArray = [];

// Generates button to clear local storage and refresh the page.
var refreshBtn = document.createElement("button");
refreshBtn.textContent = "Clear searches";
refreshBtn.setAttribute("id", "search-button");
document.querySelector("section").appendChild(refreshBtn);
refreshBtn.addEventListener("click", refreshPage);

// A loop to create buttons for each city from local storage.
function displayHistory () {
    for (var i = 0; i < cityArray.length; i++) {
        var button = document.createElement("button");
        button.setAttribute("class", "city-btn-items");
        button.textContent = cityArray[i];
        renderCityBtn.appendChild(button);
        button.addEventListener("click", searchFunction);
    };
};

// This function is called after hitting "search" on the page.
function searchFunction(event) {

    // Checks to see if a city button on the page has been clicked and adds the textcontent of that button to user input.
    for (var i = 0; i < cityArray.length; i++) {
        if (event.target.textContent == cityArray[i]) {
            userInput.value = event.target.textContent;
            console.log(userInput.value)
        };
    };

    // Checks to see if the textarea is empty or not.
    if (userInput.value === "") {
        return;
    };

    // Sets the user input to lower case.
    city = userInput.value.toLowerCase();
    console.log(city);

    // Resets the value of the forecastAppend variable so that the previously rendered items clear from the page.
    forecastAppend.innerHTML = "";
    
    // Api key variables for calling the current day and five day weather respectively.
    var dailyWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
    var fiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric";

    // Code responsible for the generation of each city button, so long as it doesn't already exist.
    // Can't get it to work.
    // for (var i = 0; i < cityArray.length; i++) {
    //     if (cityArray[i] === event.target.textContent) {
    //         console.log("hello");
    //     } else {

    //     }
    // };

    var button = document.createElement("button");
    button.setAttribute("class", "city-btn-items");
    button.textContent = city;
    renderCityBtn.appendChild(button);
    cityArray.push(city);
    console.log(button);
    button.addEventListener("click", searchFunction);
        
    localStorage.setItem("city", JSON.stringify(cityArray));

    // Clears the text-box.
    userInput.value = "";

    fetch(dailyWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        // Generates content for todays weather.
        var divElement = document.createElement("div");
        divElement.setAttribute("class", "forecast-content-item")
        
        var h5Element = document.createElement("h5");
        var pElement = document.createElement("p");
        var pElement2 = document.createElement("p");
        var pElement3 = document.createElement("p");

        h5Element.textContent = "Today: " + theDate; 
    
        pElement.textContent = "Current temperature: " + data.main.temp + "°C";
        pElement2.textContent = "Humidity: " + data.main.humidity + "%";
        pElement3.textContent = "Windspeed: " + data.wind.speed + " KPH";

        divElement.appendChild(h5Element);

        divElement.appendChild(pElement);
        divElement.appendChild(pElement2);
        divElement.appendChild(pElement3);

        forecastAppend.appendChild(divElement);

        // Generates an image for the current weather
        var fiveDayForecastIcon = document.createElement("img");
        var icon = data.weather[0].icon;
        var IconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        fiveDayForecastIcon.setAttribute("src", IconUrl);
        divElement.appendChild(fiveDayForecastIcon);

    });

    fetch(fiveDayWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (var i = 7; i < data.list.length; i+=8) {

            // Generates content for the five day weather forecast.
            var forecastAppendDiv = document.createElement("div");
            forecastAppendDiv.setAttribute("class", "forecast-content-item");

            var fiveDayForecastDate = document.createElement("h5");
            fiveDayForecastDate.textContent = data.list[i].dt_txt
            forecastAppendDiv.appendChild(fiveDayForecastDate);

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

// Sets the value of cityArray to all items in local storage
function getFromLocalStorage () {
    var localStorageArray = JSON.parse(localStorage.getItem("city"));
    if (localStorageArray !== null) {
        cityArray = cityArray.concat(localStorageArray);
    };
};

// Refreshes the page
function refreshPage() {
    window.location.reload();
    localStorage.removeItem("city");
};

getFromLocalStorage();

// Calls function upon the page loading to render the previously searched cities to the page.
displayHistory();

searchButton.addEventListener("click", searchFunction);