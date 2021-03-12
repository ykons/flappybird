import { context as ctx, sprites } from "../../utils/const";

export class SpriteObject {
  spriteX: number;
  spriteY: number;
  width: number;
  height: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;

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
