import { Map } from "./map.js";
import { Camera } from "./camera.js";
import { Input } from "./input.js";

export const GAME_WIDTH = 512;
export const GAME_HEIGHT = 512;

export class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.map = new Map();
    this.input = new Input();
    this.camera = new Camera(this.input, this.map, GAME_WIDTH, GAME_HEIGHT);
  }

  start = () => {
    let lastTime = 0;
    const animate = (timeStamp) => {
      const deltaTime = (timeStamp - lastTime) / 1000;
      // console.log("FPS:", 1 / deltaTime); //FPS (количество кадров в сек) ~145
      lastTime = timeStamp;
      this.update(deltaTime);
      this.render();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  update = (deltaTime) => {
    this.camera.update(deltaTime);
  };

  render = () => {
    for (let row = this.camera.startRow; row <= this.camera.endRow; row++) {
      for (let col = this.camera.startCol; col <= this.camera.endCol; col++) {
        this.drowLayer(0, row, col);
        this.drowLayer(1, row, col);
      }
    }
  };

  drowLayer = (layer, row, col) => {
    const tile = this.map.getTile(layer, row, col);

    const x = Math.round(
      (col - this.camera.startCol) * this.map.tileSize + this.camera.offsetX
    );
    const y = Math.round(
      (row - this.camera.startRow) * this.map.tileSize + this.camera.offsetY
    );

    this.ctx.drawImage(
      this.map.image,

      // { sx, sy, swidth, sheght } область которую мы хотим получить из картинки
      ((tile - 1) * this.map.image_tileSize) % this.map.image.width,
      Math.floor((tile - 1) / this.map.image_cols) * this.map.image_tileSize,
      this.map.image_tileSize,
      this.map.image_tileSize,

      // { x, y, width, heght } область на канвасе куда хотим вставить получившуюся картинку (width, heght позволяют растянуть/уменьшить получившуюся часть картинки)
      x,
      y,
      this.map.tileSize,
      this.map.tileSize
    );
  };
}
