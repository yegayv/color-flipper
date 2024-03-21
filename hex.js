const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function () {
  generateRandomColor();
});

document.addEventListener("keydown", (event) => {
  if (event.key == " ") {
    generateRandomColor();
  }
});

function generateRandomColor() {
  let hexColor = "";
  for (let index = 0; index < 6; index++) {
    hexColor += hex[getRandomNumber()];
  }
  fetch(`https://www.thecolorapi.com/id?hex=${hexColor}&format=json`)
    .then((response) => response.json())
    .then((data) => {
      color.textContent = `${data.name.value} ${data.hex.value}`;
      color.style.color = `${data.hex.value}`;
      document.body.style.backgroundColor = `${data.hex.value}`;
    });
}

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}
