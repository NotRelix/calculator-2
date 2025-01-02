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
  const number = e.target.textContent;
  display.textContent += number;
}

let firstNum;
let secondNum;
let operation;

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.num');

numbers.forEach(number => {
  number.addEventListener('click', populateDisplay);
});