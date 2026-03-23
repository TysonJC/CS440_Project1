// VIEW
const View = (() => {
function getInputValues() {
return {
workHours: $("#workHours").val(),
payRate: $("#payRate").val(),
expenses: {
groceries: parseFloat($("#groceries").val()) || 0,
rent: parseFloat($("#rent").val()) || 0,
util: parseFloat($("#util").val()) || 0,
clothing: parseFloat($("#clothing").val()) || 0,
entertainment: parseFloat($("#entertainment").val()) || 0,
food: parseFloat($("#food").val()) || 0
}
};
}
function displayResults({ pay, expenses, balance }) {
$("#payResult").text(pay);
$("#expenseResult").text(expenses);
$("#balanceResult").text(balance);
}
function exportToFile(data) {
const content = [
data.workHours,
data.payRate,
...Object.values(data.expenses),
data.results.pay,
data.results.expenses,
data.results.balance
].join('\n');
const blob = new Blob([content], { type: 'text/plain' });
const link = document.createElement('a');
link.download = 'userInput.txt';
link.href = window.URL.createObjectURL(blob);
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}
return {
getInputValues,
displayResults,
exportToFile
};
})();

