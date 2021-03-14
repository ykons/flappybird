import { config } from "../../utils/const";
import { Sprite } from "./sprite";
import { Animation } from "./animation";
import { Jumper } from "../interfaces/jumper";

const FLY_ANIMATION_SPEED = 10;
const BIRD_START_LOCATION_X = 40;
const BIRD_START_LOCATION_Y = 200;

export class Bird extends Sprite implements Jumper {
  isJumping: boolean;
  score: number;
  bestScore: number;
  gliding: boolean;
  died: boolean;
  private glideAnime: Animation;
  private flyAnime: Animation;
  private animation: Animation;
  private rotate: number;
  private frame: number;
  constructor() {
    super();
    this.width = 34;
    this.height = 24;
    this.x = BIRD_START_LOCATION_X;
    this.y = BIRD_START_LOCATION_Y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.isJumping = false;
    this.score = 0;
    this.bestScore = 0;
    this.gliding = true;
    this.died = false;
    this.glideAnime = new Animation(
      [{ x: 0, y: 26 }],
      this.width,
      this.height,
      FLY_ANIMATION_SPEED
    );
    this.flyAnime = new Animation(
      [
        { x: 0, y: 0 },
        { x: 0, y: 26 },
        { x: 0, y: 52 },
      ],
      this.width,
      this.height,
      FLY_ANIMATION_SPEED
    );
    this.animation = this.glideAnime;
    this.rotate = 0;
    this.frame = 0;
  }

  restart() {
    this.x = BIRD_START_LOCATION_X;
    this.y = BIRD_START_LOCATION_Y;
    this.velocityY = 0;
    this.isJumping = false;
    this.score = 0;
    this.gliding = true;
    this.died = false;
    this.animation = this.glideAnime;
    this.rotate = 0;
    this.frame = 0;
  }

  startFly() {
    this.isJumping = true;
    this.animation = this.flyAnime;
    this.gliding = false;
  }

  jump() {
    this.isJumping = true;
  }

  startJump() {
    this.velocityY = -config.VELOCITY_JUMP;
    this.rotate = config.ROTATE_JUMP;
    this.isJumping = false;
  }

  applyGravitationalForce() {
    this.velocityY += config.GRAVITY;
    this.rotate += config.ROTATE_VELOCITY;
  }

  applyGlideMove() {
    this.y += Math.sin((this.frame * 5 * Math.PI) / 180);
  }

  boundaryCheck() {
    if (this.y < 0) {
      this.y = 0;
      this.velocityY = 0;
    }
  }

  nextMove(deltaTime: number) {
    if (this.died) {
      this.x += config.VELOCITY_OBSTACLE * deltaTime;
    }
    this.y += this.velocityY * deltaTime;
  }

  updateScore(deltaTime: number) {
    this.score += deltaTime;
    if (this.score > this.bestScore) this.bestScore = this.score;
  }

  update(deltaTime: number) {
    if (this.died) {
      this.applyGravitationalForce();
      this.nextMove(deltaTime);
      return;
    }
    this.frame++;
    if (this.gliding) {
      this.applyGlideMove();
      this.nextMove(deltaTime);
      this.animation.update(this.rotate);
      return;
    }
    if (this.isJumping) {
      this.startJump();
    }
    this.applyGravitationalForce();
    this.nextMove(deltaTime);
    this.boundaryCheck();
    this.updateScore(deltaTime);
    this.animation.update(this.rotate);
  }

  render() {
    this.animation.draw(this.x, this.y);
  }
}
