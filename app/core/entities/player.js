import { config, context as ctx, sprites } from "../../utils/const.js";
import { SpriteObject } from "./sprite-object.js";

export class Player extends SpriteObject {
  constructor() {
    super();
    this.spriteX = 0;
    this.spriteY = 0;
    this.width = 34;
    this.height = 24;
    this.x = 10;
    this.y = 200;
    this.velocityX = 0;
    this.velocityY = 0;
    this.jumpVelocity = config.VELOCITY_JUMP;
    this.isJumping = false;
    this.score = 0;
    this.died = false;
  }

  jump() {
    this.isJumping = true;
  }

  update(deltaTime) {
    if (this.died) return;
    if (this.isJumping) {
      this.velocityY = -this.jumpVelocity;
      this.isJumping = false;
    }
    this.velocityY += config.GRAVITY;
    this.y += this.velocityY * deltaTime;
    if (this.y < 0) {
      this.y = 0;
      this.velocityY = 0;
    }
    this.score += deltaTime;
  }

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
