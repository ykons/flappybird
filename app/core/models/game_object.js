import { context as ctx, sprites } from "../../utils/const.js";

export class GameObject {
  constructor() {
    this.spriteX = 0;
    this.spriteY = 0;
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
  }
  update(deltaTime) {}
  render() {
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
