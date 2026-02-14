import { getCountryInfo } from "./api.js";

export async function renderCountryInfo(destination, containerId) {
  const container = document.getElementById(containerId);

  try {
    const countryInfo = await getCountryInfo(destination);

    if (!countryInfo || countryInfo.length === 0) {
      container.innerHTML = `<p><em>Country info not available for <strong>${destination}</string>.</em></p>`;
      return;
    }

    const country = countryInfo[0];
    container.innerHTML = `
      <p><strong>Country:</strong> ${country.name.common}</p>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
      <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies)[0].name : "N/A"}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" style="width:80px;">
    `;
  } catch {
    container.innerHTML = `<p>Country info not available for <strong>${destination}</string>.</p>`;
  }
}