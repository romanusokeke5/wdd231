const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const forecastContainer = document.querySelector('#forecast');

const apiKey = '64ed01e7ff217c658b1c153d0704c6fa'; // replace with your own key
const city = 'Boise';
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

async function fetchWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Current weather
    currentTemp.textContent = `Current Temperature: ${data.list[0].main.temp.toFixed(0)}°F`;
    weatherDesc.textContent = `Conditions: ${data.list[0].weather[0].description}`;

    // 3-day forecast
    forecastContainer.innerHTML = '';
    for (let i = 8; i <= 24; i += 8) {
      const forecast = data.list[i];
      const day = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
      const temp = forecast.main.temp.toFixed(0);
      const desc = forecast.weather[0].description;
      forecastContainer.innerHTML += `<p>${day}: ${temp}°F, ${desc}</p>`;
    }
  } catch (error) {
    console.error('Weather data fetch failed:', error);
    currentTemp.textContent = "Weather unavailable.";
  }
}

fetchWeather();
