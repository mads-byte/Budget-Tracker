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

const monthlyIncomeDisplay = document.getElementById('monthlyIncome');
const monthlyExpenseDisplay = document.getElementById('monthlyExpenses');
const monthlyNetIncome = document.getElementById('netIncome');
const pieChart = document.getElementById('pieChart');
const numRegex = /^\d+$/;
let yourBudget, yourBudgetIncome, yourBudgetExpenses, yourBudgetSummary;
let incomeTotal
let expenseTotal
let netIncome
let finalExpensePercent
let finalNetPercent

function updateNetIncome() {
    incomeTotal = yourBudgetIncome.incomeSum();
    expenseTotal = yourBudgetExpenses.expenseSum();
    console.log("incomeTotal:", incomeTotal);
    console.log("expenseTotal:", expenseTotal);
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

class Budget {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    appendName(firstName, lastName) {
        if (firstName.trim().length > 0) {
            userNameDisplay.textContent = `${firstName} ${lastName}`;
            amountInput.disabled = false;
            incomeNameInput.disabled = false;
            expenseNameInput.disabled = false;
            costInput.disabled = false;
        }
    }
};

class BudgetIncome extends Budget {
    incomeNames = [];
    incomeAmounts = [];
    appendIncome(name, amount) {
        let stringAmount = amount.toString();
        if (name.trim().length < 1) {
            warning.textContent = "Please enter a name or description";
        }
        else if (stringAmount.length === 0 || stringAmount.includes("-")) {
            amountWarning.textContent = "Please enter a valid (positive) number";
        }
        else if (firstNameInput.value.trim().length === 0) {
            requiredNameWarning.textContent = "Please Enter a name and click the Enter Name button";
        }
        else if (stringAmount.length >= 9) {
            amountWarning.textContent = "Amount exceeds maximum length";
        }
        else {
            const newIncome = document.createElement("li");
            newIncome.textContent = `${incomeNameInput.value} $${parseFloat(amount)}`;
            incomeList.appendChild(newIncome);
            this.incomeNames.push(name);
            this.incomeAmounts.push(parseFloat(amount));
            amountWarning.textContent = "";
            warning.textContent = "";
            requiredNameWarning.textContent = "";
        }
    }
    incomeSum() {
        let incomeTotal = 0;
        for (let i = 0; i < this.incomeAmounts.length; i++) {
            incomeTotal += this.incomeAmounts[i];
        }
        monthlyIncomeDisplay.textContent = incomeTotal;
        return incomeTotal;
    }
};

class BudgetExpenses extends BudgetIncome {
    expenseNames = [];
    costAmounts = [];
    expenseExpression = [];
    appendExpense(name, cost) {
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
        else if (stringCost.length >= 9) {
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
    expenseSum() {
        let expenseTotal = 0;
        for (let i = 0; i < this.costAmounts.length; i++) {
            expenseTotal += this.costAmounts[i];
        }
        monthlyExpenseDisplay.textContent = `${expenseTotal}`;
        return expenseTotal;
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
    updateNetIncome();
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
    updateNetIncome();
});



