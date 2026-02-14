export function renderNotifications(trip, containerId) {
  const container = document.getElementById(containerId);
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const itinerary = JSON.parse(localStorage.getItem("itinerary")) || [];
  const notes = [];

  if (!trip) notes.push("No trip created yet.");
  if (expenses.length === 0) notes.push("Don't forget to add your budget.");
  if (itinerary.length === 0) notes.push("Plan some activities in your itinerary.");

  container.innerHTML = notes.length
    ? `<ul>${notes.map(n => `<li>${n}</li>`).join("")}</ul>`
    : "All set!";
}