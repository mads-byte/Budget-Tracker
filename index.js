//Header section variables
const firstNameInput = document.getElementById('firstNameInput');
const lastNameInput = document.getElementById('lastNameInput');
const userNameDisplay = document.getElementById('userNameDisplay');
const nameSubmitBtn = document.getElementById('nameSubmit');
const requiredNameWarning = document.getElementById('requiredNameWarning');
//end of header section variables


//income section variables
const incomeNameInput = document.getElementById('incomeName');
const amountInput = document.getElementById('amountInput');
const amountWarning = document.getElementById('amountWarning');
const warning = document.getElementById('warning');
const incomeList = document.getElementById('incomeList');
const appendIncomeBtn = document.getElementById('appendIncome');
//end of income section variables


//expense section variables
const expenseNameInput = document.getElementById('expenseName');
const costInput = document.getElementById('costInput')
const warning2 = document.getElementById('warning2');
const costWarning = document.getElementById('costWarning');
const expenseList = document.getElementById('expenseList');
const appendExpenseBtn = document.getElementById('appendExpense');
//end of expense section variables


//summary section variables
const monthlyIncomeDisplay = document.getElementById('monthlyIncome');
const monthlyExpenseDisplay = document.getElementById('monthlyExpenses');
const monthlyNetIncome = document.getElementById('netIncome');
const pieChart = document.getElementById('pieChart');
const advice = document.getElementById('advice');
const summarizeBtn = document.getElementById('summarizeBtn');
let yourBudget, yourBudgetIncome, yourBudgetExpenses, yourBudgetSummary;
let incomeTotal
let expenseTotal
let netIncome
let finalExpensePercent
let finalNetPercent
//end of summary section variables


//This is the constructor that creates a budget object
class Budget {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    appendName(firstName, lastName) { //this methhod appends the name AND enables the following buttons and input
        if (firstName.trim().length > 0) { //this checks if the name string contains characters after spaces are trimmed off
            userNameDisplay.textContent = `${firstName} ${lastName}`;
            amountInput.disabled = false;
            incomeNameInput.disabled = false;
            expenseNameInput.disabled = false;
            costInput.disabled = false;
            summarizeBtn.disabled = false;
        }
    }
};

class BudgetIncome extends Budget { //this will be used to instantiate a BudgetIncome object
    incomeNames = []; //this initializes an empty array to which each name/description will be pushed
    incomeAmounts = []; //this initializes an empty array to which each income amount will be pushed
    appendIncome(name, amount) {  //validates and appends income names/amounts to the screen while pushing them to the arrays
        let stringAmount = amount.toString(); //makes the amount easier to validate
        if (name.trim().length < 1) { //blocks empty input from being pushed/appended
            warning.textContent = "Please enter a name or description";
        }
        else if (stringAmount.length === 0 || stringAmount.includes("-")) { //blocks empty input and negative input from being pushed/appended
            amountWarning.textContent = "Please enter a valid (positive) number";
        }
        else if (firstNameInput.value.trim().length === 0) { // blocks empty input from being processed
            requiredNameWarning.textContent = "Please Enter a name and click the Enter Name button";
        }
        else if (stringAmount.length > 8) { //blocks numbers that exceed 8 digits in length from being appended, pushed, or processed
            amountWarning.textContent = "Amount exceeds maximum length";
        }
        else { //handles both appending content to the screen and pushing it to the appropriate array
            const newIncome = document.createElement("li");
            newIncome.textContent = `${incomeNameInput.value} $${parseFloat(amount)}`;
            incomeList.appendChild(newIncome);
            this.incomeNames.push(name);
            this.incomeAmounts.push(parseFloat(amount));
            amountWarning.textContent = ""; //removes warning messages if input is valid
            warning.textContent = ""; //removes warning messages if input is valid
            requiredNameWarning.textContent = ""; //removes warning messages if input is valid
        }
    }
    incomeSum() { //handles adding up all of the income
        let incomeTotal = 0;
        for (let i = 0; i < this.incomeAmounts.length; i++) { //iterates over the income array
            incomeTotal += this.incomeAmounts[i]; //updates the income total after each addition
        }
        monthlyIncomeDisplay.textContent = incomeTotal; //updates the DOM
        return incomeTotal;
    }
};

