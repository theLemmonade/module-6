const searchButton = document.getElementById("searchButton");
const history = document.getElementById('history');
var searchInput = document.getElementById('searchInput')
var today = document.getElementById('today');
var setting = String;

today.innerHTML = "glastobury, CT"

function runSearch(event) {
    event.preventDefault();
    var searchInputValue = searchInput.value;
    if (!searchInputValue) {
        searchInput.setAttribute("placeholder", "enter a city");
      return;
    } 
  };

