import { Trip } from "./Trip.js";
import { renderCountryInfo } from "./country.js";
import { renderWeather } from "./weather.js";
import { initBudget } from "./budget.js";
import { initItinerary } from "./itinerary.js";
import { renderNotifications } from "./notifications.js";
import { loadHeaderFooter } from "./utilities.js";

loadHeaderFooter();

// Load trip from localStorage
const tripData = Trip.load();
let trip = tripData ? Object.assign(new Trip(), tripData) : null;

if (trip) {
  document.getElementById("tripSummaryContent").innerText = trip.summary();

  // Pass required arguments to each module
  renderCountryInfo(trip.destination, "countryInfo");
  renderWeather(trip.destination, "weatherInfo");
  initBudget(trip.travelers, "budgetForm", "budgetInfo");
  initItinerary("itineraryForm", "itineraryInfo");
  renderNotifications(trip, "notificationsContent");
} else {
  document.getElementById("tripSummaryContent").innerText =
    "No trip created yet.";
}
