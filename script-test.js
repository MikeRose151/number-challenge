const array = [null, 100, 200, null, null, 500, null, 800];
const filteredArray = array.filter(Boolean);
const reversedArray = filteredArray.slice().reverse();
// filteredArray = [100, 200, 500, 800]
// reversedArray = [100, 200, 500, 800]

const randomNumber = 350;
let lowerBound = null;
let upperBound = null;

const lowerBoundCalculation = function () {
  for (let i = 0; i < reversedArray.length; i++) {
    if (randomNumber > reversedArray[i]) {
      lowerBound = reversedArray[i];
      break;
    }
  }
  return lowerBound;
};

const upperBoundCalculation = function () {
  for (let i = 0; i < filteredArray.length; i++) {
    if (randomNumber < filteredArray[i]) {
      upperBound = filteredArray[i];
      break;
    }
  }
  return upperBound;
};

lowerBoundCalculation();
upperBoundCalculation();
console.log(lowerBound);
console.log(upperBound);
