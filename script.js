//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
const key = '1e54c9189a2b15bd040a0eeca759c306';
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchButton');
const results = document.getElementById('results')
const result = document.getElementsByClassName('result');
const today = document.getElementById('today');
const forecast = document.getElementById('forecast');
var resultsArr = Array;
resultsArr = ['London', 'New York', 'Boston']
var setting = String;
setting = 'London';


function runCall() {//fetches 5 day forecast based var setting
    console.log('runCall')
    var call = 'https://api.openweathermap.org/data/2.5/forecast?q=' + setting + '&appid=' + key + '&units=imperial';
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
    console.log('drawCall');
    today.innerHTML = setting;
}

function drawResults() {
    var newResult = document.createElement("button");
    for (var i = 0; i < resultsArr.length; i++) {
        newResult.setAttribute('id', resultsArr[i]);
        newResult.setAttribute('type', 'button');
        newResult.setAttribute('class', 'result');
        newResult.addEventListener('click', reRunSearch)
        results.appendChild(newResult);
        newResult.innerHTML = resultsArr[i];
    }
    console.log('current result is = ' + resultsArr)
}


function runSearch() {//user searched for a city
    setting = searchInput.value;
    if (!setting) {
        searchInput.setAttribute('placeholder', 'enter a city');
      return;
    }
    resultsArr.push(setting);
    console.log('User searched for ' + setting);
    runCall();
    drawResults();
}

function reRunSearch() {//user selected a previously saved city
    setting = this.getAttribute("id");
    console.log("User selected " + setting);
    runCall();
};

searchBtn.addEventListener("click", runSearch);

drawResults();