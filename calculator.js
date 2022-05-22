const display = document.querySelector(".display");
const topDisplay = document.querySelector(".lesser-display");
const digits = document.querySelectorAll(".digit");
const opers = document.querySelectorAll(".oper-sign");
let currentOper;
let currentValue = 0;
let savedValue = 0;

digits.forEach(digit => {
    let value = digit.defaultValue;
    digit.addEventListener("click", () => {
        addToDisplay(value);
    });
});

opers.forEach(oper => {
    let value = oper.defaultValue;
    oper.addEventListener("click", () => {
        useOper(value);
    });
});



document.querySelector("#clear").addEventListener("click", () => {
    clearAll();
});

document.querySelector("#delete").addEventListener("click", () => {
    deleteLast();
});

document.querySelector("#toggle").addEventListener("click", () => {
    togglePositiveNegative();
});

document.querySelector(".equal").addEventListener("click", () => {
    pushEqualSign();
});

document.querySelector('.dot').addEventListener("click", () => {
    if (display.textContent == "0") {
        display.textContent += ".";
        checkDot();
    } else {
        addToDisplay(".");
    }
})

function add(a, b) {
    return +a + +b
}

function substract(a,b) {
    return +a - +b
}

function multiply(a, b) {
    return +a * +b
}

function divide(a, b) {
    return +a / +b
}

function power(a, b) {
    return (+a) ** +b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b)
        case "-":
            return substract(a, b)
        case "x":
            return multiply(a, b)
        case "/":
            if (b == 0) {
                return "Fail"
            } else {
                return divide (a, b)
            }
        case "^":
            return power(a,b);
    }
}

function addToDisplay(e) {
    if (display.textContent === "0") {
        display.textContent = e;
    } else if (getDisplayLength() <= 11) {
        display.textContent = display.textContent + e;
    }
    updateCurrentValue();
}

function useOper(e) {
    if (currentOper === undefined & topDisplay.textContent === '') {
        currentOper = e;
        topDisplay.textContent = `${display.textContent} ${currentOper}`;
        savedValue = Number(display.textContent);
        clearDisplay();
        updateCurrentValue();
    } else if (currentOper === undefined) {
        currentOper = e;
        topDisplay.textContent = `${savedValue} ${currentOper}`;
    } else {
        let result = equals();
        topDisplay.textContent = result;
        clearDisplay();
        topDisplay.textContent += e;
        currentOper = e;
        savedValue = result;
    }
}

function equals() {
    let result = operate(currentOper, savedValue, currentValue);
    return result
}

function pushEqualSign() {
    if (currentOper !== undefined) {
        let result = equals();
        currentOper = undefined;
        topDisplay.textContent = result;
        savedValue = result;
        clearDisplay(); 
    }
}

function getDisplayLength() {
    if (display.textContent.charAt(0) == "-") {
        return (display.textContent.length - 1)
    } else {
        return display.textContent.length
    }
}

function clearAll() {
    display.textContent = 0;
    topDisplay.textContent = '';
    updateCurrentValue();
    savedValue = 0;
    currentOper = undefined;
}

function clearDisplay() {
    display.textContent = 0;
    updateCurrentValue();
}

function deleteLast() {
    if (getDisplayLength() <= 1) {
        display.textContent = "0";
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
    updateCurrentValue();
}

function togglePositiveNegative () {
    if (display.textContent == "0") {
        display.textContent = "-0";
    }
    display.textContent = -display.textContent;
}

function updateCurrentValue() {
    currentValue = Number(display.textContent);
    checkDot();
}

function displayToTopDisplay () {
    topDisplay.textContent = display.textContent;
    clearDisplay();
}

function checkDot() {
    const dotButton = document.querySelector('.dot');
    if (display.textContent.includes('.')) {
        dotButton.disabled = true;
    } else {
        dotButton.disabled = false;
    }
}