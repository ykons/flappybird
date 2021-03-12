import {
  config,
  context as ctx,
  sprites,
  WORLD_HEIGHT,
} from "../../utils/const";
import { SpriteObject } from "./sprite-object";

export class Floor extends SpriteObject {
  private carouselX: number;
  constructor() {
    super();
    this.spriteX = 0;
    this.spriteY = 610;
    this.width = 224;
    this.height = 112;
    this.x = 0;
    this.y = WORLD_HEIGHT - config.FLOOR_HEIGHT;
    this.velocityX = config.VELOCITY_FLOOR;
    this.velocityY = 0;
    this.carouselX = 0;
  }

  update(deltaTime: number) {
    this.carouselX += this.velocityX * deltaTime;
  }

  render() {
    const x = this.carouselX % config.CAROUSEL_LIMIT;
    ctx.drawImage(
      sprites,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      x,
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
      x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
