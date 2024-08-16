import { Map } from "./map.js";
import { Camera } from "./camera.js";

const GAME_WIDTH = 512;
const GAME_HEIGHT = 512;

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
    // ctx.
    ctx.drawImage(
      this.map.image,
      // [sx, sy, swidth, sheght] область которую мы хотим получить из картинки
      this.cmera.x,
      this.cmera.y,
      GAME_WIDTH,
      GAME_HEIGHT,
      // [x, y, width, heght] область на канвасе куда хотим вставить получившуюся картинку (width, heght позволяют растянуть/уменьшить получившуюся часть картинки)
      0,
      0,
      GAME_WIDTH,
      GAME_HEIGHT
    );
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

  const game = new Game();

  let lastTime = 0;
  const animate = (timeStamp) => {
    const deltaTime = (timeStamp - lastTime) / 1000; //FPS (количество кадров в сек) = 1 / deltaTime 
    lastTime = timeStamp;
    game.update(deltaTime);
    game.render(ctx);
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
});
