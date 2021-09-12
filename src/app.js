function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0{hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
     
      <img src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" width="60px" />
      <div class="weather-forecast-temperature">
        <span class="weather forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="weather forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "03eae50e408a5980bf3d11d9419f315f";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "03eae50e408a5980bf3d11d9419f315f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function DisplayLondon(event) {
  event.preventDefault();
  search("london");
}

let LondonTemp = document.querySelector("#London");
LondonTemp.addEventListener("click", DisplayLondon);

function DisplayNY(event) {
  event.preventDefault();
  search("new york");
}

let NYTemp = document.querySelector("#New-York");
NYTemp.addEventListener("click", DisplayNY);

function DisplayHK(event) {
  event.preventDefault();
  search("hong kong");
}

let HKTemp = document.querySelector("#Hong-Kong");
HKTemp.addEventListener("click", DisplayHK);

function DisplayTA(event) {
  event.preventDefault();
  search("tel aviv");
}

let TATemp = document.querySelector("#Tel-aviv");
TATemp.addEventListener("click", DisplayTA);
