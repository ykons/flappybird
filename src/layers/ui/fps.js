import { clock } from "../../utils/clock.js";
import { context as ctx } from "../../utils/const.js";

export class FPS {
  constructor() {
    this.x = 10;
    this.y = 40;
  }

  update(deltaTime) {}

  render() {
    ctx.fillStyle = "white";
    ctx.font = '30px "Flappy Bird Font"';
    ctx.textAlign = "left";
    ctx.fillText(`${Math.trunc(clock.fps)}`, this.x, this.y);
  }
}
