// DEPENDENCIES ========
$(document).ready(() => {
  console.log("ready!");
});
// DOM ELEMNTS
// INITAL DATA
var cityHistory = [];
// A user types in a city
$("#city-info-button").on("click", function () {
  event.preventDefault();
  var citySearch = $("#citySearch").val();
  cityHistory.push(citySearch);
  //window.localStorage.set("history", JSON.stringify(cityHistory));
  getAndShowWeather(citySearch);
});

function getAndShowWeather(city) {
  // Date Display
  var date = moment();
  var dateDisplay = date.format("dddd MMMM Do YYYY");
  $("#date").text(dateDisplay);
  console.log(dateDisplay);

  // a user submits their search
  var citySearch = city;
  var APIKey = "c7629276d88b73d9dee17485c554906b";
  console.log(citySearch);
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    citySearch +
    "&appid=c7629276d88b73d9dee17485c554906b" +
    "&units=imperial";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var iconCode = response.weather[0].icon;
    var iconImage = "http://openweathermap.org/img/w/" + iconCode + ".png";
    console.log(iconCode);
    $("#icon-image").attr("src", iconImage);
    $("#temperature").text(response.main.temp);
    $("#humidity").text(response.main.humidity);
    $("#wind-speed").text(response.wind.speed);

    var latitude = response.coord.lat;
    var longitude = response.coord.lon;
    var uvURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude;
    console.log("uvURL:", uvURL);
    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (response) {
      console.log(response.value);
      var uvIndex = response.value;
      $("#uv-index").text(uvIndex);
      if (uvIndex < 2) {
        $(".index").attr("class", "low");
        console.log("You're safe!");
      }
      if (uvIndex >= 2 && uvIndex <= 5) {
        $(".index").attr("class", "moderate");
        console.log("Getting risky");
      }
      if (uvIndex > 5 && uvIndex <= 7) {
        $(".index").attr("class", "high");
        console.log("Uh oh!");
      }
      if (uvIndex > 7 && uvIndex <= 10) {
        $(".index").attr("class", "very-high");
        console.log("You better stay inside!");
      }
      if (uvIndex > 10) {
        $(".index").attr("class", "extreme");
        console.log("You will ignite on fire");
      }
      // five Day Forecast
      var forecastURL =
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        citySearch +
        "&appid=c7629276d88b73d9dee17485c554906b" +
        "&units=imperial";
      $.ajax({
        url: forecastURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        // day one
        var firstDay = moment(response.list[0].dt_txt).format(
          "dddd MMMM Do YYYY"
        );
        $("#one").text(firstDay);
        console.log(firstDay);
        $("#temperature-one").text(response.list[0].main.temp);
        $("#humidity-one").text(response.list[0].main.humidity);
        $("#wind-speed-one").text(response.list[0].wind.speed);
        $("#pressure-one").text(response.list[0].main.pressure);
        // Day two
        //var secondtDay = moment(response.list[0].dt_txt).format(
        ("dddd MMMM Do YYYY");
        //);
        $("#temperature-two").text(response.list[8].main.temp);
        $("#humidity-two").text(response.list[8].main.humidity);
        $("#wind-speed-two").text(response.list[8].wind.speed);
        $("#pressure-two").text(response.list[8].main.pressure);

        $("#temperature-three").text(response.list[16].main.temp);
        $("#humidity-three").text(response.list[16].main.humidity);
        $("#wind-speed-three").text(response.list[16].wind.speed);
        $("#pressure-three").text(response.list[16].main.pressure);

        $("#temperature-four").text(response.list[24].main.temp);
        $("#humidity-four").text(response.list[24].main.humidity);
        $("#wind-speed-four").text(response.list[24].wind.speed);
        $("#pressure-four").text(response.list[24].main.pressure);

        $("#temperature-five").text(response.list[32].main.temp);
        $("#humidity-five").text(response.list[32].main.humidity);
        $("#wind-speed-five").text(response.list[32].wind.speed);
        $("#pressure-five").text(response.list[32].main.pressure);
      });
    });
  });
}
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
