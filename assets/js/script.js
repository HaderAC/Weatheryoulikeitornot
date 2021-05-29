var wapi = "c7a6e4833c8f6120d2e8b2262378040e";
var currentLoc = "";
var prevLoc = "";

// function for current weather on the map
var errorControl = (response) => {
    if(!response.ok) {
        throw Error(response.statusText):
    }
    return response;
}



var currentW = (event)=>{
    let loc = $("#citySearch").val();
    currentLoc = $("#citySearch").val();

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + loc + "&units=imperial" + "&APPID=" + wapi;
    fetch(queryURL)
    .then(errorControl)
    .then((response) => {
        return response.json();
    })

    .then((response) => {
        saveLoc(loc);
        $("#searcherror").text("");
        let currentWIcon="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        let currentTUTC = response.dt;
        let currentTZOffset = response.timezone;
        let currentTZOffsetHours = currentTimeZoneOffset / 60 / 60;
        let currentMoment = moment.unix(currentTimeUTC).utc().utcOffset(currentTimeZoneOffsetHours);

        renderLocs();

        getFiveDayF(event);
        $("headertext").text(response.name);

        let currentWHTML = `
        <h3>${response.name} ${currentMoment.format("(MM/DD/YY")}<img src=${currentWIcon}"></h3>
        <ul class = "listunstyled">
            <li>Temperature: ${response.main.temp}&#8457;</li>
            <li>Wind Speed: ${response.wind.speed} mph</li>
            <li>Humidity: ${response.main.humidity}%</li>
            <li id="uvIndex">UV Index:</li>

        </ul>`;

    })
}

