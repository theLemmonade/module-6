//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
const key = "1e54c9189a2b15bd040a0eeca759c306"
const searchButton = document.getElementById("searchButton");
const history = document.getElementById('history');
var searchInput = document.getElementById('searchInput')
var today = document.getElementById('today');
var searchInputValue = String
var setting = String;

today.innerHTML = "glastobury, CT"

function runCall() {
    //call = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + myKey+ "&units=imperial";
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
    })
    .catch(function(error) {
      console.error(error);
    });
};

function drawSearch() {
    
}

function runSearch(event) {
    searchInputValue = searchInput.value;
    if (!searchInputValue) {
        searchInput.setAttribute("placeholder", "enter a city");
      return;
    } 
    runCall;
    drawSearch;
  };
