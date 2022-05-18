const display = document.querySelector(".display");
const topDisplay = document.querySelector(".lesser-display");
const digits = document.querySelectorAll(".digit");

digits.forEach(digit => {
    let value = digit.defaultValue;
    digit.addEventListener("click", () => {
        addToDisplay(value);
    });
});


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
        case "*":
            return multiply(a, b)
        case "/":
            if (b == 0) {
                return "Fail"
            } else {
                return divide (a, b)
            }
    }
}

function addToDisplay(e) {
    display.textContent += e;
}

function clearDisplay() {
    display.textContent = 0;
    topDisplay.textContent = '';
}