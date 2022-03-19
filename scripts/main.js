// Cach
let balance = document.querySelector("#balance"),
  income = document.querySelector(".cash-area .income"),
  expense = document.querySelector(".cash-area .expense"),
  history = document.querySelector(".transactions-history"),
  cashName = document.querySelector("#cashName"),
  amount = document.querySelector("#amount"),
  incomeBtn = document.querySelector("#addNewIncome"),
  expenseBtn = document.querySelector("#addNewExpense");

function balanceEffect(type) {
  // Get All Cash
  let elements = document.querySelectorAll(`.transactions-history .${type}`),
    //   To Push The Cash Here To Make The Action
    allBalance = [],
    // Finally Balance
    balanceNumber = 0;

  for (let i = 0; i < elements.length; i++) {
    /*Delete The Dollar mark
       And Convert The Balance To Number
        And Push The Balance To The allBalance Array
         To Make The Action */
    allBalance.push(+elements[i].innerHTML.slice(1));
  }
  //   To Set The Finally Number Of The Balance
  allBalance.forEach((e) => (balanceNumber += e));

  //   To Make Action To The Income Or Expense
  type === "income"
    ? (income.innerHTML = `$${balanceNumber}`)
    : (expense.innerHTML = `$${balanceNumber}`);

  // Set The Residual Value
  balance.innerHTML = `$${
    +income.innerHTML.slice(1) - +expense.innerHTML.slice(1)
  }`;

  /*Check If The Residual Value Equal To The income Cash Or Larger Then It
        Make The Residual Value With Green Color
    Else If The Residual Value Equal To 0 Or Smaller Than It 
        Make The Residual Value With Red Color
    Else Make The Residual Value With Black Color*/
  if (balance.innerHTML.slice(1) >= income.innerHTML.slice(1))
    balance.style.color = `var(--green-color)`;
  else if (balance.innerHTML.slice(1) <= 0)
    balance.style.color = `var(--red-color)`;
  else balance.style.color = `black`;
}

function addNewTransaction(type) {
  // Check If There Is Value In The Inputs Have Value Or Not
  if (cashName.value !== "" && amount.value !== "") {
    /*   Create Div For The Transaction
         And Span For The Transaction Name
         And Span For The Amount
         And Button To Delete This Transaction */
    let div = document.createElement("div"),
      spanCashName = document.createElement("span"),
      spanCashNumber = document.createElement("span"),
      theCashName = document.createTextNode(cashName.value),
      theCashNumebr = document.createTextNode(`$${amount.value}`),
      deleteBtn = document.createElement("button"),
      deleteBtnText = document.createTextNode("X");

    //   To Hold Delete Button By This dataset
    deleteBtn.dataset.deleteBtn = "true";

    // Append The Elements
    spanCashName.appendChild(theCashName);
    spanCashNumber.appendChild(theCashNumebr);
    deleteBtn.appendChild(deleteBtnText);
    div.appendChild(spanCashName);
    div.appendChild(spanCashNumber);
    div.appendChild(deleteBtn);

    // To Add Class Income Or Expense To The Amount
    type == "income"
      ? spanCashNumber.classList.add("income")
      : spanCashNumber.classList.add("expense");

    //   Appear The Transaction
    history.appendChild(div);
    // Prepare The Inputs To Add Aother Transaction
    cashName.value = "";
    amount.value = "";
  }
  //   Else If The Inputs Have No Value Make Sweet Alert
  else {
    //   Create The Sweet Alert
    let sweetAlertDiv = document.createElement("div"),
      sweetAlert = document.createTextNode("Plase Add The Cash Info");

    //   Sweet Alert Style
    sweetAlertDiv.style.cssText = `
        border: var(--main-border);
        padding: 10px 30px;
        background-color: var(--red-color);
        color: white;
        border-radius: 20px;
        opacity: 0.9;
        transition: 0.5s;`;

    sweetAlertDiv.appendChild(sweetAlert);
    // Appear The Sweet Alert
    document.querySelector(".container").appendChild(sweetAlertDiv);

    // To Hide The Sweet Alert After 1.5 Second
    setTimeout(() => {
      sweetAlertDiv.style.opacity = "0";
    }, 1500);

    // Remove The Sweet Alert Form The Dom Tree After 2 Seconds
    setTimeout(() => {
      sweetAlertDiv.remove();
    }, 2000);
  }

  //   Make Balance Effect
  balanceEffect("income");
  balanceEffect("expense");
}

// To Cansel The Submit
document.forms[0].addEventListener("submit", (e) => e.preventDefault());

// Add The Transaction
incomeBtn.addEventListener("click", () => addNewTransaction("income"));
expenseBtn.addEventListener("click", () => addNewTransaction("expense"));

// TO Delete The Transaction
document.addEventListener("click", (e) => {
  if (e.target.dataset.deleteBtn) {
    //   Delete The Transaction
    e.target.parentElement.remove();
    // Make The Balance Effect
    balanceEffect("income");
    balanceEffect("expense");
  }
});
