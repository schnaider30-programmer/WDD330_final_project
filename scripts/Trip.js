import { formatDateRange } from './utilities.js';
import { getCountryInfo, getWeather, getPhotos } from './api.js';

export class Trip {
  constructor(destination, startDate, endDate, travelers) {
    this.destination = destination;
    this.startDate = startDate;
    this.endDate = endDate;
    this.travelers = travelers;
  }

  summary() {
    return `Trip to ${this.destination} (${formatDateRange(this.startDate, this.endDate)})`;
  }

  async enrichData(apiKeys) {
  // Photos
  const photos = await getPhotos(this.destination, apiKeys.unsplash);
  this.photos = photos.results.map(p => p.urls.small);

  // Coordinates from Wikipedia
  const coords = await getCoordinates(this.destination);
  if (coords) {
    this.weather = await getWeather(coords.lat, coords.lon);
  }

  // Summary from Wikipedia
  const wiki = await fetchWikipediaSummary(this.destination);
  this.summaryInfo = wiki.extract;
}
  
  save() {
    localStorage.setItem("trip", JSON.stringify(this));
  }

  static load() {
    const data = localStorage.getItem("trip");
    return data ? JSON.parse(data) : null;
  }
}