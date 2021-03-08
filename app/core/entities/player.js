import { config, context as ctx, sprites } from "../../utils/const.js";
import { SpriteObject } from "./sprite-object.js";
import { Animation } from "./animation.js";

export class Player extends SpriteObject {
  constructor() {
    super();
    this.width = 34;
    this.height = 24;
    this.x = 10;
    this.y = 200;
    this.velocityX = 0;
    this.velocityY = 0;
    this.isJumping = false;
    this.score = 0;
    this.bestScore = 0;
    this.died = false;
    this.flyAnime = new Animation(
      [
        { x: 0, y: 0 },
        { x: 0, y: 26 },
        { x: 0, y: 52 },
      ],
      this.width,
      this.height,
      10
    );
    this.animation = this.flyAnime;
    this.rotate = 0;
  }

  restart() {
    this.x = 10;
    this.y = 200;
    this.velocityY = 0;
    this.isJumping = false;
    this.score = 0;
    this.died = false;
    this.rotate = 0;
  }

  jump() {
    this.isJumping = true;
  }

  update(deltaTime) {
    if (this.died) return;
    if (this.isJumping) {
      this.velocityY = -config.VELOCITY_JUMP;
      this.rotate = config.ROTATE_JUMP;
      this.isJumping = false;
    }
    this.velocityY += config.GRAVITY;
    this.rotate += config.ROTATE_VELOCITY;
    this.y += this.velocityY * deltaTime;
    if (this.y < 0) {
      this.y = 0;
      this.velocityY = 0;
    }
    this.score += deltaTime;
    if (this.score > this.bestScore) this.bestScore = this.score;
    this.animation.update(this.rotate);
  }

  render() {
    this.animation.draw(this.x, this.y);
  }
}
