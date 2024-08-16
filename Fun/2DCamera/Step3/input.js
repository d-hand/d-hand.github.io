export const Key = {
  Left: "ArrowLeft",
  Right: "ArrowRight",
  Up: "ArrowUp",
  Down: "ArrowDown",
};

export class Input {
  constructor() {
    this.keys = [];
    
    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1) {
        this.keys.unshift(e.key);
      }
      // console.log(this.keys);
    });

    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);
      if (index > -1) {
        this.keys.splice(index, 1);
      }
      // console.log(this.keys);
    });
  }

  isPressed = (key) => this.keys.indexOf(key) > -1;
}
