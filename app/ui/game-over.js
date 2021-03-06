import { canvas, context as ctx } from "../utils/const.js";
import { gameState } from "../core/state/game-state.js";
import { SpriteObject } from "../core/entities/sprite-object.js";

export class GameOver extends SpriteObject {
  constructor() {
    super();
    this.spriteX = 134;
    this.spriteY = 153;
    this.width = 226;
    this.height = 200;
    this.x = canvas.width / 2 - 226 / 2;
    this.y = 100;
  }

  update(deltaTime) {}

  render() {
    super.render();
    ctx.fillStyle = "#412937";
    ctx.font = '20px "Flappy Bird Font"';
    ctx.textAlign = "right";
    ctx.fillText(
      `${Math.trunc(gameState.player.score)}`,
      this.x + 205,
      this.y + 98
    );
  }
}
