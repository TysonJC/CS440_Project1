// CONTROLLER
const Controller = ((Model, View) => {
function handleCalculate() {
const input = View.getInputValues();
Model.setIncome(input.workHours, input.payRate);
Model.setExpenses(input.expenses);
const results = Model.getResults();
View.displayResults(results);
}
function handleExport() {
const state = Model.getState();
const results = Model.getResults();
View.exportToFile({
...state,
results
});
}
function init() {
$("#calculateBtn").click(handleCalculate);
window.exportToFile = handleExport; // keeps your button working
}
return { init };
})(Model, View);
$(document).ready(function () {
Controller.init();
});
