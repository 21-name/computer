const previousDisplay = document.getElementById('previous');
const currentDisplay = document.getElementById('current');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

function updateDisplay() {
    currentDisplay.textContent = currentOperand;
    if (operation != null) {
        previousDisplay.textContent = `${previousOperand} ${operation}`;
    } else {
        previousDisplay.textContent = previousOperand;
    }
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    shouldResetScreen = true;
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('不能除以零');
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    currentOperand = String(computation);
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
}

function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
}

function deleteNumber() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
}

document.querySelector('.buttons').addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const action = e.target.dataset.action;
    const value = e.target.dataset.value;

    switch (action) {
        case 'number':
            appendNumber(value);
            break;
        case 'operator':
            chooseOperation(value);
            break;
        case 'equals':
            compute();
            break;
        case 'clear':
            clear();
            break;
        case 'delete':
            deleteNumber();
            break;
    }
    updateDisplay();
});

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+') chooseOperation('+');
    if (e.key === '-') chooseOperation('-');
    if (e.key === '*') chooseOperation('×');
    if (e.key === '/') chooseOperation('÷');
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        compute();
    }
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    updateDisplay();
});

updateDisplay();
