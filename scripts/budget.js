export function initBudget(travelers, formId, containerId) {
  const form = document.getElementById(formId);
  const container = document.getElementById(containerId);
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  function renderBudget() {
    if (expenses.length === 0) {
      container.innerText = "No expenses yet.";
      return;
    }
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const perPerson = (total / travelers).toFixed(2);
    container.innerHTML = `
      <ul>${expenses.map(e => `<li>${e.name}: $${e.amount}</li>`).join("")}</ul>
      <p><strong>Total:</strong> $${total}</p>
      <p><strong>Per Person:</strong> $${perPerson}</p>
    `;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nameInput = form.querySelector("#expenseName");
    const amountInput = form.querySelector("#expenseAmount");

    const name = nameInput.value;
    const amount = parseFloat(amountInput.value);

    expenses.push({ name, amount });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderBudget();

    nameInput.value = "";
     amountInput.value = "";
  });

  renderBudget();
}