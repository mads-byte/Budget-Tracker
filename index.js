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
//end of expense section variables

const monthlyIncomeDisplay = document.getElementById('monthlyIncome');


const numRegex = /^\d+$/;
//let yourBudget;



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
    appendIncome(name, amount) {
        let stringAmount = amount.toString();
        if (name.trim().length < 1) {
            warning.textContent = "Please enter a name or description";
        }
        else if (stringAmount.length === 0) {
            amountWarning.textContent = "Please enter a valid number";
        }
        else if (firstNameInput.value.trim().length === 0) {
            requiredNameWarning.textContent = "Please Enter a name and click the Enter Name button";
        }
        else if (stringAmount.length >= 9) {
            amountWarning.textContent = "Amount exceeds maximum";
        }
        else {
            const newIncome = document.createElement("li");
            newIncome.textContent = `${incomeNameInput.value} $${amountInput.value}`;
            incomeList.appendChild(newIncome);
            this.incomeNames.push(name);
            this.incomeAmounts.push(amount);
            amountWarning.textContent = "";
            warning.textContent = "";
            requiredNameWarning.textContent = "";
        }
    }
    incomeSum() {
        let incomeExpression = this.incomeAmounts.join("+");
        let incomeTotal = eval(incomeExpression);
        monthlyIncomeDisplay.textContent = incomeTotal;
    }
};

class BudgetExpenses extends BudgetIncome {

}


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
});

appendIncomeBtn.addEventListener("click", () => {
    const incName = incomeNameInput.value;
    const incAmount = amountInput.value;
    yourBudgetIncome.appendIncome(incName, incAmount);
    console.log(yourBudgetIncome.incomeNames);
    console.log(yourBudgetIncome.incomeAmounts);
    if (yourBudgetIncome.incomeNames.length >= 30) {
        appendIncomeBtn.disabled = true;
    };
    yourBudgetIncome.incomeSum();
});






/*appendIncome() {

       appendIncomeBtn.addEventListener('click', () => {
           let stringAmount = amountInput.value.toString();
           if (incomeNameInput.value.trim().length < 1) {
               warning.textContent = "Please enter a name or description";
           }
           else if (stringAmount.length === 0) {
               amountWarning.textContent = "Please enter a valid number";
           }
           else {
               const newIncome = document.createElement("li");
               newIncome.textContent = `${incomeNameInput.value} $${amountInput.value}`;
               incomeList.appendChild(newIncome);
           }
       });
   }


   
 let stringAmount = amount.toString();
        if (name.trim().length < 1) {
            warning.textContent = "Please enter a name or description";
        }
        else if (stringAmount.length === 0) {
            amountWarning.textContent = "Please enter a valid number";
        }
        else {
            const newIncome = document.createElement("li");
            newIncome.textContent = `${incomeNameInput.value} $${amountInput.value}`;
            incomeList.appendChild(newIncome);
        }

*/



