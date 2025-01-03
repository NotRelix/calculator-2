let firstNum = '';
let secondNum = '';
let operation = '';
let prevOperation = '';
let enteringSecondNumber = false;
let currentlyEnteringSecondNumber = false;
let clickedEquals = false;

const display = document.querySelector('.output');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const previousOperationDisplay = document.querySelector('.previous-operation');
const cancel = document.querySelector('.cancel');
const equal = document.querySelector('.equal');

numbers.forEach(number => {
  number.addEventListener('click', populateDisplay);
});

operators.forEach(operator => {
  operator.addEventListener('click', (e) => {
    handleOperator(e);
    enteringSecondNumber = true;
    currentlyEnteringSecondNumber = true;
  });
})

cancel.addEventListener('click', clearDisplay);
equal.addEventListener('click', handleEqual);


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
  if (b === 0) return 0;
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
  return Math.round(value * 100000) / 100000;
}

function populateDisplay(e) {
  const number = e.target.textContent;
  const outputValue = display.textContent;
  let secondNumDisplay = '';
  if (clickedEquals) {
    clickedEquals = false;
    clearDisplay();
  }
  if ((+outputValue === 0 && number !== '.' && !outputValue.includes('.')) || enteringSecondNumber) {
    if (number === '.') {
      display.textContent = '0';
    } else {
      display.textContent = '';
    }
    enteringSecondNumber = false;
  }
  if (!display.textContent.includes('.') || number !== '.') {
    display.textContent += number;
    if (!operation) {
      if (number === '.')
        firstNum += '0';
      firstNum += e.target.textContent;
    } else {
      if (number === '.')
        secondNum += '0';
      secondNum += e.target.textContent;
    }
  
    if (currentlyEnteringSecondNumber && operation) {
      if (number === '.')
        secondNumDisplay += '0';
      secondNumDisplay = display.textContent;
      previousOperationDisplay.textContent = `${firstNum} ${operation} ${secondNumDisplay}`;
    }
  }
}

function handleOperator(e) {
  if (display.textContent != 0) {
    operation = e.target.textContent;
    clickedEquals = false;
    previousOperationDisplay.classList.remove('hidden');
    if (secondNum) {
      firstNum = operate(+firstNum, +secondNum, previousOperation);
      secondNum = '';
      display.textContent = firstNum;
      currentlyEnteringSecondNumber = false;
    }
    previousOperationDisplay.textContent = `${firstNum} ${operation}`;
    previousOperation = operation;
  }
}

function clearDisplay() {
  display.textContent = 0;
  firstNum = '';
  secondNum = '';
  operation = '';
  previousOperationDisplay.textContent = '';
  enteringSecondNumber = false;
}

function handleEqual() {
  if (firstNum && secondNum && operation) {
    firstNum = operate(+firstNum, +secondNum, operation);
    operation = '';
    secondNum = '';
    display.textContent = firstNum;
    previousOperationDisplay.textContent = '';
    clickedEquals = true;
  }
}

function handleDecimal() {
  const output = display.textContent;
  if (!output.includes('.')) {
    display.textContent += '.';
    firstNum += '.';
  }
}
