export function initItinerary(formId, containerId) {
  const form = document.getElementById(formId);
  const container = document.getElementById(containerId);
  let itinerary = JSON.parse(localStorage.getItem("itinerary")) || [];

  function renderItinerary() {
    if (itinerary.length === 0) {
      container.innerText = "No activities yet.";
      return;
    }
    container.innerHTML = `
      <ul>${itinerary.map(a => `<li>${a.date}: ${a.name}</li>`).join("")}</ul>
    `;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.querySelector("#activityName").value;
    const date = form.querySelector("#activityDate").value;
    itinerary.push({ name, date });
    localStorage.setItem("itinerary", JSON.stringify(itinerary));
    renderItinerary();
  });

  renderItinerary();
}