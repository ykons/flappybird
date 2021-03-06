import { config, context as ctx, sprites } from "../../utils/const.js";
import { GameObject } from "./game-object.js";
import { gameState } from "../state/game-state.js";
import { collisionDetection } from "../../utils/utils.js";

export class Player extends GameObject {
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
  }
  jump() {
    this.isJumping = true;
  }
  update(deltaTime) {
    if (!gameState.isPlaying()) return;
    if (this.isJumping) {
      this.velocityY = -this.jumpVelocity;
      this.isJumping = false;
    }
    this.velocityY += config.GRAVITY;
    this.y += this.velocityY * deltaTime;

    if (this.checkCollision([gameState.floor, ...gameState.layerObstacle])) {
      if (this.y + this.height > gameState.floor.y)
        this.y = gameState.floor.y - this.height;
      gameState.gameOver();
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocityY = 0;
    }
  }
  checkCollision(sprites) {
    let detected = false;
    sprites.forEach((obj) => {
      if (collisionDetection(this, obj)) {
        detected = true;
      }
    });
    return detected;
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