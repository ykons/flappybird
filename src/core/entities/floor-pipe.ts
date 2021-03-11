import {
  config,
  context as ctx,
  sprites,
  WORLD_WIDTH,
  WORLD_HEIGHT,
} from "../../utils/const";
import { SpriteObject } from "./sprite-object";

export class FloorPipe extends SpriteObject {
  constructor(private readonly floorPipeHeight) {
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

  update(deltaTime) {
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
