const blackElement = document.querySelector(".select-black");
const rainbowElement = document.querySelector(".select-rainbow");
const eraseElement = document.querySelector(".erase-canvas");
const clearElement = document.querySelector(".clear-canvas");

let slider = document.querySelector(".slide-value");
let inputValue = document.querySelector(".input-size");
let color = "black";
let isRainbow = false;

changePixelSize(16);

function renderCanvasGrid(size) {
  let canvas = document.querySelector(".canvas");
  let squares = canvas.querySelectorAll("div");
  let canvasAmount = size * size;

  squares.forEach((div) => div.remove());

  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < canvasAmount; i++) {
    let square = document.createElement("div");

    square.addEventListener("mouseover", changeColor);
    square.style.backgroundColor = "white";
    canvas.insertAdjacentElement("beforeend", square);
  }
}

function changePixelSize(value) {
  if (value <= 100 && value >= 2) {
    renderCanvasGrid(value);
  }
}

function rainBowColor() {
  const randomNumber = Math.floor(Math.random() * 16777211);
  const randomColorCode = "#" + randomNumber.toString(16);

  color = randomColorCode;
}

function changeColor() {
  if (isRainbow) {
    rainBowColor();
  }
  this.style.backgroundColor = color;
}

slider.addEventListener("input", () => (inputValue.value = slider.value));

inputValue.addEventListener("input", () => {
  if (inputValue.value > 100) {
    inputValue.value /= 10;
    inputValue.value = Math.floor(inputValue.value);
  } else if (inputValue.value < 2) {
    inputValue.value = 2;
  }
  slider.value = inputValue.value;
});

// Change Pixel Color
blackElement.addEventListener("click", () => {
  isRainbow = false;
  color = "black";
});
rainbowElement.addEventListener("click", () => (isRainbow = true));
eraseElement.addEventListener("click", () => {
  isRainbow = false;
  color = "white";
});
clearElement.addEventListener("click", () => {
  let canvas = document.querySelector(".canvas");
  let squares = canvas.querySelectorAll("div");
  squares.forEach((div) => (div.style.backgroundColor = "white"));
});
