var apiKey = "972fb27dc4cbea1ce58d7935a921ca78";
var city;
// var theTime = dayjs().format("H");
var userInput = document.querySelector("textarea");
var searchButton = document.querySelector("#search-button");
var sectionAppend = document.getElementById("section-content");
var forecastAppend = document.getElementById("forecast-content");
var asideAppend = document.getElementById("aside-content");

// var weatherImgArray;

// var weatherFreezing = document.createElement("img");
// weatherFreezing.src = "./assets/images/freezing.PNG";
// weatherFreezing.setAttribute("style", "position:relative; left:35px; top:60px;");
// var weatherHot = document.createElement("img");
// weatherHot.src = "./assets/images/hot.PNG";
var weatherSunny = document.createElement("img");
weatherSunny.src = "./assets/images/sunny.PNG";
var weatherPartiallyCloudy = document.createElement("img");
weatherPartiallyCloudy.src = "./assets/images/partially_cloudy.PNG";
var weatherCloudy = document.createElement("img");
weatherCloudy.src = "./assets/images/cloudy.PNG";
var weatherScatteredShowers = document.createElement("img");
weatherScatteredShowers.src = "./assets/images/scattered_showers.PNG";
var weatherRain = document.createElement("img");
weatherRain.src = "./assets/images/rain.PNG";
var weatherThunderstorm = document.createElement("img");
weatherThunderstorm.src = "./assets/images/thunderstorm.PNG";
var weatherSnow = document.createElement("img");
weatherSnow.src = "./assets/images/snow.PNG";

function searchFunction() {
    // Need to call toLowerCase only on a string.
    // city = JSON.stringify(userInput.value);
    // userInput.toLowerCase;
    city = userInput.value;
    var dailyWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
    var fiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric";

    // console.log(city);
    // console.log(dailyWeather);

    fetch(dailyWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // asideAppend.setAttribute("style", "display: none;");
        // console.log(data.weather[0]);

        // var sectionAppend = document.createElement("section");
        // sectionAppend.setAttribute("id", "section-content");

        var divElement = document.createElement("div");
        var buttonDivElement = document.createElement("div");
        
        var pElement = document.createElement("p");
        var pElement2 = document.createElement("p");
        var pElement3 = document.createElement("p");
        // pElement.setAttribute("style", "border: solid var(--main-colour);")
        // pElement2.setAttribute("style", "border: solid var(--main-colour);")
        // pElement3.setAttribute("style", "border: solid var(--main-colour);")
        pElement.textContent = "Current temperature: " + data.main.temp + "°C";
        pElement2.textContent = "Humidity: " + data.main.humidity + "%";
        pElement3.textContent = "Windspeed: " + data.wind.speed + " KPH";

        divElement.setAttribute("style", "border:solid var(--main-colour);")
        divElement.appendChild(pElement);
        divElement.appendChild(pElement2);
        divElement.appendChild(pElement3);

        // array = [];
        // array = array.concat(pElement.textContent).concat(pElement2.textContent).concat(pElement3.textContent);
        // localStorage.setItem(city, array);

        // localStorage.getItem(city);

        var button = document.createElement("button");
        button.setAttribute("id", "search-button");
        button.textContent = data.name;
        buttonDivElement.appendChild(button);

        sectionAppend.appendChild(buttonDivElement);
        asideAppend.appendChild(divElement);

    })

    fetch(fiveDayWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data.list[2]);
        for (var i = 0; i < 5; i++) {
            // console.log(data.list[i]);

            var forecastAppendDiv = document.createElement("div");
            forecastAppendDiv.setAttribute("style", "display:flex; flex-direction:column; align-items:flex-start; justify-content:flex-start; height:195px; width:350px; border:solid var(--main-colour); position:relative; left: 235px;")

            var fiveDayForecastTemp = document.createElement("p");
            fiveDayForecastTemp.textContent = "Current temperature: " + data.list[i].main.temp + "°C";
            forecastAppendDiv.appendChild(fiveDayForecastTemp);

            var fiveDayForecastHumidity = document.createElement("p");
            fiveDayForecastHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
            forecastAppendDiv.appendChild(fiveDayForecastHumidity);

            var fiveDayForecastWindSpeed = document.createElement("p");
            fiveDayForecastWindSpeed.textContent = "Wind speed: " + data.list[i].wind.speed + " KPH";
            forecastAppendDiv.appendChild(fiveDayForecastWindSpeed);

            forecastAppend.appendChild(forecastAppendDiv);

        };
        
        var appendDays = [
            document.body.children[3].children[0].children[0],
            document.body.children[3].children[1].children[0],
            document.body.children[3].children[2].children[0],
            document.body.children[3].children[3].children[0],
            document.body.children[3].children[4].children[0],
        ];
        // console.log(appendDays);

        // for (var i = 0; i < appendDays.length; i++) {
        //     console.log(appendDays[i]);
        //     var weatherFreezing = document.createElement("img");
        //     weatherFreezing.src = "./assets/images/freezing.PNG";
        //     weatherFreezing.setAttribute("style", "position:relative; left:35px; top:60px;");
        //     appendDays[i].appendChild(weatherFreezing);
        // };

        for (var i = 0; i < 5; i++) {
            if (data.list[i].main.temp > 23) {
                for (var i = 0; i < appendDays.length; i++) {
                    console.log(data.list[i].main.temp);
                    var weatherHot = document.createElement("img");
                    weatherHot.src = "./assets/images/hot.PNG";
                    weatherHot.setAttribute("style", "position:relative; left:40px; top:60px;");
                    appendDays[i].appendChild(weatherHot);
                };
            };
        };

        // var appendDays = [{
            // day1Append: (document.body.children[3].children[0].children[0]),
        //     day2Append: (document.body.children[3].children[1].children[0]),
        //     day3Append: (document.body.children[3].children[2].children[0]),
        //     day4Append: (document.body.children[3].children[3].children[0]),
        //     day5Append: (document.body.children[3].children[4].children[0]),
        // },];

      
        // var day1AppendImg = (document.body.children[3].children[0].children[0]);
        // var day2AppendImg = (document.body.children[3].children[1].children[0]);
        // var day3AppendImg = (document.body.children[3].children[2].children[0]);
        // var day4AppendImg = (document.body.children[3].children[3].children[0]);
        // var day5AppendImg = (document.body.children[3].children[4].children[0]);
        
        // for (var i = 0; i < 5; i++) {
        //     var appendImg = document.createElement("div");
        //     appendImg.setAttribute("style", "display:flex;");
        //     forecastAppendDiv.appendChild(appendImg);
        //     appendImg.textContent = "hello";

        //     if (data.list[i].main.temp < 50) {
        //         var weatherFreezing = document.createElement("img");
        //         weatherFreezing.src = "./assets/images/freezing.PNG";
        //         weatherFreezing.setAttribute("style", "position:relative; left:35px; top:60px;");
        //         appendDays.appendChild(weatherFreezing);
        //     };
            
        //     if (data.list[i].main.temp > 5) {
        //         var weatherHot = document.createElement("img");
        //         weatherHot.src = "./assets/images/hot.PNG";
        //         weatherHot.setAttribute("style", "position:relative; left:35px; top:60px;")
        //     };
        // };

        // if (data.list[0].main.)
        
    });

    // console.log(dailyWeather);
    // console.log(liElement);



};

// items = [1,2,3,4];

// items.forEach((items,i) => {
//     console.log(items, i);
// });

searchButton.addEventListener("click", searchFunction);