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
const adviceBtn = document.getElementById('adviceBtn');

let incomeTotal
let expenseTotal
let netIncome
let finalExpensePercent
let finalNetPercent
//end of summary section variables


//This is the constructor that creates a budget object on which all other objects are based
class Budget {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    appendName(firstName, lastName) { //this methhod appends the name and enables the following buttons and input
        if (firstName.trim().length > 0) { //checks if input is empty after trimming spaces off both ends of the string
            userNameDisplay.textContent = `, ${firstName} ${lastName}`;
            amountInput.disabled = false;
            incomeNameInput.disabled = false;
            expenseNameInput.disabled = false;
            costInput.disabled = false;
            adviceBtn.disabled = false;
        }
    }
};

class BudgetIncome extends Budget { //this will be used to instantiate a BudgetIncome object containing income related functionality
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
        else if (stringAmount.length > 10) { //blocks numbers that exceed 8 digits in length from being appended, pushed, or processed
            amountWarning.textContent = "Amount exceeds maximum length";
        }
        else { //handles both appending content to the screen and pushing it to the appropriate array
            const newIncome = document.createElement("li");
            newIncome.textContent = `${incomeNameInput.value} $${parseFloat(amount)}`;
            incomeList.appendChild(newIncome);
            this.incomeNames.push(name.trim());
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

class BudgetExpenses extends BudgetIncome { //this will be used to instantiate a BudgetExpenses object containing expense related functionality
    expenseNames = []; //this initializes an empty array to which each name/description will be pushed
    costAmounts = []; //this initializes an empty array to which each expense cost will be pushed
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
        else if (stringCost.length > 10) {
            costWarning.textContent = "Amount exceeds maximum length";
        }
        else {
            const newExpense = document.createElement("li");
            newExpense.textContent = `${expenseNameInput.value} $${parseFloat(cost)}`;
            expenseList.appendChild(newExpense);
            this.expenseNames.push(name.trim());
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

class BudgetSummary extends BudgetExpenses {
    incomeLeft = `You have ${netIncome} left over. That's great! You can invest or spend this on hobbies and non essentials.`;
    incomeNegative = "You are using 100% or more of your income on expenses which isn't sustainable. Try to cut some non essential expenses.";
    incomeNoSavings = "Try to include savings in your budget next time!";
    updateNetIncome() {
        incomeTotal = yourBudgetIncome.incomeSum();
        expenseTotal = yourBudgetExpenses.expenseSum();
        netIncome = incomeTotal - expenseTotal; //calculates the income left after expenses
        monthlyNetIncome.textContent = netIncome; //updates the DOM (displays the result on the page)
        let expensePercent = expenseTotal / incomeTotal; //calculates how much of income is taken up by expenses
        let expensePercentStr = expensePercent.toFixed(2); //allows a value with digits up to two places after the decimal
        finalExpensePercent = parseFloat(expensePercentStr) * 100; //converts value to a number and multiples by 100 to give a usable percentage
        let netPercent = netIncome / incomeTotal;
        let netPercentStr = netPercent.toFixed(2);
        finalNetPercent = parseFloat(netPercentStr) * 100;
        console.log(finalExpensePercent);
        console.log(finalNetPercent);
        //template literal that dynamically updates the blue section of the pie chart to reflect expense percentage.
        let pieChartString = `conic-gradient(rgb(3, 87, 184) 0%, rgb(3, 87, 184) ${finalExpensePercent}%, rgb(9, 176, 137) 0%, rgb(9, 176, 137) 0%)`;
        pieChart.style.background = pieChartString; //sets pie chart styles to the above template literal
        return netIncome
    };
    /*summaryMessage handles logic to decide which summary message to display based on user's financial situation*/
    //checks if the user has savings listed in their budget expenses and if they are using all of their income on expenses

    summaryMessage() {
        if (!yourBudgetExpenses.expenseNames.includes('savings') && !yourBudgetExpenses.expenseNames.includes('Savings') && finalExpensePercent < 100) {
            advice.textContent = `${this.incomeLeft} ${this.incomeNoSavings}`
        }
        else if (finalExpensePercent >= 100) {
            advice.textContent = `${this.incomeNegative}`;
        }
        else if (yourBudgetExpenses.expenseNames.includes('savings') || yourBudgetExpenses.expenseNames.includes('Savings') && finalExpensePercent < 100) {
            advice.textContent = `${this.incomeLeft}`
        }
    }
};


expenseNameInput.addEventListener('input', () => { //allows input to continuously check character limit and respond accordingly
    if (expenseNameInput.value.length >= 45) {
        warning2.textContent = "character limit reached";
    }
});

incomeNameInput.addEventListener('input', () => { //allows input to continuously check character limit and respond accordingly
    if (incomeNameInput.value.length >= 45) {
        warning.textContent = "character limit reached";
    }
});

firstNameInput.addEventListener('blur', () => { //warns user of empty name field upon clicking out of the input field
    if (firstNameInput.value.trim().length == 0) { //checks if input is empty after trimming spaces off both ends of the string
        requiredNameWarning.textContent = "Please Enter a name and click the Enter Name button"
    }
    else {
        requiredNameWarning.textContent = "";
    }
});

nameSubmitBtn.addEventListener("click", () => { //Instantiates all necessary objects for functionality 
    let fname = firstNameInput.value;
    let lname = lastNameInput.value;
    yourBudget = new Budget(fname, lname);
    yourBudget.appendName(fname, lname);
    yourBudgetIncome = new BudgetIncome();
    yourBudgetExpenses = new BudgetExpenses();
    yourBudgetSummary = new BudgetSummary();
});

appendIncomeBtn.addEventListener("click", () => {
    const incName = incomeNameInput.value; //initializes a variable based on user input to be passed into the appendExpense method
    const incAmount = amountInput.value; //initializes a variable based on user input to be passed into the appendExpense method
    yourBudgetIncome.appendIncome(incName, incAmount);
    yourBudgetIncome.incomeSum();
    console.log(yourBudgetIncome.incomeNames);
    console.log(yourBudgetIncome.incomeAmounts);
    if (yourBudgetIncome.incomeNames.length >= 30) { //Does not allow user to append more than 30 incomes
        appendIncomeBtn.disabled = true;
    };
    yourBudgetSummary.updateNetIncome();
    advice.textContent = "";
});

appendExpenseBtn.addEventListener("click", () => {
    const exName = expenseNameInput.value; //initializes a variable based on user input to be passed into the appendExpense method
    const exAmount = costInput.value; //initializes a variable based on user input to be passed into the appendExpense method
    yourBudgetExpenses.appendExpense(exName, exAmount);
    yourBudgetExpenses.expenseSum();
    console.log(yourBudgetExpenses.expenseNames);
    console.log(yourBudgetExpenses.costAmounts);
    if (yourBudgetExpenses.expenseNames.length >= 30) { //Does not allow user to append more than 30 expenses
        appendExpenseBtn.disabled = true;
    };
    yourBudgetSummary.updateNetIncome();
    advice.textContent = "";
});

adviceBtn.addEventListener("click", () => {
    if (incomeTotal > 0) { //only alows button to function if the user has income
        yourBudgetSummary.summaryMessage();
    };
});



