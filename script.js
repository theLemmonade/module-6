//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
const key = '1e54c9189a2b15bd040a0eeca759c306';
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchButton');
const results = document.getElementById('results');
const result = document.getElementsByClassName('result');
const today = document.getElementById('today');
const forecast = document.getElementById('forecast');
const weather = document.getElementById('weather');
var resultsArr = Array;
resultsArr = ['London'];
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

function runArray() {//keep results array tidy from duplicates
    console.log('runArray')
    if (resultsArr.includes(setting)) {
        return;
    } else {
        resultsArr.push(setting)
    };
}

function drawCall(data) {
    console.log('drawCall');
    today.innerHTML = setting;
    weather.innerHTML = ''
    forecast.innerHTML = ''
    var toAdd = document.createDocumentFragment();
    var temp = document.createElement('p');
    temp.innerHTML = 'the temperature feels like ' + data.list[0].main.feels_like + ' degrees farenheit';
    toAdd.appendChild(temp);
    var cond = document.createElement('p');
    cond.innerHTML = 'the conditions call for ' + data.list[0].weather[0].main;
    toAdd.appendChild(cond);
    var wind = document.createElement('p');
    wind.innerHTML = 'the wind speed is ' + data.list[0].wind.speed + 'mph';
    toAdd.appendChild(wind);
    var hmdt = document.createElement('p');
    hmdt.innerHTML = 'the humidity is ' + data.list[0].main.humidity + '%';
    toAdd.appendChild(hmdt);
    weather.appendChild(toAdd);
    var toLoop = document.createDocumentFragment();
    for (let i = 1; i < 5; i++) {
        var article = document.createElement('article')
        article.setAttribute('id', [i])
        article.className = 'col-md'
        if (i === 1) {
            var tomorrow = document.createElement('h5');
            tomorrow.innerHTML = 'tomorrow';
            article.appendChild(tomorrow);
        } else {
            var dateTitle = document.createElement('h5');
            var date = data.list[i].dt_txt;
            var substr = date.substr(5, 6);
            dateTitle.innerHTML = substr;
            article.appendChild(dateTitle);
        }
        var temp = document.createElement('p');
        temp.innerHTML = 'temp: ' + data.list[i].main.feels_like + 'F';
        toLoop.appendChild(temp);
        var cond = document.createElement('p');
        cond.innerHTML = 'conditions: ' + data.list[i].weather[0].main;
        toLoop.appendChild(cond);
        var wind = document.createElement('p');
        wind.innerHTML = 'wind: ' + data.list[i].wind.speed + 'mph';
        toLoop.appendChild(wind);
        var hmdt = document.createElement('p');
        hmdt.innerHTML = 'humidity: ' + data.list[i].main.humidity + '%';
        toLoop.appendChild(hmdt);
        article.appendChild(toLoop);
        forecast.appendChild(article);
    };
}

function drawResults() {//keeps history of user searches, allows them to be called again
    console.log('drawResults');
    results.innerHTML = "";
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
runCall();