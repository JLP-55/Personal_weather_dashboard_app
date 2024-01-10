var apiKey = "972fb27dc4cbea1ce58d7935a921ca78";
var city;
var userInput = document.querySelector("textarea");
var searchButton = document.querySelector("#search-button");
var sectionAppend = document.getElementById("api-content");

var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric" ;
// var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=melbourne&appid=" + apiKey + "&units=metric";



function searchFunction() {
    // Need to call toLowerCase only on a string.
    // userInput.toLowerCase();
    city = userInput.value;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
    // console.log(city);
    // console.log(requestUrl);

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data.weather[0]);
        var li = document.createElement("li");
        li.textContent = data.main.temp;
        console.log(li);
        sectionAppend.appendChild(li);
        // for (var i = 0; i < data.length; i++) {
        //     console.log("hello")
            
            // var liElement = document.createElement("li");
            // liElement.textContent = data;
        // }
        // console.log(liElement)
        // sectionAppend.appendChild(liElement);
        array = [];
        array = array.concat(li.textContent)
        localStorage.setItem("city", array);
    })

    // console.log(requestUrl);
    // console.log(liElement);


};

searchButton.addEventListener("click", searchFunction);