import {
  config,
  context as ctx,
  sprites,
  WORLD_HEIGHT,
  SKETCH_ENABLED,
} from "../../utils/const";
import { Sprite } from "./sprite";

export class Floor extends Sprite {
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

  renderCarouselEffect() {
    const x = this.carouselX % this.width;

    if (SKETCH_ENABLED) {
      ctx.strokeStyle = "red";
      ctx.strokeRect(x, this.y, this.width, this.height);
      ctx.strokeRect(x + this.width, this.y, this.width, this.height);
      ctx.strokeRect(x + this.width * 2, this.y, this.width, this.height);
      return;
    }

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
      x + this.width - 1,
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
      x + this.width * 2 - 2,
      this.y,
      this.width,
      this.height
    );
  }

  render() {
    this.renderCarouselEffect();

    if (SKETCH_ENABLED) {
      ctx.strokeStyle = "yellow";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      return;
    }
  }
}
