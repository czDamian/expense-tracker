let budget = 0;
let expenses = [];

function setBudget() {
  const budgetInput = document.getElementById("budget");
  budget = parseFloat(budgetInput.value) || 0;

  if (budget > 0) {
    document.getElementById("budget-form").style.display = "none";
    document.getElementById("expense-form").style.display = "block";

    document.getElementById("initial-budget").textContent = budget;
    updateRemainingBudget();
  } else {
    alert("Please enter a valid budget.");
  }
}

function addExpense() {
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseDateInput = document.getElementById("expense-date");

  const expenseName = expenseNameInput.value.trim();
  const expenseAmount = parseFloat(expenseAmountInput.value);
  const expenseDate = expenseDateInput.value;

  if (
    expenseName !== "" &&
    !isNaN(expenseAmount) &&
    expenseAmount > 0 &&
    expenseDate !== ""
  ) {
    const remainingBudget =
      budget - expenses.reduce((total, expense) => total + expense.amount, 0);

    if (remainingBudget >= expenseAmount) {
      const expense = {
        name: expenseName,
        amount: expenseAmount,
        date: expenseDate,
      };
      expenses.push(expense);
      updateExpensesList();
      updateRemainingBudget();
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
      expenseDateInput.value = "";
    } else {
      alert("Expense exceeds remaining budget!");
    }
  } else {
    alert("Invalid input! Please enter valid expense name, amount, and date.");
  }
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateExpensesList();
  updateRemainingBudget();
}

function updateExpensesList() {
  const expensesList = document.getElementById("expense-items");
  expensesList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense");
    expenseItem.innerHTML = `
                    <span>${expense.name}: $${expense.amount.toFixed(2)} (${
      expense.date
    })</span>
                    <button onclick="deleteExpense(${index})">Delete</button>
                `;
    expensesList.appendChild(expenseItem);
  });
}

function updateRemainingBudget() {
  const remainingBudgetDisplay = document.getElementById("remaining-budget");
  remainingBudgetDisplay.textContent = `Remaining Budget: $${(
    budget - expenses.reduce((total, expense) => total + expense.amount, 0)
  ).toFixed(2)}`;

  if (
    budget - expenses.reduce((total, expense) => total + expense.amount, 0) <
    0
  ) {
    remainingBudgetDisplay.classList.add("exceeded");
  } else {
    remainingBudgetDisplay.classList.remove("exceeded");
  }
}
