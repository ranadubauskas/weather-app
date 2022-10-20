// Never put your API key in the JS file, or front-end. This can result in hacking of your API account and data.
// Always secure with some sort of process.env file in the back-end
 API_KEY = "4f3e07faaf63dd8560f5dab480408315";

async function getWeather(city) {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      API_KEY
  );
  const data = await response.json();
  displayWeather(data);
}

// Displays weather
function displayWeather(data) {
  const { name } = data;
  //const { icon, description } = data.weather[0];
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  const { temp, humidity, feels_like } = data.main;
  const { speed } = data.wind;

  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".weather__icon").src =
    "http://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".temp").innerText = Math.round(temp) + "°F";
  document.querySelector(".description").innerText = description;
  document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".feels_like").innerText =
    "Feels like: " + feels_like + "°F";
  document.querySelector(".weather").classList.remove("loading");
}

function searchWeather() {
  const city = document.querySelector(".search__bar").value;
  getWeather(city);
}

document.querySelector(".search__button").addEventListener("click", () => {
  searchWeather();
});

document.querySelector(".search__bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    searchWeather();
  }
});

getWeather("Nashville");