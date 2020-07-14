// DEPENDENCIES ========
$(document).ready(() => {
  console.log("ready!");
});
// DOM ELEMNTS
// INITAL DATA

// A user types in a city
$("#city-info-button").on("click", function () {
  // a user submits their search
  var cityName = $("#city").val();
  console.log(city);
  var queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=c7629276d88b73d9dee17485c554906b";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var iconCode = response.list[0].weather[0].icon;
    var iconImage = "http://openweathermap.org/img/w/" + iconCode + ".png";
    console.log(iconCode);
    $("#icon-image").attr("src", iconImage);
  });
});

// FUNCTIONS

// USER INPUT ==================

// A users search history is saved
// Then the current weather of that specific city will show up
// they see the city name
// the date
// an icon reprenstation of weather conditions
// the temparture
// the humidity
//the wind speed
// and the UV Index
// based on the UV index
// the color is green for favorable
// the color is purple for moderate
// the color is red for severe
// They also see the 5 day forecast of their city that they searched
// //the date,
//an icon representation of weather conditions,
//the temperature,
//and the humidity
//If the user searches for another city, then their past city search is saved
//The user can click on past city searches and view the weather

//Display Data
