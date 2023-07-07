// Create empty random number variable
let currentRandomNumber = null;

// Create empty array for the list of numbers (i.e. the player's choices)
const list = Array(10).fill(null);

// Create variables to enable the list of number to be displayed
const orderedList = document.createElement("ol");
const listDiv = document.getElementById("listContainer");

// Create function to start the game and generate the first random number
function randomNumber() {
  const startButton = document.querySelector(".start-btn");
  startButton.classList.add("hidden");
  listDiv.classList.remove("hidden");
  const i = Math.floor(Math.random() * 999) + 1;
  document.getElementById("current-random-number").textContent = `Number: ${i}`;
  document.getElementById(
    "message"
  ).textContent = `Place ${i} in the above list!`;
  return (currentRandomNumber = i);
}

// Display the list array on the page, with buttons

for (let i = 0; i < list.length; i++) {
  const listItem = document.createElement("li");
  const listItemButton = document.createElement("button");
  listItemButton.textContent = "Place here";
  listItem.appendChild(listItemButton);
  orderedList.appendChild(listItem);
  listDiv.appendChild(orderedList);

  // Make buttons clickable to select where to place the random number
  listItemButton.addEventListener("click", function () {
    listItemButton.remove();
    let positionedNumber = document.createElement("p");
    listItem.appendChild(positionedNumber);
    list[i] = currentRandomNumber;
    positionedNumber.innerText = list[i];
    randomNumber();
  });
}

/*
On click...
1. Remove button
2. Add the random generated number into the array at position where button was clicked
*/

// 3. Validate whether the number fits in that space
