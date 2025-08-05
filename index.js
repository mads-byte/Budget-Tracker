const incomeSection = document.getElementById('incomeSection');
const expenseSection = document.getElementById('expenseSection');
const summarySection = document.getElementById('summarySection');
const incomeNameInput = document.getElementById('incomeName');
const expenseNameInput = document.getElementById('expenseName');
const amountInput = document.getElementById('amountInput');
const warning = document.getElementById('warning');
const amountWarning = document.getElementById('amountWarning');
const warning2 = document.getElementById('warning2');
const firstNameInput = document.getElementById('firstNameInput');
const lastNameInput = document.getElementById('lastNameInput');
const userNameDisplay = document.getElementById('userNameDisplay');
const nameSubmitBtn = document.getElementById('nameSubmit');
const incomeList = document.getElementById('incomeList');
const appendIncomeBtn = document.getElementById('appendIncome');
const numRegex = /^\d+$/;
let yourBudget;



expenseNameInput.addEventListener('input', () => {
    if (expenseNameInput.value.length >= 45) {
        warning2.textContent = "character limit reached";
    }
});



function validateExpenseName() {
    if (incomeNameInput.value.trim() < 1) {
        warning2.textContent = "Please enter a name or description";
        return false;
    }
    else if (incomeNameInput.value.length >= 1) {
        warning2.textContent = "";
        return false;
    };
};


class Budget {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    appendName(firstName, lastName) {
        userNameDisplay.textContent = `${firstName} ${lastName}`;
    }
};

class BudgetIncome extends Budget {
    incomeNames = [];
    incomeAmounts = [];

};

nameSubmitBtn.addEventListener("click", () => {
    let fname = firstNameInput.value;
    let lname = lastNameInput.value;
    yourBudget = new Budget(fname, lname);
    yourBudget.appendName(fname, lname);
})
incomeNameInput.addEventListener('input', () => {
    if (incomeNameInput.value.length >= 45) {
        warning.textContent = "character limit reached";
    }
});

incomeNameInput.addEventListener('blur', () => {
    if (incomeNameInput.value.trim() < 1) {
        warning.textContent = "Please enter a name or description";
        return false;
    }
    else if (incomeNameInput.value.length >= 1) {
        warning.textContent = "";
        return true;
    };
});

amountInput.addEventListener('blur', () => {
    let stringAmount = amountInput.value.toString();
    let isValid = numRegex.test(stringAmount);
    if (isValid) {
        amountWarning.textContent = "";
        appendIncomeBtn.disabled = false;
        return true;
    }
    else {
        amountWarning.textContent = "Please enter a valid number";
        appendIncomeBtn.disabled = true;
        return false;
    };
})

appendIncomeBtn.addEventListener("click", () => {
    if (incomeNameInput.value.length <= 45 && incomeNameInput.value.length >= 1) {
        const newIncome = document.createElement("li");
        newIncome.textContent = `${incomeNameInput.value} ${amountInput.value}`;
        incomeList.appendChild(newIncome);
    }
});







