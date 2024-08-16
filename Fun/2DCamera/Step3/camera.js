import { Key } from "./input.js";

export class Camera {
  constructor(input, map, width, height) {
    this.input = input;
    this.map = map;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.maxX = map.cols * map.tileSize - this.width;
    this.maxY = map.rows * map.tileSize - this.height;
    this.speed = 256; // пикселей в секунду, потому что deltaTime вреям в секундах прошедшее с последнего кадра. скорость движения камеры будет одинаковой на разных устройствах  
  }

  update = (deltaTime) => {
    let speedX = 0;
    let speedY = 0;
    if (this.input.isPressed(Key.Left)) speedX = -1;
    if (this.input.isPressed(Key.Right)) speedX = 1;
    if (this.input.isPressed(Key.Up)) speedY = -1;
    if (this.input.isPressed(Key.Down)) speedY = 1;

    this.x += speedX * this.speed * deltaTime;
    this.y += speedY * this.speed * deltaTime;     
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));

    this.startRow = Math.floor(this.y / this.map.tileSize);
    this.endRow = this.startRow + Math.floor(this.height / this.map.tileSize);
    this.startCol = Math.floor(this.x / this.map.tileSize);
    this.endCol = this.startCol + Math.floor(this.width / this.map.tileSize);
    this.offsetX = -this.x + this.startCol * this.map.tileSize;
    this.offsetY = -this.y + this.startRow * this.map.tileSize;
  }
}


