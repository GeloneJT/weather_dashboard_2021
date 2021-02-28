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
      let iconurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(lat);
      console.log(lon);
      console.log(icon);
      console.log(iconurl);

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&units=imperial&appid=62792f0221bde7c0c082e1e71bab13e3"
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);

          let currentDate = json.current.dt * 1000;
          console.log(currentDate);
          let itsToday = new Date(currentDate);
          let itsTodayISO = itsToday.toISOString().split("T")[0]
          console.log(itsTodayISO);

          city_ndx.innerText = `UV Index: ${json.current.uvi}`;
          city_icon.src = iconurl;
          city_date.innerText = itsTodayISO;

          let alpha_Date = document.getElementById("alphaDate");
          let alpha_Con = document.getElementById("alphaCon");
          let alpha_Temp = document.getElementById("alphaTemp");
          let alpha_Hum = document.getElementById("alphaHum");
          let alpha_UTC = json.daily[0].dt * 1000;
          let alpha_one = new Date(alpha_UTC);
          console.log(alpha_one);
          let alpha_ISO = alpha_one.setDate(alpha_one.getDate() + 1);
          console.log(alpha_ISO);

        //   alpha_Date.innerText = alpha_ISO;
          alpha_Con.src = "https://openweathermap.org/img/wn/"+json.daily[0].weather[0].icon+"@2x.png";
          alpha_Temp.innerText = `Temp: ${json.daily[0].temp.day} F`;
          alpha_Hum.innerText = `Humidity: ${json.daily[0].humidity} %`;

          let beta_Date = document.getElementById("betaDate");
          let beta_Con = document.getElementById("betaCon");
          let beta_Temp = document.getElementById("betaTemp");
          let beta_Hum = document.getElementById("betaHum");

        //   beta_Date.innerText = json.daily[1].dt * 1000;
          beta_Con.src = "https://openweathermap.org/img/wn/"+json.daily[1].weather[0].icon+"@2x.png";
          beta_Temp.innerText = `Temp: ${json.daily[1].temp.day} F`;
          beta_Hum.innerText = `Humidity: ${json.daily[1].humidity} %`;

          let char_Date = document.getElementById("charDate");
          let char_Con = document.getElementById("charCon");
          let char_Temp = document.getElementById("charTemp");
          let char_Hum = document.getElementById("charHum");

        //   char_Date.innerText = json.daily[2].dt * 1000;
          char_Con.src = "https://openweathermap.org/img/wn/"+json.daily[2].weather[0].icon+"@2x.png";
          char_Temp.innerText = `Temp: ${json.daily[2].temp.day} F`;
          char_Hum.innerText = `Humidity: ${json.daily[2].humidity} %`;

          let del_Date = document.getElementById("delDate");
          let del_Con = document.getElementById("delCon");
          let del_Temp = document.getElementById("delTemp");
          let del_Hum = document.getElementById("delHum");

        //   del_Date.innerText = json.daily[3].dt * 1000;
          del_Con.src = "https://openweathermap.org/img/wn/"+json.daily[3].weather[0].icon+"@2x.png";
          del_Temp.innerText = `Temp: ${json.daily[3].temp.day}`;
          del_Hum.innerText = `Humidity: ${json.daily[3].humidity} %`;


          let echo_Date = document.getElementById("echoDate");
          let echo_Con = document.getElementById("echoCon");
          let echo_Temp = document.getElementById("echoTemp");
          let echo_Hum = document.getElementById("echoHum");

        //   echo_Date.innerText = json.daily[4].dt * 1000;
          echo_Con.src = "https://openweathermap.org/img/wn/"+json.daily[4].weather[0].icon+"@2x.png";
          echo_Temp.innerText = `Temp: ${json.daily[4].temp.day}`;
          echo_Hum.innerText = `Humidity: ${json.daily[4].humidity} %`;
        });
    });
});
