import { context as ctx, WORLD_WIDTH } from "../../utils/const";
import { SpriteObject } from "../../core/entities/sprite-object";

export class GameOver extends SpriteObject {
  constructor(
    private readonly score: number,
    private readonly bestScore: number
  ) {
    super();
    this.spriteX = 134;
    this.spriteY = 153;
    this.width = 226;
    this.height = 200;
    this.x = WORLD_WIDTH / 2 - 226 / 2;
    this.y = 100;
  }

  update(deltaTime: number) {}

  render() {
    super.render();
    ctx.fillStyle = "#412937";
    ctx.font = '20px "Flappy Bird Font"';
    ctx.textAlign = "right";
    ctx.fillText(`${Math.trunc(this.score)}`, this.x + 205, this.y + 98);
    ctx.fillText(`${Math.trunc(this.bestScore)}`, this.x + 205, this.y + 140);
  }
}
