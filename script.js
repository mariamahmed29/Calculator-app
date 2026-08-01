document.addEventListener("DOMContentLoaded", () => {
    let runningTotal = 0;   
    let buffer = "0";    
    let previousOperator = null;   
    let expression = "";  

    const screen = document.querySelector(".screen");

    // Main button click handler
    function buttonClick(value) {
        if (isNaN(value) && value !== ".") {
            handleSymbol(value);
        } else {
            handleNumber(value);
        }
        screen.innerText = expression || buffer;
    }

    // Handles non-numeric button clicks
    function handleSymbol(symbol) {
        switch (symbol) {
            case "C":
                buffer = "0";
                expression = "";
                runningTotal = 0;
                previousOperator = null;
                break;

            case "=":
                if (previousOperator === null) return;
                flushOperation(parseFloat(buffer)); 
                buffer = runningTotal.toString();
                expression = buffer;
                runningTotal = 0;
                previousOperator = null;
                break;

            case "←":
                if (buffer.length === 1) {
                    buffer = "0";
                } else {
                    buffer = buffer.slice(0, -1);
                }
                expression = expression.slice(0, -1);
                break;

            case "^":
                handleMath(symbol);
                break;

            case "√":
                buffer = Math.sqrt(parseFloat(buffer)).toString();
                expression = buffer;
                break;

            case "+":
            case "-":
            case "×":
            case "÷": 
            case "%":
                handleMath(symbol);
                break;
        }
    }

    // Handles math operations
    function handleMath(symbol) {
        if (buffer === "" || buffer === "0") return;

        const currentValue = parseFloat(buffer);

        if (runningTotal === 0) {
            runningTotal = currentValue;
        } else if (previousOperator) {
            flushOperation(currentValue);
        }

        previousOperator = symbol;
        expression += `${symbol}`;
        buffer = "";
    }

    // Handles numeric button clicks (including .)
    function handleNumber(number) {
        if (number === "." && buffer.includes(".")) return; // منع أكثر من نقطة
        if (buffer === "0" && number !== ".") {
            buffer = number;
        } else {
            buffer += number;
        }
        expression += number;
    }

    // Performs the pending operation
    function flushOperation(currentValue) {
        switch (previousOperator) {
            case "+":
                runningTotal += currentValue;
                break;
            case "-":
                runningTotal -= currentValue;
                break;
            case "×":
                runningTotal *= currentValue;
                break;
            case "÷":
                runningTotal /= currentValue;
                break;
            case "%":
                runningTotal %= currentValue;
                break;
            case "^":
                runningTotal = runningTotal ** currentValue;
                break;
        }
    }

    // Initializes event listeners
    function init() {
        document.querySelector(".calc-buttons")
            .addEventListener("click", (event) => {
                buttonClick(event.target.innerText);
            });
    }

    init();
});