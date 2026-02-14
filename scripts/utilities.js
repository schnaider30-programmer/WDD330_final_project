const accessKey = '0kpXEUreEte6d8SK_dsem-uqZDF_A3tU5_e2hYIEOCw';

export function formatDateRange(start, end) {
  return `${new Date(start).toLocaleDateString()} - ${new Date(end).toLocaleDateString()}`;
}

export function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
}


export async function fetchWikipediaSummary(query) {
  return fetchJSON(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
  );
}

export async function fetchCountryInfo(countryName) {
  const data = await fetchJSON(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`
  );
  return data[0];
}

export async function fetchUnsplashGallery(query, count = 6) {
  const data = await fetchJSON(`https://api.unsplash.com/search/photos?query=${query}&per_page={count}&orientation=landscape&client_id=0kpXEUreEte6d8SK_dsem-uqZDF_A3tU5_e2hYIEOCw`);
  return data.results.map(img => img.urls.regular);
}

export const cityCountryMap = {
  "Paris": "France",
  "Tokyo": "Japan",
  "New York": "United States",
  "London": "United Kingdom",
  "Rio de Janeiro": "Brazil",
};

export function getCountryFromCity(city) {
  return cityCountryMap[city] || null;
}

export async function getCoordinates(city) {
  const data = await fetchJSON(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`
  );
  if (data.coordinates) {
    return { lat: data.coordinates.lat, lon: data.coordinates.lon };
  }
  return null;
}