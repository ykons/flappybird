import { canvas, context as ctx } from "../utils/const.js";
import { GameOver } from "./game-over.js";
import { gameState } from "../core/state/game-state.js";

export class GameOverScreen {
  constructor() {
    this.gameOver = new GameOver();
    this.x = this.gameOver.x = canvas.width / 2 - 226 / 2;
    this.y = this.gameOver.y = 100;
  }

  update(deltaTime) {}

  render() {
    this.gameOver.render();
    ctx.fillStyle = "#412937";
    ctx.font = '20px "Flappy Bird Font"';
    ctx.textAlign = "right";
    ctx.fillText(`${Math.trunc(gameState.score)}`, this.x + 205, this.y + 98);
  }
}
