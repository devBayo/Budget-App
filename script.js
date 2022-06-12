'use strict';

// Targetting Elements
const labelMonth = document.querySelector('.month');
const labelBalance = document.querySelector('.balance');
const labelTotalIncome = document.querySelector('.total-income');
const labelTotalExpenses = document.querySelector('.total-expenses');
const form = document.querySelector('form');
const sign = document.querySelector('.sign');
const description = document.querySelector('.desc');
const amount = document.querySelector('.amount');
const btnCheck = document.querySelector('.check-btn');
const incomeList = document.querySelector('.income-list');
const expensesList = document.querySelector('.expenses-list');

// Setting current month
labelMonth.textContent = Intl.DateTimeFormat(navigator.language, {
  month: 'long',
}).format(new Date());

// Global ish
const incomeArr = [];
const expensesArr = [];

// Functions
// Add budget logic
const addBudget = function () {
  const type = sign.value;
  let element;
  if (type === 'income') {
    element = incomeList;
    incomeArr.push(+amount.value);
  } else {
    element = expensesList;
    expensesArr.push(+amount.value);
  }
  const html = ` 
    <li class="${type}-item">
      <span class="item-title">${
        description.value.length > 30
          ? description.value.slice(0, 31) + '...'
          : description.value
      }</span>
      <span class="item-worth">${type === 'income' ? '+' : '-'} ${Number(
    amount.value
  ).toFixed(2)}</span>
      <span class="percentage exp--item--percentage">-</span>
    </li>`;
  element.insertAdjacentHTML('beforeend', html);
};

const calcBalance = function () {
  const totalIncome = incomeArr.reduce((prev, curr) => prev + curr, 0);
  labelTotalIncome.textContent = totalIncome.toFixed(2);

  const totalExpenses = expensesArr.reduce((prev, curr) => prev + curr, 0);
  labelTotalExpenses.textContent = totalExpenses.toFixed(2);

  labelBalance.textContent =
    totalIncome > totalExpenses
      ? `+ ${(totalIncome - totalExpenses).toFixed(2)}`
      : `- ${Math.abs(totalIncome - totalExpenses).toFixed(2)}`;
};
// EventListeners

// Sign logic
sign.addEventListener('click', function () {
  sign.value === 'income'
    ? form.classList.remove('debit')
    : form.classList.add('debit');
});

// Adding to budget eventListener
btnCheck.addEventListener('click', function (e) {
  e.preventDefault();
  if (description.value && amount.value) {
    addBudget();
    calcBalance();
    description.value = amount.value = '';
    amount.blur();
  }
});
