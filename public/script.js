const balance = document.querySelector('#balance');
const moneyPlus = document.querySelector('#money-plus');
const moneyMinus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const textField = document.querySelector('#text');
const amount = document.querySelector('#amount');


//Test transactions
const testTransactions = [
    { id: 1, text: 'Sandwich', amount: -8 },
    { id: 2, text: 'Paycheck', amount: 6000 },
    { id: 3, text: 'Book', amount: -20 },
    { id: 4, text: 'M1 pro macbook', amount: -2500 }
];


let transactions = testTransactions;


//Add transaction function

const addTransaction = (e) => {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount')
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction);

        addTransactionDom(transaction);

        updateValues();

        text.value = '';
        amount.value = '';
    }
}

//Generate random id

const generateId = () => {
    return Math.floor(Math.random() * 100000000)
}

//Adding transactions to list
const addTransactionDom = transaction => {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item)
}

//Update the balance, income, and expense

const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount)

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2)

    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `$${total}`
    moneyPlus.innerText = `$${income}`
    moneyMinus.innerText = `$${expense}`
}


// Remove transaction by id

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    init()
}



//Initializing the app with test data
const init = () => {
    list.innerHTML = '';

    transactions.forEach(addTransactionDom);
    updateValues()
}

init()


form.addEventListener('submit', (addTransaction))