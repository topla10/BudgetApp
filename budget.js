const tableEl = document.getElementsByTagName("table")[0];
const totalContainer = document.querySelector(".total-container");
const validateform = function () {
  const namePattern = /^[A-Za-z\s\-]+$/;
  if (!namePattern.test(userName)) {
    alert("Invalid name. Please use only letters, spaces, and/or hyphens.");
    return false;
  }
  if (age < 5) {
    alert("Too Young to budget, must be at leat 5 years old.");
    return false;
  }
  return true;
};

let userName = "";
let age = 0;
document.querySelector("#submit").addEventListener("click", function (event) {
  const greeting = document.querySelector("#greetUser");
  userName = document.querySelector("#name").value.trim();
  age = parseInt(document.querySelector("#age").value.trim());
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

function customItem() {
  const tbodyEl = document.querySelector("tbody");
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

const calculateButton = document.querySelector("#calculateButton");
function calculateTotal() {
  const totalDisplay = document.querySelector("#totalDisplay");
  const priceInput = document.querySelectorAll(".price-input");
  let total = 0;
  priceInput.forEach((input) => {
    const value = parseFloat(input.value);
    if (!isNaN(value) && value >= 0) {
      total += value;
    }
  });
  totalDisplay.innerText = `Total: $${total.toFixed(2)}`;
}

customItem();
calculateButton.addEventListener("click", calculateTotal);

// Add an event listener on that button to show new item and amount field to the user
