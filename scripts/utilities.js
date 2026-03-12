import { getWeather, getCountryInfo } from "./api.js";

export function formatDateRange(start, end) {
  return `${new Date(start).toLocaleDateString()} - ${new Date(end).toLocaleDateString()}`;
}

export function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount,
  );
}

export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
}

export async function fetchWikipediaSummary(query) {
  return fetchJSON(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
  );
}

export async function fetchCountryInfo(countryName) {
  const data = await fetchJSON(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`,
  );
  return data[0];
}

export async function fetchUnsplashGallery(query, count = 1) {
  const data = await fetchJSON(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&orientation=landscape&client_id=0kpXEUreEte6d8SK_dsem-uqZDF_A3tU5_e2hYIEOCw`,
  );
  return data.results.map((img) => img.urls.regular);
}

export async function getCountryFromCity(destination) {
  const coord = await getCoordinates(destination);
  const weather = await getWeather(coord.lat, coord.lon);
  console.log(weather.ISOCountry);
  const countryInfo = await getCountryInfo(weather.ISOCountry);
  return countryInfo;
}

export async function getCoordinates(city) {
  const data = await fetchJSON(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`,
  );
  console.log(data);
  console.log(data.coordinates);
  if (data.coordinates) {
    return { lat: data.coordinates.lat, lon: data.coordinates.lon };
  }
  return null;
}

export async function resolveCountry(destination) {
  let country;
  try {
    country = await getCountryInfo(destination); // works if destination is a country
  } catch {
    country = await getCountryFromCity(destination); // fallback if it's a city
  }

  // console.table(country)

  const independentCountry = country.find(
    (country) => country.independent && country.unMember,
  );

  console.log(independentCountry);
  return independentCountry;
}

function wayFinding() {
  const navList = document.querySelectorAll("nav a");
  const activeHref = localStorage.getItem("activeLink");

  // Restore active state on load
  if (activeHref) {
    const activeLink = [...navList].find(
      (l) => l.getAttribute("href") === activeHref,
    );
    if (activeLink) activeLink.classList.add("active");
  }

  navList.forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.setItem("activeLink", link.getAttribute("href"));
    });
  });
}
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

function getBasePath() {
  // If running on GitHub Pages
  if (window.location.hostname.includes("github.io")) {
    return "/WDD330_final_project/partials/";
  }
  // If running locally
  return "partials/";
}

export async function loadHeaderFooter() {
  //header
  const headerTemplate = await loadTemplate(getBasePath() + "header.html");
  const headerElement = document.querySelector(".header");

  //footer
  const footerTemplate = await loadTemplate(getBasePath() + "footer.html");
  const footerElement = document.querySelector(".footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  await wayFinding();
  showMenu();
}

function showMenu() {
  const HamburgerBtn = document.querySelector("#hamburger-btn");
  const navigation = document.querySelector(".nav");
  HamburgerBtn.addEventListener("click", () => {
    navigation.classList.toggle("active");
    HamburgerBtn.classList.toggle("close");
  });
}
