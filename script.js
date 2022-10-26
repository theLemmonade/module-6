//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
const key = "1e54c9189a2b15bd040a0eeca759c306";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const oldResult = document.getElementById("oldResult");
const results = document.getElementsByClassName("result");
const today = document.getElementById("today");
const forecast = document.getElementById("forecast");
var searchInputValue = String;
searchInputValue = "London";
var setting = String;
var data = Object


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
    console.log("drawCall");
    today.innerHTML = searchInputValue;
}


function drawResult() {
    var newResultText = document.getElementById(searchInputValue);
    var newResult = document.createElement("button");
    newResult.setAttribute("id", searchInputValue);
    newResult.setAttribute("type", "button");
    newResult.setAttribute("class", "result");
    oldResult.appendChild(newResult);
    newResultText.innerHTML = searchInputValue;
    resultEventListener();
    console.log(searchInputValue + " appended to location history");
}


function runSearch() {
    searchInputValue = searchInput.value;
    if (!searchInputValue) {
        searchInput.setAttribute("placeholder", "enter a city");
      return;
    } 
    console.log("User searched for " + searchInputValue);
    searchInput.textContent = " ";
    runCall();
    drawResult();
  };

function reRunSearch() {
    searchInputValue = this.getAttribute("id");
    console.log("User selected " + searchInputValue);
    runCall();
    drawResult();
};

function resultEventListener() {
    for (var i = 0; i < results.length; i++) {
        results[i].addEventListener('click', reRunSearch, false);
    }
}

searchButton.addEventListener("click", runSearch);

resultEventListener()