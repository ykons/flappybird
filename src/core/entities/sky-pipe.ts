import {
  config,
  context as ctx,
  sprites,
  WORLD_WIDTH,
  WORLD_HEIGHT,
} from "../../utils/const";
import { SpriteObject } from "./sprite-object";

export class SkyPipe extends SpriteObject {
  constructor(floorPipeHeight) {
    super();
    this.spriteX = 52;
    this.spriteY =
      169 +
      400 -
      (WORLD_HEIGHT -
        config.FLOOR_HEIGHT -
        floorPipeHeight -
        config.PIPE_GAP_SPACE);
    this.width = 52;
    this.height =
      WORLD_HEIGHT -
      config.FLOOR_HEIGHT -
      floorPipeHeight -
      config.PIPE_GAP_SPACE;
    this.x = WORLD_WIDTH;
    this.y = 0;
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
