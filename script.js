//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
const key = '1e54c9189a2b15bd040a0eeca759c306';
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchButton');
const results = document.getElementById('results')
const result = document.getElementsByClassName('result');
const today = document.getElementById('today');
const forecast = document.getElementById('forecast');
var resultsArr = Array;
resultsArr = ['London']
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

function runArray() {//keep results array tidy
    console.log('runArray')
    if (resultsArr.includes(setting)) {
        return;
    } else {
        resultsArr.push(setting)
    };
}

function drawCall() {
    console.log('drawCall');
    today.innerHTML = setting;
}

function drawResults() {//keeps history of user searches, allows them to be called again
    console.log('drawResults');
    if (results != null) {
        results.remove;
    }
    var toAdd = document.createDocumentFragment();
    for (var i = 0; i < resultsArr.length; i++) {
        var newResult = document.createElement("button");
        newResult.setAttribute('id', resultsArr[i]);
        newResult.setAttribute('type', 'button');
        newResult.addEventListener('click', reRunSearch)
        newResult.className = 'result';
        newResult.innerHTML = resultsArr[i];
        toAdd.appendChild(newResult);
    }
    results.appendChild(toAdd);
    console.log('current result list is = ' + resultsArr);
}

function runSearch() {//defines setting, prepares various functions to be called
    console.log('runSearch')
    setting = searchInput.value;
    if (!setting) {
        searchInput.setAttribute('placeholder', 'enter a city');
      return;
    };
    console.log('User searched for ' + setting);
    runCall();
    runArray();
    drawResults();
}

function reRunSearch() {//redefines setting based on past entry, recalls function
    setting = this.getAttribute("id");
    console.log("User selected " + setting);
    runCall();
};

searchBtn.addEventListener("click", runSearch);
drawResults();