function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(firstNum, secondNum, operation) {
  switch(operation) {
    case '+':
      console.log(add(firstNum, secondNum));
      break;
    case '-':
      console.log(subtract(firstNum, secondNum));
      break;
    case '*':
      console.log(multiply(firstNum, secondNum));
      break;
    case '/':
      console.log(divide(firstNum, secondNum));
      break;
  }
}

function populateDisplay(e) {
  const number = +e.target.textContent;
  if (+display.textContent === 0) {
    display.textContent = '';
  }
  display.textContent += number;
}

function handleOperator(e) {
  const operator = e.target.textContent;
}

function clearDisplay() {
  display.textContent = 0;
}

let firstNum;
let secondNum;
let operation;

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const cancel = document.querySelector('.cancel');

numbers.forEach(number => {
  number.addEventListener('click', populateDisplay);
});

operators.forEach(operator => {
  operator.addEventListener('click', handleOperator);
})

cancel.addEventListener('click', clearDisplay);