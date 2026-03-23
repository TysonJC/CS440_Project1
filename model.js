// MODEL
const Model = (() => {
const state = {
workHours: 0,
payRate: 0,
expenses: {
groceries: 0,
rent: 0,
util: 0,
clothing: 0,
entertainment: 0,
food: 0
}
};
function setIncome(hours, rate) {
state.workHours = parseFloat(hours) || 0;
state.payRate = parseFloat(rate) || 0;
}
function setExpenses(expenses) {
state.expenses = { ...expenses };
}
function calculateYearlyPay() {
if (state.workHours <= 0 || state.payRate <= 0) {
return 0;
}
return state.workHours * state.payRate * 52;
}
function calculateMonthlyExpenses() {
return Object.values(state.expenses)
.reduce((sum, val) => sum + val, 0);
}
function calculateYearlyExpenses() {
return calculateMonthlyExpenses() * 12;
}
function calculateBalance() {
return calculateYearlyPay() - calculateYearlyExpenses();
}
function getResults() {
return {
pay: calculateYearlyPay(),
expenses: calculateYearlyExpenses(),
balance: calculateBalance()
};
}
return {
setIncome,
setExpenses,
getResults,
getState: () => ({ ...state })
};
})();
