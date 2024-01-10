var apiKey = "972fb27dc4cbea1ce58d7935a921ca78";
var city;
var cityAppend = document.getElementById("api-content");
// console.log(cityAppend);

var searchButton = document.querySelector("#search-button");
var sectionAppend = document.getElementById("api-content");

// var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=Melbourne,aus&appid=" + apiKey;

console.log(searchButton);

fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(parseInt(data[2]));
        // for (var i = 0; i < data.length; i++) {
        //     var liElement = document.createElement("li");
        //     liElement.textContent = data;
        // }
        // console.log(liElement)
        // sectionAppend.appendChild(liElement);
    })

    // console.log(requestUrl);
    // console.log(liElement);


function searchFunction() {

};

searchButton.addEventListener("click", fetch);