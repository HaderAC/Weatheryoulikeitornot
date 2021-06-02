// Variables 
var searchButton = $(".searchButton");

var apiKey = "c7a6e4833c8f6120d2e8b2262378040e";

var pastSearchButtonEl = document.querySelector("#past-search-buttons");

init();

function init() {
    // Forloop for persisting the data onto HMTL page
    for (var i = 0; i < localStorage.length; i++) {

        pastSearchEl = document.createElement("button");
        pastSearchEl.textContent = localStorage.getItem(i);
        pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
        pastSearchEl.setAttribute("data-city", localStorage.getItem(i))
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


    pastSearchEl.setAttribute("data-city", searchInput)
    pastSearchEl.setAttribute("type", "submit");


    pastSearchButtonEl.prepend(pastSearchEl);


    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


    if (searchInput == "") {
        alert("Please enter a city in the search box");
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET",
            error: function (badCall) {
                alert("Please enter a valid city")
            }
        }).then(function (response) {

            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");

            localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();


            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);

            var timeUTC = new Date(response.dt * 1000);

            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

            var currentTemp = currentName.append("<p>");


            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);

            });

        });

        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            // Array for 5-days 
            var day = [0, 8, 16, 24, 32];
            $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            // For each for 5 days
            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });


    }
});
