import {
  config,
  context as ctx,
  sprites,
  WORLD_WIDTH,
  WORLD_HEIGHT,
} from "../../utils/const";
import { Sprite } from "./sprite";

export class FloorPipe extends Sprite {
  constructor(private readonly floorPipeHeight: number) {
    super();
    this.spriteX = 0;
    this.spriteY = 169;
    this.width = 52;
    this.height = this.floorPipeHeight;
    this.x = WORLD_WIDTH;
    this.y = WORLD_HEIGHT - config.FLOOR_HEIGHT - this.floorPipeHeight;
    this.velocityX = config.VELOCITY_OBSTACLE;
    this.velocityY = 0;
  }

  isHidden() {
    return this.x + this.width < 0;
  }

  update(deltaTime: number) {
    this.x += this.velocityX * deltaTime;
  }
}
