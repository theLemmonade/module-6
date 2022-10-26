//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
const key = "1e54c9189a2b15bd040a0eeca759c306"
const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton");
const history = document.getElementById("history");
const result = document.getElementsByClassName("result")
const today = document.getElementById("today");
const forecast = document.getElementById("forecast")
var searchInputValue = String
var setting = String;



function runCall() {
    console.log("runCall")
    var call = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInputValue + "&appid=" + key + "&units=imperial";
    console.log(call)
    fetch(call)
    .then(function(response) {
      if (!response.ok) {
        throw response.json();
      }
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      drawCall(data);
    })
    .catch(function(error) {
      console.error(error);
    });
};

function drawCall() {
    console.log("drawCall")
    today.innerHTML = searchInputValue
}

function runSearch() {
    searchInputValue = searchInput.value;
    if (!searchInputValue) {
        searchInput.setAttribute("placeholder", "enter a city");
      return;
    } 
    console.log("User searched for " + searchInputValue);
    searchInput.textContent = " ";
    runCall;
  };

searchInputValue = "London"
runCall();
searchButton.addEventListener("click", runSearch);