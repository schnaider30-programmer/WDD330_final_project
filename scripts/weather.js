import { getCoordinates } from "./utilities.js";
import { getWeather } from "./api.js";

export async function renderWeather(city, containerId) {
  const container = document.getElementById(containerId);
  try {
    const coords = await getCoordinates(city);
    if (!coords) {
      container.innerHTML = `<p><em>No Weather found for ${city}.</em></p>`;
      return;
    }
    const weather = await getWeather(coords.lat, coords.lon);
    container.innerHTML = `
        <img src="${weather.imageSrc}" alt="${weather.description}">
        <p>${weather.cityName}</p>
        <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
        <p class="capitalized"><strong>Conditions:</strong> ${weather.description}</p>
        <p><strong>Humidity:</strong> ${weather.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${(weather.windspeed * 2.237).toFixed(2)}mph</p> 
    `;
  } catch {
    container.innerHTML = `<p><em>Weather data not available.</em></p>`;
  }
}
