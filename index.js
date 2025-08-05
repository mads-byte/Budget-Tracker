const incomeSection = document.getElementById('incomeSection');
const expenseSection = document.getElementById('expenseSection');
const summarySection = document.getElementById('summarySection');
const incomeNameInput = document.getElementById('incomeName');
const expenseNameInput = document.getElementById('expenseName');
const warning = document.getElementById('warning');
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
    }
    else if (incomeNameInput.value.length >= 1) {
        warning.textContent = "";
    };
};

function validateExpenseName() {
    if (incomeNameInput.value.trim() < 1) {
        warning2.textContent = "Please enter a name or description";
    }
    else if (incomeNameInput.value.length >= 1) {
        warning2.textContent = "";
    };
};



