import {
  context as ctx,
  sprites,
  WORLD_WIDTH,
  WORLD_HEIGHT,
} from "../../utils/const";
import { Sprite } from "./sprite";

export class Background extends Sprite {
  constructor() {
    super();
    this.spriteX = 390;
    this.spriteY = 0;
    this.width = 276;
    this.height = 204;
    this.x = 0;
    this.y = WORLD_HEIGHT - 204;
  }

  render() {
    ctx.fillStyle = "#70c5cd"; // sky color
    ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
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
