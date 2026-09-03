export class Camera {
  constructor(map, width, height) {
    this.map = map;
    this.width = width;
    this.height = height;
    this.x = 64;
    this.y = 64;
    this.maxX = map.image.width - this.width;
    this.maxY = map.image.height - this.height;
    this.speed = 256; // пикселей в секунду, потому что deltaTime вреям в секундах прошедшее с последнего кадра. скорость движения камеры будет одинаковой на разных устройствах  
  }

  move(deltaTime, sppedX, speedY){
    this.x += sppedX * this.speed * deltaTime;
    this.y += speedY * this.speed * deltaTime; 
    
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
  }
}


