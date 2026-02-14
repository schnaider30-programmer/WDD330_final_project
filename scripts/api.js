import { fetchJSON } from './utilities.js';

export async function getCountryInfo(destination) {
  return fetchJSON(`https://restcountries.com/v3.1/name/${destination}`);
}

export async function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=153b212f46050da1a4554b7f6497437a&units=metric`;
  const data = await fetchJSON(url);
  const imageSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  console.log(data)

  return {
    temperature: data.main.temp,
    windspeed: data.wind.speed,
    ISOCountry: data.sys.country,
    description: data.weather[0].description || "Unknown",
    imageSrc: imageSrc,
    humidity:data.main.humidity,
  };
}

export async function getPhotos(destination, key='0kpXEUreEte6d8SK_dsem-uqZDF_A3tU5_e2hYIEOCw') {
  return fetchJSON(`https://api.unsplash.com/search/photos?query=${destination}&client_id=${key}`);
}
