const incomeSection = document.getElementById('incomeSection');
const expenseSection = document.getElementById('expenseSection');
const summarySection = document.getElementById('summarySection');
const incomeNameInput = document.getElementById('incomeName');
const expenseNameInput = document.getElementById('expenseName');
const amountInput = document.getElementById('amountInput');
const warning = document.getElementById('warning');
const amountWarning = document.getElementById('amountWarning');
const warning2 = document.getElementById('warning2');



incomeNameInput.addEventListener('input', () => {
    if (incomeNameInput.value.length >= 45) {
        warning.textContent = "character limit reached";
    }
});

expenseNameInput.addEventListener('input', () => {
    if (expenseNameInput.value.length >= 45) {
        warning2.textContent = "character limit reached";
    }
});

function validateName() {
    if (incomeNameInput.value.trim() < 1) {
        warning.textContent = "Please enter a name or description";
        return false;
    }
    else if (incomeNameInput.value.length >= 1) {
        warning.textContent = "";
        return false;
    };
};

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

function validateAmount() {
    if (amountInput.value == undefined) {
        amountWarning.textContent = "Please enter an amount";
        return false;
    }
    else if (amountInput.value)
};





