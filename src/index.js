function formatDate(currentDate) {
  let displayDate = document.querySelector("#date");

  let date = now.getDate();
  let year = now.getFullYear();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  displayDate.innerHTML = `${day} ${month} ${date}, ${year}`;
}
let now = new Date();
formatDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class ="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 ">
         <div class="weather-forecast-date">
        ${formatDay(forecastDay.dt)} </div>
         <img
    src = "http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png"
    alt = " "
    </img>
       <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}° </span>
         <span class="weather-forecast-temp-min">${Math.round(
           forecastDay.temp.min
         )}° </span>
        </div> 
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8a8290ac2ccd07ce5c6b2f580efac3ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showForecast);
}

function showWeather(response) {
  let tempElement = document.querySelector("#input-current-temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let rainElement = document.querySelector("#rain-probability");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#current-weather-icon");

  celsiusTemperature = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  rainElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}`
  );
  getForecast(response.data.coord);
}

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "8a8290ac2ccd07ce5c6b2f580efac3ba";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let currentLocButton = document.querySelector("#current-button");
currentLocButton.addEventListener("click", getCurrentPosition);

function search(city) {
  let apiKey = "8a8290ac2ccd07ce5c6b2f580efac3ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", submitSearch);

search("Brussels");
