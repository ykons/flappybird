import { context as ctx, sprites, SKETCH_ENABLED } from "../../utils/const";

export class Sprite {
  spriteX: number;
  spriteY: number;
  width: number;
  height: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;

  update(deltaTime: number) {}

  render() {
    if (SKETCH_ENABLED) {
      ctx.strokeStyle = "green";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      return;
    }

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
