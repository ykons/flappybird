import { config, canvas, context as ctx, sprites } from "../../utils/const.js";
import { SpriteObject } from "./sprite-object.js";
import { gameState } from "../state/game-state.js";

export class Floor extends SpriteObject {
  constructor() {
    super();
    this.spriteX = 0;
    this.spriteY = 610;
    this.width = 224;
    this.height = 112;
    this.x = 0;
    this.y = canvas.height - config.FLOOR_HEIGHT;
    this.velocityX = config.VELOCITY_FLOOR;
    this.velocityY = 0;
    this.carouselX = 0;
  }

  update(deltaTime) {
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
