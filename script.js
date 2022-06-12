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

// 

// Functions
// Add budget logic
const addBudget = function () {
  const type = sign.value;
  const element = type === 'income' ? incomeList : expensesList;
  const html = ` 
    <li class="${type}-item">
      <span class="item-title">${description.value}</span>
      <span class="item-worth">${amount.value}</span>
      <span class="percentage exp--item--percentage">-</span>
    </li>`;
  element.insertAdjacentHTML('beforeend', html);
};

const calcBalance = function () {

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
    description.value = amount.value = '';
    amount.blur();
  }
});
