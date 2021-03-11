import { canvas, context as ctx } from "../../utils/const.js";
import { gameState } from "../../core/state/game-state.js";

export class LiveScore {
  constructor() {
    this.x = canvas.width - 10;
    this.y = 40;
  }

  update(deltaTime) {}

  render() {
    ctx.fillStyle = "white";
    ctx.font = '30px "Flappy Bird Font"';
    ctx.textAlign = "right";
    ctx.fillText(`${Math.trunc(gameState.player.score)}`, this.x, this.y);
  }
}
