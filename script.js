let firstNum = '';
let secondNum = '';
let operation = '';
let prevOperation = '';
let enteringSecondNumber = false;
let currentlyEnteringSecondNumber = false;
let clickedEquals = false;
let firstOperation = true;

const display = document.querySelector('.output');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const previousOperationDisplay = document.querySelector('.previous-operation');
const cancel = document.querySelector('.cancel');
const equal = document.querySelector('.equal');
const del = document.querySelector('.del');
const negative = document.querySelector('.negative');

numbers.forEach(number => {
  number.addEventListener('click', (e) => populateDisplay(e.target.textContent));
});

operators.forEach(operator => {
  operator.addEventListener('click', (e) => {
    if (display.textContent.at(-1) !== '.' && (+firstNum || +secondNum)) {
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
  } else if (e.key === 'Backspace' && e.ctrlKey === true) {
    clearDisplay();
  } else if (e.key === 'Backspace') {
    handleUndo();
  } else if (e.key === '-' && operation) {
    handleNegative();
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    handleOperator(e.key);
    enteringSecondNumber = true;
    currentlyEnteringSecondNumber = true;
  } else if (e.key === 'Enter') {
    handleEqual();
  }
})
del.addEventListener('click', handleUndo);
negative.addEventListener('click', handleNegative);

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
  return (Math.round(value * 100000) / 100000).toString();
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
      previousOperationDisplay.textContent = `${+firstNum} ${operation} ${secondNumDisplay}`;
    }
  }
}

function handleOperator(e) {
  if (+display.textContent || +firstNum || operation) {
    console.log('sdfisdf')
    operation = e;
    clickedEquals = false;
    previousOperationDisplay.classList.remove('hidden');
    if (secondNum) {
      firstNum = operate(+firstNum, +secondNum, previousOperation);
      secondNum = '';
      display.textContent = +firstNum;
      currentlyEnteringSecondNumber = false;
      firstOperation = false;
    } else {
      display.textContent = '0';
    }
    previousOperationDisplay.textContent = `${+firstNum} ${operation}`;
    previousOperation = operation;
  }
}

function clearDisplay() {
  display.textContent = '0';
  firstNum = '';
  secondNum = '';
  operation = '';
  previousOperationDisplay.textContent = '';
  firstOperation = true;
  enteringSecondNumber = false;
}

function handleUndo() {
  if (secondNum) {
    secondNum = secondNum.slice(0, secondNum.length - 1);
    const prevDisplay = previousOperationDisplay.textContent.slice(0, previousOperationDisplay.textContent.length - 1);
    display.textContent = secondNum;
    previousOperationDisplay.textContent = prevDisplay;
    if (secondNum === '-') {
      previousOperationDisplay.textContent = prevDisplay.slice(0, prevDisplay.length - 1);
      secondNum = '';
    }
    if (!secondNum) {
      previousOperationDisplay.textContent = prevDisplay.slice(0, prevDisplay.length - 1);
      display.textContent = '0';
      secondNum = '';
    }
  } else if (operation) {
    operation = '';
    const prevDisplay = previousOperationDisplay.textContent.slice(0, previousOperationDisplay.textContent.length - 2);
    previousOperationDisplay.textContent = prevDisplay;
    currentlyEnteringSecondNumber = false;
    display.textContent = firstNum;
    previousOperationDisplay.textContent = '';
  } else {
    firstNum = firstNum.slice(0, firstNum.length - 1);
    const prevDisplay = previousOperationDisplay.textContent.slice(0, previousOperationDisplay.textContent.length - 1);
    display.textContent = firstNum;
    if (firstNum === '-') {
      previousOperationDisplay.textContent = prevDisplay.slice(0, prevDisplay.length - 1);
    }
    if (!firstNum) {
      display.textContent = '0';
      firstNum = '';
      firstOperation = true;
    }
  }
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

function handleNegative() {
  if (secondNum) {
    const newNum = secondNum.split('');
    if (newNum[0] !== '-') {
      newNum.unshift('-');
      const toggleNegative = newNum.join('');
      secondNum = toggleNegative;
      display.textContent = toggleNegative;
    } else {
      newNum.shift();
      const toggleNegative = newNum.join('');
      secondNum = toggleNegative;
      display.textContent = toggleNegative;
    }
    previousOperationDisplay.textContent = `${+firstNum} ${operation} ${+secondNum}`;
  } else if (firstNum && !currentlyEnteringSecondNumber || +display.textContent) {
    const newNum = firstNum.split('');
    if (newNum[0] !== '-') {
      newNum.unshift('-');
      const toggleNegative = newNum.join('');
      firstNum = toggleNegative;
      display.textContent = toggleNegative;
    } else {
      newNum.shift();
      const toggleNegative = newNum.join('');
      firstNum = toggleNegative;
      display.textContent = toggleNegative;
    }
    if (!firstOperation) {
      previousOperationDisplay.textContent = `${+firstNum} ${operation}`;
    }
  }
}
