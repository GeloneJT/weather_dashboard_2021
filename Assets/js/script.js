var APIkey = "62792f0221bde7c0c082e1e71bab13e3";
var opnWthrAPI = "https://api.openweathermap.org/data/2.5/weather?";

var city_input = document.getElementById("cityInput");
var city_btn = document.getElementById("findMyCity");
var city_recent = document.getElementById("recentSearch");
var city_locat = document.getElementById("cityLocat");
var city_icon = document.getElementById("curWthrCon");
var city_temp = document.getElementById("curTemp");
var city_humd = document.getElementById("curHumd");
var city_windspd = document.getElementById("curWndSpd");
var city_ndx = document.getElementById("curUndx");
var city_date = document.getElementById("itsNow");

city_btn.addEventListener("click", function () {
  var cityInput = document.getElementById("cityInput").value;
  var city_key = "cityName";
  localStorage.setItem(city_key, cityInput);

  console.log(cityInput);
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityInput +
      "&units=imperial" +
      "&appid=62792f0221bde7c0c082e1e71bab13e3"
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      city_locat.innerText = json.name;
      city_temp.innerText = `Temperature: ${json.main.temp} F`;
      city_humd.innerText = `Humidity: ${json.main.humidity} %`;
      city_windspd.innerText = `Wind Speed ${json.wind.speed} mph`;
      city_input.value = "";

      let lat = json.coord.lat;
      let lon = json.coord.lon;
      let icon = json.weather[0].icon;
      let iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(lat);
      console.log(lon);
      console.log(icon);
      console.log(iconurl);

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=62792f0221bde7c0c082e1e71bab13e3"
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);

          let currentDate = json.current.dt * 1000;
          console.log(currentDate);
          let itsToday = new Date(currentDate);
          console.log(itsToday);

          city_ndx.innerText = `UV Index: ${json.current.uvi}`;
          city_icon.src = iconurl;
          city_date.innerText = itsToday;

          
          fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,alerts&appid="+APIkey)
          .then(response => response.json())
          .then(json => {
              console.log(json)
          });
        });
    });
});
