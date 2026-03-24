function normalize(data) {
    var normalized = {};

    normalized.workHours = parseFloat(data.workHours);
    if (isNaN(normalized.workHours)) {
        normalized.workHours = 0;
    }

    normalized.payRate = parseFloat(data.payRate);
    if (isNaN(normalized.payRate)) {
        normalized.payRate = 0;
    }

    normalized.expenses = {};

    var keys = Object.keys(data.expenses);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = parseFloat(data.expenses[key]);

        if (isNaN(value)) {
            value = 0;
        }

        normalized.expenses[key] = value;
    }

    return normalized;
}

function calculatePay(data) {
    if (data.workHours <= 0 || data.payRate <= 0) {
        data.pay = 0;
        return data;
    }

    data.pay = data.workHours * data.payRate * 52;
    return data;
}

function calculateExpenses(data) {
    var totalMonthly = 0;

    for (var key in data.expenses) {
        totalMonthly = totalMonthly + data.expenses[key];
    }

    data.expensesTotal = totalMonthly * 12;
    return data;
}

function calculateBalance(data) {
    data.balance = data.pay - data.expensesTotal;
    return data;
}

function pipeline(inputData) {
    var step1 = normalize(inputData);
    var step2 = calculatePay(step1);
    var step3 = calculateExpenses(step2);
    var finalResult = calculateBalance(step3);

    return finalResult;
}

function getInputData() {
    var data = {};

    data.workHours = document.getElementById("workHours").value;
    data.payRate = document.getElementById("payRate").value;

    data.expenses = {};
    data.expenses.groceries = document.getElementById("groceries").value;
    data.expenses.rent = document.getElementById("rent").value;
    data.expenses.util = document.getElementById("util").value;
    data.expenses.clothing = document.getElementById("clothing").value;
    data.expenses.entertainment = document.getElementById("entertainment").value;
    data.expenses.food = document.getElementById("food").value;

    return data;
}


function displayResults(data) {
    document.getElementById("payResult").textContent = data.pay;
    document.getElementById("expenseResult").textContent = data.expensesTotal;
    document.getElementById("balanceResult").textContent = data.balance;
}

function calculate() {
    var input = getInputData();
    var result = pipeline(input);
    displayResults(result);

    // store for export
    window.lastResult = result;
}

function exportToFile() {
    if (!window.lastResult) {
        return;
    }

    var data = window.lastResult;

    var content = "";
    content = content + data.workHours + "\n";
    content = content + data.payRate + "\n";

    var keys = Object.keys(data.expenses);
    for (var i = 0; i < keys.length; i++) {
        content = content + data.expenses[keys[i]] + "\n";
    }

    content = content + data.pay + "\n";
    content = content + data.expensesTotal + "\n";
    content = content + data.balance;

    var blob = new Blob([content], { type: "text/plain" });

    var link = document.createElement("a");
    link.download = "userInput.txt";
    link.href = window.URL.createObjectURL(blob);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
