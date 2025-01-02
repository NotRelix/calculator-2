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
  let value = 0;
  switch(operation) {
    case '+':
      value = add(firstNum, secondNum);
      break;
    case '-':
      value = subtract(firstNum, secondNum);
      break;
    case '*':
      value = multiply(firstNum, secondNum);
      break;
    case '/':
      value = divide(firstNum, secondNum);
      break;
  }
  return value;
}

function populateDisplay(e) {
  const number = +e.target.textContent;
  if (+display.textContent === 0 || enteringSecondNumber) {
    display.textContent = '';
    enteringSecondNumber = false;
  }
  display.textContent += number;

  if (!operation) {
    firstNum += e.target.textContent;
  } else {
    secondNum += e.target.textContent;
  }
}

function handleOperator(e) {
  operation = e.target.textContent;
  previousOperation.textContent = operation;
  previousOperation.classList.remove('hidden')
}

function clearDisplay() {
  display.textContent = 0;
  firstNum = '';
  secondNum = '';
  operation = '';
  previousOperation.textContent = '';
  enteringSecondNumber = false;
}

function handleEqual() {
  firstNum = operate(+firstNum, +secondNum, operation);
  secondNum = '';
  display.textContent = firstNum;
  previousOperation.textContent = '';
}

let firstNum = '';
let secondNum = '';
let operation = '';
let enteringSecondNumber = false;

const display = document.querySelector('.output');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const previousOperation = document.querySelector('.previous-operation');
const cancel = document.querySelector('.cancel');
const equal = document.querySelector('.equal');

numbers.forEach(number => {
  number.addEventListener('click', populateDisplay);
});

operators.forEach(operator => {
  operator.addEventListener('click', (e) => {
    handleOperator(e);
    enteringSecondNumber = true;
  });
})

cancel.addEventListener('click', clearDisplay);

equal.addEventListener('click', handleEqual);