// Set gameover variable
let gameover = false;

// Set up scoring
const currentScore = document.getElementById("currentScore");
const highScore = document.getElementById("highScore");
let currentScoreValue = 0;
let highScoreValue = 0;

// Create empty random number variable
let currentRandomNumber = null;

// Create empty array for the list of numbers (i.e. the player's choices)
const list = Array(10).fill(null);

// Set up the logic for button validation
let filteredList = list.filter(Boolean); // required later for lowerBound
let filteredReversedList = filteredList.slice().reverse(); // required later for upperBound

// Create function to generate a random number and display it with a message
function randomNumber() {
  const i = Math.floor(Math.random() * 999) + 1;
  document.getElementById("current-random-number").textContent = `Number: ${i}`;
  document.getElementById(
    "message"
  ).textContent = `Place ${i} in the above list!`;
  return (currentRandomNumber = i);
}

// Create function to start the game and generate the first random number
const startButton = document.querySelector(".start-btn");
function startGame() {
  startButton.classList.add("hidden");
  listContainer.classList.remove("hidden");
  randomNumber();
  currentScoreValue = 0;
  currentScore.textContent = `Current Score: ${currentScoreValue}`;
}

// Create functions for button validation
// Lower Bound
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
// Upper Bound
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

// Use the lower/upper bounds to calculate the lower/upper index of the array
const lowerIndex = () =>
  lowerBoundCalculation() === null
    ? 0
    : list.indexOf(lowerBoundCalculation()) + 1;

const upperIndex = () =>
  upperBoundCalculation() === null
    ? 9
    : list.indexOf(upperBoundCalculation()) - 1;

// Create variables to enable the list of number to be displayed
const listContainer = document.getElementById("listContainer");
const orderedList = document.createElement("ol");
listContainer.appendChild(orderedList);

// Display the list array on the page, with buttons
for (let i = 0; i < list.length; i++) {
  const listItem = document.createElement("li");
  orderedList.appendChild(listItem);

  const listItemButton = document.createElement("button");
  listItem.appendChild(listItemButton);
  listItemButton.textContent = "Place here";

  // Make buttons clickable to select where to place the random number
  listItemButton.addEventListener("click", function () {
    // Score increases by 1
    currentScoreValue += 1;
    currentScore.textContent = `Current Score: ${currentScoreValue}`;
    // Add the new number to the list array - also update the other arrays
    list[i] = currentRandomNumber;
    filteredList = list.filter(Boolean);
    filteredReversedList = filteredList.slice().reverse();
    // Replace button with number
    listItemButton.classList.add("hidden");
    let positionedNumber = document.createElement("p");
    listItem.appendChild(positionedNumber);
    positionedNumber.innerText = list[i];
    // Generate a new random number
    randomNumber();

    // Reset the lower/upper bounds, ready for next number
    lowerBound = null;
    upperBound = null;

    // Check if GAMEOVER - also console log the bounds
    if (
      (lowerBoundCalculation() === null
        ? 1
        : list.indexOf(lowerBoundCalculation()) + 2) >
      (upperBoundCalculation() === null
        ? 10
        : list.indexOf(upperBoundCalculation()))
    ) {
      gameover = true;
      startButton.classList.remove("hidden");
      highScoreValue =
        currentScoreValue > highScoreValue ? currentScoreValue : highScoreValue;
      highScore.textContent = `High Score: ${highScoreValue}`;
      console.log("Gameover...");
      document.getElementById(
        "message"
      ).textContent = `GAMEOVER - you cannot fit ${currentRandomNumber} in the above list!`;
    } else {
      console.log("Game continues...");
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

    // Ensure only the valid buttons are enabled
    const buttons = orderedList.querySelectorAll("button");
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
  });
}
