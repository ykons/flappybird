import { canvas, context as ctx } from "../utils/const.js";
import { gameState } from "../core/state/game_state.js";

export class LiveScore {
  constructor() {
    this.x = canvas.width - 10;
    this.y = 40;
  }
  update(deltaTime) {
    if (!gameState.isPlaying()) return;
    gameState.score += deltaTime;
  }
  render() {
    ctx.fillStyle = "white";
    ctx.font = '30px "Flappy Bird Font"';
    ctx.textAlign = "right";
    ctx.fillText(`${Math.trunc(gameState.score)}`, this.x, this.y);
  }
}
