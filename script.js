//Create objects variables arrays and change as such for specificatios
let workHours = 0;
let payRate = 0;
let estPay = 0;
let newExpenses = {
    Groceries: 0,
    Rent: 0,
    Util: 0,
    Clothing: 0,
    Entertainment: 0,
    Food: 0
};

//Basic function that calculates total projected pay for the year
function totalPay( workHours, payRate){
    if( workHours <= 0 || payRate <= 0 ){
        alert("No pay can be estimated");
        return;
    }
    else{
        estPay = workHours * payRate * 52;
        return estPay;
    }

}

//function that calculates the total projected expendetures for the month
function totalCost( newExpenses ){
    let sumCost = 0;
    for (let key in newExpenses) {
        if (newExpenses.hasOwnProperty(key)) {
            sumCost += newExpenses[key];
        }
    }
    return sumCost;
};

//This function runs after the calculate button is clicked
$('#calculateBtn').click(function () {
    //takes in the values input by the user
    let workHours = $("#workHours").val();
    let payRate = $("#payRate").val();
    //takes in the values input by the user
    
    let expenses = {
        Groceries: parseFloat($("#groceries").val()),
        Rent: parseFloat($("#rent").val()),
        Util: parseFloat($("#util").val()),
        Clothing: parseFloat($("#clothing").val()),
        Entertainment: parseFloat($("#entertainment").val()),
        Food: parseFloat($("#food").val())
    };
    
    newExpenses = expenses;

    //This will call the totalPay function
    let estimatedPay = totalPay(workHours, payRate);
    
    //the cost for the month this will result in estimated costs for the year
    let estimatedExpenses = totalCost(expenses) *12;
    //this is how much you should have left over after expenses
    let remainingBalance = estimatedPay - estimatedExpenses;
    //This changes the current text in payResult
    $("#payResult").text(estimatedPay);
    //This changes the current text in expenseResult
    $("#expenseResult").text(estimatedExpenses);
    //This changes the current text in balanceResult
    $("#balanceResult").text(remainingBalance);

});

function exportToFile() {
    const inputs = [
        document.getElementById('workHours').value,
        document.getElementById('payRate').value,
        document.getElementById('groceries').value,
        document.getElementById('rent').value,
        document.getElementById('util').value,
        document.getElementById('clothing').value,
        document.getElementById('entertainment').value,
        document.getElementById('food').value,
        document.getElementById('payResult').textContent,
        document.getElementById('expenseResult').textContent,
        document.getElementById('balanceResult').textContent

    ];
    // Get the user input value
    const userInput = inputs.join('\n');

    // Create a Blob with the user input
    const blob = new Blob([userInput], { type: 'text/plain' });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute with a filename
    link.download = 'userInput.txt';

    // Create a URL for the Blob and set it as the href attribute
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}