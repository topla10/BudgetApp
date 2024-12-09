const tableEl = document.getElementsByTagName("table")[0];
const totalContainer = document.querySelector(".total-container");
const validateform = function () {
  const namePattern = /^[A-Za-z\s\-]+$/;
  if (!namePattern.test(userName)) {
    alert("Invalid name. Please use only letters, spaces, and/or hyphens.");
    return false;
  }
  if (age <= 0) {
    alert(" Invalid input. Age cannot be negative or zero.");
    return false;
  }

  if (age > 0 && age < 5) {
    alert("Too Young to budget, must be at leat 5 years old.");
    return false;
  }
  if (income <= 0) {
    alert(" Invalid input. Income cannot be negative or zero.");
    return false;
  }
  return true;
};

// form Input declaration variables

let age = 0;
let income = 0;

document.querySelector("#submit").addEventListener("click", function (event) {
  const greeting = document.querySelector("#greetUser");

  // Use of local storage to store the form inputs in the browser.

  userName = document.querySelector("#name").value.trim();
  localStorage.setItem("userName", userName);
  localStorage.getItem("userName");

  age = parseInt(document.querySelector("#age").value.trim());
  localStorage.setItem("age", age);
  localStorage.getItem("age");

  income = parseInt(document.querySelector("#income").value.trim());
  localStorage.setItem("income", income);
  localStorage.getItem("income");

  event.preventDefault();

  const isValid = validateform();
  if (isValid) {
    tableEl.hidden = false;
    totalContainer.hidden = false;
    greeting.innerText = `Hi ${userName}, welcome to the Budget App.
    Know where your money goes.`;
  } else {
    greeting.innerText = "";
  }
});

// This function create custom input with the same attributes as the original ones in the html file,
// and a button

const tbodyEl = document.querySelector("tbody");
function customItem() {
  const inputEl = document.createElement("input");
  const td1El = document.createElement("td");
  const td2El = document.createElement("td");
  const td3El = document.createElement("td");
  const trEl = document.createElement("tr");
  const addItemButton = document.createElement("button");
  const customItemInput = document.createElement("input");

  // Set multiple attributes
  const attributes = {
    type: "number",
    class: "price-input",
    min: "0",
    placeholder: "Enter amount",
  };

  Object.entries(attributes).forEach(([key, value]) => {
    inputEl.setAttribute(key, value);
  });

  //const { type, placeholder } = attributes;

  customItemInput.type = "text";
  customItemInput.placeholder = "Enter new Item";

  addItemButton.textContent = "Add Item";
  addItemButton.className = "addItem";

  const previousAddButton = tbodyEl.querySelector(".addItem:last-child");
  //console.log(previousAddButton);
  if (previousAddButton) {
    previousAddButton.parentElement.remove();
  }

  // Add event listener to the new button
  addItemButton.addEventListener("click", customItem);

  trEl.appendChild(td3El).appendChild(addItemButton);
  tbodyEl.appendChild(trEl).appendChild(td1El).appendChild(customItemInput);
  tbodyEl.appendChild(trEl).appendChild(td2El).appendChild(inputEl);
}

// const calculateButton = document.querySelector("#calculateButton");
function calculateTotal() {
  const priceInput = document.querySelectorAll(".price-input");
  const totalDisplay = document.querySelector("#totalDisplay");
  let total = 0;
  priceInput.forEach((input) => {
    const value = parseFloat(input.value);

    if (!isNaN(value) && value >= 0) {
      total += value;
    }
  });
  totalDisplay.innerText = `Total: $${total.toFixed(2)}`;
}

function calcPercentage() {
  const percentageDisplay = document.querySelector(".percentage-display");

  // Clear the display container to avoid duplication
  percentageDisplay.innerHTML = "";

  const priceInput = document.querySelectorAll(".price-input");
  let percentage = 0;

  // Convert nodeListe into an array of numbers
  // const priceInputArray = Array.from(priceInput).map((input) => {
  //   return parseFloat(input.value);
  // });
  const priceInputArray = Array.from(priceInput)
    .map((input) => parseFloat(input.value))
    .filter((value) => !isNaN(value));

  priceInputArray.forEach((value, index) => {
    if (!isNaN(value) && value >= 0) {
      percentage = (value * 100) / income;
      const resultItem = document.createElement("div");
      resultItem.innerText = `Input ${
        index + 1
      } represents ${percentage.toFixed(2)}% of your income.`;
      percentageDisplay.appendChild(resultItem);
    }
  });

  // Get the largest number
  const largest = Math.max(...priceInputArray);
  console.log(largest);

  // Get the minimum number
  const mminimum = Math.min(...priceInputArray);
  console.log(mminimum);
}

customItem();
document
  .querySelector("#calculateButton")
  .addEventListener("click", calculateTotal);

console.log(calcPercentage());
document
  .querySelector("#reportButton")
  .addEventListener("click", calcPercentage);
