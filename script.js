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
*/
const listDiv = document.getElementById("listContainer");
const orderedList = document.createElement("ol");

for (let i = 0; i < list.length; i++) {
  const listItem = document.createElement("li");
  listItem.textContent = list[i];
  orderedList.appendChild(listItem);
}

listDiv.appendChild(orderedList);

/*
Create button to place current random number in list on screen
*/


// 3. Validate whether the number fits in that space
