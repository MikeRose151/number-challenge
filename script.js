/*
Generate random number
*/

function randomNumber() {
  const i = Math.floor(Math.random() * 999) + 1;
  document.getElementById("random").textContent = `Number: ${i}`
}



/*
Create an array with 10 null values (it might turn out that UNDEFINED is better than NULL)
*/
const list = Array(10).fill(null);

/*
Display that array on the page, with buttons.
To do this, I created a div in index.html with id "listContainer"
Then, create button to place current random number in list on screen.
*/

const listDiv = document.getElementById("listContainer");
const orderedList = document.createElement("ol");

for (let i = 0; i < list.length; i++) {
  const listItem = document.createElement("li");
  listItem.textContent = list[i];

  const listItemButton = document.createElement("button");
  listItemButton.textContent = "Place here";
  // listItemButton.addEventListener("click"), () => {

  // }

  listItem.appendChild(listItemButton);
  orderedList.appendChild(listItem);
}

listDiv.appendChild(orderedList);

/*
On click...
1. Remove button
2. Add the random generated number into the array at position where button was clicked
*/


// 3. Validate whether the number fits in that space
