// Variables 
var searchButton = $(".searchButton");

var apiKey = "c7a6e4833c8f6120d2e8b2262378040e";

var pastSearchButtonEl = document.querySelector("#past-search-buttons");

init();

function init(){
    // Forloop for persisting the data onto HMTL page
    for (var i = 0; i < localStorage.length; i++) {
   
    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = localStorage.getItem(i);
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",localStorage.getItem(i))
    pastSearchEl.setAttribute("type", "submit");
    pastSearchButtonEl.prepend(pastSearchEl);
}
}


var keyCount = 0;


searchButton.click(function () {

    var searchInput = $(".searchInput").val();

    pastSearchEl = document.createElement("button");

    pastSearchEl.textContent = searchInput;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";


    pastSearchEl.setAttribute("data-city",searchInput)
    pastSearchEl.setAttribute("type", "submit");


    pastSearchButtonEl.prepend(pastSearchEl);
    

    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
