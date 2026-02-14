// heroImages.js
const accessKey = '0kpXEUreEte6d8SK_dsem-uqZDF_A3tU5_e2hYIEOCw';

/**
 * Fetch and rotate hero images from Unsplash
 * @param {string[]} queries - Array of search queries (e.g. ["travels", "beach"])
 * @param {string} elementId - ID of the <img> element to display images
 * @param {number} interval - Time in ms between image changes (default 5000)
 */
export async function initHeroImages(queries, elementId = "hero-img", interval = 5000) {
  const allImages = [];

  for (let query of queries) {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`
        }
      }
    );
    const data = await response.json();
    if (data.results.length > 0) {
      allImages.push(data.results[0].urls.regular);
    }
  }

  if (allImages.length === 0) return;

  const heroImg = document.getElementById(elementId);
  let currentIndex = 0;

  function showImage(index) {
    heroImg.src = allImages[index];
  }

  // Show first image
  showImage(currentIndex);

  // Rotate images
  setInterval(() => {
    currentIndex = (currentIndex + 1) % allImages.length;
    showImage(currentIndex);
  }, interval);
}