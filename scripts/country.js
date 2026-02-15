import { getCountryFromCity, resolveCountry, } from "./utilities.js";
import { getCountryInfo } from "./api.js";

export async function renderCountryInfo(destination, containerId) {
  const container = document.getElementById(containerId);

  try {

    const countryInfo = await resolveCountry(destination);

    if (!countryInfo || countryInfo.length === 0) {
      container.innerHTML = `<p><em>Country info not available for <strong>${destination}</string>.</em></p>`;
      return;
    }

    container.innerHTML = `
      <p class="capitalized"><strong>Country:</strong> ${countryInfo.name.common}</p>
      <p class="capitalized"><strong>Capital:</strong> ${countryInfo.capital ? countryInfo.capital[0] : "N/A"}</p>
      <p class="capitalized"><strong>Currency:</strong> ${countryInfo.currencies ? Object.values(countryInfo.currencies)[0].name : "N/A"}  ${countryInfo.currencies ? Object.values(countryInfo.currencies)[0].symbol : "N/A"}</p>
      <p class="capitalized"><strong>Language:</strong> ${countryInfo.languages ? Object.values(countryInfo.languages)[0] : "N/a" }</p>
      <p class="capitalized"><strong>Region:</strong> ${countryInfo.region}</p>
      <img src="${countryInfo.flags.svg}" alt="Flag of ${countryInfo.name.common}" style="width:80px;">
    `;
  } catch {
    container.innerHTML = `<p>Country info not available for <strong>${destination}</string>.</p>`;
  }
}