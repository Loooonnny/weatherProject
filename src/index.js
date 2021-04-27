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

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class ="row">`;
  let days = ["Tue", "Wed", "Thu"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 ">
         <div class="weather-forecast-date">
        ${day} </div>
        <i class="fas fa-cloud-rain forecast-icon"></i>
       <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max">12° </span>
         <span class="weather-forecast-temp-min">8°  </span>
        </div> 
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-form");
  let cityElement = document.querySelector("#current-city");
  if (cityInput.value) {
    cityElement.innerHTML = `${cityInput.value}`;

    let apiKey = "8a8290ac2ccd07ce5c6b2f580efac3ba";
    let units = "metric";
    let city = cityInput.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

    axios.get(`${apiUrl}`).then(showWeather);
  } else {
    cityElement.innerHTML = null;
  }
}
let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", search);

showForecast();

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#input-current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}
let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#input-current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

function getForecast(coordinates) {
  let apiKey = "8a8290ac2ccd07ce5c6b2f580efac3ba";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showForecast);
}

function showWeather(response) {
  let city = response.data.name;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${city}`;

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = `${description}`;

  let humidity = response.data.main.humidity;
  let rainElement = document.querySelector("#rain-probability");
  rainElement.innerHTML = `${humidity}%`;

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  let tempElement = document.querySelector("#input-current-temp");
  tempElement.innerHTML = `${temperature}`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${wind}km/h`;

  let iconElement = document.querySelector("#weather-icon");
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
  let long = position.coords.latitude;
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
