import { loadHeaderFooter } from "./utilities.js";

loadHeaderFooter();

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;

  // Save message locally (demo only)
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push({ name, email, message, date: new Date().toISOString() });
  localStorage.setItem("messages", JSON.stringify(messages));

  document.getElementById("contactStatus").textContent =
    `Thanks ${name}, your message has been saved locally!`;

  e.target.reset();
});
