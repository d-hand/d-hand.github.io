import { Map } from "./map.js";
import { Camera } from "./camera.js";

const GAME_WIDTH = 768;
const GAME_HEIGHT = 768;

class Game {
  constructor() {
    this.map = new Map();
    this.cmera = new Camera(this.map, GAME_WIDTH, GAME_HEIGHT);
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1) {
        this.keys.unshift(e.key);
      }
      console.log(this.keys);
    });

    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);
      if (index > -1) {
        this.keys.splice(index, 1);
      }
      console.log(this.keys);
    });
  }

  render = (ctx) => {
    this.drowLayer(ctx, 0);
    this.drowLayer(ctx, 1);
  };

  drowLayer = (ctx, layer) => {
    for (let row = 0; row <= this.map.rows; row++) {
      for (let col = 0; col <= this.map.cols; col++) {
        const tile = this.map.getTile(layer, row, col);

        ctx.drawImage(
          this.map.image,

          // { sx, sy, swidth, sheght } область которую мы хотим получить из картинки
          ((tile - 1) * this.map.image_tileSize) % this.map.image.width,
          Math.floor((tile - 1) / this.map.image_cols) *
            this.map.image_tileSize,
          this.map.image_tileSize,
          this.map.image_tileSize,

          // { x, y, width, heght } область на канвасе куда хотим вставить получившуюся картинку (width, heght позволяют растянуть/уменьшить получившуюся часть картинки)
          col * this.map.tileSize,
          row * this.map.tileSize,
          this.map.tileSize,
          this.map.tileSize
        );

        ctx.strokeRect(
          col * this.map.tileSize,
          row * this.map.tileSize,
          this.map.tileSize,
          this.map.tileSize
        );
      }
    }
  };

  update(deltaTime) {
    let speedX = 0;
    let speedY = 0;
    if (this.keys.indexOf("ArrowLeft") > -1) speedX = -1;
    if (this.keys.indexOf("ArrowRight") > -1) speedX = 1;
    if (this.keys.indexOf("ArrowUp") > -1) speedY = -1;
    if (this.keys.indexOf("ArrowDown") > -1) speedY = 1;
    this.cmera.move(deltaTime, speedX, speedY);
  }
}

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  ctx.imageSmoothingEnabled = true;

  const game = new Game();

  let lastTime = 0;
  const animate = (timeStamp) => {
    const deltaTime = (timeStamp - lastTime) / 1000;
    // console.log("FPS:", 1 / deltaTime); //FPS (количество кадров в сек) ~145
    lastTime = timeStamp;
    game.update(deltaTime);
    game.render(ctx);
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
});
