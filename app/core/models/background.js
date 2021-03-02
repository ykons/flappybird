import { canvas, context as ctx, sprites } from "../../utils/const.js";
import { GameObject } from "./game_object.js";

export class Background extends GameObject {
  constructor() {
    super();
    this.spriteX = 390;
    this.spriteY = 0;
    this.width = 276;
    this.height = 204;
    this.x = 0;
    this.y = canvas.height - 204;
  }
  render() {
    ctx.fillStyle = "#70c5cd"; // sky color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