class BudgetExpenses extends BudgetIncome { //this will be used to instantiate a BudgetExpenses object
    expenseNames = []; //this initializes an empty array to which each name/description will be pushed
    costAmounts = []; //this initializes an empty array to which each expense cost will be pushed
    //expenseExpression = [];
    appendExpense(name, cost) {  //this method essentially functions similarly to the appendIncome method except it targets variables in the expense section
        let stringCost = cost.toString();
        if (name.trim().length < 1) {
            warning2.textContent = "Please enter a name or description";
        }
        else if (stringCost.length === 0 || stringCost.includes("-")) {
            costWarning.textContent = "Please enter a valid (positive) number";
        }
        else if (firstNameInput.value.trim().length === 0) {
            requiredNameWarning.textContent = "Please Enter a name and click the Enter Name button";
        }
        else if (stringCost.length > 8) {
            costWarning.textContent = "Amount exceeds maximum length";
        }
        else {
            const newExpense = document.createElement("li");
            newExpense.textContent = `${expenseNameInput.value} $${parseFloat(cost)}`;
            expenseList.appendChild(newExpense);
            this.expenseNames.push(name);
            this.costAmounts.push(parseFloat(cost));
            costWarning.textContent = "";
            warning2.textContent = "";
            requiredNameWarning.textContent = "";
        }
    }
    expenseSum() { //this method essentially functions similarly to the incomeSum method except it targets variables in the expense section
        let expenseTotal = 0;
        for (let i = 0; i < this.costAmounts.length; i++) {
            expenseTotal += this.costAmounts[i];
        }
        monthlyExpenseDisplay.textContent = `${expenseTotal}`;
        return expenseTotal;
    }
};

class BudgetSummary extends BudgetExpenses { //this will be used to instantiate a BudgetSummary object
    incomeLeft = "You have some income left over. That's great! You can spend this on hobbies and non essentials or even invest.";
    incomeNegative = "You are using 100% or more of your income on needs which isn't sustainable. Try to cut some non essential expenses.";
    incomeNoSavings = "Try to include savings in your budget next time!";
    updateNetIncome() {
        incomeTotal = yourBudgetIncome.incomeSum();
        expenseTotal = yourBudgetExpenses.expenseSum();
        netIncome = incomeTotal - expenseTotal;
        monthlyNetIncome.textContent = netIncome;
        let expensePercent = expenseTotal / incomeTotal;
        let expensePercentStr = expensePercent.toFixed(2);
        finalExpensePercent = parseFloat(expensePercentStr) * 100;
        let netPercent = netIncome / incomeTotal;
        let netPercentStr = netPercent.toFixed(2);
        finalNetPercent = parseFloat(netPercentStr) * 100;
        console.log(finalExpensePercent);
        console.log(finalNetPercent);
        let pieChartString = `conic-gradient(blue 0%, blue ${finalExpensePercent}%, red 0%, red 0%)`;
        pieChart.style.background = pieChartString;
    };
    summaryMessage() {
        if (!yourBudgetExpenses.expenseNames.includes('savings') && !yourBudgetExpenses.expenseNames.includes('Savings') && finalExpensePercent < 100) {
            advice.textContent = `${this.incomeLeft} ${this.incomeNoSavings}`
        }
        else if (finalExpensePercent >= 100) {
            advice.textContent = `${this.incomeNegative}`;
        }
        else {
            advice.textContent = `${this.incomeLeft}`
        }
    }
};


expenseNameInput.addEventListener('input', () => {
    if (expenseNameInput.value.length >= 45) {
        warning2.textContent = "character limit reached";
    }
});

incomeNameInput.addEventListener('input', () => {
    if (incomeNameInput.value.length >= 45) {
        warning.textContent = "character limit reached";
    }
});

firstNameInput.addEventListener('blur', () => {
    if (firstNameInput.value.trim().length == 0) {
        requiredNameWarning.textContent = "Please Enter a name and click the Enter Name button"
    }
    else {
        requiredNameWarning.textContent = "";
    }
});

nameSubmitBtn.addEventListener("click", () => {
    let fname = firstNameInput.value;
    let lname = lastNameInput.value;
    yourBudget = new Budget(fname, lname);
    yourBudget.appendName(fname, lname);
    yourBudgetIncome = new BudgetIncome();
    yourBudgetExpenses = new BudgetExpenses();
    yourBudgetSummary = new BudgetSummary();
});

appendIncomeBtn.addEventListener("click", () => {
    const incName = incomeNameInput.value;
    const incAmount = amountInput.value;
    yourBudgetIncome.appendIncome(incName, incAmount);
    yourBudgetIncome.incomeSum();
    console.log(yourBudgetIncome.incomeNames);
    console.log(yourBudgetIncome.incomeAmounts);
    if (yourBudgetIncome.incomeNames.length >= 30) {
        appendIncomeBtn.disabled = true;
    };
    yourBudgetSummary.updateNetIncome();
});

appendExpenseBtn.addEventListener("click", () => {
    const exName = expenseNameInput.value;
    const exAmount = costInput.value;
    yourBudgetExpenses.appendExpense(exName, exAmount);
    yourBudgetExpenses.expenseSum();
    console.log(yourBudgetExpenses.expenseNames);
    console.log(yourBudgetExpenses.costAmounts);
    if (yourBudgetExpenses.expenseNames.length >= 30) {
        appendExpenseBtn.disabled = true;
    };
    yourBudgetSummary.updateNetIncome();
});

summarizeBtn.addEventListener("click", () => {
    if (incomeTotal > 0) {
        yourBudgetSummary.summaryMessage();
    }
});



