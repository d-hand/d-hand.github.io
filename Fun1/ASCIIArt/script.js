class Cell {
  constructor(x, y, symbol, color) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillText(this.symbol, this.x + 0.5, this.y + 0.5);
    ctx.fillStyle = this.color;
    ctx.fillText(this.symbol, this.x, this.y);
  }
}

class AsciiEffect {
  #ctx;
  #pixels = [];
  #cells = [];

  constructor(ctx) {
    this.#ctx = ctx;
    this.#pixels = this.#ctx.getImageData(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
  }

  draw(cellSize) {
    this.#scanImage(cellSize);
    this.#draeAscii();
  }

  #scanImage(cellSize) {
    this.#cells = [];
    for (let y = 0; y < this.#pixels.height; y += cellSize) {
      for (let x = 0; x < this.#pixels.width; x += cellSize) {
        const posX = x * 4;
        const posY = y * 4;
        const pos = posY * this.#pixels.width + posX;

        if (this.#pixels.data[pos + 3] > 128) {
          const red = this.#pixels.data[pos];
          const green = this.#pixels.data[pos + 1];
          const blue = this.#pixels.data[pos + 2];
          const total = red + green + blue;
          const averageColorValue = total / 3;
          const color = `rgb(${red}, ${green}, ${blue})`;
          const sybol = this.#convertToSymbol(averageColorValue);
          if (total > 200) this.#cells.push(new Cell(x, y, sybol, color));
        }
      }
    }
  }

  #convertToSymbol(g) {
    if (g > 250) return "!";
    else if (g > 220) return "#";
    else if (g > 240) return "@";
    else if (g > 200) return "$";
    else if (g > 180) return "%";
    else if (g > 160) return "^";
    else if (g > 140) return "&";
    else if (g > 120) return "*";
    else if (g > 100) return "(";
    else if (g > 80) return ")";
    else if (g > 60) return "+";
    else if (g > 40) return "-";
    else if (g > 20) return "/";
    else return "";
  }


  #draeAscii() {
    this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
    for (let i = 0; i < this.#cells.length; i++) {
      this.#cells[i].draw(this.#ctx);
    }
  }

}

const canvas = document.getElementById("canvas");
const file = document.getElementById('file');
const resolution = document.getElementById("resolution");
const resolutionLabel = document.getElementById("resolutionLabel");

const ctx = canvas.getContext("2d");
let effect;

let image = new Image();
image.src = "image.jpg";
image.onload = function () {
  resolution.value = 1;
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight - 50;
  const r = Math.min(maxWidth / image.width, maxHeight / image.height, 1)

  canvas.width = image.width * r;
  canvas.height = image.height * r;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  effect = new AsciiEffect(ctx, image);
};


resolution.addEventListener("change", () => {
  if (resolution.value == 1) {
    resolutionLabel.innerHTML = "Original image";
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  } else {
    const value = parseInt(resolution.value);
    resolutionLabel.innerHTML = `Resolution ${value} px`;
    ctx.font = `${value * 2}px Verdana`;
    effect.draw(value);
  }
});


file.addEventListener('change', e => {
  image.src = URL.createObjectURL(e.target.files[0]) 
});
