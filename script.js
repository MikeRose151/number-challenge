// Create empty random number variable
let currentRandomNumber = null;

// Create function to start the game and generate the first random number
function randomNumber() {
  const startButton = document.querySelector(".start-btn");
  startButton.classList.add("hidden");
  listContainer.classList.remove("hidden");
  const i = Math.floor(Math.random() * 999) + 1;
  document.getElementById("current-random-number").textContent = `Number: ${i}`;
  document.getElementById(
    "message"
  ).textContent = `Place ${i} in the above list!`;
  return (currentRandomNumber = i);
}

// Create empty array for the list of numbers (i.e. the player's choices)
const list = Array(10).fill(null);

// Set up the logic for button validation
let filteredList = list.filter(Boolean); // required later for lowerBound
let filteredReversedList = filteredList.slice().reverse(); // required later for upperBound

// Create functions for button validation
let lowerBound = null;

const lowerBoundCalculation = function () {
  for (let i = 0; i < filteredReversedList.length; i++) {
    if (currentRandomNumber > filteredReversedList[i]) {
      lowerBound = filteredReversedList[i];
      break;
    }
  }
  return lowerBound;
};
let upperBound = null;

const upperBoundCalculation = function () {
  for (let i = 0; i < filteredList.length; i++) {
    if (currentRandomNumber < filteredList[i]) {
      upperBound = filteredList[i];
      break;
    }
  }
  return upperBound;
};

// Create variables to enable the list of number to be displayed
const listContainer = document.getElementById("listContainer");
const orderedList = document.createElement("ol");
listContainer.appendChild(orderedList);

// Display the list array on the page, with buttons
const lowerIndex = () =>
  lowerBoundCalculation() === null
    ? 0
    : list.indexOf(lowerBoundCalculation()) + 1;

const upperIndex = () =>
  upperBoundCalculation() === null
    ? 9
    : list.indexOf(upperBoundCalculation()) - 1;

for (let i = 0; i < list.length; i++) {
  const listItem = document.createElement("li");
  orderedList.appendChild(listItem);

  const listItemButton = document.createElement("button");
  listItem.appendChild(listItemButton);
  listItemButton.textContent = "Place here";

  // Make buttons clickable to select where to place the random number
  listItemButton.addEventListener("click", function () {
    listItemButton.classList.add("hidden");
    let positionedNumber = document.createElement("p");
    listItem.appendChild(positionedNumber);
    list[i] = currentRandomNumber; // Add the new number to the list array
    positionedNumber.innerText = list[i];
    filteredList = list.filter(Boolean); // Update because list array got updated
    filteredReversedList = filteredList.slice().reverse(); // Update because list array got updated
    randomNumber(); // Generate a new number automatically
    lowerBoundCalculation(); // Calculate the lower bound
    upperBoundCalculation(); // Calculate the upper bound
    // temporarily logging bounds - this seems to be perfectly working ...
    if (
      (lowerBoundCalculation() === null
        ? 1
        : list.indexOf(lowerBoundCalculation()) + 2) >
      (upperBoundCalculation() === null
        ? 10
        : list.indexOf(upperBoundCalculation()))
    ) {
      console.log("Game over");
    } else {
      console.log(
        `Lower Bound: ${lowerBoundCalculation()} (Position ${
          lowerBoundCalculation() === null
            ? 1
            : list.indexOf(lowerBoundCalculation()) + 2
        }) - INDEX ${lowerIndex()}`
      );
      console.log(
        `Upper Bound: ${upperBoundCalculation()} (Position ${
          upperBoundCalculation() === null
            ? 10
            : list.indexOf(upperBoundCalculation())
        }) - INDEX ${upperIndex()}`
      );
    }
    lowerBound = null; // Reset the lower bound, ready for next number
    upperBound = null; // Reset the upper bound, ready for next number
    const buttons = orderedList.querySelectorAll("button");
    console.log(`Buttons: ${buttons}`);
    buttons.forEach((button, i) => {
      if (i >= lowerIndex() && i <= upperIndex()) {
        console.log(
          `${i} is valid because ${i} is between ${lowerIndex()} and ${upperIndex()}`
        );
        button.disabled = false;
      } else {
        console.log(
          `${i} is invalid because ${i} is not between ${lowerIndex()} and ${upperIndex()}`
        );
        button.disabled = true;
      }
    });
    // ... temporarily logging bounds - this seems to be perfectly working
  });
}

/*
On click...
1. Remove button
2. Add the random generated number into the array at position where button was clicked
*/

// 3. Validate whether the number fits in that space
