import { context as ctx, WORLD_WIDTH } from "../../utils/const";
import { gameState } from "../../core/state/game-state";

export class LiveScore {
  private x: number;
  private y: number;
  constructor() {
    this.x = WORLD_WIDTH - 10;
    this.y = 40;
  }

  update(deltaTime: number) {}

  render() {
    ctx.fillStyle = "white";
    ctx.font = '30px "Flappy Bird Font"';
    ctx.textAlign = "right";
    ctx.fillText(`${Math.trunc(gameState.getScore())}`, this.x, this.y);
  }
}
