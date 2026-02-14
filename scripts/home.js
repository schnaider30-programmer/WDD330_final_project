import { Trip } from "./Trip.js";
import { initHeroImages } from "./heroImages.js";

// Queries I want to use for hero images
const queries = ["travels", "beach", "mountains"];

//A function to call dynamically create a hero images from Unsplash
initHeroImages(queries)


// =========================
// TRIP CREATION LOGIC
// =========================
document.getElementById("tripForm").addEventListener("submit", e => {
  e.preventDefault();

  const trip = new Trip(
    document.getElementById("dest").value,
    document.getElementById("startDate").value,
    document.getElementById("endDate").value,
    document.getElementById("travelers").value
  );

  trip.save();

  // Update preview
  document.getElementById("tripSummary").innerText = trip.summary();
});