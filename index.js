const incomeSection = document.getElementById('incomeSection');
const expenseSection = document.getElementById('expenseSection');
const summarySection = document.getElementById('summarySection');
const incomeNameInput = document.getElementById('incomeName');
const expenseNameInput = document.getElementById('expenseName');
const warning = document.getElementById('warning');



incomeNameInput.addEventListener('input', () => {
    if (incomeNameInput.value.length >= 45) {
        warning.textContent = "character limit reached";
    }
});

function validateName() {
    if (incomeNameInput.value.length < 1) {
        warning.textContent = "Please enter a name or description";
    };
};

