import { Game, GAME_HEIGHT, GAME_WIDTH } from "./game.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  ctx.imageSmoothingEnabled = true;

  new Game(ctx).start();
});
