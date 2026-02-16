const accessKey = '0kpXEUreEte6d8SK_dsem-uqZDF_A3tU5_e2hYIEOCw';

/**
 * Fetch and rotate hero images from Unsplash
 * @param {string[]} queries - Array of search queries (e.g. ["travels", "beach"])
 * @param {string} elementId - ID of the <picture> element to display images
 * @param {number} interval - Time in ms between image changes (default 5000)
 */
export async function initHeroImages(queries, elementId = "hero-picture", interval = 5000) {
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
      // store the whole urls object
      allImages.push(data.results[0].urls);
    }
  }

  if (allImages.length === 0) return;

  const heroImage = document.getElementById(elementId);
  let currentIndex = 0;

  function showImage(index) {
    const urls = allImages[index];
    // Build responsive sources
    heroImage.srcset = `${urls.small} 400w, ${urls.regular} 1024w, ${urls.full} 1600w`;
    heroImage.src = urls.full
    heroImage.loading = "Lazy"
    heroImage.sizes = "100vw"
  }

  // Show first image
  showImage(currentIndex);

  // Rotate images
  setInterval(() => {
    currentIndex = (currentIndex + 1) % allImages.length;
    showImage(currentIndex);
  }, interval);
}
