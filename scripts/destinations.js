import { fetchCountryInfo, fetchWikipediaSummary, fetchUnsplashGallery, getCountryFromCity } from './utilities.js';
import { initHeroImages } from './heroImages.js';

// Default featured cities
const defaultCities = ["Paris", "Tokyo", "New York", "London", "Rio de Janeiro"];

async function renderSpotlight(city, containerId) {
  const container = document.getElementById(containerId);

  try {
    // Fetch data in parallel
    const [images, wiki] = await Promise.all([
      fetchUnsplashGallery(city, 1), // just one image for spotlight
      fetchWikipediaSummary(city)
    ]);

    // Resolve country name from city
    const countryName = getCountryFromCity(city);
    let countryInfo = null;
    if (countryName) {
      try {
        countryInfo = await fetchCountryInfo(countryName);
      } catch {
        // ignore if not found
      }
    }

    // Build spotlight card (horizontal layout)
    const cardHTML = `
      <div class="spotlight-card">
        <img src="${images[0]}" alt="${city}" class="spotlight-img">
        <div class="spotlight-info">
          <h3>${wiki.title}</h3>
          <p>${wiki.extract}</p>
          ${
            countryInfo
              ? `<p><strong>Country:</strong> ${countryInfo.name.common} | Capital: ${countryInfo.capital[0]} | Currency: ${Object.values(countryInfo.currencies)[0].name}</p>`
              : `<p><em>Country info not available for this city.</em></p>`
          }
        </div>
      </div>
    `;

    container.innerHTML += cardHTML;
  } catch (err) {
    container.innerHTML += `<p>Error loading ${city}: ${err.message}</p>`;
  }
}

// Load default spotlight cities on page load
window.addEventListener("DOMContentLoaded", () => {
  defaultCities.forEach(city => renderSpotlight(city, "featuredDestinations"));
});

// Handle user search
document.getElementById("exploreForm").addEventListener("submit", async e => {
  e.preventDefault();
  const city = document.getElementById("city").value;
  const grid = document.getElementById("attractionsGrid");
  grid.innerHTML = "<p>Loading destination info...</p>";

  try {
    const [images, wiki] = await Promise.all([
      fetchUnsplashGallery(city, 6),
      fetchWikipediaSummary(city)
    ]);

    // Resolve country name from city
    const countryName = getCountryFromCity(city);
    let countryInfo = null;
    if (countryName) {
      try {
        countryInfo = await fetchCountryInfo(countryName);
      } catch {}
    }

    grid.innerHTML = `
      <div class="info-card">
        <h3>${wiki.title}</h3>
        <p>${wiki.extract}</p>
        ${
          countryInfo
            ? `<p><strong>Country:</strong> ${countryInfo.name.common} | Capital: ${countryInfo.capital[0]} | Currency: ${Object.values(countryInfo.currencies)[0].name}</p>`
            : `<p><em>Country info not available for this city.</em></p>`
        }
      </div>
      <div class="gallery-grid">
        ${images.map(url => `
          <div class="gallery-card">
            <img src="${url}" alt="${city}" />
          </div>
        `).join("")}
      </div>
    `;
  } catch (err) {
    grid.innerHTML = `<p>Error: ${err.message}</p>`;
  }
});