let startBtn = document.getElementById("start"),
    resetBtn = document.getElementById("reset"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    overlay = document.querySelector('.overlay'),
    number = document.querySelector('.number'),
    close = document.querySelector('.p_close'),
    form = document.getElementById("form"),
    formInput = document.querySelector('.popup-form__input'),
    formBtn = document.getElementsByClassName('popup-form__btn')[0],
    formBtn2 = document.getElementsByClassName('popup-form_btn')[0],

	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
    countBtn = document.getElementsByTagName('button')[1],
    addBtn = document.getElementsByTagName('button')[2],
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent');


    expensesBtn.disabled = true;
    countBtn.disabled = true;
    addBtn.disabled = true;

startBtn.addEventListener('click', () => {
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

formBtn.addEventListener('click', (e) => {
    e.preventDefault()
    
    if (formInput.value.length < 3) {
        overlay.style.display = 'block';
        number.style.display = 'block';
    } else {
        number.style.display = 'none';
        overlay.style.display = 'none';
        appData.budget = formInput.value;
        budgetValue.textContent = formInput.value;
        formInput.value = '';
        document.body.style.overflow = 'visible';
        expensesBtn.disabled = false;
        countBtn.disabled = false;
        addBtn.disabled = false;
    }
});

addBtn.addEventListener('click', () => {
    expenses_6.style.display = 'inline';
    expenses_5.style.display = 'inline';

});

formBtn2.addEventListener('click', () => {
    formInput.value = '';
    overlay.style.display = 'none';
    number.style.display = 'none';
    document.body.style.overflow = 'visible';
});

close.addEventListener('click', () => {
    formInput.value = '';
    overlay.style.display = 'none';
    number.style.display = 'none';
    document.body.style.overflow = 'visible';
});

expensesBtn.addEventListener('click', () => {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
        expensesValue.textContent = sum;
    }
});

countBtn.addEventListener('click', () => {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 1500) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 1500) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка';
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
});


checkSavings.addEventListener("click", () => {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
    
});

resetBtn.addEventListener('click', () =>  {
    percentValue.value = '';
    sumValue.value = '';
    budgetValue.textContent = '';
    dayBudgetValue.textContent = '';
    levelValue.textContent = '';
    expensesValue.textContent = '';
    monthSavingsValue.textContent = '';
    yearSavingsValue.textContent = '';
    expensesItem[0].value = '';
    expensesItem[1].value = '';
    expensesItem[2].value = '';
    expensesItem[3].value = '';
    expensesItem[4].value = '';
    expensesItem[5].value = '';
    savings.checked = false;
    expenses_6.style.display = 'none';
    expenses_5.style.display = 'none';
    
});

const appData = {
    budget: formInput.value,
	expenses: {},
    income: [],
    savings: false
};