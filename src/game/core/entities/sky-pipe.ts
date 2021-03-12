import {
  config,
  context as ctx,
  sprites,
  WORLD_WIDTH,
  WORLD_HEIGHT,
} from "../../utils/const";
import { Sprite } from "./sprite";

const SPRITE_PIPE_HEIGHT = 400;

export class SkyPipe extends Sprite {
  constructor(private readonly floorPipeHeight: number) {
    super();
    this.spriteX = 52;
    this.spriteY = 169 + SPRITE_PIPE_HEIGHT - this.getSkyPipeBottonY();
    this.width = 52;
    this.height = this.getFloorPipeTopY() - config.PIPES_GAP_SPACE;
    this.x = WORLD_WIDTH;
    this.y = 0;
    this.velocityX = config.VELOCITY_OBSTACLE;
    this.velocityY = 0;
  }

  getSkyPipeBottonY() {
    return this.getFloorPipeTopY() - config.PIPES_GAP_SPACE;
  }

  getFloorPipeTopY() {
    return WORLD_HEIGHT - config.FLOOR_HEIGHT - this.floorPipeHeight;
  }

  isHidden() {
    return this.x + this.width < 0;
  }

  update(deltaTime: number) {
    this.x += this.velocityX * deltaTime;
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
