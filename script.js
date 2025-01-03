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
  number.addEventListener('click', (e) => populateDisplay(e.target.textContent));
});

operators.forEach(operator => {
  operator.addEventListener('click', (e) => {
    if (display.textContent.at(-1) !== '.') {
      handleOperator(e.target.textContent);
      enteringSecondNumber = true;
      currentlyEnteringSecondNumber = true;
    }
  });
})

cancel.addEventListener('click', clearDisplay);
equal.addEventListener('click', handleEqual);
document.addEventListener('keydown', (e) => {
  if (+e.key || +e.key === 0 || e.key === '.') {
    populateDisplay(e.key)
  } else if (e.key === 'Backspace') {
    clearDisplay();
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    handleOperator(e.key);
    enteringSecondNumber = true;
    currentlyEnteringSecondNumber = true;
  } else if (e.key === 'Enter') {
    handleEqual();
  }
})


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

function populateDisplay(number) {
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
    if (display.textContent === '0') {
      if (number === '.') {
        display.textContent = '0' + number;
      } else {
        display.textContent = number;
      }
    } else {
      display.textContent += number;
    }

    if (!operation) {
      if (number === '.') {
        firstNum += '.';
      } else {
        firstNum = display.textContent;
      }
    } else {
      if (number === '.') {
        secondNum += '0';
      }
      secondNum = display.textContent;
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
    operation = e;
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
  display.textContent = '0';
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
