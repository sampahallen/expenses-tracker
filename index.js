const totalExpenses = document.getElementById('balance');
const descriptionInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const addTransactionBtn = document.getElementById('submit');
const transactionList = document.getElementById('transaction-list');

let expenses = [];

if (localStorage.getItem('expenses')){
  expenses = JSON.parse(localStorage.getItem('expenses'));
  renderExpenses();
  updateBalance();
}

function AddExpense() {
  let newExpense = {
    desc: descriptionInput.value,
    amount: +(amountInput.value),
    date: new Date().toLocaleDateString()
  }

  expenses.push(newExpense)

  localStorage.setItem('expenses', JSON.stringify(expenses));

  console.log(expenses);

  renderExpenses();

  updateBalance();

  descriptionInput.value = "";
  amountInput.value = "";

  descriptionInput.focus();
} 

function renderExpenses(){
  transactionList.innerHTML = "";

  expenses.forEach((exp, index) => {
    const ol =document.createElement("ol");

    const descLi = document.createElement("li");
    descLi.textContent = `Description: ${exp.desc}`;

    const amountLi = document.createElement("li");
    amountLi.textContent = `Amount: GHc ${exp.amount}`;

    const dateLi = document.createElement("li");
    dateLi.textContent = `Date: ${exp.date}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "x";
    delBtn.style.width = "20px";
    delBtn.style.height = "20px";
    delBtn.style.alignSelf = "flex-end";
    delBtn.style.cursor = "pointer";
    delBtn.style.fontSize = "16px";
    delBtn.style.marginRight = "5px";

    delBtn.addEventListener('click', () => deleteExpense(index));


    ol.appendChild(delBtn);    
    ol.appendChild(descLi);
    ol.appendChild(amountLi);
    ol.appendChild(dateLi);
    

    transactionList.appendChild(ol);
  });
}

function updateBalance(){
  let total = expenses.reduce((acc, item) => acc + item.amount, 0)

  totalExpenses.textContent = total
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  updateBalance();
}



addTransactionBtn.addEventListener('click', AddExpense);
