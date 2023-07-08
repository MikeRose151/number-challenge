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

const lowerBoundCalculation = function () {
  let lowerBound = null;
  for (let i = 0; i < filteredReversedList.length; i++) {
    if (currentRandomNumber > filteredReversedList[i]) {
      lowerBound = filteredReversedList[i];
      break;
    }
  }
  return lowerBound;
};

const upperBoundCalculation = function () {
  let upperBound = null;
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

/* LOGIC
Remove null from list array
e.g. [null, 150, null, 300, 350, null, null, 800, null, 950]
=> [150, 300, 350, 800, 950]

Create array to note index of existing numbers
=> [1, 3, 4, 7, 9]

Find where currentRandomNumber fits into listWithoutNull array
e.g. currentRandomNumber = 500...
=> lowerBound = 350
=> upperBound = 800

Take the corresponding index for lowerBound and index for upperBound
e.g. 4 and 7

Show buttons for (lowerBound < e and upperBound > e)
*/

for (let i = 0; i < list.length; i++) {
  const listItem = document.createElement("li");
  orderedList.appendChild(listItem);

  const listItemButton = document.createElement("button");
  listItem.appendChild(listItemButton);
  listItemButton.textContent = "Place here";

  // Make buttons clickable to select where to place the random number
  listItemButton.addEventListener("click", function () {
    listItemButton.remove();
    let positionedNumber = document.createElement("p");
    listItem.appendChild(positionedNumber);
    list[i] = currentRandomNumber;
    filteredList = list.filter(Boolean);
    filteredReversedList = filteredList.slice().reverse();
    positionedNumber.innerText = list[i];
    randomNumber();
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
        }) - INDEX ${
          lowerBoundCalculation() === null
            ? 0
            : list.indexOf(lowerBoundCalculation()) + 1
        }`
      );
      console.log(
        `Upper Bound: ${upperBoundCalculation()} (Position ${
          upperBoundCalculation() === null
            ? 10
            : list.indexOf(upperBoundCalculation())
        }) - INDEX ${
          upperBoundCalculation() === null
            ? 9
            : list.indexOf(upperBoundCalculation()) - 1
        }`
      );
    }
  });
}

/*
On click...
1. Remove button
2. Add the random generated number into the array at position where button was clicked
*/

// 3. Validate whether the number fits in that space
