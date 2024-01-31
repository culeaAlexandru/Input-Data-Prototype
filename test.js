const balanceInput = document.querySelector(".balance-input");
const riskInput = document.querySelector(".risk-input");
const submitButton = document.querySelector(".submit-button");
const nextDayButton = document.querySelector(".next-day-button");
const next7Days = document.querySelector(".next-7-days");
const past7Days = document.querySelector(".past-7-days");

// Placeholder for the account
const account = {
  balance: 0,
  risk: 0,
};

// To display the account
const displayAccountValue = function (property) {
  document.querySelector(
    `.${property}-value`
  ).innerHTML = `Your ${property}: ${account[property]}`;
};

// The submit button
submitButton.addEventListener("click", function () {
  if (Number(balanceInput.value) === 0 && account.balance === 0) {
    document.querySelector(
      ".balance-value"
    ).innerHTML = `Please insert a valid balance value. Your balance value is: ${account.balance}`;
  } else {
    account.balance += Number(balanceInput.value);
    displayAccountValue("balance");
  }
  if (Number(riskInput.value) === 0 && account.risk === 0) {
    document.querySelector(
      ".risk-value"
    ).innerHTML = `Please insert a valid risk value. Your risk value is: ${account.risk}`;
  } else if (
    (Number(riskInput.value) > 10 && account.risk === 0) ||
    (Number(riskInput.value) < 1 && account.risk === 0)
  ) {
    document.querySelector(
      ".risk-value"
    ).innerHTML = `Please add a risk value between 1 and 10. Your risk value is: ${account.risk}`;
  } else {
    account.risk += Number(riskInput.value);
    displayAccountValue("risk");
  }
  balanceInput.value = "";
  riskInput.value = "";
});

// Next day/s function
const nextDays = function (day) {
  let valuesPerDay = [];
  if (account.risk > 0 && account.balance > 0) {
    for (let i = 0; i < day; i++) {
      valuesPerDay.push(Math.floor(Math.random() * day + 1));
    }
    console.log(valuesPerDay);
    for (const values of valuesPerDay) {
      if (values > 5) {
        account.balance += values * 10;
        console.log(account.balance);
      } else if (values < 5) {
        account.balance -= values * 10;
        console.log(account.balance);
      }
    }
  } else if (
    account.risk > 0 &&
    (account.balance === 0 || account.balance < 0)
  ) {
    document.querySelector(
      ".balance-value"
    ).innerHTML = `Please insert a valid balance value. Your balance value is: ${account.balance}`;
    displayAccountValue("risk");
  } else if (account.balance > 0 && (account.risk === 0 || account.risk < 0)) {
    document.querySelector(
      ".risk-value"
    ).innerHTML = `Please insert a valid risk value. Your risk value is: ${account.risk}`;
    displayAccountValue("balance");
  } else {
    document.querySelector(
      ".balance-value"
    ).innerHTML = `Please insert a valid balance value. Your balance value is: ${account.balance}`;
    document.querySelector(
      ".risk-value"
    ).innerHTML = `Please insert a valid risk value. Your risk value is: ${account.risk}`;
  }
};

// Next day button to show the balance every day based on the risk
nextDayButton.addEventListener("click", function () {
  nextDays(1);
});

// Next 7 days button to show the balance every day based on the risk
next7Days.addEventListener("click", function () {
  nextDays(7);
});

// Past day/s to show a placeholder avarage of the values
const pastDays = function (day) {
  let valuesPerPastDays = [];
  for (let i = 0; i < day; i++) {
    valuesPerPastDays.push(Math.floor(Math.random() * day + 1));
  }
  let avarageValues = 0;
  for (let i = 0; i < day; i++) {
    avarageValues += valuesPerPastDays[i];
  }
  document.querySelector(
    ".avarage-past-value"
  ).innerHTML = `The avarage value of the past 7 days is: ${avarageValues}`;
};

// Past 7 days button to show the avarage of the values
past7Days.addEventListener("click", function () {
  pastDays(7);
});

// Function to make the past7Days button have functionality only once
function handleButtonClick() {
  past7Days.disabled = true;
}
